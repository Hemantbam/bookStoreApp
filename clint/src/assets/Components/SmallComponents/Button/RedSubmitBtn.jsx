import React from 'react';
import './redSubmitButton.css';

function RedSubmitBtn({ btnName, onClick }) {
  return (
    <div className='redSubmitButton'>
      <button onClick={onClick}>{btnName}</button> 
    </div>
  );
}

export default RedSubmitBtn;
