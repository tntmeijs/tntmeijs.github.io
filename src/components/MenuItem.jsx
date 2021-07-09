import "./../styles/MenuItem.css";

export default function MenuItem(props) {
  if (!props.title) {
    return null;
  }

  return (
    <div className="menu-item">
      <img />
      <span>{props.title}</span>
    </div>
  );
}
