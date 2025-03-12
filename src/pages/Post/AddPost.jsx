import React from 'react'
import { Suspense, lazy } from "react";
import SkeletonPostForm from "../../components/Skeleton/form";
const PostForm = lazy(() => import("../../components/Post/form"));


function AddPost() {
    return (
        <>
            <title> Add Post </title>
            <Suspense fallback={<SkeletonPostForm />}>
                <PostForm />
            </Suspense>
        </>
    )
}

export default AddPost