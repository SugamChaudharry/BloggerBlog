import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Calendar, Clock, Dice5, Tag } from "lucide-react";

const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          // Extract unique categories from posts
          const allCategories = posts.documents
            .flatMap((post) => post.categories || [])
            .filter(
              (category, index, self) => self.indexOf(category) === index,
            );
          setCategories(allCategories);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.categories?.includes(selectedCategory));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Our Latest Articles
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover insights on React, frontend development, and modern web
            technologies
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-800 rounded-xl h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((blog) => (
              <Link key={blog.$id} to={`/blog/${blog.$id}`}>
                <article className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
                  <img
                    src={appwriteService.getFilePreview(blog.featuredImage)}
                    alt={blog.title}
                    className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.categories?.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded-full"
                        >
                          <Tag className="inline-block w-3 h-3 mr-1" />
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(blog.$createdAt)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-400">
              No posts found in this category.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
