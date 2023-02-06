import { Navigation } from "../components/Navbar/Navigation";
import { Tools } from "../components/Tools";

export const ToolsPage = () => {
  return (
    <div className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <main className="body-wrapper">
        <section className="body-content-wrapper">
          <Tools />
        </section>
      </main>
    </div>
  );
};
