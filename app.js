const form = document.querySelector('form');
const tableBody = document.getElementById('tbody');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    books = getFromLocalStorage('library') || [];
    addBookToLibrary(book) {
        try {
            this.books.push(book);
            saveToLocalStorage('library', this.books);
            displayBooks();
            form.reset();
        }
        catch (error) {
            alert(error);
        }
    }
    changeReadStatus(title) {
        this.books.map(book => {
            if (book.title === title) {
                (book.read === 'no' ? book.read = 'yes' : book.read = 'no');
            }
        });
        saveToLocalStorage('library', this.books);
        displayBooks();
    }
    deleteBook(title) {
        if (confirm(`Are you sure to delete "${title}"`)) {
            this.books = this.books.filter(book => book.title !== title)
            saveToLocalStorage('library', this.books);
            displayBooks();
        }
    }
    deleteAllBooks() {
        const getConfirmation = confirm('Are you sure you want to delete all books from the library?');
        if (getConfirmation) {
            this.books.length = 0;
            saveToLocalStorage('library', this.books);
            displayBooks();
        }
    }
}

const myLibrary = new Library();

displayBooks();

form.onsubmit = (evt) => {
    evt.preventDefault();
    const newBook = new Book(
        getFormValue('bookTitle'),
        getFormValue('author'),
        getFormValue('pagesNumber'),
        getFormValue('read')
    );
    myLibrary.addBookToLibrary(newBook);
}

function changeStatus(title) {
    myLibrary.changeReadStatus(title)
}

function deleteBook(bookTitle) {
    try {
        myLibrary.deleteBook(bookTitle)
    }
    catch (error) {
        alert(error);
    }
}

function displayBooks() {
    if (myLibrary.books?.length == 0) {
        tableBody.innerHTML = `<tr><td colspan="5">Library empty!</td></tr>`;
        return;
    }
    tableBody.innerHTML = '';
    for (let book of myLibrary.books) {
        tableBody.innerHTML +=
            `<tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td id="readCell" title="Click to change Read status" onclick="changeStatus('${book.title}')">
                    ${book.read}
                </td>
                <td><button id="dltBtn" onclick="deleteBook('${book.title}')">Delete</button></td>
            </tr>`;
    }
    if (myLibrary.books?.length > 1) {
        tableBody.innerHTML += `<tr><td colspan="5">
            <button id="dltBtn" onclick="clearLibrary()">Delete All Books!</button>
        </td></tr>`;
        return;
    }
}

function getFormValue(name) {
    return form.elements.namedItem(name).value
}

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        alert(error);
    }
}

function getFromLocalStorage(key) {
    let data;
    try {
        data = localStorage.getItem(key);
    }
    catch (error) {
        console.warn(error)
    }
    return JSON.parse(data)
}

function clearLibrary() {
    myLibrary.deleteAllBooks();
}



// function testFun() {
//     const books = [
//         { title: "The Hobbit", author: "J.R.R. Tolkien", pages: "295", read: "no" },
//         { title: "المبادرة الاقتصادية", author: "عبد الرحيم", pages: "120", read: "yes" },
//         { title: "Atomic Habbits", author: "James Clear", pages: "285", read: "no" },
//         { title: "Sapiens and Homo Deus", author: "Yuval Noah Harari", pages: "823", read: "no" },
//         { title: "Object Design", author: "Rebecca Wirfs-Brock and Alan Mckean", pages: "415", read: "no" },
//         { "title": "Linux Bible", author: "Christopher Negus", pages: "901", read: "no" }
//     ];
//     saveToLocalStorage('library', books);
//     displayBooks();
// }
// testFun();
