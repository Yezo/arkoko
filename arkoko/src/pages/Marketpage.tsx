import { Market } from "../components/Market";
import { Navigation } from "../components/Navbar/Navigation";

export const Marketpage = () => {
  return (
    <main className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <body className="body-wrapper">
        <div className="body-content-wrapper">
          <Market />
        </div>
      </body>
    </main>
  );
};
