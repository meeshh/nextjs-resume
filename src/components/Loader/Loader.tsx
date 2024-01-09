import React from 'react';

export default function Loader() {
  return (
    <div
      style={{
        zIndex: 2,
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-sky-500" />
    </div>
  );
}
