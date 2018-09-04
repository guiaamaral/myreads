import React,{ Component } from 'react'
import Book from './Book'

class Shelf extends Component {

  render() {

    const { books } = this.props

    const shelves = [
      {
        "id": "currentlyReading",
        "title": "Currently Reading"
      },
      {
        "id": "wantToRead",
        "title": "Want To Read"
      },
      {
        "id": "read",
        "title": "Read"
      }
    ]
    
    return (
      <div className="list-books-content">
        <div>
          { shelves.map((shelf) => (
            <div
              className="bookshelf"
              key={shelf.id}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  { books.map((book) => (
                    <Book
                      key={ book.id }
                      book={ book }
                    />
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Shelf
