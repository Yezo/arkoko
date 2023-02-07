type engravingType = {
  engraving: string;
  imageURL: string;
  levelOne: string;
  levelTwo: string;
  levelThree: string;
  isClassEngraving: boolean;
  belongsToClass?: string;
  _id: string;
};

type Props = {
  engravingData?: engravingType[] | null;
  modal: string | null;
};

export const EngravingModal = ({ engravingData, modal }: Props) => {
  let ENGRAVING = engravingData?.find((item) => item.engraving === modal);
  return (
    <>
      {ENGRAVING && (
        <div className="flex flex-row gap-2 ">
          {/* LEFT SIDE CONTAINER */}
          <div className="flex min-h-[9rem] basis-1/5 flex-col items-center justify-center gap-3  rounded-md bg-primary p-3 tracking-tight ring-1 ring-black/[.30]">
            {/* LEFT SIDE IMAGE */}

            <div>
              <img
                src={ENGRAVING.imageURL}
                className="max-w-[50px] rounded-full ring-1 ring-black/[.40]"
              ></img>
            </div>
            {/* LEFT SIDE ENGRAVING TITLE */}
            <div className="">
              <div className="flex flex-wrap items-center justify-center rounded-md bg-secondary py-1 px-3 text-[0.75rem] font-bold text-white ring-1 ring-black/[.15]">
                {ENGRAVING.engraving}
              </div>
              {/* LEFT SIDE ENGRAVING CLASS */}
            </div>
          </div>

          {/* RIGHT SIDE CONTAINER*/}
          <div className="basis-4/5 text-[0.825rem]">
            <span className="flex min-h-[9rem] flex-col justify-center gap-3 rounded-md bg-primary px-5 py-2 tracking-tight  ring-1 ring-black/[.30]">
              <span className="flex items-center gap-2">
                <span className="inline-flex min-w-[3rem] items-center justify-center rounded-md bg-secondary px-2 py-[0.10rem] font-bold text-white ring-1 ring-black/[.15]">
                  Lv.1
                </span>
                {ENGRAVING.levelOne}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-flex min-w-[3rem] items-center justify-center rounded-md bg-secondary px-2 py-[0.10rem] font-bold text-white ring-1 ring-black/[.15]">
                  Lv.2
                </span>
                {ENGRAVING.levelTwo}
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-flex min-w-[3rem] items-center justify-center rounded-md bg-secondary px-2 py-[0.10rem] font-bold text-white ring-1 ring-black/[.15]">
                  Lv.3
                </span>
                {ENGRAVING.levelThree}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};
