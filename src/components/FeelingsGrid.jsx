export default function FeelingsGrid({ feelings, selectedFeelings, onFeelingClick }) {
    return (
      <div className="pb-28 pt-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-w-sm md:max-w-lg mx-auto">
        {feelings.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={(e) => {
              onFeelingClick(label);
              setTimeout(() => e.target.blur(), 0);
            }}
            style={{ WebkitTapHighlightColor: "transparent" }}
            className={`flex flex-col items-center justify-center w-full h-full rounded-xl text-purple-100 border-purple-200 border py-1.5 md:py-2.5  px-2.5 text-sm font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 ${
              selectedFeelings.includes(label) ? "bg-purple-100 text-purple-950" : ""
            }`}
          >
            <span className="text-2xl md:text-4xl mb-1">{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      </div>
    );
  }
  