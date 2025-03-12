import { useState, useRef, useEffect } from "react";
import ButtonHoc from "../common/Button";
import { useNavigate } from "react-router-dom";
import { AddPostApi, EditPostApi } from "../../services/Post";
import ConfirmModal from "../common/Modal/ConfirmModal";
import { useDispatch } from "react-redux";

const PostForm = ({ existingPost }) => {
    const [formData, setFormData] = useState({
        title: existingPost?.title || "",
        body: existingPost?.body || "",
        userId: existingPost?.userId?.toString() || "",
    });
    const [errors, setErrors] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const inputRefs = {
        title: useRef(null),
        body: useRef(null),
        userId: useRef(null),
    };

    useEffect(() => {
        inputRefs.title.current?.focus();
    }, []);

    const validate = () => {
        let newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.body.trim()) newErrors.body = "Body is required";
        if (!formData.userId.trim()) {
            newErrors.userId = "User ID is required";
        } else if (!/^[0-9]+$/.test(formData.userId)) {
            newErrors.userId = "User ID must be a number";
        }

        setErrors(newErrors);
        return newErrors;
    };

    useEffect(() => {
        if (submitAttempted) {
            validate();
        }
    }, [formData]);


    const resetForm = () => {
        navigate("/posts");
        setFormData({ title: "", body: "", userId: "" });
        setErrors({});
        setSubmitAttempted(false);
        setOpen(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitAttempted(true);

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            const firstErrorField = Object.keys(newErrors)[0];
            inputRefs[firstErrorField].current?.focus();
            return;
        }

        const newPost = {
            title: formData.title.trim(),
            body: formData.body.trim(),
            userId: parseInt(formData.userId, 10),
        };

        if (existingPost) {
            setOpen(true);
        } else {
            AddPostApi(newPost, resetForm,dispatch);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "userId" ? value.replace(/[^0-9]/g, "") : value,
        }));
    };

    const Button = ButtonHoc((props) => <button {...props} />);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-106">
                    <h3 className="text-xl font-bold mb-4">{existingPost ? "Edit Post" : "Add New Post"}</h3>


                    <input
                        ref={inputRefs.title}
                        type="text"
                        name="title"
                        placeholder="Title"
                        className={`w-full p-2 border mb-2 rounded focus:ring ${
                            errors.title ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                        }`}
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}


                    <textarea
                        ref={inputRefs.body}
                        name="body"
                        placeholder="Body"
                        className={`w-full p-2 border mb-2 rounded focus:ring ${
                            errors.body ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                        }`}
                        value={formData.body}
                        onChange={handleChange}
                    />
                    {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}


                    <input
                        ref={inputRefs.userId}
                        type="text"
                        name="userId"
                        placeholder="User ID"
                        className={`w-full p-2 border mb-2 rounded focus:ring ${
                            errors.userId ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"
                        }`}
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}

        
                    <Button type="submit" className="w-full bg-green-500 text-white py-2">
                        {existingPost ? "Update" : "Submit"}
                    </Button>
                </form>
            </div>

   
            <ConfirmModal
                open={open}
                handleClose={() => setOpen(false)}
                handleConfirm={() => EditPostApi(formData, existingPost.id, resetForm,dispatch)}
                title="Update Confirmation"
                message="Are you sure you want to update this post?"
            />
        </>
    );
};

export default PostForm;
