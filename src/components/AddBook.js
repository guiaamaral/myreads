import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book'

class AddBook extends Component {
  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (event) => {
    const query = event.target.value.trim()
    this.setState( { query: query } )

    if (query) {
      BooksAPI.search(query).then((books) => {
        if (books.length > 0) {
          this.setState( { foundBooks: books } );
        } else {
          this.setState( { foundBooks: [] } );
        }
      })
    }
  }

  clearQuery = () => {
    this.setState( { query: '', foundBooks: [] } );
  }

  render() {

    const { query, foundBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={ this.updateQuery }
              />
          </div>
        </div>
        <div className="search-books-results">
          {foundBooks.length > 0 && (
            <p className="number-of-results">Showing {foundBooks.length} books. <a className="clear-search" onClick={this.clearQuery}>Clear search</a></p>
          )}
          <ol className="books-grid">
            {foundBooks.map((book) => (
              <Book
                key={ book.id }
                book={ book } />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default AddBook
