import React from 'react';

function Poster({ src }) {
  return (
    <div>
      <img src={src} alt="Movie Poster" />
    </div>
  );
}

export default Poster;