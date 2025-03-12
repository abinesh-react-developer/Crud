import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { lowerPresent, numPresent, specialPresent, upperPresent } from "../../utilities/regex";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/slice/userSlice";
import { PostListApi } from "../../services/Post";
import { updateLoader } from "../../store/slice/postSlice";

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passwordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    const validate = () => {
        let isValid = true;
        let errors = [];

        if (!formData.username.trim()) {
            setError("Username is required");
            usernameRef.current?.focus();
            isValid = false;
        } else {
            setError("");
        }

        if (!formData.password) {
            setPasswordError("Enter your password");
            passwordRef.current?.focus();
            isValid = false;
        } else {
            let errorSet = new Set();

            if (!upperPresent(formData.password)) errorSet.add("Must contain at least 1 uppercase letter");
            if (!numPresent(formData.password)) errorSet.add("Must contain at least 1 number");
            if (!lowerPresent(formData.password)) errorSet.add("Must contain at least 1 lowercase letter");
            if (!specialPresent(formData.password)) errorSet.add("Must contain at least 1 special character");
            if (formData.password.length < 6) errorSet.add("Must be at least 6 characters long");

            errors = Array.from(errorSet);
            setPasswordErrors(errors);

            if (errors.length > 0) {
                setPasswordError("");
                isValid = false;
            } else {
                setPasswordError("");
            }
        }

        return isValid;
    };

    useEffect(() => {
        if (submitAttempted) {
            validate();
        }
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        if (validate()) {
            
            dispatch(updateLoader(true))
            PostListApi(dispatch)
            localStorage.setItem("token", formData.username + formData.password);
            dispatch(setUserName(formData.username));
            navigate("/posts");
        }
    };

    if (localStorage.getItem("token")) {
        return <Navigate to="/posts" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            ref={usernameRef}
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your username"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>

                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            ref={passwordRef}
                            type={passwordShow ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                        />
                        <a
                            className="cursor-pointer absolute top-9 right-3 text-sm font-medium text-gray-500"
                            onClick={() => setPasswordShow(!passwordShow)}
                        >
                            {passwordShow ? "Hide" : "Show"}
                        </a>
                        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

                        {submitAttempted && formData.password && passwordErrors.length > 0 && (
                            <ul className="mt-2 text-xs text-gray-600 list-disc ps-7 space-y-1">
                                {passwordErrors.map((err, index) => (
                                    <li key={index} className={passwordErrors.includes(err) ? "text-red-500" : "text-green-500"}>
                                        {err}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
