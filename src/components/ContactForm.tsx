import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { company } from "../data/company";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

type Status = "idle" | "submitting" | "success";

const cardClass =
  "flex flex-col gap-4 rounded-3xl border border-white/[0.08] bg-ink-850 p-6 md:gap-5 md:rounded-[28px] md:p-10";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Preencha nome, e-mail e mensagem para continuar.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Digite um e-mail válido.");
      return;
    }

    setError(null);
    setStatus("submitting");

    // Projeto sem backend: simula o envio para demonstrar o fluxo da UI.
    window.setTimeout(() => {
      setStatus("success");
      setForm(initialState);
    }, 900);
  }

  if (status === "success") {
    return (
      <div className={`${cardClass} items-center justify-center text-center md:min-h-[560px]`}>
        <CheckCircle2 className="text-accent-ink" size={40} strokeWidth={1.5} />
        <h3 className="text-2xl font-medium tracking-[-0.02em]">Mensagem enviada.</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-fog-400">
          Obrigado pelo contato. Nosso time vai analisar sua solicitação e retornar em até 1 dia útil.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-2 h-12">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[22px] font-medium tracking-[-0.02em]">Conte sobre o seu projeto</h3>
        <p className="text-sm text-fog-400">Retornamos em até 1 dia útil.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-fog-200">Nome *</span>
          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Seu nome completo"
            className="field"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-fog-200">Telefone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(11) 90000-0000"
            className="field"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] text-fog-200">E-mail *</span>
        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="voce@empresa.com"
          className="field"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] text-fog-200">Mensagem *</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Conte um pouco sobre o seu projeto"
          data-lenis-prevent
          className="field h-[150px] resize-none py-3.5"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full disabled:opacity-70">
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensagem
            <ArrowUpRight size={16} />
          </>
        )}
      </button>

      <p className="text-center font-mono text-xs text-fog-400">
        Ou fale direto pelo WhatsApp:{" "}
        <a
          href={`https://wa.me/${company.whatsappHref}`}
          target="_blank"
          rel="noreferrer"
          className="text-fog-100 underline-offset-4 hover:text-accent-ink hover:underline"
        >
          {company.whatsapp}
        </a>
      </p>
    </form>
  );
}
