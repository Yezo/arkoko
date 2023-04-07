export const CrystalCounter = ({ crystal }: { crystal: number }) => {
  const gold = "/gold.png"
  const blue = "/bluecrystal.png"

  return (
    <div className="rounded  bg-secondary px-3 py-2 text-[0.845rem] shadow-md ring-1 ring-black/[.15]">
      <span className="flex items-center justify-center  gap-2">
        <span className="flex items-center font-numbers text-[0.9rem] font-medium">
          95
          <img src={blue} alt="blue crystal" className="mb-[0.15rem] w-4" />
        </span>
        /
        <span className="flex items-center font-numbers text-[0.9rem] font-medium ">
          {crystal}
          <img src={gold} alt="gold" className="w-5" />
        </span>
      </span>
    </div>
  )
}
