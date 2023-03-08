export const ErrorMessage = () => {
  return (
    <div className="flex min-h-[40rem] select-none flex-col items-center justify-center gap-2  opacity-80">
      <ConnectionErrorSVG />
      <div className="flex flex-col items-center gap-1">
        <p>It appears there was an error fetching the data.</p>
      </div>
    </div>
  )
}

export const ConnectionErrorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"></path>
      <path d="M8 21h8"></path>
      <path d="M12 17v4"></path>
      <path d="m22 3-5 5"></path>
      <path d="m17 3 5 5"></path>
    </svg>
  )
}
