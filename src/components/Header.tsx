import { Link } from "react-router-dom";
import { JSX } from "react";

export const Header = (): JSX.Element => {

  return (
    <header className="header_app">
      <Link to="/" className="header_link">Blog</Link>
      <Link to="/contact" className="header_link">お問い合わせ</Link>
    </header>
  );
}