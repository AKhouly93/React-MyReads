import React from "react";
import { Link } from 'react-router-dom'
import { useState } from "react/cjs/react.development";
import Book from "./Book";
import * as BooksAPI from './BooksAPI'
export default function SearchPage(props){  
    const [searchResults, setSearchResults] = useState([]);
    const booksInApp = props.booksInApp;
    const [query, setQuery] = useState("");

    const searchForBook = (query)=>{        
        BooksAPI.search(query).then((data)=>{
            if (data && data.length > 0){
                for (let i = 0; i < booksInApp.length; i++){
                    for (let j = 0; j <data.length; j++){
                        if (data[j].id === booksInApp[i].id)
                        {
                            data[j].shelf = booksInApp[i].shelf;
                        }
                    }
                }
            }
            setSearchResults(data);      
        })
    };
    
    //function for updating query state and validating it.
    const updateQuery = (query) =>{
        setQuery(query);
        if (query.trim() === "")
        {
            setSearchResults([]);
        }
        else{
            searchForBook(query);
        }
    };
    
    const onChangeShelf = (book, newShelf)=>{
        props.onChangeShelf(book, newShelf);
        setSearchResults(
            searchResults.map((b)=>{
                if (b.id === book.id)
                {
                    b.shelf = newShelf;
                }
                return b;
            })
        );
    }
    
    return (
        <div className="search-books">
            <div className="search-books-bar">
                {/* Link to the homepage */}
                <Link to="/">
                <button className="close-search">Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text" 
                        placeholder="Search by title or author"
                        value = {query}
                        onChange ={(e)=>{updateQuery(e.target.value)}}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults && searchResults.length > 0 && 
                        searchResults.map((book)=>{
                            return (
                                <li 
                                    key={book.id}>
                                    <Book 
                                        book={book}
                                        shelf={book.shelf}
                                        onChangeShelf ={onChangeShelf}
                                    /> 
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    );
}