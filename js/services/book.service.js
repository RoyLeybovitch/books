'use strict'

const STORAGE_KEY = 'bookDB'

var gBooks
var gFilterBy = { title: '', price: 0 }
_createBooks()

function _createBook(title, price) {
  return {
    id: makeId(),
    title,
    price,
    desc: makeLorem(),
    rate: 0,
  }
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)

  if (!books || !books.length) {
    books = []
    books.push(_createBook('Lord of the rings', 50))
    books.push(_createBook('Taken', 40))
    books.push(_createBook('Harry Potter', 45))
  }

  gBooks = books
  _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}

function getBooks() {
  var books = gBooks.filter(
    book =>
      book.title.includes(gFilterBy.title) && book.price >= gFilterBy.price
  )

  // const startIdx = gPageIdx * PAGE_SIZE
  // books = cars.slice(startIdx, startIdx + PAGE_SIZE)
  console.log(books)
  console.log(gBooks)
  return books
}

function getBookById(bookId) {
  const book = gBooks.find(book => bookId === book.id)
  return book
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex(book => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(title, price) {
  const book = _createBook(title, price)
  gBooks.unshift(book)
  _saveBooksToStorage()
  return book
}

function updateBook(bookId, newPrice) {
  const book = gBooks.find(book => book.id === bookId)
  book.price = newPrice
  _saveBooksToStorage()
  return book
}

function updateRate(bookId, newRate) {
  const book = gBooks.find(book => book.id === bookId)
  book.rate = newRate
  _saveBooksToStorage()
  return book
}

function sortRate() {
  return gBooks.sort((c1, c2) => c1.rate - c2.rate)
}

function sortPrice() {
  return gBooks.sort((c1, c2) => c2.price - c1.price)
}
