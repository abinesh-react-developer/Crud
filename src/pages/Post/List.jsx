import Post from "../../components/Post/List";
import SkeletonPostList from "../../components/Skeleton/PostList";
import { useSelector } from "react-redux";

const PostList = () => {

    const posts = useSelector((state) => state?.posts?.posts);
    const loading = useSelector((state) => state.posts.loader);
console.log(posts,"list")
    return (
        <>
            <title>Post List</title>
            <main className="flex-1 overflow-y-auto p-4 bg-gray-100 mt-16 mb-16">
                {loading ? <SkeletonPostList /> : <Post posts={posts}  />}
            </main>
        </>
    );
};

export default PostList;
