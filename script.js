function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("you must use the 'new' operator to call this constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

let myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks() {
  const container = document.getElementById("libraryDisplay");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
      <p>ID: ${book.id}</p>
    `;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    // Toggle read button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    card.appendChild(removeBtn);
    card.appendChild(toggleBtn);
    container.appendChild(card);
  });
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
}


// FORM HANDLING
const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  bookDialog.close();
});

const bookForm = document.getElementById("bookForm");

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookDialog.close();
  bookForm.reset();
});