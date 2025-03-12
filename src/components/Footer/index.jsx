import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

function Footer() {
    const location = useLocation();
    const validPaths = useMemo(() => new Set(["/posts", "/add-post", "/edit-post"]), []);

    const currentPath = useMemo(() => {
        const pathSegment = location.pathname.split("/")[1];
        return `/${pathSegment}`;
    }, [location.pathname]);

    if (!validPaths.has(currentPath)) return null;

    return (
        <footer className="bg-gray-900 text-gray-300 py-4 px-6 flex flex-col sm:flex-row items-center justify-between fixed bottom-0 left-0 w-full shadow-lg z-10">
            <a href="#" className="hover:text-white transition-colors duration-300">
                Contact Us
            </a>
            <span className="text-sm sm:text-base">&copy; {new Date().getFullYear()} All rights reserved.</span>
        </footer>
    );
}

export default Footer;
