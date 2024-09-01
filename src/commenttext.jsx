import React, { useState } from "react";
import sampleprofile from "./sampleprofileimage.jpeg"; // Adjust path if necessary
import "./commenttext.css";

const CommentText = ({ commentText, truncatedText }) => {
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);

  const toggleCommentExpansion = () => {
    setIsCommentExpanded(!isCommentExpanded);
  };

  return (
    <div className="post_user_comments">
      <img src={sampleprofile} alt="Icon" className="profile_image" />
      <div className="comment_content">
        <h3>Username</h3>
        <div className={`comment_text ${isCommentExpanded ? "expanded" : "truncated"}`}>
          {isCommentExpanded ? commentText : truncatedText}
        </div>
        <span className="see_more_text" onClick={toggleCommentExpansion}>
          {isCommentExpanded ? "Show Less" : "See More"}
        </span>
      </div>
    </div>
  );
};

export default CommentText;
