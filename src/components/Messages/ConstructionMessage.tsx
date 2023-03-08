export const UnderConstruction = ({ category }: { category?: string | null }) => {
  return (
    <div className="flex min-h-[40rem] select-none flex-col items-center justify-center gap-2  opacity-80">
      <HammerSVG />
      <div className="flex flex-col items-center gap-1">
        <p>{category ? category : "Unfortunately, this page"} is still under construction. </p>
        <p>Sorry for the inconvenience.</p>
      </div>
    </div>
  )
}

export const HammerSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path>
      <path d="M17.64 15 22 10.64"></path>
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91"></path>
    </svg>
  )
}
