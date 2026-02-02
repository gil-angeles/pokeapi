import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  Icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export default function SidebarNavItem({
  label,
  Icon,
  active = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3
        px-6 py-4
        rounded-xl
        font-extrabold uppercase tracking-tight
        transition-all
        border-2
        cursor-pointer
        ${
          active
            ? "bg-pokedex-yellow text-black border-black"
            : "text-white border-transparent hover:bg-pokedex-deep"
        }
      `}
    >
      <Icon size={20} strokeWidth={2.5} />
      <span>{label}</span>
    </button>
  );
}
