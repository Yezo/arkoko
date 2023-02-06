import { Engravings } from "../components/EngravingsDB/Engravings";
import { Navigation } from "../components/Navbar/Navigation";

export const DatabasePage = () => {
  return (
    <div className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <main className="body-wrapper">
        <div className="body-content-wrapper">
          <Engravings />
        </div>
      </main>
    </div>
  );
};
