import React,{ Component } from 'react'
import Book from './Book'
import PropType from 'prop-types'

class Shelf extends Component {

  render() {

    const { books, shelfId, shelfTitle, changeShelf } = this.props
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.filter(b => b.shelf === shelfId).map((book) => (
              <Book
                key={ book.id }
                book={ book }
                shelf={ book.shelf }
                changeShelf={ changeShelf }
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Shelf.propType = {
  books: PropType.array.isRequired,
  changeShelf:  PropType.func.isRequired,
  shelfTitle: PropType.string.isRequired,
  shelfId: PropType.string.isRequired
};

export default Shelf
