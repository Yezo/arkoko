import { Mari } from "../components/Mari";
import { Navigation } from "../components/Navbar/Navigation";

export const Marishop = () => {
  return (
    <div className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <main className="body-wrapper">
        <div className="body-content-wrapper">
          <Mari />
        </div>
      </main>
    </div>
  );
};
