import React, { useState, useCallback } from "react";
import ButtonHoc from "../common/Button";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../common/Modal/ConfirmModal";
import { DeletePostApi } from "../../services/Post";
import { useDispatch } from "react-redux";
import { updateLoader } from "../../store/slice/postSlice";

const Post = ({ posts }) => {

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Button = ButtonHoc((props) => <button {...props} />);

    const handleEdit = useCallback((id) => navigate(`/edit-post/${id}`), [navigate]);

    const handleDelete = useCallback(async () => {
        if (!selectedPostId) return;
        try {
            dispatch(updateLoader(true))
            await DeletePostApi(selectedPostId,dispatch);
        } catch (error) {
            console.error("Failed to delete post:", error);
        } finally {
            setConfirmOpen(false);
        }
    }, [selectedPostId,]);

    return (
        <>
            <div className="space-y-4">
                {posts.length > 0 ? (
                    posts.map(({ id, title, body }) => (
                        <div key={id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-bold">{title}</h3>
                            <p>{body}</p>
                            <div className="mt-2 flex gap-2">
                                <Button onClick={() => handleEdit(id)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                    Edit
                                </Button>
                                <Button 
                                    onClick={() => { setConfirmOpen(true); setSelectedPostId(id); }} 
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    disabled={confirmOpen}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available.</p>
                )}
            </div>
            

            <ConfirmModal
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={handleDelete}
                title="Delete Confirmation"
                message="Are you sure you want to delete this post?"
            />
        </>
    );
};

export default Post;
