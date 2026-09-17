import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import { company } from "../data/company";

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const items: ContactItem[] = [
  { icon: MapPin, label: "Endereço", value: "Av. Paulista, 1106 — Bela Vista, São Paulo - SP" },
  { icon: Phone, label: "Telefone", value: company.phone, href: `tel:${company.phoneHref}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.whatsapp,
    href: `https://wa.me/${company.whatsappHref}`,
  },
  { icon: Mail, label: "E-mail", value: company.email, href: `mailto:${company.email}` },
];

interface ContactSectionProps {
  label?: string;
  headingLevel?: "h1" | "h2";
  className?: string;
}

export default function ContactSection({
  label = "(06) — Contato",
  headingLevel = "h2",
  className = "",
}: ContactSectionProps) {
  const Heading = headingLevel;

  return (
    <section
      id="contato"
      className={`container-x section-y grid gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10 ${className}`}
    >
      <Reveal className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1 lg:gap-7">
        <span className="label">{label}</span>
        <Heading className="text-[50px] font-medium leading-[0.98] tracking-[-0.045em] md:text-7xl lg:text-[88px]">
          Vamos tirar sua ideia do <span className="serif-em">papel.</span>
        </Heading>
        <p className="max-w-[460px] text-base leading-relaxed text-fog-400 lg:text-lg">
          Fale com o nosso time e receba uma proposta personalizada para o seu projeto.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <ContactForm />
      </Reveal>

      <Reveal delay={0.15} className="self-start border-b border-white/[0.08] lg:col-start-1 lg:row-start-2">
        <ul>
          {items.map(({ icon: Icon, label, value, href }) => (
            <li
              key={label}
              className="flex flex-col gap-1 border-t border-white/[0.08] py-4 lg:h-16 lg:flex-row lg:items-center lg:gap-4 lg:py-0"
            >
              <Icon
                size={20}
                strokeWidth={1.7}
                className="hidden shrink-0 text-accent-ink lg:block"
                aria-hidden="true"
              />
              <span className="label text-fog-500 lg:w-24 lg:shrink-0">{label}</span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="text-[15px] text-fog-100 transition-colors hover:text-accent-ink"
                >
                  {value}
                </a>
              ) : (
                <span className="text-[15px] text-fog-100">{value}</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
