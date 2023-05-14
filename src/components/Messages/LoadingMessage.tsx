//Uncomment the extra text if you downgrade the API hosting plan back to free-tier
export const LoadingMessage = () => {
  return (
    <div className="flex min-h-[40rem] select-none flex-col items-center justify-center gap-8  bg-secondary opacity-80">
      <LoadingSpinnerSVG />
      <div className="flex flex-col items-center gap-1 text-center ">
        {/* <p>One moment while we fetch the data...</p>
        <p>It can take up to 15-30 seconds for the initial load.</p> */}
      </div>
    </div>
  )
}

export const LoadingSpinnerSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
    </svg>
  )
}
