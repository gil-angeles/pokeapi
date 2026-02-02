import { PlusCircle } from "lucide-react";

type Props = {
  onClick?: () => void;
};

export default function LoadMoreButton({ onClick }: Props) {
  return (
    <div className="mt-16 flex justify-center pb-8">
      <button
        type="button"
        onClick={onClick}
        className="
          flex items-center gap-3
          px-12 py-4
          bg-pokedex-red
          text-white
          rounded-2xl
          font-black
          uppercase
          tracking-widest
          text-sm
          border-b-4
          border-pokedex-deep
          shadow-xl
          transition-all
          cursor-pointer
          hover:brightness-110
          active:translate-y-1
          active:border-b-0
        "
      >
        <PlusCircle size={20} strokeWidth={2.5} />
        <span>Load More Pokémon</span>
      </button>
    </div>
  );
}
