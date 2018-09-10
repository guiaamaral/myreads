import React,{ Component } from 'react'
import ShelfChanger from './ShelfChanger'
import PropType from 'prop-types'

class Book extends Component {

  render() {

    const { book, changeShelf } = this.props
    const noCover = "https://books.google.com/googlebooks/images/no_cover_thumb.gif"

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundSize: 'cover',
                backgroundImage: `url(${ book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover })`
              }}></div>
              <ShelfChanger
                book={ book }
                shelf={ book.shelf }
                changeShelf={ changeShelf } />
          </div>
          <div className="book-title">{ book.title }</div>
            { book.authors && book.authors.map((author, index) => (
              <div className="book-authors" key={index}>{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

Book.propType = {
  book: PropType.object.isRequired,
  changeShelf: PropType.func.isRequired
};

export default Book
