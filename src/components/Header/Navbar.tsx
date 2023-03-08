import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="flex w-full flex-col flex-wrap items-center justify-center gap-4  py-3 font-primary text-sm tracking-tight text-text sm:flex-row sm:justify-between sm:px-10 lg:px-40">
      <h1 className="text-2xl font-bold tracking-tighter transition-colors hover:text-accent ">
        <Link to="/">
          arkoko<span className="text-accent">.</span>
        </Link>
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-1 md:justify-center md:gap-10">
        <NavigationMenu.Root className="relative z-[1] flex justify-center font-primary  text-text">
          <NavigationMenu.List className="flex items-center justify-center gap-4 py-2 ">
            {/* First Link */}
            <NavigationMenu.Item>
              <Link
                to="/marketplace"
                className="relative block select-none text-sm tracking-tight text-text outline-none before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition hover:before:scale-100"
              >
                <span>Marketplace</span>
              </Link>
            </NavigationMenu.Item>

            {/* Second Link */}
            <NavigationMenu.Item>
              <Link
                to="/marishop"
                className="relative block select-none text-sm tracking-tight text-text outline-none before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition hover:before:scale-100"
              >
                <span>Mari's Shop</span>
              </Link>
            </NavigationMenu.Item>

            {/* ThirdLink */}
            <NavigationMenu.Item>
              <Link
                to="/guides"
                className="relative block select-none text-sm tracking-tight text-text outline-none before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition hover:before:scale-100"
              >
                <span>Guides</span>
              </Link>
            </NavigationMenu.Item>

            {/* FourthLink */}
            <NavigationMenu.Item>
              <Link
                to="/database"
                className="relative block select-none text-sm tracking-tight text-text outline-none before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition hover:before:scale-100"
              >
                <span>Database</span>
              </Link>
            </NavigationMenu.Item>

            {/* Second Link */}
            <NavigationMenu.Item>
              <Link
                to="/tools"
                className="relative block select-none text-sm tracking-tight text-text outline-none before:absolute before:-bottom-1.5 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-accent before:transition hover:before:scale-100"
              >
                <span>Tools</span>
              </Link>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-text" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
            <NavigationMenu.Viewport className="relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>
      </div>
    </nav>
  )
}
