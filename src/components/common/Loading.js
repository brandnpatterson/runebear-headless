import React from 'react';

let Loading = () => {
  return (
    <div
      className="loading"
      style={{
        marginTop: '250px',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center'
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
};

export default Loading;
