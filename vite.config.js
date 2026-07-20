import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

const emailPlugin = (env) => ({
  name: 'email-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS
              }
            });

            const mailOptions = {
              from: env.EMAIL_USER,
              to: data.to,
              subject: data.subject,
              html: data.body
            };

            await transporter.sendMail(mailOptions);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'OK' }));
          } catch (error) {
            console.error('Email sending error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'Error', message: error.message }));
          }
        });
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), emailPlugin(env)],
  };
})
