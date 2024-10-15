import React from 'react'
import './AuthorHighlightBox.css'
function AuthorHighlightBox({name, totalBooks, picture}) {
    return (
        <div className='highlightBox'>
            <span className='highlightText'>Author of the Week</span>
            <div className="authorDetailsBox">
                <span className='authorName'>{name}</span>
                <span className='totalBooks'>Total Books : {totalBooks}</span>
                <img src={picture} alt="" />
            </div>
        </div>
    )
}

export default AuthorHighlightBox
