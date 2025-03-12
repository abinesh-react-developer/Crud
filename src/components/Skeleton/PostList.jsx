import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function SkeletonPostList() {
    const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <>
            <div className="space-y-4">
                {posts.map((post, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow">
                        <Skeleton animation="wave" variant="text" width={200} height={25} />
                        <Skeleton animation="wave" variant="text" width={420} height={25} />
                        <div className="flex justify-start gap-2">
                            <Skeleton variant="rounded" animation="wave" width={100} height={25} />
                            <Skeleton variant="rounded" animation="wave" width={100} height={25} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SkeletonPostList