/** Elimina tokens de Firebase Auth del almacenamiento del navegador. */
export function clearFirebaseAuthStorage(): void {
  if (typeof window === "undefined") return;

  try {
    for (const storage of [localStorage, sessionStorage]) {
      for (const key of Object.keys(storage)) {
        if (
          key.startsWith("firebase:authUser:") ||
          key.includes("firebaseLocalStorageDb") ||
          key.includes("firebase:heartbeat")
        ) {
          storage.removeItem(key);
        }
      }
    }
  } catch {
    // Ignorar errores de acceso al storage (modo privado, etc.)
  }
}
