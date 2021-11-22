import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import Shelf from './Shelf';
import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'

export default function BooksApp () {
  const [books, setBooks] = useState([]); 
  //declaring a function that's changes book shelves.
  const changeShelf = (book, newShelf)=> {
    //if the book is already in our in-app book list, we just change its shelf.
    const i = books.findIndex((b)=> b.id === book.id);
    const tempBooks = books;
    if (i > -1){
      tempBooks[i].shelf = newShelf
    }
    else{
      //if book is new (sent from search page) then we change its shelf and add it to our in-app book list.
      book.shelf = newShelf;
      tempBooks.push(book);
    }
    setBooks(tempBooks.filter((book)=> book.shelf !== 'none')); //change in-app book list after removing books that's not shelfed. 
    BooksAPI.update(book,newShelf);
  }
  
  //this runs once (when component is mounted).
  useEffect(()=>{
      BooksAPI.getAll().then((data)=>{
       setBooks(data);
    });
  },[]);
  
    return (
      <div className="app">
        {/*Route is wraped insides Routes tage*/}
        <Routes>
          <Route exact path="/search" element={<SearchPage booksInApp={books} onChangeShelf ={changeShelf}/>}/>
          <Route exact path="/" element={
                  <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {/*Shelf component is created with propes defining its title and books it has besides a function to change its book list*/}
                      <Shelf id={"currentlyReading"} title={"Currently Reading"} books={books.filter((book)=> book.shelf === "currentlyReading")} onChangeShelf ={changeShelf} />
                      <Shelf id={"wantToRead"} title={"Want to Read"} books={books.filter((book)=> book.shelf === "wantToRead")} onChangeShelf ={changeShelf}/>
                      <Shelf id={"read"} title={"Read"} books={books.filter((book)=> book.shelf === "read")} onChangeShelf ={changeShelf}/>
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to="/search">
                    <button>Add a book</button>
                    </Link>
                  </div>
                </div>
          }/>
        </Routes>
      </div>
    )
  
}

