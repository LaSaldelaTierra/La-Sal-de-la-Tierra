/**
 * Crea el usuario administrador en Firebase Auth (una sola vez).
 * Uso: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/setup-admin.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local opcional si las vars ya están en el entorno
  }
}

loadEnvLocal();

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const email = process.env.ADMIN_EMAIL ?? "lasaldelatierra.m513@gmail.com";
const password = process.env.ADMIN_PASSWORD;

if (!apiKey) {
  console.error("Falta NEXT_PUBLIC_FIREBASE_API_KEY en .env.local");
  process.exit(1);
}

if (!password) {
  console.error("Define ADMIN_PASSWORD en el entorno para crear el usuario.");
  process.exit(1);
}

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

const response = await fetch(signUpUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  }),
});

const result = await response.json();

if (response.ok) {
  console.log(`Usuario admin creado: ${email}`);
  process.exit(0);
}

if (result.error?.message === "EMAIL_EXISTS") {
  console.log(`El usuario ${email} ya existe en Firebase Auth.`);
  process.exit(0);
}

console.error("Error al crear usuario:", result.error?.message ?? result);
process.exit(1);
