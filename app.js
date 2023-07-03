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

    this.books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book-entry');
      bookElement.innerHTML = `
        "${book.title}" by ${book.author}
        <button class="remove-button" data-index="${index}">Remove</button>`;
      bookElement.style.backgroundColor = index % 2 === 0 ? '#fff' : '#ababab';
      this.output.appendChild(bookElement);
    });

    const removeButtons = this.output.getElementsByClassName('remove-button');
    Array.from(removeButtons).forEach(button => {
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
    const index = event.target.dataset.index;
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.display();
  }
}

const bookLibrary = new BookLibrary();

