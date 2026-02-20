import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const fromEnv = process.env.ASSIGNMENTS_API_URL || process.env.NG_APP_ASSIGNMENTS_API_URL;
const defaultValue = 'http://localhost:8010/api/assignments';
const assignmentsApiUrl = fromEnv || defaultValue;

const outputPath = path.join(projectRoot, 'src', 'app', 'shared', 'app-env.ts');
const fileContent = `// Fichier généré automatiquement par scripts/generate-env.mjs
// Source: variables d'environnement (Render/CI) ou .env (local). Ne pas éditer à la main.

export const APP_ENV = {
  assignmentsApiUrl: ${JSON.stringify(assignmentsApiUrl)},
} as const;
`;

fs.writeFileSync(outputPath, fileContent, { encoding: 'utf8' });
console.log(`[generate-env] Écrit: ${path.relative(projectRoot, outputPath)}`);

if (!fromEnv && !fs.existsSync(envPath)) {
  console.warn(
    `[generate-env] Aucun .env et aucune variable ASSIGNMENTS_API_URL/NG_APP_ASSIGNMENTS_API_URL trouvée. ` +
      `Valeur par défaut utilisée: ${defaultValue}`,
  );
}
