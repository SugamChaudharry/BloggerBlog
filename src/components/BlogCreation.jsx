import React, { useCallback, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ImageIcon,
  ChevronRight,
  Save,
  Plus,
  X,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import RTE from './RET';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';

// Header Component
const Header = ({ onBack, isSidebarOpen }) => (
  <div className={`mb-6 ${!isSidebarOpen ? 'text-center' : ''}`}>
    <button
      type='button'
      onClick={onBack}
      className='text-gray-400 hover:text-gray-300 mb-2 flex items-center'
    >
      <ChevronLeft className='w-5 h-5' />
      {isSidebarOpen && <span className='ml-1'>Back</span>}
    </button>
    {isSidebarOpen && (
      <>
        <h1 className='text-xl font-bold text-gray-100'>Create New Post</h1>
        <p className='text-gray-400 text-sm'>Draft • Last saved 2m ago</p>
      </>
    )}
  </div>
);

// SidebarToggle Component
const SidebarToggle = ({ isSidebarOpen, setSidebarOpen }) => (
  <>
    <span className='absolute sm:hidden text-wrap max-w-36 right-10 top-1 rounded-full p-1.5 z-10'>
      click here
    </span>
    <span className='absolute sm:hidden text-wrap max-w-36 right-4 top-6 rounded-full p-1.5 z-10'>
      to write blog -{`>`}
    </span>
    <button
      type='button'
      onClick={() => setSidebarOpen(!isSidebarOpen)}
      className='absolute -right-4 top-8 bg-gray-600 border-2 border-white rounded-full p-1.5 z-10'
    >
      {isSidebarOpen ? (
        <ChevronLeft size={16} className='-translate-x-1 sm:translate-x-0' />
      ) : (
        <ChevronRight size={16} className='translate-x-1' />
      )}
    </button>
  </>
);

// ImageUpload Component
const ImageUpload = ({
  register,
  errors,
  selectedImage,
  setSelectedImage,
  fileName,
  setFileName,
  post,
}) => (
  <div>
    <label className='block text-sm font-medium text-gray-300 mb-2'>
      Featured Image
    </label>
    <div className='border-2 border-dashed border-gray-600 rounded-lg text-center relative'>
      {selectedImage ? (
        <div className='py-5 flex flex-col items-center'>
          <img
            src={selectedImage}
            alt='Selected'
            className='w-64 h-32 object-cover rounded-lg'
          />
          <p className='text-sm text-gray-300 mt-2'>{fileName}</p>
        </div>
      ) : (
        <div className='py-10'>
          <ImageIcon className='w-8 h-8 mx-auto text-gray-500' />
          <p className='text-sm pt-4 text-gray-400'>
            Drop image or click to browse
          </p>
        </div>
      )}
      <input
        type='file'
        accept='image/png, image/jpg, image/jpeg, image/gif'
        {...register('image', {
          required: post?.featuredImage ? false : 'Image is required',
          validate: (value) => {
            if (post?.featuredImage) return true;
            return value && value.length > 0 ? true : 'Please select a file';
          },
        })}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setFileName(file.name);
          }
        }}
        className='absolute inset-0 opacity-0 cursor-pointer'
      />
      {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>}
    </div>
  </div>
);

