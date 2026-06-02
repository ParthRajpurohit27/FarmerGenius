const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const OpenAI = require('openai');

// Initialize OpenAI client for Mistral API via OpenRouter
// Using OpenAI client with OpenRouter base URL for Mistral model support
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1'
    });
  } catch (error) {
    console.warn('OpenAI client initialization skipped:', error.message);
    openai = null;
  }
}

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

function getClientIP(req) {
    if (TRUST_PROXY && req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for'].split(',')[0].trim();
    }
    return req.socket.remoteAddress;
}

// Simple rate limiting: track requests per IP (no complex session system)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_REQUEST_SIZE_BYTES = 10000;

function checkRateLimit(ip) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(ip) || [];
    const recentRequests = userRequests.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
        return false;
    }
    
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    return true;
}

setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap.entries()) {
        const recentRequests = timestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);
        if (recentRequests.length === 0) {
            rateLimitMap.delete(ip);
        } else {
            rateLimitMap.set(ip, recentRequests);
        }
    }
}, RATE_LIMIT_WINDOW_MS);

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

// Simple Chat API endpoint - works everywhere, no sessions needed
async function handleChatAPI(req, res) {
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
    }

    const clientIP = getClientIP(req);
    
    // Simple rate limiting - no complex sessions
    if (!checkRateLimit(clientIP)) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }));
        return;
    }

    let body = '';
    let requestSize = 0;
    
    req.on('data', chunk => {
        requestSize += chunk.length;
        if (requestSize > MAX_REQUEST_SIZE_BYTES) {
            res.writeHead(413, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Request too large' }));
            req.destroy();
            return;
        }
        body += chunk.toString();
    });

    req.on('end', async () => {
        let parsedBody;
        try {
            parsedBody = JSON.parse(body);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON in request body' }));
            return;
        }

        try {
            const { message } = parsedBody;
            
            if (!message || typeof message !== 'string') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Message is required and must be a string' }));
                return;
            }
            
            if (message.length > 500) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Message too long. Maximum 500 characters.' }));
                return;
            }

            if (!openai) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    response: 'AI Assistant is currently unavailable. Please add the OPENAI_API_KEY to enable AI features. You can still use all the farming tools and resources on this website!' 
                }));
                return;
            }

            // Create farming-focused system prompt
            const systemPrompt = `You are an expert agricultural AI assistant for Indian farmers. Your name is Farm AI Assistant. You help farmers with:
- Crop selection and planting advice
- Fertilizer and irrigation guidance  
- Pest and disease management
- Soil health and testing
- Weather planning
- Government schemes and subsidies
- Market prices and selling tips
- Organic farming practices
- Farm technology and apps

Provide practical, actionable advice in simple language. Use relevant emojis. Keep responses concise but informative (2-4 sentences). Focus on solutions that work for small to medium farms in India.`;

            const response = await openai.chat.completions.create({
                model: 'mistralai/mistral-7b-instruct:free', // Using Mistral model via OpenRouter
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                max_tokens: 300
            });

            const aiResponse = response.choices[0].message.content;
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ response: aiResponse }));
            
        } catch (error) {
            console.error('Chat API error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
                error: 'Sorry, I\'m having trouble right now. Please try asking me about crops, fertilizers, irrigation, or other farming topics!' 
            }));
        }
    });
}

const server = http.createServer((req, res) => {
    const origin = req.headers.origin;
    
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
    let allowedOrigins = [];
    
    if (allowedOriginsEnv) {
        allowedOrigins = allowedOriginsEnv
            .split(',')
            .map(o => o.trim())
            .filter(o => o.length > 0);
    }
    
    if (origin && allowedOrigins.length > 0 && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    
    // Log API requests for debugging
    if (parsedUrl.pathname.startsWith('/api/')) {
        console.log(`API Request: ${req.method} ${parsedUrl.pathname}`);
    }
    
    // Handle chat API endpoint (with or without trailing slash)
    if (parsedUrl.pathname === '/api/chat' || parsedUrl.pathname === '/api/chat/') {
        handleChatAPI(req, res);
        return;
    }

    // Handle undefined API routes
    if (parsedUrl.pathname.startsWith('/api/')) {
        console.error(`404 - Unknown API endpoint: ${parsedUrl.pathname}`);
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            error: 'API endpoint not found',
            path: parsedUrl.pathname,
            availableEndpoints: ['/api/chat']
        }));
        return;
    }

    let requestedPath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query parameters
    requestedPath = requestedPath.split('?')[0];
    
    const filePath = path.normalize(path.join(__dirname, requestedPath));
    
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve index.html for SPA routing
                const indexPath = path.join(__dirname, 'index.html');
                fs.readFile(indexPath, (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log('========================================');
    console.log(`🌾 Farmer Genius Server Started`);
    console.log('========================================');
    console.log(`📍 URL: http://${HOST}:${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔑 OpenAI Key: ${openai ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`🛡️  Security: Simple rate limiting (10 req/min)`);
    const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
    if (allowedOriginsEnv) {
        console.log(`🌐 CORS: Enabled for ${allowedOriginsEnv.split(',').length} origin(s)`);
    } else {
        console.log(`🌐 CORS: Same-origin only (secure default)`);
    }
    console.log(`🔒 IP Detection: ${TRUST_PROXY ? 'Proxy mode (X-Forwarded-For)' : 'Direct (socket)'}`);
    console.log('========================================');
    console.log('✅ Server ready to accept connections!');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Server shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});