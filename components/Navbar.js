import Link from "next/link";
import { useContext, useState } from "react";
import { FirebaseContext } from "../logic/context";
import style from "../styles/Navbar.module.scss";

function Navbar() {
  // --------------CONTEXT------------//
  const { userStatus, signUserOut } = useContext(FirebaseContext);

  const LoggedOutLinks = () => {
    return (
      <>
        <li className={style.login_link}>
          <Link href="/login">Login</Link>
        </li>
      </>
    );
  };

  const LoggedInLinks = () => {
    return (
      <>
        <li>
          <Link href="savedLinks">Saved urls</Link>
        </li>
        <li onClick={signUserOut}>
          <Link href="/">Log out</Link>
        </li>
      </>
    );
  };

  // NAVBAR STATE
  const [show, setShow] = useState(false);

  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <span>Lil Link</span>
      </div>
      <div className={style.menu_btn} onClick={() => setShow(!show)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* TODO: install classNames so we can use cx() to set multiple classes 
      // show ? style.show : show.hide */}
      <ul className={style.nav_links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* if user is signed in, show logged in links and if user
        is signed out show logged out links */}
        {userStatus ? <LoggedInLinks /> : <LoggedOutLinks />}
      </ul>
    </nav>
  );
}

export default Navbar;
