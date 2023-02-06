import { Navigation } from "../components/Navbar/Navigation";
import { Tools } from "../components/Tools";

export const TestPage = () => {
  return (
    <div className="main-page ">
      <aside className="navigation-wrapper">
        <Navigation></Navigation>
      </aside>
      <main className="body-wrapper">
        <div className="body-content-wrapper">
          Test
          <Tools />
        </div>
      </main>
    </div>
  );
};
