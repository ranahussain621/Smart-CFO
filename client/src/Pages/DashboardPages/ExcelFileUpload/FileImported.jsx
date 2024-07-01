import React from 'react';

const FileImported = ({ selectedFile }) => {
  const size = selectedFile ? `(${selectedFile.size} KB)` : '';
  
  return (
    <>
      <div className="container px-0" style={{ minHeight: 230, background: '#8DD7CE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ fontWeight: 600, fontSize: '30px', color: '#000000' }}>{selectedFile?.name} {size}</h2>
      </div>
    </>
  );
};

export default FileImported;
