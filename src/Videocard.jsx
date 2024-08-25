import React, { useState } from "react";
import "./VideoCard.css";
import vid from "./SampleVideo.mp4";

const VideoCard = () => {
  const [playingState, setPlayingState] = useState(true);
  const [iscommentscreenon, setiscommentscreenon] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const handlecommentsection = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!iscommentscreenon) {
      // Pause video when comment section is opened
      setPlayingState(false);
      setShowIcon(false); // Hide the play/pause icon when comment section is opened
    }
    setiscommentscreenon(prevState => !prevState);
  };

  const handleVideoClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!iscommentscreenon) { // Only toggle video play/pause if comment section is not visible
      if (playingState) {
        e.currentTarget.pause();
        setPlayingState(false);
      } else {
        e.currentTarget.play();
        setPlayingState(true);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500); // Hide icon after 0.5 seconds
    }
  };

  const handleCloseCommentSection = () => {
    setiscommentscreenon(false);
    if (!playingState) { // Resume video if it was paused
      document.querySelector('.video_play').play();
      setPlayingState(true);
    }
  };

  return (
    <div className={`video_card ${iscommentscreenon ? 'no-interaction' : ''}`}>
      <p className="identity_name">Fake User</p>
      <span>
        <span className="material-symbols-outlined" id="music_icon">music_note</span>
        <marquee className="song_name">Some Song</marquee>
      </span>
      <span
        onClick={handlecommentsection}
        className="material-symbols-outlined"
        id="comment_icon"
      >
        chat
      </span>
      <span className="material-symbols-outlined" id="like_icon">favorite</span>

      <video
        src={vid}
        alt="Video"
        className="video_play"
        onClick={handleVideoClick}
        loop
      ></video>

      {showIcon && (
        <div className={`icon ${playingState ? "play_icon" : "pause_icon"} show`}></div>
      )}

      {iscommentscreenon && (
        <div className="commentsection show">
          <button className="close-button" onClick={handleCloseCommentSection}>
            &times; {/* Cross symbol */}
          </button>
          Comment Section
        </div>
      )}
    </div>
  );
};

export default VideoCard;
