export default function PageFooter({children}) {
    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-2 min-h-[120px]">
        {children}
        </div>
    )
}