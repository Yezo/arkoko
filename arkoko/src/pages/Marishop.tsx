import { Mari } from "../components/Mari";
import { Navigation } from "../components/Navbar/Navigation";

export const Marishop = () => {
  return (
    <main className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <body className="body-wrapper">
        <div className="body-content-wrapper">
          <Mari />
        </div>
      </body>
    </main>
  );
};
