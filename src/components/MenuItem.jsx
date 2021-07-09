import "./../styles/MenuItem.css";

export default function MenuItem(props) {
  if (!props.title) {
    return null;
  }

  return (
    <div className="menu-item">
      <span>{props.title}</span>
      {props.expand ? <div className="expand-arrow"></div> : null}
    </div>
  );
}
