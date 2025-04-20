import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className="text-white w-10 h-10 p-2 rounded-full hover:bg-purple-800 transition flex items-center justify-center"
    >
      <ArrowLeftIcon className="h-6 w-6" />
    </button>
  );
}