// New CategorySelector Component
const CategorySelector = ({ register, errors, setValue, watch }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentCategories, setRecentCategories] = useState([]);
  const [popularityMap, setPopularityMap] = useState({});
  const selectedCategories = watch('categories') || [];
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !selectedCategories.includes(newCategory.trim())
    ) {
      const updatedCategory = newCategory.trim();
      setValue('categories', [...selectedCategories, updatedCategory]);

      // Update recent categories
      const updatedRecent = [
        updatedCategory,
        ...recentCategories.filter((cat) => cat !== updatedCategory),
      ].slice(0, 5);
      setRecentCategories(updatedRecent);

      // Update popularity
      setPopularityMap((prev) => ({
        ...prev,
        [updatedCategory]: (prev[updatedCategory] || 0) + 1,
      }));

      setNewCategory('');
      setIsAdding(false);
      setShowDropdown(false);
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setValue(
      'categories',
      selectedCategories.filter((cat) => cat !== categoryToRemove),
    );
  };

  const getSuggestedCategories = () => {
    const userInput = newCategory.toLowerCase();
    const allCategories = [
      ...new Set([...recentCategories, ...Object.keys(popularityMap)]),
    ];

    return allCategories
      .filter(
        (cat) =>
          cat.toLowerCase().includes(userInput) &&
          !selectedCategories.includes(cat),
      )
      .sort((a, b) => (popularityMap[b] || 0) - (popularityMap[a] || 0))
      .slice(0, 5);
  };

  return (
    <div className='space-y-4'>
      <label className='block text-sm font-medium text-gray-300'>
        Categories
      </label>

      {/* Selected Categories */}
      <div className='flex flex-wrap gap-2 min-h-8'>
        {selectedCategories.map((category) => (
          <span
            key={category}
            className='bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 group hover:bg-gray-600 transition-colors'
          >
            {category}
            <button
              type='button'
              onClick={() => handleRemoveCategory(category)}
              className='text-gray-400 group-hover:text-gray-200 transition-colors'
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Category Input */}
      <div className='relative' ref={dropdownRef}>
        {isAdding ? (
          <div className='flex gap-2'>
            <div className='flex-1 relative'>
              <input
                type='text'
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
                placeholder='Type category name...'
                className='w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 text-sm pr-8'
              />
              <button
                type='button'
                onClick={() => setShowDropdown(!showDropdown)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200'
              >
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <button
              type='button'
              onClick={handleAddCategory}
              className='px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap'
            >
              Add Category
            </button>
            <button
              type='button'
              onClick={() => {
                setIsAdding(false);
                setNewCategory('');
                setShowDropdown(false);
              }}
              className='px-3 py-1.5 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 text-sm'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={() => setIsAdding(true)}
            className='flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm group'
          >
            <Plus
              size={16}
              className='group-hover:rotate-90 transition-transform'
            />
            Add Category
          </button>
        )}

        {/* Dropdown */}
        {showDropdown && isAdding && (
          <div className='absolute mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-10'>
            {getSuggestedCategories().length > 0 ? (
              <>
                {getSuggestedCategories().map((category) => (
                  <button
                    key={category}
                    type='button'
                    onClick={() => {
                      setNewCategory(category);
                      handleAddCategory();
                    }}
                    className='w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center justify-between group'
                  >
                    <span>{category}</span>
                    <span className='text-gray-500 text-xs group-hover:text-gray-300'>
                      used {popularityMap[category]}{' '}
                      {popularityMap[category] === 1 ? 'time' : 'times'}
                    </span>
                  </button>
                ))}
              </>
            ) : (
              <div className='px-4 py-2 text-sm text-gray-500'>
                No matching categories found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden input for form handling */}
      <input
        type='hidden'
        {...register('categories', {
          required: 'At least one category is required',
        })}
      />
      {errors.categories && <p style={{ color: 'red' }}>{errors.categories.message}</p>}
    </div>
  );
};

// FormFields Component
const FormFields = ({ register, errors, setValue, slugTransform, watch }) => (
  <div className='space-y-6'>
    <div>
      <label className='block text-sm font-medium text-gray-300 mb-2'>
        Post Title
      </label>
      <input
        type='text'
        {...register('title', { required: 'title is required' })}
        onChange={(e) => {
          setValue('slug', slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
        placeholder='Enter your post title'
        className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100'
      />
      {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
    </div>

    <div>
      <label className='block text-sm font-medium text-gray-300 mb-2'>
        Description
      </label>
      <textarea
        {...register('description', { required: 'description is required' })}
        placeholder='Brief description of your post'
        rows={3}
        className='w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100'
      />
      {errors.description && (
        <p style={{ color: 'red' }}>{errors.description.message}</p>
      )}
    </div>

    <CategorySelector errors={errors} register={register} setValue={setValue} watch={watch} />
  </div>
);

// Footer Component
const Footer = ({
  setValue,
  handleSubmit,
  submit,
  post,
  appwriteService,
  navigate,
}) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await appwriteService.deletePost(post.$id);
        if (post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        navigate('/');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className='space-y-2'>
      {post ? (
        // Edit mode buttons
        <div className='space-y-2'>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={() => {
                handleSubmit(submit)();
              }}
              className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm'
            >
              Save Changes
            </button>

            {post.PublishStatus ? (
              <button
                type='button'
                onClick={() => {
                  setValue('PublishStatus', false);
                  handleSubmit(submit)();
                }}
                className='flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm'
              >
                Unpublish
              </button>
            ) : (
              <button
                type='button'
                onClick={() => {
                  setValue('PublishStatus', true);
                  handleSubmit(submit)();
                }}
                className='flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm'
              >
                Publish
              </button>
            )}
          </div>
          <button
            type='button'
            onClick={handleDelete}
            className='w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm'
          >
            <Trash2 className='w-4 h-4' />
            Delete Post
          </button>
        </div>
      ) : (
        // Create mode buttons
        <div className='space-y-2'>
          <button
            type='button'
            onClick={() => {
              setValue('PublishStatus', true);
              handleSubmit(submit)();
            }}
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center'
          >
            Publish
          </button>
          <button
            type='button'
            onClick={() => {
              setValue('PublishStatus', false);
              handleSubmit(submit)();
            }}
            className='w-full px-4 py-2 text-gray-400 hover:text-gray-300 flex items-center justify-center'
          >
            <Save className='w-4 h-4 mr-2' />
            Save Draft
          </button>
        </div>
      )}
    </div>
  );
};

// Main BlogCreation Component
const BlogCreation = ({ onBack, post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      description: post?.description || '',
      slug: post?.slug || '',
      categories: post?.categories || [],
      PublishStatus: post?.PublishStatus || false,
    },
  });

  const [selectedImage, setSelectedImage] = useState(
    post?.featuredImage
      ? appwriteService.getFilePreview(post.featuredImage)
      : null,
  );
  const [fileName, setFileName] = useState(post?.featuredImage || '');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value) {
      return value.replace(/[^a-zA-Z\d]+/g, '-').toLowerCase();
    }
    return '';
  }, []);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/blog/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/blog/${dbPost.$id}`);
        }
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isFormDirty) {
        const message =
          'You have unsaved changes. Are you sure you want to leave?';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isFormDirty]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      onChange={() => setIsFormDirty(true)}
      className='bg-gradient-to-tr min-h-screen text-white from-gray-800 to-gray-900 flex overflow-x-hidden'
    >
      <div
        className={`${isSidebarOpen ? 'w-full sm:w-[30%]' : 'w-0'
          } border-r border-gray-700 flex flex-col transition-all duration-300 ease-in-out relative`}
      >
        <SidebarToggle
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div
          className={`${isSidebarOpen ? 'px-6 py-4' : 'px-3 py-4'} flex-1 overflow-y-auto`}
        >
          <Header
            onBack={onBack}
            isSidebarOpen={isSidebarOpen}
            isEditMode={!!post}
          />

          {isSidebarOpen && (
            <>
              <FormFields
                register={register}
                errors={errors}
                setValue={setValue}
                slugTransform={slugTransform}
                watch={watch}
              />
              <ImageUpload
                register={register}
                errors={errors}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                fileName={fileName}
                setFileName={setFileName}
                post={post}
              />
            </>
          )}
        </div>

        {isSidebarOpen && (
          <div className='border-t border-gray-700 p-4'>
            <Footer
              setValue={setValue}
              handleSubmit={handleSubmit}
              submit={submit}
              post={post}
              appwriteService={appwriteService}
              navigate={navigate}
            />
          </div>
        )}
      </div>

      <div className='flex-1'>
        <div className={`${isSidebarOpen ? 'w-0 sm:w-full' : ''}`}>
          <RTE
            name='content'
            control={control}
            defaultValue={getValues('content')}
          />
        </div>
      </div>
    </form>
  );
};

export default BlogCreation;
