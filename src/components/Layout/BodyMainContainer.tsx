export const BodyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-4 min-h-[33rem] rounded-lg bg-secondary p-6 shadow-md ring-1 ring-black/[.15] sm:min-h-[42rem] lg:min-h-[47rem]">
      {children}
    </div>
  )
}
