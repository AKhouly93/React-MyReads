import React from "react";
import ShelfSelector from "./ShelfSelector";
export default function Book (props) {
  const shelf = props.shelf ? props.shelf : 'none'; // if there is a shelf passed as a prop asign it otherwise assign none.
  const book = props.book;
  const authors = 'authors' in book ? book.authors.join("- ")  : "Unknown Author"; //checking authors list
  const thumbnail = 'imageLinks' in book  ? book.imageLinks.thumbnail :  "https://i.ibb.co/grTgbyd/default-Thumbnail.png"; // default thumbnail if book has none
  return (
      <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${thumbnail})`}}></div>
              <ShelfSelector selectedShelf={shelf} book={book} onChangeShelf ={props.onChangeShelf}/>
            </div>
          <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
  );
}
