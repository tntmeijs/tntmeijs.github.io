import { useState } from "react";

import MenuItem from "./MenuItem";
import HorizontalDivider from "./HorizontalDivider";

import "./../styles/StartMenu.css";

import startMenuSideBanner from "./../images/start_menu_side_banner.png";

export default function StartMenu() {
  const [isActive, setIsActive] = useState(false);

  const onStartButtonToggle = () => {
    setIsActive(!isActive);
  };

  const startButtonStyle = "start-button" + (isActive ? " active" : "");

  return (
    <>
      <button
        className={startButtonStyle}
        onClick={onStartButtonToggle}
      ></button>

      {isActive ? (
        <nav className="menu">
          <span className="menu-side-banner">
            <b>Tahar Meijs</b>
            <span>{new Date().getFullYear().toString().substr(2, 4)}</span>
          </span>
          <div className="menu-container">
            <MenuItem title="Contact Me..." />
            <HorizontalDivider />
            <MenuItem title="GitHub Profile" />
            <MenuItem title="Certifications" />
            <MenuItem title="Dev Blog" />
            <MenuItem title="Projects" />
          </div>
        </nav>
      ) : null}
    </>
  );
}
