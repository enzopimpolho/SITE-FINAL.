import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-fog-50" aria-label="Nextgen — página inicial">
      <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="10" fill="#2f5bff" />
        <path d="M18 44V20h5.2l17.6 18.4V20H46v24h-5.2L23.2 25.6V44H18Z" fill="#ffffff" />
      </svg>
      <span className="text-[15px] font-semibold tracking-[0.18em]">NEXTGEN</span>
    </Link>
  );
}
