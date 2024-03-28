import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage,
}) {
  return (
    <Link to={`/post/${$id}`} className='block w-80  shadow-lg rounded-lg overflow-hidden bg-slate-500'>
    <div className='w-full mb-4'>
        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl  w-80 overflow-hidden' />
    </div>
    <h2 className='text-xl font-bold'>{title}</h2>
</Link>

  )
}

export default PostCard