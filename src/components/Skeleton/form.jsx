import React from 'react'
import Skeleton from '@mui/material/Skeleton';

function SkeletonPostForm() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-106">
                <h3 className="flex items-center justify-center mb-4"> <Skeleton animation="wave" variant="text" width={150} height={25} /></h3>
                <p className="mb-4"> <Skeleton variant="rounded" animation="wave" width={375} height={40} /></p>
                <p className="mb-4"> <Skeleton variant="rounded" animation="wave" width={375} height={60} /></p>
                <p className="mb-4"> <Skeleton variant="rounded" animation="wave" width={375} height={40} /></p>
                <p className="mb-4"> <Skeleton variant="rounded" animation="wave" width={375} height={30} /></p>
            </div>
        </div>
    )
}

export default SkeletonPostForm