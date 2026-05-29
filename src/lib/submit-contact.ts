import { SITE } from "@/lib/constants";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormResult {
  ok: boolean;
  message: string;
}

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function getAccessKey(): string | undefined {
  return process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
}

export function validateContactForm(data: ContactFormData): string | null {
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (name.length < 2) {
    return "Por favor, ingresa tu nombre completo.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Ingresa un correo electrónico válido.";
  }
  if (message.length < 10) {
    return "Tu mensaje debe tener al menos 10 caracteres.";
  }
  if (message.length > 2000) {
    return "El mensaje es demasiado largo (máximo 2000 caracteres).";
  }
  return null;
}

export async function submitContactForm(
  data: ContactFormData,
  honeypot: string
): Promise<ContactFormResult> {
  if (honeypot) {
    return { ok: true, message: "Mensaje enviado correctamente." };
  }

  const validationError = validateContactForm(data);
  if (validationError) {
    return { ok: false, message: validationError };
  }

  const accessKey = getAccessKey();
  if (!accessKey) {
    return {
      ok: false,
      message:
        "El formulario no está configurado. Escríbenos por WhatsApp mientras lo activamos.",
    };
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        subject: `Nuevo mensaje — ${SITE.name}`,
        from_name: SITE.name,
        replyto: data.email.trim(),
      }),
    });

    let result: { success?: boolean; message?: string };
    try {
      result = await response.json();
    } catch {
      return {
        ok: false,
        message: "Respuesta inesperada del servidor. Intenta por WhatsApp.",
      };
    }

    if (result.success) {
      return {
        ok: true,
        message: "Tu mensaje fue enviado. Te responderemos pronto.",
      };
    }

    return {
      ok: false,
      message:
        result.message ||
        "No pudimos enviar tu mensaje. Intenta nuevamente o escríbenos por WhatsApp.",
    };
  } catch {
    return {
      ok: false,
      message:
        "Error de conexión. Verifica tu internet o contáctanos por WhatsApp.",
    };
  }
}
