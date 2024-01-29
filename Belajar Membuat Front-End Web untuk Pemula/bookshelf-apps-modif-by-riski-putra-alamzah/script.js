document.addEventListener("DOMContentLoaded", function () {
  const inputBookForm = document.getElementById("inputBook");
  const searchBookForm = document.getElementById("searchBook");
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  inputBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  searchBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // window.alert("ok");
    searchBook();
  });

  function getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }

  function saveBooks(books) {
    localStorage.setItem("books", JSON.stringify(books));
  }

  function renderBooks(isFiltered = null) {
    const books = isFiltered ?? getBooks();

    const incompleteBooks = books.filter((book) => !book.isComplete);
    const completeBooks = books.filter((book) => book.isComplete);

    renderBookList(incompleteBooks, incompleteBookshelfList);
    renderBookList(completeBooks, completeBookshelfList);
  }
  function scrollToBook(bookId) {
    window.scrollTo(
      0,
      document.querySelector(`article[data-id='${bookId}']`).offsetTop
    );
  }

  function renderBookList(books, container) {
    container.innerHTML = "";

    books.forEach((book) => {
      const bookItem = document.createElement("article");
      bookItem.dataset.id = book.id;
      bookItem.classList.add("book_item");

      const titleElement = document.createElement("h3");
      titleElement.innerText = book.title;

      const authorElement = document.createElement("p");
      authorElement.innerText = `Penulis: ${book.author}`;

      const yearElement = document.createElement("p");
      yearElement.innerText = `Tahun: ${book.year}`;

      const actionContainer = document.createElement("div");
      actionContainer.classList.add("action");

      const finishButton = document.createElement("button");
      finishButton.innerText = book.isComplete
        ? "Belum selesai dibaca"
        : "Selesai dibaca";
      finishButton.classList.add("green");
      finishButton.addEventListener("click", function () {
        markAsComplete(book.id);
      });

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Hapus buku";
      deleteButton.classList.add("red");
      deleteButton.addEventListener("click", function () {
        deleteBook(book.id);
      });

      actionContainer.appendChild(finishButton);
      actionContainer.appendChild(deleteButton);

      bookItem.appendChild(titleElement);
      bookItem.appendChild(authorElement);
      bookItem.appendChild(yearElement);
      bookItem.appendChild(actionContainer);

      container.appendChild(bookItem);
    });
  }

  function addBook() {
    const titleInput = document.getElementById("inputBookTitle");
    const authorInput = document.getElementById("inputBookAuthor");
    const yearInput = document.getElementById("inputBookYear");
    const isCompleteInput = document.getElementById("inputBookIsComplete");

    const title = titleInput.value;
    const author = authorInput.value;
    const year = parseInt(yearInput.value);
    const isComplete = isCompleteInput.checked;

    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete,
    };

    const books = getBooks();
    books.push(newBook);
    saveBooks(books);

    renderBooks();
    scrollToBook(newBook.id);
    inputBookForm.reset();
  }

  function markAsComplete(bookId) {
    const books = getBooks();
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      books[index].isComplete = !books[index].isComplete;
      saveBooks(books);
      renderBooks();
    }
  }

  function deleteBook(bookId) {
    const books = getBooks();
    const filteredBooks = books.filter((book) => book.id !== bookId);
    saveBooks(filteredBooks);
    renderBooks();
  }

  function searchBook() {
    const searchTitleInput = document.getElementById("searchBookTitle");
    const searchTitle = searchTitleInput.value.toLowerCase();

    const books = getBooks();

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTitle)
    );

    renderBooks(filteredBooks);
  }

  // Render books on page load
  renderBooks();
});
