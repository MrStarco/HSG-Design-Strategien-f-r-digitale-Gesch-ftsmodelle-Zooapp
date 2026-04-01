import { Home, Map } from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Zuhause", icon: Home },
  { to: "/map", label: "Zoo-Karte", icon: Map },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          <item.icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
