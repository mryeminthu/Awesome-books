/* eslint-disable max-classes-per-file, no-unused-vars */

class BookEntry {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookLibrary {
  constructor() {
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.addBtn = document.getElementById('addBtn');
    this.output = document.getElementById('output');
    this.errorMsg = document.getElementById('error-msg');
    this.books = JSON.parse(localStorage.getItem('books')) || [];

    this.display();
    this.addBtn.addEventListener('click', this.handleClick.bind(this));
  }

  display() {
    this.output.innerHTML = '';

    if (this.books.length === 0) {
      const messageElement = document.createElement('p');
      messageElement.textContent = 'No book has been added yet.';
      messageElement.classList.add('no-books');
      this.output.appendChild(messageElement);
    } else {
      this.books.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-entry');
        bookElement.innerHTML = `
          "${book.title}" by ${book.author}
          <button class="remove-button" data-index="${index}">Remove</button>`;
        bookElement.style.backgroundColor = index % 2 === 0 ? '#fff' : '#ababab';
        this.output.appendChild(bookElement);
      });
    }

    if (Object.keys(this.books).length === 0) {
      this.output.classList.remove('container');
    } else {
      this.output.classList.add('container');
    }

    const removeButtons = this.output.getElementsByClassName('remove-button');
    Array.from(removeButtons).forEach((button) => {
      button.addEventListener('click', this.handleRemove.bind(this));
    });
  }

  handleClick(event) {
    event.preventDefault();
    const titleValue = this.titleInput.value;
    const authorValue = this.authorInput.value;
    if (titleValue && authorValue) {
      const book = new BookEntry(titleValue, authorValue);
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
      this.display();
      this.titleInput.value = '';
      this.authorInput.value = '';
      this.errorMsg.textContent = '';
    } else {
      this.errorMsg.textContent = 'Please make sure to fill both the title and author.';
    }
  }

  handleRemove(event) {
    const { index } = event.target.dataset;
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.display();
  }
}

let bookLibrary;

function displayAllSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.style.display = 'flex';
  });
  if (bookLibrary) {
    bookLibrary.display();
  }
}

function displayBookSection() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id === 'book-section') {
      section.style.display = 'flex';
    } else {
      section.style.display = 'none';
    }
  });
  if (bookLibrary) {
    bookLibrary.display();
  }
}

function displayNewBooksSection() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id === 'new-books') {
      section.style.display = 'flex';
    } else {
      section.style.display = 'none';
    }
  });
}

function displayContactSection() {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    if (section.id === 'contact') {
      section.style.display = 'flex';
    } else {
      section.style.display = 'none';
    }
  });
}

function addNewBook() {
  if (bookLibrary) {
    bookLibrary.handleClick(this);
  }
}

function initializePage() {
  bookLibrary = new BookLibrary();
}

function displayTime() {
  const dateTime = document.querySelector('.date-time');
  const date = new Date();
  const dateString = date.toLocaleDateString('en-US');
  const timeString = date.toLocaleTimeString('en-US');
  dateTime.innerHTML = `${dateString}, ${timeString}`;
}
displayTime();
setInterval(displayTime, 1000);

window.addEventListener('DOMContentLoaded', initializePage);