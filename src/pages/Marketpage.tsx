import { Market } from "../components/Market";
import { Navigation } from "../components/Navbar/Navigation";

export const Marketpage = () => {
  return (
    <div className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <main className="body-wrapper">
        <div className="body-content-wrapper">
          <Market />
        </div>
      </main>
    </div>
  );
};
