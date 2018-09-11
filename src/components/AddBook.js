import React,{ Component } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book'
import PropType from 'prop-types'

class AddBook extends Component {
  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (event) => {
    const query = event.target.value
    this.setState( { query: query } )

    if (query) {
      BooksAPI.search(query).then((foundBooks) => {
        if (!foundBooks || foundBooks.error) {
          this.setState( { foundBooks: [] } );
        } else {
          foundBooks = foundBooks.map((book) => {
            const getBookShelf = this.props.books.find(b => b.id === book.id);
            book.shelf = getBookShelf ? getBookShelf.shelf : 'none';
            return book;
          });
          this.setState( { foundBooks: foundBooks } );
        }
      })
    } else {
      this.setState({ foundBooks: [] });
    }
  }

  clearQuery = () => {
    this.setState(
      {
        query: '',
        foundBooks: []
      }
    );
  }

  render() {

    const { query, foundBooks } = this.state
    const { changeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={400}
              type="text"
              placeholder="Search by title or author"
              value={ query }
              onChange={ this.updateQuery }
            />
          </div>
        </div>
        <div className="search-books-results">
          { foundBooks.length > 0 && (
            <p className="number-of-results">Showing { foundBooks.length } books. <a className="clear-search" onClick={this.clearQuery}>Clear search</a></p>
          )}
          <ol className="books-grid">
            { foundBooks.map((book) => (
              <Book
                key={ book.id }
                book={ book }
                changeShelf={ changeShelf }
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

AddBook.propType = {
  book: PropType.object.isRequired,
  changeShelf: PropType.func.isRequired,
  foundBooks: PropType.array.isRequired,
  query: PropType.string.isRequired
};

export default AddBook