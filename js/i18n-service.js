'use strict'

var gTrans = {
  title: {
    en: `Roy's Books`,
    es: 'Los libros de Roy',
    he: 'הספרים של רוי',
  },

  'book-id': {
    en: 'Id',
    es: 'Identificación',
    he: 'מספר סידורי',
  },
  'book-title': {
    en: 'Title',
    es: 'Título',
    he: 'כותר',
  },

  'book-price': {
    en: 'Price',
    es: 'Precio',
    he: 'מחיר',
  },

  'book-actions': {
    en: 'Actions',
    es: 'Accións',
    he: 'פעולות',
  },
  'book-rate': {
    en: 'Rate',
    es: 'Clasificación',
    he: 'דירוג',
  },
  'add-book': {
    en: 'Add Book',
    es: 'Añadir libro',
    he: 'הוסף ספר',
  },
  'close-modal': {
    en: 'Close',
    es: 'Cerca',
    he: 'סגור',
  },

  'read-trans': {
    en: 'Read',
    es: 'Leer',
    he: 'קרא',
  },
  'update-trans': {
    en: 'Update',
    es: 'Actualizar',
    he: 'עדכן',
  },
  'delete-trans': {
    en: 'Delete',
    es: 'Eliminar',
    he: 'מחק',
  },
  sort: {
    en: 'Sort By',
    es: 'Ordenar por',
    he: 'סנן לפי',
  },
  rate: {
    en: 'Rate - Low To High',
    es: 'Tasa de baja a alta',
    he: 'דירוג - מהנמוך לגבוה',
  },
  price: {
    en: 'Price - High To Low',
    es: 'Precio alta a baja',
    he: 'מחיר - מהגבוה לנמוך',
  },
}

var gCurrLang = 'en'

function getTrans(transKey) {
  var keyTrans = gTrans[transKey]
  if (!keyTrans) return 'UNKNOWN'

  var txt = keyTrans[gCurrLang] // he
  if (!txt) txt = keyTrans.en

  return txt
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]')
  els.forEach(el => {
    var transKey = el.dataset.trans
    // console.log(el.dataset)
    var txt = getTrans(transKey)

    if (el.localName === 'input') {
      el.setAttribute('placeholder', txt)
      // el.placeholder = txt
    } else el.innerText = txt
  })
}

function setLang(lang) {
  gCurrLang = lang // he
}

function formatNumOlder(num) {
  return num.toLocaleString('es')
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatCurrency(num) {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS',
  }).format(num)
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function kmToMiles(km) {
  return km / 1.609
}
