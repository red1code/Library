const form = document.querySelector('form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const deleteBtn = document.getElementById('dltBtn');
const tableBody = document.getElementById('tbody');

let myLibrary = [];

getData();


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


form.onsubmit = (evt) => {
    evt.preventDefault();
    const getFormControl = (name) => form.elements.namedItem(name).value
    addBookToLibrary(
        getFormControl('bookTitle'),
        getFormControl('author'),
        getFormControl('pagesNumber'),
        getFormControl('read')
    )
}


async function getData() {
    try {
        myLibrary = await getFromLocalStorage('library') || [];
        displayBooks()
    }
    catch (error) {
        console.warn(error)
    }
}


async function saveToLocalStorage(key, value) {
    return await localStorage.setItem(key, JSON.stringify(value));
}


async function getFromLocalStorage(key) {
    let data = await localStorage.getItem(key);
    return JSON.parse(data)
}


async function deleteBook(title) {
    if (confirm(`Are you sure to delete "${title}"`)) {
        myLibrary.map(book => {
            if (book.title === title) {
                myLibrary.pop(book)
            }
        });
        await saveToLocalStorage('library', myLibrary);
        displayBooks()
    }
}


async function changeRead(title, status) {
    myLibrary.map(book => {
        if (book.title === title) {
            (status === 'no' ? book.read = 'yes' : book.read = 'no');
        }
    });
    await saveToLocalStorage('library', myLibrary);
    displayBooks()
}


async function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    try {
        myLibrary.push(newBook);
        await saveToLocalStorage('library', myLibrary);
        displayBooks();
        form.reset()
    }
    catch (error) {
        console.warn(error)
    }
}


async function displayBooks() {
    if (myLibrary.length == 0) {
        tableBody.innerHTML = `<tr><td colspan="5">Library empty!</td></tr>`;
        return
    }
    tableBody.innerHTML = '';
    try {
        for (let book of await myLibrary) {
            tableBody
                .innerHTML +=
                `<tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.pages}</td>
                    <td id="readCell" title="Click to change Read status" onclick="changeRead('${book.title}', '${book.read}')">
                        ${book.read}
                    </td>
                    <td><button id="dltBtn" onclick="deleteBook('${book.title}')">Delete</button></td>
                </tr>`
        }
    }
    catch (error) {
        console.error(error)
    }
}



// const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
// const atomicHabbits = new Book('Atomic Habbits', 'James Clear', 285, false);
// const sapiensAndHomoDeus = new Book('Sapiens and Homo Deus', 'Yuval Noah Harari', 823, false);
// const objectDesign = new Book('Object Design', 'Rebecca Wirfs-Brock and Alan Mckean', 415, false);
// const LinuxBible = new Book('Linux Bible', 'Christopher Negus', 901, false);