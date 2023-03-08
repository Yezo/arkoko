type Props = {
  title: string;
  children?: React.ReactNode;
  imgURL?: string;
  imgAlt?: string;
};

export const OrehaItemRow = ({ title, children, imgURL, imgAlt }: Props) => {
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span className="flex items-center gap-[0.15rem] font-numbers text-[0.9rem] font-medium ">
        {children}
        <img src={imgURL} alt={imgAlt} className="max-h-[20px]" />
      </span>
    </div>
  );
};
