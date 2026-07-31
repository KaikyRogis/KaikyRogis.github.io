"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, Send } from "lucide-react";

export function ContactForm() {
  const [copied, setCopied] = useState(false);

  function messageFrom(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      subject: String(data.get("subject")),
      body: `Nome: ${data.get("name")}\nE-mail: ${data.get("email")}\n\n${data.get("message")}`,
    };
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { subject, body } = messageFrom(event.currentTarget);
    window.location.href = `mailto:contato.kaikyrogis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function copy(event: FormEvent<HTMLButtonElement>) {
    const form = event.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const { subject, body } = messageFrom(form);
    await navigator.clipboard.writeText(
      `Para: contato.kaikyrogis@gmail.com\nAssunto: ${subject}\n\n${body}`,
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={submit}>
        <label>
          Nome
          <input
            name="name"
            autoComplete="name"
            required
            placeholder="Como posso te chamar?"
          />
        </label>
        <label>
          E-mail
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="voce@empresa.com"
          />
        </label>
        <label>
          Assunto
          <input
            name="subject"
            required
            placeholder="Projeto, oportunidade ou conversa"
          />
        </label>
        <label className="full">
          Mensagem
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Conte um pouco sobre o desafio…"
          />
        </label>
        <div className="contact-submit full">
          <button className="primary" type="submit">
            ABRIR E-MAIL <Send size={15} />
          </button>
          <button
            className="secondary copy-message"
            type="button"
            onClick={copy}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}{" "}
            {copied ? "MENSAGEM COPIADA" : "COPIAR MENSAGEM"}
          </button>
        </div>
      </form>
      <p className="contact-disclaimer">
        Ao continuar, abriremos o aplicativo de e-mail do seu dispositivo. Se
        ele não estiver configurado, use “Copiar mensagem”.
      </p>
    </div>
  );
}
