import React from 'react';



const ProcessingFile = () => {
 

 

  return (
    <>
      <div className="container">
      <h2 style={{ fontWeight: 600, fontSize: '30px', textTransform: 'capitalize', color: '#000000' }}>Processing...</h2>
      <div class="progress w-50 my-4">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:'75%'}}></div>
   </div>
   <h2 style={{ fontWeight: 500, fontSize: '18px', textTransform: 'capitalize', color: '#000000' }}>Importing your file...Please wait</h2>
      </div>
    </>
  );
};

export default ProcessingFile;
