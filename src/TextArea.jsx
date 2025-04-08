export default function TextArea({ value, onChange, placeholder = "Enter your situation"}) {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full p-4 text-base text-white placeholder-gray-400 bg-p[1a1a1a] border border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus-ring-purple-400 focus:border-transparent resize-none shadow-sm transition-all duration-200"
        />
    );
}