import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div className="navbar bg-base-100 shadow-lg px-10">

      <div className="flex-1">

        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          Visitor Manager
        </Link>

      </div>

      <div className="flex gap-3">

        <Link
          to="/"
          className="btn btn-ghost"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="btn btn-primary"
        >
          + Add Visitor
        </Link>

      </div>

    </div>

  );

}

export default Navbar;