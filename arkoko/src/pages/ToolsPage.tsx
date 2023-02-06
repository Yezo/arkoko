import { Navigation } from "../components/Navbar/Navigation";
import { Tools } from "../components/Tools";

export const ToolsPage = () => {
  return (
    <main className="main-page">
      <aside className="navigation-wrapper">
        <Navigation />
      </aside>

      <body className="body-wrapper">
        <section className="body-content-wrapper">
          <Tools />
        </section>
      </body>
    </main>
  );
};
