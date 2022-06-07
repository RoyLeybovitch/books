'use strict'
function onInit() {
  renderBooks()
  doTrans()
  //   renderTitles()
}
function renderBooks() {
  var books = getBooks()
  var strHtmls = books.map(
    book =>
      `
            <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}$</td>
           
            <td>
                <button data-trans="read-trans" class="read" onclick="onReadBook(event,'${book.id}')">Read</button>
            </td>
            <td><button data-trans="update-trans" class="update" onclick="onUpdateBook('${book.id}')">Update</button></td>
            <td><button data-trans="delete-trans" class="delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
<td>
            <button class="rate-minus-btn" onclick="onMinusRate('${book.id}')">➖</button>
            <button class="rate-plus-btn" onclick="onPlusRate('${book.id}')">➕</button>
            <div class="rate">${book.rate}/10⭐</div>
</td>

        </tr>
        `
  )
  // console.log(books)
  document.querySelector('table tbody').innerHTML = strHtmls.join('')
}

function onReadBook(ev, bookId) {
  ev.stopPropagation()
  var book = getBookById(bookId)
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
  elModal.querySelector('h3').innerText = book.title
  elModal.querySelector('p').innerText = book.desc
  elModal.classList.add('open')
  console.log(ev)
}

function onCloseModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}

function onDeleteBook(bookId) {
  if (confirm('Are you sure you want the delete this book?')) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
  }
}

function onMoveToPage(page, elBtn) {
  // if(elBtn)
  moveToPage(page)
  renderPageBtns()
  renderBooks()

  const currPage = getCurrPage()
  document.querySelector(`.btn${currPage}`).classList.add('pressed')
  document.querySelector('.next').disabled =
    currPage === getPageCount() - 1 ? true : false
  document.querySelector('.prev').disabled = currPage === 0 ? true : false
}

function flashMsg(msg) {
  const el = document.querySelector('.user-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}

function onAddBook() {
  var title = prompt('Title?')
  var price = +prompt('Price?')
  if (title) {
    const book = addBook(title, price)
    renderBooks()
    flashMsg(`Book Added (id: ${book.id})`)
  }
}

function onUpdateBook(bookId) {
  const book = getBookById(bookId)
  var newPrice = +prompt('Price?', book.price)
  if (newPrice && book.price !== newPrice) {
    const book = updateBook(bookId, newPrice)
    renderBooks()
    flashMsg(`Price updated to: ${book.price}`)
  }
}

function onPlusRate(bookId) {
  const book = getBookById(bookId)
  if (book.rate >= 10) return
  book.rate++
  // var elRateDiv = document.querySelector('.rate')
  // elRateDiv.innerText = book.rate
  renderBooks()
  _saveBooksToStorage()
}

function onMinusRate(bookId) {
  const book = getBookById(bookId)
  if (book.rate <= 0) return
  book.rate--
  // var elRateDiv = document.querySelector('.rate')
  // elRateDiv.innerText = book.rate
  renderBooks()
  _saveBooksToStorage()
}
function onSetSortBy(status) {
  if (status === 'min-rate') {
    sortRate()
  }
  if (status === 'max-price') {
    sortPrice()
  }
  renderBooks()
}

function onSetFilterBy(filterBy) {
  filterBy = setCarFilter(filterBy)
  renderCars()

  const queryStringParams = `?vendor=${filterBy.vendor}&minSpeed=${filterBy.minSpeed}`
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSetLang(lang) {
  setLang(lang)
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
  // renderBooks()
  doTrans()
}

function renderPageBtns() {
  const currPage = getCurrPage()
  const pageCount = getPageCount()
  var strHTML = ''
  for (var i = 0; i < pageCount; i++) {
    strHTML += `<button class="btn${i}" onclick="onMoveToPage('${i}', this)">${
      i + 1
    }</button>`
  }
  document.querySelector('.page-btns span').innerHTML = strHTML
  document.querySelector(`.btn${currPage}`).classList.add('pressed')
}
