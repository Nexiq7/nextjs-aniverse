import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  // Set up event handlers
  const onReady = (event) => {
    // Access the player instance
    const player = event.target;


  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  const opts = {
    height: '280',
    width: '498',
    playerVars: {
      color: 'white',
    },

  };

  return (
    <YouTube
      videoId={videoId}
      onReady={onReady}
      onError={onError}
      opts={opts}
    />
  );
};

export default YouTubePlayer;