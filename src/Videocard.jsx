import React, { useState } from "react";
import "./VideoCard.css";
import CommentText from "./commenttext";

const Videocard = ({ video }) => {
  const [playingState, setPlayingState] = useState(true);
  const [isCommentScreenOn, setIsCommentScreenOn] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);

 const handleCommentSection = (e) => {
    e.stopPropagation();
    if (!isCommentScreenOn) {
      setShowIcon(false);
    }
    setIsCommentScreenOn(prevState => !prevState);
  };


  

  const toggleCommentExpansion = () => {
    setIsCommentExpanded(prevState => !prevState);
  };
  
  
  
  const handleVideoClick = (e) => {
    e.stopPropagation();
    if (!isCommentScreenOn) {
      if (playingState) {
        e.currentTarget.pause();
        setPlayingState(false);
      } else {
        e.currentTarget.play();
        setPlayingState(true);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500);
    }
  };
  
  return (
    <div className="video_card">
      <p className="identity_name">{video.name}</p>
      <span>
        <span className="material-symbols-outlined" id="music_icon">music_note</span>
        <marquee className="song_name">Some Song</marquee>
      </span>
        <span
        onClick={handleCommentSection}
        className="material-symbols-outlined"
        id="comment_icon"
      >
        chat
      </span>
      <span className="material-symbols-outlined" id="like_icon">favorite</span>

         <video
        src={video.downloadURL}
        alt="Video"
        className="video_play"
        onClick={handleVideoClick}
        loop
      ></video>
  {showIcon && (
        <div className={`icon ${playingState ? "play_icon" : "pause_icon"} show`}></div>
      )}

      {isCommentScreenOn && (
        <div className="commentsection show">
          <CommentText
            isCommentExpanded={isCommentExpanded}
           
            toggleCommentExpansion={toggleCommentExpansion}
          />
         
          <div className="input_container">  
            <input className="input_text" />
            <button className="comment_post_button">Post</button>
          </div>
          <button className="close-button" onClick={handleCommentSection}>
            &times; {/* Cross symbol */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Videocard;