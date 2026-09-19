// Layout Grid (Aceternity UI / 21st.dev), adaptado para Vite e para o site:
// sem next/image, cards acessíveis por teclado, Esc fecha e o card ampliado
// fica centralizado na tela (fixed), mesmo com a página rolada.
import { useEffect, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Card = {
  id: number;
  /** Conteúdo exibido quando o card é ampliado */
  content: ReactNode;
  /** Rótulo curto mostrado sobre a imagem no estado normal */
  titulo: string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards, className }: { cards: Card[]; className?: string }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && handleOutsideClick();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const onCardKey = (e: KeyboardEvent, card: Card) => {
    if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    handleClick(card);
  };

  return (
    <div
      className={cn(
        "relative grid w-full auto-rows-[280px] grid-cols-1 gap-4 md:auto-rows-[340px] md:grid-cols-3",
        className,
      )}
    >
      {cards.map((card) => {
        const aberto = selected?.id === card.id;
        return (
          <div key={card.id} className={cn(card.className, "")}>
            <motion.div
              role="button"
              tabIndex={aberto ? -1 : 0}
              aria-label={aberto ? undefined : `Ampliar ${card.titulo}`}
              aria-expanded={aberto}
              onClick={() => handleClick(card)}
              onKeyDown={(e) => onCardKey(e, card)}
              className={cn(
                card.className,
                "group relative overflow-hidden bg-ink-850 outline-none focus-visible:ring-2 focus-visible:ring-accent-ink",
                aberto
                  ? "fixed inset-0 z-[70] m-auto flex h-[72vh] w-[92vw] cursor-default flex-col flex-wrap items-center justify-center rounded-lg md:h-[80vh] md:w-[min(960px,80vw)]"
                  : lastSelected?.id === card.id
                    ? "z-40 h-full w-full cursor-pointer rounded-md"
                    : "h-full w-full cursor-pointer rounded-md",
              )}
              layoutId={`card-${card.id}`}
            >
              {aberto && <SelectedCard selected={selected} />}
              <ImageComponent card={card} />
              {!aberto && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                  <p className="text-lg font-medium text-fog-50">{card.titulo}</p>
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
      <motion.div
        onClick={handleOutsideClick}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[65] bg-black opacity-0",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.7 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
      alt={card.titulo}
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-10 h-full w-full bg-gradient-to-t from-black via-black/75 to-black/10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70] px-6 pb-6 md:px-10 md:pb-10"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
