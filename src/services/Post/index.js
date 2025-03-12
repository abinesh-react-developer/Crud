import axiosInstance from "../../../interceptor";
import { addPost, deletePost, setPosts, updateLoader, updatePost } from "../../store/slice/postSlice";



export const PostListApi = async (dispatch) => {
    try {
        const response = await axiosInstance.get('posts');
       if(response.data){
        dispatch(setPosts(response.data))
        dispatch(updateLoader(false))
        
       }
    } catch (error) {
        dispatch(updateLoader(false))
        console.error('Error fetching jobs: message', error);
    }
}  

export const AddPostApi = async (post,resetForm,dispatch) => {
    try {
        const response = await axiosInstance.post('posts', post);
        if(response.data){
            resetForm();
            dispatch(addPost(response.data))
        }
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

export const GetPostDetailApi = async (id,setPost,navigate) => {  
    try {
        const response = await axiosInstance.get(`posts/${id}`);
        setPost(response.data)
    } catch (error) {
        if(error.status === 404){
            navigate('/404')
        }
        console.error('Error fetching post:', error);
    }
}

export const EditPostApi = async (post,id,resetForm,dispatch) => {
    try {
        const response = await axiosInstance.put(`posts/${id}`, post);
        if(response.data){
            resetForm();
            dispatch(updatePost(response.data))
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

export const DeletePostApi = async (id,dispatch) => {
    try {
        const response = await axiosInstance.delete(`posts/${id}`);
        if(response.data){
            dispatch(deletePost(id))
            dispatch(updateLoader(false))
        }else{
            dispatch(updateLoader(false))
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}