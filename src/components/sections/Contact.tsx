"use client";

import { useState, FormEvent } from "react";
import { SITE } from "@/lib/constants";
import { submitContactForm } from "@/lib/submit-contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const contactChannels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: SITE.phone,
    href: SITE.whatsapp,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    value: SITE.instagramHandle,
    href: SITE.instagram,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Correo",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const honeypot = String(formData.get("_honey") ?? "");

    setStatus("loading");

    const result = await submitContactForm(data, honeypot);

    if (result.ok) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("error");
    setErrorMessage(result.message);
  };

  return (
    <section
      id="contacto"
      className="section-padding bg-warm-beige/35"
      aria-labelledby="contact-heading"
    >
      <div className="container-padding mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Contacto"
              title="Contactanos!"
              description="Colaboraciones, consultas, propuestas. Estamos disponibles! 🤝"
              align="left"
            />

            <ul className="mt-8 space-y-3 sm:mt-9">
              {contactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="contact-channel group"
                  >
                    <span className="contact-channel-icon">{channel.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans text-sm font-semibold text-earth">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block break-all font-sans text-sm text-earth-light transition-colors group-hover:text-earth sm:break-normal sm:truncate">
                        {channel.value}
                      </span>
                    </span>
                    <svg
                      className="h-4 w-4 shrink-0 text-earth/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-earth"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div className="rounded-sm bg-cream p-5 ring-1 ring-sand/25 sm:p-8 md:p-10 lg:p-12">
              {status === "success" ? (
                <div
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-earth">Mensaje enviado</h3>
                  <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-earth-light">
                    Gracias por escribirnos. Te responderemos a la brevedad en tu correo o por WhatsApp.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 font-sans text-sm font-medium text-olive underline-offset-4 transition-colors hover:text-earth hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] opacity-0"
                    aria-hidden="true"
                  />

                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-sm border border-earth/15 bg-warm-beige/50 px-4 py-3 font-sans text-sm text-earth"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      disabled={status === "loading"}
                      aria-invalid={!!fieldErrors.name}
                      className={cn("form-input", fieldErrors.name && "border-red-400/60")}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={status === "loading"}
                      className="form-input"
                      placeholder="tu@correo.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={status === "loading"}
                      className="form-input resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto"
                    aria-busy={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
                        Enviando...
                      </span>
                    ) : (
                      "Enviar mensaje"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
