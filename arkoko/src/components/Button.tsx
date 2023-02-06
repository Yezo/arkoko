type Props = {
  title: string;
  categorySetter: React.Dispatch<React.SetStateAction<string>>;
};

export const Button = ({ title, categorySetter }: Props) => {
  function handleCategorySelect(e: React.MouseEvent<Element>) {
    const target = e.target as HTMLButtonElement;
    target.textContent && categorySetter(target.textContent);
  }
  return (
    <button
      className="flex min-w-[5rem] items-center justify-center rounded bg-primary px-3 py-2 text-[0.845rem] ring-1 ring-black/[.40] transition-all hover:bg-text hover:text-primary"
      onClick={handleCategorySelect}
    >
      {title}
    </button>
  );
};
