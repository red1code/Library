const tableBody = document.getElementById('tbody');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = () => {
    //     let hasBeenRead = this.read === true ? "has been read" : "not read yet";
    //     return (
    //         this.title +
    //         ", by " +
    //         this.author +
    //         ", " +
    //         this.pages +
    //         " pages, " +
    //         hasBeenRead
    //     )
    // }
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const atomicHabbits = new Book('Atomic Habbits', 'James Clear', 285, false);
const sapiensAndHomoDeus = new Book('Sapiens and Homo Deus', 'Yuval Noah Harari', 823, false);
const objectDesign = new Book('Object Design', 'Rebecca Wirfs-Brock and Alan Mckean', 415, false);
const LinuxBible = new Book('Linux Bible', 'Christopher Negus', 901, false);

const myLibrary = [
    theHobbit,
    atomicHabbits,
    sapiensAndHomoDeus,
    objectDesign,
    LinuxBible
];


function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}


function displayBooks() {
    try {
        myLibrary.map(element => {
            tableBody.innerHTML +=
                `<tr><td>${element.title}</td><td>${element.author}</td><td>${element.pages}</td><td>${element.read}</td></tr>`
        })
    }
    catch (error) {
        console.error(error)
    }
}

displayBooks();
