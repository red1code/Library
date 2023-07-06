import Library from "./library";


export {
  displayBooks,
  saveToLocalStorage,
  getFromLocalStorage,
  getFormValue
}


function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  }
  catch (error) {
    console.error(error);
  }
}

function getFromLocalStorage(key) {
  let data;
  try {
    data = localStorage.getItem(key);
  }
  catch (error) {
    console.error(error)
  }
  return JSON.parse(data)
}

function getFormValue(form, fieldName) {
  return form.elements.namedItem(fieldName).value
}

function displayBooks() {
  const lib = Library();
  const tableBody = document.getElementById('tbody');
  if (lib.getBooks().length == 0) {
    tableBody.innerHTML = emptyLibraryUI();
    return;
  }
  tableBody.innerHTML = '';
  for (let book of lib.getBooks()) {
    tableBody.appendChild(getTableRow(book));
  }
  if (lib.getBooks().length > 1) { // creating a button to delete all books if there's more than 1 row
    const btn = document.createElement('button');
    btn.textContent = 'Delete All Books!';
    btn.classList.add('dltBtn');
    btn.onclick = lib.deleteAllBooks;
    const td = document.createElement('td');
    td.colSpan = 5;
    td.appendChild(btn);
    const tr = document.createElement('tr');
    tr.appendChild(td);
    tableBody.appendChild(tr);
    return;
  }
}

/*
private functions
*/

function emptyLibraryUI() {
  return `<tr><td colspan="5">Library empty!</td></tr>`;
}

function getTableRow(book) {
  const changeStatus = () => {
    Library().changeReadStatus(book.title)
  }
  const deleteBook = () => {
    Library().deleteBook(book.title)
  }
  // book title cell
  const tdTitle = document.createElement('td');
  tdTitle.textContent = book.title;
  // book author cell
  const tdAuthor = document.createElement('td');
  tdAuthor.textContent = book.author;
  // book numberOfPages cell
  const tdPages = document.createElement('td');
  tdPages.textContent = book.pages;
  // book status cell
  const statusBtn = document.createElement('button');
  statusBtn.classList.add('noBtnStyle');
  statusBtn.title = 'Click to change Read status';
  statusBtn.textContent = book.read;
  statusBtn.onclick = changeStatus;
  const tdStatusBtn = document.createElement('td');
  tdStatusBtn.appendChild(statusBtn);
  // book delete btn cell
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('dltBtn');
  deleteBtn.onclick = deleteBook;
  const tdDeleteBtn = document.createElement('td');
  tdDeleteBtn.appendChild(deleteBtn);
  // parent row
  const tr = document.createElement('tr');
  tr.append(tdTitle, tdAuthor, tdPages, tdStatusBtn, tdDeleteBtn);
  return tr;
}
