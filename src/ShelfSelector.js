import React from 'react';

export default function ShelfSelector(props){
    const changeShelf = (e)=> {
        props.onChangeShelf(props.book, e.target.value);
    }
    return (
        <div className="book-shelf-changer">
            <select value = {props.selectedShelf} onChange={changeShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}