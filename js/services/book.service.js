'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 6

var gBooks
var gPageIdx = 0
var gFilterBy = { title: '', price: 0 }
var gFilteredBooksCount
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
    for (var i = 0; i < 27; i++) {
      var title = makeLorem(2)
      title = title.charAt(0).toUpperCase() + title.slice(1)
      var price = getRandomIntInclusive(10, 30)
      title.push(_createBook(title, price))
    }
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

function getPageCount() {
  return Math.ceil(gFilteredBooksCount / PAGE_SIZE)
}

function getCurrPage() {
  return gPageIdx
}

function moveToPage(page) {
  if (page === '+') gPageIdx++
  else if (page === '-') gPageIdx--
  else gPageIdx = +page
}

function getBooksForDisplay() {
  if (!gBooks || !gBooks.length) _createBooks()
  var books = gBooks

  books = books.filter(book => book.title.includes(gFilterBy.title))
  books = books.filter(book => book.price < gFilterBy.price)

  gFilteredBooksCount = books.length
  const startIdx = gPageIdx * PAGE_SIZE
  books = books.slice(startIdx, startIdx + PAGE_SIZE)
  return books
}
