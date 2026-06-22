"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { ADMIN_EMAIL } from "@/lib/admin";

function getAuthErrorMessage(err: unknown): string {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: string }).code)
      : "";
  const message =
    err && typeof err === "object" && "message" in err
      ? String((err as { message: string }).message)
      : "";

  if (message.includes("CONFIGURATION_NOT_FOUND")) {
    return "Firebase Authentication no está activado en tu proyecto. Debes habilitarlo en la consola de Firebase (ver instrucciones abajo).";
  }

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return "Correo o contraseña incorrectos.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Espera unos minutos e intenta de nuevo.";
    case "auth/operation-not-allowed":
    case "auth/configuration-not-found":
      return "El método Email/Contraseña no está habilitado en Firebase. Actívalo en Authentication → Sign-in method.";
    default:
      return "No se pudo iniciar sesión. Intenta de nuevo.";
  }
}

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetupHelp, setShowSetupHelp] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShowSetupHelp(false);

    try {
      await signIn(email.trim(), password);
      router.replace("/admin/productos");
    } catch (err) {
      const message = getAuthErrorMessage(err);
      setError(message);
      if (message.includes("Firebase Authentication") || message.includes("Email/Contraseña")) {
        setShowSetupHelp(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md rounded-sm border border-sand/50 bg-warm-beige/30 p-8">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">
          Panel de administración
        </p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-earth">{SITE.name}</h1>
        <p className="mt-2 font-sans text-sm text-earth-light">
          Inicia sesión para gestionar los productos.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block font-sans text-sm font-medium text-earth">
              Correo
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block font-sans text-sm font-medium text-earth"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
            />
          </div>

          {error && (
            <p role="alert" className="font-sans text-sm text-red-700">
              {error}
            </p>
          )}

          {showSetupHelp && (
            <div className="rounded-sm border border-sand/60 bg-cream p-4 font-sans text-sm text-earth-light">
              <p className="font-medium text-earth">Configuración requerida en Firebase:</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>
                  Abre{" "}
                  <a
                    href="https://console.firebase.google.com/project/la-sal-de-la-tierra/authentication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth underline"
                  >
                    Firebase → Authentication
                  </a>{" "}
                  y pulsa <strong>Comenzar</strong>.
                </li>
                <li>
                  En <strong>Sign-in method</strong>, activa{" "}
                  <strong>Correo electrónico/Contraseña</strong>.
                </li>
                <li>
                  En <strong>Users</strong>, crea el usuario{" "}
                  <strong>{ADMIN_EMAIL}</strong> con tu contraseña.
                </li>
                <li>Vuelve aquí e inicia sesión.</li>
              </ol>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ingresando…" : "Ingresar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
