import React from 'react'
import { ClipLoader } from 'react-spinners';


function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen py-5">
      <ClipLoader color={'#cfd8dc'} loading={true} size={100} />
    </div>
  )
}

export default LoadingSpinner