import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts([
      {
        id: 1,
        user: "smriti_jojo",
        image: "https://picsum.photos/seed/1/500",
        caption: "Beautiful sunset 🌅",
        comments: [
          { id: 1, user: "alex", text: "Wow!" },
          { id: 2, user: "mia", text: "Stunning shot!" },
        ],
      },
    ]);
  }, []);

  return (
    <div className="p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
