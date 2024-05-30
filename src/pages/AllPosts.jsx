import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return ( 
      <div className="min-h-screen bg-base-300">
        <Container>
          <div className="grid grid-cols-2 gap-20 ">
            {posts.map((post) => (
              <div key={post.$id} className="">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
  );
}

export default AllPosts;
