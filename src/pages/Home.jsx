import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero min-h-screen bg-base-300">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
          Explore our community of writers and readers. Create your blog or dive into endless content now.
          </p>
          <Link to="all-posts">
          <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
