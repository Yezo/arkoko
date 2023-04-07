export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full overflow-y-hidden bg-primary pt-5 font-primary text-sm">
      <div className="mx-auto max-w-5xl rounded p-4">{children}</div>
    </main>
  )
}
