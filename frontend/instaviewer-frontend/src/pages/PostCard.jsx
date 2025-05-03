import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, TextField, Button } from "@mui/material";

const PostCard = ({ post }) => {
  const [reply, setReply] = useState("");

  const handleReply = (commentId) => {
    console.log("Replying to comment", commentId, reply);
    setReply("");
  };

  return (
    <Card className="mb-4">
      <CardMedia
        component="img"
        image={post.image}
        alt="Post image"
        className="rounded-t"
      />
      <CardContent>
        <Typography variant="h6">@{post.user}</Typography>
        <Typography variant="body2">{post.caption}</Typography>
        <div className="mt-2">
          {post.comments.map((comment) => (
            <div key={comment.id} className="my-2">
              <Typography variant="body2">
                <strong>@{comment.user}</strong>: {comment.text}
              </Typography>
              <div className="flex gap-2 items-center mt-1">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder={`Reply to @${comment.user}`}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
                <Button variant="contained" onClick={() => handleReply(comment.id)}>
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;