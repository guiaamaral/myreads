import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Header from './components/Header'
import Shelf from './components/Shelf'
import AddBook from './components/AddBook'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <Header />
            <Shelf
              books={ this.state.books }
            />
            <div className="open-search">
              <Link to="/add-book">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/add-book" render={()=>(
          <AddBook />
        )} />
      </div>
    )
  }
}

export default BooksApp
