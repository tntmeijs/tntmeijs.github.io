import { useState } from "react";
import "./../styles/StartMenu.css";

export default function StartMenu() {
  const [isActive, setIsActive] = useState(false);

  const onStartButtonToggle = () => {
    setIsActive(!isActive);
  };

  const startButtonStyle = "start-button" + (isActive ? " active" : "");

  return (
    <button className={startButtonStyle} onClick={onStartButtonToggle}></button>
  );
}
