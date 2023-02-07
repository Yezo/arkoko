type Props = {
  title: string;
  children?: React.ReactNode;
};

export const OrehaSalesRow = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <span>{title}</span>
      </div>

      <div className="flex items-center gap-[0.15rem] font-numbers text-[0.9rem] font-medium ">
        {children}
      </div>
    </div>
  );
};
