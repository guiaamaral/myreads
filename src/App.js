import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Header from './components/Header'
import Shelf from './components/Shelf'
import AddBook from './components/AddBook'
import PropType from 'prop-types'

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = ( addBook, toShelf ) => {
    BooksAPI.update(addBook, toShelf).then((response) =>{
      addBook.shelf = toShelf

      var newBook = this.state.books.filter( book => book.id !== addBook.id )

      newBook.push(newBook);
      this.setState({ books: newBook })
    })
  }

  render() {

    const shelves = [
      {
        id: "currentlyReading",
        title: "Currently Reading"
      },
      {
        id: "wantToRead",
        title: "Want To Read"
      },
      {
        id: "read",
        title: "Read"
      }
    ]

    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <Header />
            <div className="list-books-content">
              { shelves.map((shelf) => (
                <Shelf
                  key={ shelf.id }
                  shelfId={ shelf.id }
                  shelfTitle={ shelf.title }
                  books={ this.state.books }
                  changeShelf={ this.changeShelf }
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/add-book">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/add-book" render={()=>(
          <AddBook
            changeShelf={ this.changeShelf }
          />
        )} />
      </div>
    )
  }
}

BooksApp.propType = {
  BooksAPI: PropType.object.isRequired
};

export default BooksApp
