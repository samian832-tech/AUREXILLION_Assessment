import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-md text-sm transition-colors ${
      location.pathname === path
        ? "bg-indigo-50 text-indigo-700 font-medium"
        : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <h1 className="text-[15px] font-medium text-slate-900">
            Support desk
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/" className={linkClass("/")}>
            Dashboard
          </Link>
          <Link to="/create" className={linkClass("/create")}>
            Create ticket
          </Link>
        </div>
      </div>
    </nav>
  );
}