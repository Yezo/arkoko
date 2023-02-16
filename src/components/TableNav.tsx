type Props = {
  title: string;
  children?: any;
};

export const TableNav = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between ">
      <span className="text-2xl font-bold tracking-tighter">{title}</span>
      <span className="flex max-w-fit flex-col gap-3 md:flex-row md:items-center md:justify-between ">
        {children}
      </span>
    </div>
  );
};
