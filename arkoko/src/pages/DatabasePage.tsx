import { Engravings } from "../components/EngravingsDB/Engravings";
import { Navigation } from "../components/Navbar/Navigation";

export const DatabasePage = () => {
  return (
    <main className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <body className="body-wrapper">
        <div className="body-content-wrapper">
          <Engravings />
        </div>
      </body>
    </main>
  );
};
