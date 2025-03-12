import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonHoc from "../common/Button";
import { useSelector } from "react-redux";
import ConfirmModal from "../common/Modal/ConfirmModal";
import { useState, useMemo } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const username = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        setOpen(false);
    };

    const Button = ButtonHoc((props) => <button {...props} />);


    const isPathValid = useMemo(() => {
        const validPaths = ["posts", "add-post", "edit-post"];
        return validPaths.some(path => location.pathname.startsWith(`/${path}`));
    }, [location.pathname]);

    if (!isPathValid) return null;

    return (
        <>

            <header className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
                <nav className="mx-auto max-w-screen-2xl flex items-center justify-between p-4">
                    <Link to="/posts" className="text-2xl font-bold text-black">Logo</Link>
                    <div className="hidden lg:flex items-center gap-6">
                        <Link to="/add-post" className="text-black text-sm p-2 border btn border-dark rounded font-semibold leading-6 text-dark hover:bg-slate-100"
                        >
                            + Add New Post
                        </Link>

                        <div className="relative group">
                            <button className="flex items-center gap-x-2 text-sm font-semibold text-black focus:outline-none">
                                {username}
                            </button>
                            <div className="absolute  right-0 bg-white shadow-lg rounded-md hidden group-hover:block w-48">
                                <div className="p-4 border-b">
                                    <p className="text-sm font-semibold">{username}</p>
                                </div>

                                <Button onClick={() => setOpen(true)} className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100">
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="lg:hidden text-gray-700 hover:text-blue-600"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>

                    {menuOpen && (
                        <nav className="lg:hidden bg-white border-t shadow-sm absolute w-full left-0 top-16">

                            <div className="p-4 ">
                                <p className="text-sm font-semibold">{username}</p>
                            </div>
                            <Link to="/add-post" onClick={() => setMenuOpen(false)}  className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                            >
                                + Add New Post
                            </Link>
                            <Button onClick={() => {setOpen(true);setMenuOpen(false)}} className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100">
                                Logout
                            </Button>

                        </nav>
                    )}
                </nav>
            </header>


            <ConfirmModal
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={handleLogout}
                title="Logout Confirmation"
                message="Are you sure you want to logout?"
            />
        </>
    );
}
