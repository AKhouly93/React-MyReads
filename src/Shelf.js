import React from 'react';
import Book from "./Book";

export default function Shelf (props){
        const books = props.books;
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {books.length === 0 && (<p>This shelf is currently empty. You may mark some books as {`'${props.title}'`}. </p>)}
                {books.length > 0 && 
                                books.map((book)=> <li key={book.id}>
                                <Book book={book} shelf={props.id} onChangeShelf ={props.onChangeShelf}/>
                                </li>)
                }
                </ol>
            </div>
            </div>
        );
}
    