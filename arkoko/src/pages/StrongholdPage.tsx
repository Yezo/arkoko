import { Navigation } from "../components/Navbar/Navigation";
import { Stronghold } from "../components/Stronghold";

export const StrongholdPage = () => {
  return (
    <div className="main-page">
      <div className="navigation-wrapper">
        <Navigation></Navigation>
      </div>
      <div className="body-wrapper">
        <div className="body-content-wrapper">
          <Stronghold />
        </div>
      </div>
    </div>
  );
};
