import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, User } from "lucide-react";
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
  { icon: User, label: "Contato", value: company.contactName },
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
  label = "Contato",
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
          Tem uma ideia? <span className="serif-em">Vamos construir.</span>
        </Heading>
        <p className="max-w-[460px] text-base leading-relaxed text-fog-400 lg:text-lg">
          Conte o que sua empresa precisa e vamos pensar na melhor solução.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <ContactForm headingLevel={headingLevel === "h1" ? "h2" : "h3"} />
      </Reveal>

      <Reveal delay={0.15} className="self-start border-b border-white/[0.08] lg:col-start-1 lg:row-start-2">
        <ul aria-label="Outras formas de contato">
          {items.map(({ label: itemLabel, value, href }) => (
            <li
              key={itemLabel}
              className="flex flex-col gap-1 border-t border-white/[0.08] py-4 lg:h-16 lg:flex-row lg:items-center lg:gap-4 lg:py-0"
            >
              <span className="label text-fog-500 lg:w-24 lg:shrink-0">{itemLabel}</span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="-my-1 py-1 text-base text-fog-100 transition-colors hover:text-accent-ink lg:text-[15px]"
                >
                  {value}
                  {href.startsWith("http") && <span className="sr-only"> (abre em nova aba)</span>}
                </a>
              ) : (
                <span className="text-base text-fog-100 lg:text-[15px]">{value}</span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
