export const Changelog = () => {
  return (
    <div className="flex max-w-full flex-col gap-5 rounded bg-secondary p-3 text-sm md:p-5 lg:max-h-[15rem] lg:min-h-[15rem] lg:justify-center">
      <h2 className="text-2xl font-bold tracking-tighter">Changelog</h2>

      <ul className="font-numbers">
        <li>
          <span className="font-bold">2023-02-04:</span> Added Stronghold Oreha
          Calculator
        </li>
        <li>
          <span className="font-bold">2023-02-01:</span> Added Raid Bid Split
          Calculator
        </li>
        <li>
          <span className="font-bold">2023-01-28:</span> Added Engravings in
          Database
        </li>
        <li>
          <span className="font-bold">2023-01-22:</span> Added Mari's Shop
        </li>
        <li>
          <span className="font-bold">2023-01-15:</span> Added Marketplace
        </li>
      </ul>
    </div>
  );
};
