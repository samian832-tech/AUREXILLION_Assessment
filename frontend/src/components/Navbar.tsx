import { Link, useLocation } from "react-router-dom";

export default function Navbar(){

    const location=useLocation();

    return(

        <nav className="bg-blue-700 text-white shadow">

            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

                <h1 className="text-xl font-bold">

                    Support Ticket Dashboard

                </h1>

                <div className="space-x-5">

                    <Link

                        to="/"

                        className={
                            location.pathname==="/"
                            ? "font-semibold underline"
                            : ""
                        }

                    >
                        Dashboard
                    </Link>

                    <Link

                        to="/create"

                        className={
                            location.pathname==="/create"
                            ? "font-semibold underline"
                            : ""
                        }

                    >
                        Create Ticket
                    </Link>

                </div>

            </div>

        </nav>

    );

}