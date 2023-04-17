import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    middleware: {
      handle(req, res, next) {
        if (req.url.endsWith('.jsx')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        next();
      },
    },
  },
});
