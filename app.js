const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('addBtn');
const output = document.getElementById('output');
const errorMsg = document.getElementById('error-msg');

const books = JSON.parse(localStorage.getItem('books')) || [];

const display = () => {
  output.innerHTML = '';
  output.classList.add('container');
  for (let index = 0; index < books.length; index += 1) {
    const book = books[index];
    output.innerHTML += `
      <div class="books">
        "${book.title}" by ${book.author}
        <button class="remove-button" onclick="removeBook(${index})">Remove</button>
      </div>`;
  }
  if (books.length === 0){
    output.classList.remove('container');
  }
};

addBtn.onclick = function handleClick(event) {
  event.preventDefault();
  const titleValue = title.value;
  const authorValue = author.value;
  if (titleValue && authorValue) {
    const book = {
      title: titleValue,
      author: authorValue,
    };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    display();
    title.value = '';
    author.value = '';
    errorMsg.textContent = '';
  } else {
    errorMsg.textContent = 'Please make sure to fill both the title and author.';
  }
};

/* eslint-disable-next-line no-unused-vars */
function removeBook(index) {
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
  display();
}

display();
