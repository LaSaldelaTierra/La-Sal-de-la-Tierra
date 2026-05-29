import { NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { validateContactForm, type ContactFormData } from "@/lib/submit-contact";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "El formulario aún no está configurado. Por favor escríbenos por WhatsApp mientras activamos el correo.",
      },
      { status: 503 }
    );
  }

  let body: ContactFormData & { _honey?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Datos del formulario inválidos." },
      { status: 400 }
    );
  }

  if (body._honey) {
    return NextResponse.json({ ok: true, message: "Mensaje enviado correctamente." });
  }

  const validationError = validateContactForm(body);
  if (validationError) {
    return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name: body.name.trim(),
        email: body.email.trim(),
        message: body.message.trim(),
        subject: `Nuevo mensaje — ${SITE.name}`,
        from_name: SITE.name,
        replyto: body.email.trim(),
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        ok: true,
        message: "Tu mensaje fue enviado. Te responderemos pronto.",
      });
    }

    return NextResponse.json(
      {
        ok: false,
        message:
          result.message ||
          "No pudimos enviar tu mensaje. Intenta por WhatsApp.",
      },
      { status: 422 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Error de conexión con el servicio de correo. Escríbenos por WhatsApp.",
      },
      { status: 502 }
    );
  }
}
