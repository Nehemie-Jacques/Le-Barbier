import app from './app';
import { env } from '../src/config/env';

const server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
})

const shutdown = () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);