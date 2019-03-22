import React from 'react';

let url = '';

if (process.env.NODE_ENV === 'development') {
  url = 'http://runebear.com';
}

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={`${url}/wp-content/uploads/2018/05/runebear-logo.png`}
        alt="Runebear Logo"
      />
      <h1>No Bears Found!</h1>
    </div>
  );
};

export default NotFound;
