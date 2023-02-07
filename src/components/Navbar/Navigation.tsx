import NavigationData from "../../data/NavigationData";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="flex flex-col gap-14 ">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="hidden text-2xl font-bold tracking-tighter text-white lg:block">
          arkoko.
        </h1>
      </Link>

      <nav className="flex flex-col gap-6 text-sm tracking-tight ">
        {NavigationData.map(({ title, link, svg, svg_two }) => (
          <ul key={title}>
            <Link to={link}>
              <li className="flex cursor-pointer items-center gap-2 hover:text-white ">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d={svg} />
                    <path d={svg_two} />
                  </svg>
                </span>
                <span className="hidden lg:inline-block ">{title}</span>
              </li>
            </Link>
          </ul>
        ))}
      </nav>
    </div>
  );
};
