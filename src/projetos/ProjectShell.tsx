import { useEffect, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ProjectShellProps {
  title: string;
  /** Query for fonts.googleapis.com/css2, e.g. "family=Fredoka:wght@500;700". */
  fonts: string;
  className?: string;
  children: ReactNode;
}

export default function ProjectShell({ title, fonts, className = "", children }: ProjectShellProps) {
  const [params] = useSearchParams();
  const capture = params.has("capture");

  useEffect(() => {
    const id = `fonts-${fonts}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?${fonts}&display=swap`;
      document.head.appendChild(link);
    }
    const previousTitle = document.title;
    document.title = `${title} — projeto conceito Nextgen`;
    return () => {
      document.title = previousTitle;
    };
  }, [fonts, title]);

  return (
    <div className={`min-h-screen ${className}`}>
      {children}
      {!capture && (
        <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <div className="flex items-center justify-between gap-3 rounded-full border border-white/15 bg-[#07080c]/90 py-1.5 pl-4 pr-1.5 font-sans text-xs text-[#d5d8e0] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur">
            <span>
              Projeto conceito criado pela <span className="font-semibold text-white">Nextgen</span>
            </span>
            <Link
              to="/portfolio"
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#2541d8] px-3.5 font-medium text-white transition-colors hover:bg-[#3050e6]"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Portfólio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
