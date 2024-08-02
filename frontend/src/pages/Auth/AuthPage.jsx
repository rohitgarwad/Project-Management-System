import Auth from "./Auth";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <>
      <div className="page-background">
        <div className="sign">
          <span className="fast-flicker">P</span>roject
          <span className="flicker">M</span>anagement
        </div>
        <Auth />
      </div>
    </>
  );
};

export default AuthPage;
