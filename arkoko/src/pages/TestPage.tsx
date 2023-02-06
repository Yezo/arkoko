import { Navigation } from "../components/Navbar/Navigation";
import { Tools } from "../components/Tools";

export const TestPage = () => {
  return (
    <div className="main-page ">
      <div className="navigation-wrapper">
        <Navigation></Navigation>
      </div>
      <div className="body-wrapper">
        <div className="body-content-wrapper">
          Test
          <Tools />
        </div>
      </div>
    </div>
  );
};
