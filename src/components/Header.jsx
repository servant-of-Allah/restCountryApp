import React, { useState } from "react";
import { BsFillMoonFill, BsMoon } from "react-icons/bs";

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  function handleThemeChange() {
    const root = document.documentElement;
    root.classList.toggle("dark-theme");
    darkTheme ? setDarkTheme(false) : setDarkTheme(true);
  }

  return (
    <header>
      <nav className="app-nav flex section-padding">
        <h2>Where In The World?</h2>

        <div
          className="flex"
          style={{ gap: "10px" }}
          onClick={handleThemeChange}
        >
          {!darkTheme ? (
            <BsMoon className="icon icon-moon" />
          ) : (
            <BsFillMoonFill className="icon icon-moon" />
          )}
          <button type="button">
            {darkTheme ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
