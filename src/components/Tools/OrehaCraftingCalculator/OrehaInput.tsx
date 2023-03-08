type Props = {
  setter: React.Dispatch<React.SetStateAction<number | undefined>>;
  state: number | undefined;
  title: string;
  maxChar: number;
};

export const OrehaInput = ({ setter, state, title, maxChar }: Props) => {
  function handleValue(e: any) {
    const val = e.target.value;

    if (val.length > maxChar) {
      setter(val.slice(0, maxChar));
    } else {
      setter(parseInt(val));
    }
  }
  return (
    <div className="mb-2 flex basis-1/4 flex-col justify-center gap-2">
      <label htmlFor="num" className="text-[0.85rem] font-bold tracking-normal">
        {title}
      </label>
      <input
        type="number"
        id="num"
        onChange={handleValue}
        value={state}
        className=" min-w-full max-w-fit rounded-lg bg-primary px-3 py-2 text-sm outline-none ring-1 ring-black/[.50] placeholder:text-xs placeholder:italic focus:ring-2 focus:ring-gray-600"
        placeholder="Enter a value..."
      />
    </div>
  );
};
