import * as Tooltip from "@radix-ui/react-tooltip"
type Props = {
  tooltipText: string
  url?: string
  children?: React.ReactNode
}

export const Hover = ({ tooltipText, children }: Props) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]will-change-[transform,opacity] hidden select-none rounded-[4px] bg-text px-3  py-2 font-primary text-xs leading-4 text-primary data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade lg:inline-flex lg:max-w-[10rem] lg:flex-wrap"
            sideOffset={5}
            side="right"
          >
            {tooltipText}
            <Tooltip.Arrow className="fill-text" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
