export default function FeelingsGrid({ feelings, selectedFeelings, onFeelingClick }) {
    return (
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
        {feelings.map((feeling) => (
          <button
            key={feeling}
            onClick={(e) => {
              onFeelingClick(feeling);
              setTimeout(() => e.target.blur(), 0);
            }}
            style={{ WebkitTapHighlightColor: "transparent" }}
            className={`text-purple-100 border-purple-200 rounded-lg border py-2 px-3 text-sm md:text-xl font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 ${
              selectedFeelings.includes(feeling) ? "bg-purple-100 text-purple-950" : ""
            }`}
          >
            {feeling}
          </button>
        ))}
      </div>
    );
  }
  