import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-fog-50" aria-label="Nextgen — página inicial">
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-accent">
        <svg width="16" height="16" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 44V20h5.2l17.6 18.4V20H46v24h-5.2L23.2 25.6V44H18Z" fill="#ffffff" />
        </svg>
      </span>
      <span className="text-[19px] font-semibold tracking-[-0.02em]">Nextgen</span>
    </Link>
  );
}
