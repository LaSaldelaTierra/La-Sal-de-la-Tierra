/**
 * Despliega firestore.rules al proyecto Firebase.
 *
 * Requiere credenciales de cuenta de servicio:
 *   1. Firebase Console → Configuración → Cuentas de servicio → Generar nueva clave privada
 *   2. Guarda el JSON fuera del repo (ej. ../la-sal-firebase-admin.json)
 *   3. Ejecuta: FIREBASE_SERVICE_ACCOUNT_PATH=../la-sal-firebase-admin.json npm run deploy:rules
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import admin from "firebase-admin";

const credPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH ??
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credPath) {
  console.error(
    [
      "Falta FIREBASE_SERVICE_ACCOUNT_PATH o GOOGLE_APPLICATION_CREDENTIALS.",
      "",
      "Pasos:",
      "  1. Firebase Console → Configuración del proyecto → Cuentas de servicio",
      "  2. Generar nueva clave privada (JSON)",
      "  3. FIREBASE_SERVICE_ACCOUNT_PATH=ruta/al/json.json npm run deploy:rules",
      "",
      "Alternativa con Firebase CLI (sesión interactiva):",
      "  npx firebase login",
      "  npm run deploy:rules:cli",
    ].join("\n"),
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(resolve(credPath), "utf8"));
const rulesPath = resolve(process.cwd(), "firestore.rules");
const rulesContent = readFileSync(rulesPath, "utf8");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

try {
  const ruleset = await admin
    .securityRules()
    .releaseFirestoreRulesetFromSource(rulesContent);

  console.log("Reglas de Firestore desplegadas correctamente.");
  console.log(`Ruleset: ${ruleset.name}`);
  process.exit(0);
} catch (error) {
  console.error(
    "Error al desplegar reglas:",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}
