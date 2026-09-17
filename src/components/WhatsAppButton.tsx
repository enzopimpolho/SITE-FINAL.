import { motion } from "framer-motion";
import { company } from "../data/company";

const message = "Olá! Vim pelo site da Nextgen e gostaria de saber mais sobre os serviços.";
const href = `https://wa.me/${company.whatsappHref}?text=${encodeURIComponent(message)}`;

export default function WhatsAppButton() {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Conversar no WhatsApp com a Nextgen (${company.whatsapp}), abre em nova aba`}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)]"
    >
      <span
        aria-hidden="true"
        className="wa-ping absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden"
      />
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.66 4.523 1.804 6.383L4 29l7.803-1.77A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.98 0-3.83-.55-5.41-1.5l-.388-.23-4.633 1.05 1.07-4.51-.253-.4A9.71 9.71 0 0 1 5.25 15c0-5.93 4.824-10.75 10.754-10.75S26.75 9.07 26.75 15 21.934 24.75 16.004 24.75Zm5.87-8.06c-.32-.16-1.89-.93-2.183-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.014 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.497-2.573-1.586-.95-.847-1.593-1.894-1.78-2.213-.187-.32-.02-.493.14-.653.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.626-.526-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.257 3.447 5.467 4.833.764.33 1.36.527 1.826.674.767.244 1.464.21 2.016.127.615-.092 1.89-.773 2.157-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z" />
      </svg>
    </motion.a>
  );
}
