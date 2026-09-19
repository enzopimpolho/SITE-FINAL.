import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { company } from "../data/company";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Field = keyof FormState;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success";

const initialState: FormState = { name: "", email: "", phone: "", message: "" };
const fieldOrder: Field[] = ["name", "phone", "email", "message"];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Informe seu nome.";
  if (!form.email.trim()) errors.email = "Informe seu e-mail para podermos responder.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Esse e-mail parece incompleto. Use o formato nome@empresa.com.";
  }
  if (!form.message.trim()) errors.message = "Conte um pouco sobre o projeto.";
  return errors;
}

/** Texto do e-mail, com os campos preenchidos. */
function montarMensagem(form: FormState): string {
  return [
    "Olá, Nextgen! Vim pelo site.",
    "",
    "Nome: " + form.name.trim(),
    "E-mail: " + form.email.trim(),
    form.phone.trim() ? "Telefone: " + form.phone.trim() : "",
    "",
    form.message.trim(),
  ]
    .filter((linha, i, todas) => linha !== "" || todas[i - 1] !== "")
    .join("\n");
}

/** Link mailto com destinatário, assunto e corpo já preenchidos. */
function linkEmail(texto: string): string {
  const assunto = encodeURIComponent("Orçamento — site Nextgen");
  return `mailto:${company.email}?subject=${assunto}&body=${encodeURIComponent(texto)}`;
}

const cardClass =
  "flex flex-col gap-4 rounded-lg border border-white/[0.08] bg-ink-900 p-6 md:gap-5 md:p-10";

interface ContactFormProps {
  headingLevel?: "h2" | "h3";
}

export default function ContactForm({ headingLevel = "h3" }: ContactFormProps) {
  const Heading = headingLevel;
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [ultimaMensagem, setUltimaMensagem] = useState("");
  const [copiada, setCopiada] = useState(false);

  async function copiarMensagem() {
    try {
      await navigator.clipboard.writeText(`Para: ${company.email}\n\n${ultimaMensagem}`);
      setCopiada(true);
    } catch {
      setCopiada(false);
    }
  }
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function handleChange(field: Field, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleBlur(field: Field) {
    // Only re-check fields that already showed an error, so users aren't flagged while still typing.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(form)[field] }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    const firstInvalid = fieldOrder.find((field) => found[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    // Sem servidor de e-mail: abre o aplicativo de e-mail do visitante com tudo preenchido.
    const texto = montarMensagem(form);
    setUltimaMensagem(texto);
    setCopiada(false);
    setStatus("success");
    setForm(initialState);
    try {
      window.location.href = linkEmail(texto);
    } catch {
      // navegador bloqueou o mailto: a tela de sucesso já oferece o link e o endereço
    }
  }

  const fieldProps = (field: Field) => ({
    id: `contato-${field}`,
    ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
      fieldRefs.current[field] = el;
    },
    value: form[field],
    onChange: (e: { target: { value: string } }) => handleChange(field, e.target.value),
    onBlur: () => handleBlur(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `contato-${field}-erro` : undefined,
  });

  const errorText = (field: Field) =>
    errors[field] ? (
      <p id={`contato-${field}-erro`} className="text-sm text-red-400">
        {errors[field]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div role="status" className={`${cardClass} items-center justify-center text-center md:min-h-[560px]`}>
        <CheckCircle2 className="text-accent-ink" size={40} strokeWidth={1.5} aria-hidden="true" />
        <Heading ref={successRef} tabIndex={-1} className="text-2xl font-medium tracking-[-0.02em] outline-none">
          Mensagem pronta no seu e-mail.
        </Heading>
        <p className="max-w-sm text-base leading-relaxed text-fog-400">
          Abrimos seu aplicativo de e-mail com o texto preenchido. Falta só enviar por lá. Se nada abriu,
          escreva para <span className="text-fog-100">{company.email}</span>.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <a href={linkEmail(ultimaMensagem)} className="btn-primary">
            Abrir o e-mail de novo
          </a>
          <button type="button" onClick={copiarMensagem} className="btn-ghost">
            {copiada ? "Mensagem copiada" : "Copiar mensagem"}
          </button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copiada ? "Mensagem copiada para a área de transferência." : ""}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-underline mt-2 text-sm text-fog-400 hover:text-fog-50">
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-labelledby="contato-form-titulo" className={cardClass}>
      <div className="flex flex-col gap-1.5">
        <Heading id="contato-form-titulo" className="text-[22px] font-medium tracking-[-0.02em]">
          Conte sobre o seu projeto
        </Heading>
        <p className="text-sm text-fog-400">
          Ao enviar, a mensagem abre pronta no seu e-mail. Campos com <span aria-hidden="true">*</span>
          <span className="sr-only">asterisco</span> são obrigatórios.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-name" className="text-[13px] text-fog-200">
            Nome <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            aria-required="true"
            className="field"
            {...fieldProps("name")}
          />
          {errorText("name")}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contato-phone" className="text-[13px] text-fog-200">
            Telefone <span className="text-fog-500">(opcional)</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(11) 90000-0000"
            className="field"
            {...fieldProps("phone")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-email" className="text-[13px] text-fog-200">
          E-mail <span aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@empresa.com"
          aria-required="true"
          className="field"
          {...fieldProps("email")}
        />
        {errorText("email")}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contato-message" className="text-[13px] text-fog-200">
          Mensagem <span aria-hidden="true">*</span>
        </label>
        <textarea
          rows={5}
          placeholder="Ex.: preciso de um site para minha clínica, com agendamento online"
          aria-required="true"
          data-lenis-prevent
          className="field h-[150px] resize-none py-3.5"
          {...fieldProps("message")}
        />
        {errorText("message")}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="btn-primary w-full disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            Enviar por e-mail
            <ArrowUpRight size={16} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center font-mono text-xs text-fog-400">
        Ou fale direto pelo WhatsApp:{" "}
        <a
          href={`https://wa.me/${company.whatsappHref}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block py-1 text-fog-100 underline underline-offset-4 hover:text-accent-ink"
        >
          {company.whatsapp}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </p>
    </form>
  );
}
