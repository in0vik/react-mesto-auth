import logoImage from '../images/logo.svg'
// 
function Header() {
  return (
    <header className="header">
      <a href="./" className="link header__link"
        ><img src={logoImage} alt="Логотип Mesto" className="logo logo_place_header"
      /></a>
    </header>
  )
}

export default Header;