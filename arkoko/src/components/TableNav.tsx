type Props = {
  title: string;
  children?: any;
};

export const TableNav = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-between ">
      <span className="text-2xl font-bold tracking-tighter">{title}</span>
      <span className="flex items-center justify-between gap-x-3 ">
        {children}
      </span>
    </div>
  );
};
