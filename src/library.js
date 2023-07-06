import { displayBooks, getFromLocalStorage, saveToLocalStorage, getFormValue } from './reusable';
import Book from './book';


export default function Library() {
  let _books = getFromLocalStorage('library') || [];
  const getBooks = () => _books;
  const addBookToLibrary = (newBook) => {
    _books.push(newBook);
    saveToLocalStorage('library', _books);
    displayBooks();
  }
  const changeReadStatus = (title) => {
    _books.map(book => {
      if (book.title === title) {
        (book.read === 'no' ? book.read = 'yes' : book.read = 'no');
      }
    });
    saveToLocalStorage('library', _books);
    displayBooks();
  }
  const deleteBook = (title) => {
    if (confirm(`Are you sure to delete "${title}"`)) {
      _books = _books.filter(book => book.title !== title)
      saveToLocalStorage('library', _books);
      displayBooks();
    }
  }
  const deleteAllBooks = () => {
    const getConfirmation = confirm('Are you sure you want to delete all books from the library?');
    if (getConfirmation) {
      _books.length = 0;
      saveToLocalStorage('library', _books);
      displayBooks();
    }
  }
  const renderTable = () => {
    displayBooks();
    const form = document.querySelector('form');
    form.onsubmit = (evt) => {
      evt.preventDefault();
      const newBook = new Book(
        getFormValue(form, 'bookTitle'),
        getFormValue(form, 'author'),
        getFormValue(form, 'pagesNumber'),
        getFormValue(form, 'read')
      );
      Library().addBookToLibrary(newBook);
      form.reset();
    }
  }

  return {
    renderTable,
    getBooks,
    addBookToLibrary,
    changeReadStatus,
    deleteBook,
    deleteAllBooks
  }
}
