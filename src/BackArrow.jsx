import {ArrowLeftIcon} from "@heroicons/react/24/solid"

export default function BackArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            aria-label="Go back"
            className="text-white p-2 rounded-full hover:bg-purple-800 transition"
            >
                <ArrowLeftIcon className="h-6 w-6" />
            </button>
    );
}