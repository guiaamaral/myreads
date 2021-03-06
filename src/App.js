import React from 'react'
import { Route, Link } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
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

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({ books })
  }

  changeShelf = (book, shelf) => {
    book.shelf = shelf
    this.setState(state => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }))
    BooksAPI.update(book, shelf)
    toastr.options = {
      positionClass : 'toast-bottom-left',
      hideDuration: 300,
      timeOut: 3500
    }
    toastr.clear()
    if (shelf !== 'none') {
      toastr.success(`${book.title} was added to shelf!`)
    } else {
      toastr.error(`${book.title} was removed from shelf!`)
    }
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={()=>(
          <AddBook
            books={ this.state.books }
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
