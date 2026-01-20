const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/product-proxy',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            headers: {
                From: 'FO'
            },
            changeOrigin: true,
        })
    );
    app.use(
        '/member-proxy',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            headers: {
                From: 'FO',
                'Content-Type': 'application/json',
            },
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                if (req.headers.cookie) {
                    proxyReq.setHeader('Cookie', req.headers.cookie);
                }
            },
            onProxyRes: (proxyRes, req, res) => {
                // 백엔드에서 보낸 쿠키를 그대로 전달
                if (proxyRes.headers['set-cookie']) {
                    proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(cookie => {
                        // 개발 환경에서는 Secure 제거 (HTTP 허용)
                        return cookie.replace(/; Secure/gi, '');
                    });
                }
            }
        })
    );
};