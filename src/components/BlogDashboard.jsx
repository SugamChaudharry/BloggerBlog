import { Header } from '../components';
import { PenSquare } from 'lucide-react';
import appwriteService from '../appwrite/config';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const BlogDashboard = ({ onCreateNew }) => {
  const navegate = useNavigate();
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  useEffect(() => {
    appwriteService.getUserPosts({ userId: user.$id }).then((data) => {
      if (data) setPosts(data.documents);
    });
  }, [user]);

  const handleEdit = (slug) => {
    navegate(`/edit-blog/${slug}`);
  };
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-bl from-gray-800 to-gray-900 text-gray-100'>
        <div className='max-w-7xl mx-auto p-6'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-2xl font-bold'>Your Blog Posts</h1>
            <button
              onClick={onCreateNew}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center'
            >
              <PenSquare className='w-5 h-5 mr-2' />
              Create New Post
            </button>
          </div>

          {/* Drafts Section */}
          <div className='mb-8'>
            <h2 className='text-xl font-semibold mb-4 text-gray-300'>Drafts</h2>
            <div className='grid gap-4'>
              {posts
                .filter((p) => p.PublishStatus == false)
                .map((post) => (
                  <div
                    key={post.id}
                    className='bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600'
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-medium text-lg mb-1'>
                          {post.title}
                        </h3>
                        <p className='text-sm text-gray-400'>
                          Last edited {post.lastEdited}
                        </p>
                      </div>
                      <Link
                        to={`/edit-blog/${post.$id}`}
                        className='text-blue-400 hover:text-blue-300'
                      >
                        Continue writing
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Published Posts Section */}
          <div>
            <h2 className='text-xl font-semibold mb-4 text-gray-300'>
              Published
            </h2>
            <div className='grid gap-4'>
              {posts
                .filter((p) => p.PublishStatus == true)
                .map((post) => (
                  <div
                    key={post.id}
                    className='bg-gray-800 rounded-lg p-4 border border-gray-700'
                  >
                    <div className='flex justify-between items-start'>
                      <div>
                        <h3 className='font-medium text-lg mb-1'>
                          {post.title}
                        </h3>
                        <p className='text-sm text-gray-400'>
                          Published on {post.publishDate} • {post.views} views
                        </p>
                      </div>
                      <button
                        onClick={() => handleEdit(post.$id)}
                        className='text-blue-400 hover:text-blue-300'
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BlogDashboard;
