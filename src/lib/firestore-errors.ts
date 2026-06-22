import { FirebaseError } from "firebase/app";

export function getFirestoreErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (error instanceof FirebaseError) {
    if (error.code === "permission-denied") {
      return (
        "Permisos insuficientes en Firestore. La colección «categorias» requiere reglas " +
        "desplegadas en Firebase. Ejecuta «npm run deploy:rules» (con cuenta de servicio) " +
        "o «npm run deploy:rules:cli» (con Firebase CLI autenticado)."
      );
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
