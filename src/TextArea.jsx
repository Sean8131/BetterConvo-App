// Import React hooks for referencing the DOM and running effects
import { useRef, useEffect } from 'react';

// This component renders a styled <textarea> that auto-expands as the user types
export default function TextArea({ value, onChange, placeholder = "Enter your situation"}) {

    // Create a reference to the textarea DOM element
    const textareaRef = useRef(null);

    // Run this effect whenever the value of the textarea changes
    useEffect(() => {
        if (textareaRef.current) {
            // Reset the height to auto so shrinking works properly (e.g when deleting text)
            textareaRef.current.style.height = "auto";

            // Set the height to match the scroll height so it fills the content
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]); // Re-run this effect only when 'value' changes
    return (
        <textarea
            ref={textareaRef} // Attach the ref to access the DOM element
            placeholder={placeholder} // Show hint text when empty
            value={value} // Controlled input: textarea content comes from React state
            onChange={onChange} // Trigger parent handler when user types
            rows={4} // Start with 1 visible row
            className="w-full p-4 text-base text-gray-200 placeholder-gray-400 border border-[F8C77E] rounded-xl focus:outline-none focus:ring-2  focus:border-transparent resize-none shadow-sm transition-all duration-200 overflow-hidden"
        />
    );
}