/**
 * Jest test setup configuration.
 * Features:
 * - Global test setup
 * - Environment configuration
 * - Helper imports
 *
 * By Dulapah Vibulsanti (https://dulapahv.dev)
 */

const LOCAL_SERVER = process.env.SERVER_LOCAL_URL || 'http://localhost:3001';
const REMOTE_SERVER = process.env.SERVER_REMOTE_URL || 'http://localhost:3001';

const serverArg = process.argv.find((arg) => arg.startsWith('--server='));
if (!serverArg) {
  console.warn('⚠️ Server not specified. Defaulting to local server.');
}
const SERVER_URL = serverArg?.includes('remote') ? REMOTE_SERVER : LOCAL_SERVER;

console.log(`ℹ️ Running tests against server: ${SERVER_URL}`);

process.env.SERVER_URL = SERVER_URL;
