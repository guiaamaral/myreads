import React,{ Component } from 'react'
import PropType from 'prop-types'

class Book extends Component {

  render() {

    const { book, changeShelf } = this.props
    const noCover = "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
    console.log(book)

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${ book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover })`
              }}></div>
            <div className="book-shelf-changer">
              <select
                onChange={(event) => changeShelf(book, event.target.value)}
                defaultValue={ book.shelf }>
              >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
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
