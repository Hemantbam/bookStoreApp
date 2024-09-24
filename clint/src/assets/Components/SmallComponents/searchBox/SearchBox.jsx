import React from 'react'
import './SearchBox.css'
function SearchBox() {
  return (
    <>
      <div className="inputBox">
        <img src="./Images/search.png" alt="search Icon" />
        <input type="text" placeholder='Search Book Here' />
      </div>
    </>
  )
}

export default SearchBox
