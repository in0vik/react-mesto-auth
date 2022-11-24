import logoImage from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({ currentUserEmail, loggedIn, loggedOut }) {
  return (
    <header className="header">
      <a href="./" className="link header__link">
        <img src={logoImage} alt="Логотип Mesto" className="logo logo_place_header" />
      </a>

      <nav className="header__login-container">
        <p className="header__email">{currentUserEmail}</p>
        <Switch>
          <Route path="/sign-in">
            {!loggedIn && (
                <Link to="/sign-up" className="link button header__login-btn">
                  Регистрация
                </Link>
              )}
          </Route>
          <Route path="/">
            {loggedIn ? (
              <Link to="/sign-in" onClick={loggedOut} className="link button header__login-btn">
                Выйти
              </Link>
            ) : (
              <Link to="/sign-in" className="link button header__login-btn">
                Войти
              </Link>
            )}
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
