const { nanoid } = require('nanoid');
const books = require('./books');

/**
 * Add Book Handler <br>
 * Handle POST /books
 * @param {*} request Request object
 * @param {*} h hapi object
 * @returns Hapi response
 */
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // validation
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // create process
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    finished,
    readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/**
 * Handler for GET /books <br>
 * Handler for GET /books?reading=0 <br>
 * Handler for GET /books?reading=1 <br>
 * Handler for GET /books?finished=0 <br>
 * Handler for GET /books?finished=1 <br>
 * Handler for GET /books?name=Dicoding
 * @param {*} request Request object
 * @param {*} h hapi object
 * @returns Hapi response
 */
const getAllBooksHandler = (request, h) => {
  const { reading, finished, name } = request.query;
  if (reading !== undefined) {
    const readInt = parseInt(reading, 10);
    const readBool = readInt === 1;
    const filteredBooks = books.filter((book) => book.reading === readBool);
    const filterResponse = {
      status: 'success',
      data: {
        books: filteredBooks.map((book) => {
          return { id: book.id, name: book.name, publisher: book.publisher }
        }),
      },
    };
    return h.response(filterResponse);
  }
  if (finished !== undefined) {
    const finishedInt = parseInt(finished, 10);
    const finishedBool = finishedInt === 1;
    const filteredBooks = books.filter((book) => book.finished === finishedBool);
    const filterResponse = {
      status: 'success',
      data: {
        books: filteredBooks.map((book) => {
          return { id: book.id, name: book.name, publisher: book.publisher }
        }),
      },
    };
    return h.response(filterResponse);
  }
  if (name !== undefined) {
    const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const filterResponse = {
      status: 'success',
      data: {
        books: filteredBooks.map((book) => {
          return { id: book.id, name: book.name, publisher: book.publisher }
        }),
      },
    };
    return h.response(filterResponse);
  }
  const basedResponse = {
    status: 'success',
    data: {
      books: books.map((book) => {
        return { id: book.id, name: book.name, publisher: book.publisher }
      }),
    },
  };
  return h.response(basedResponse);
};

/**
 * Get by id handler <br>
 * GET /books/{id}
 * @param {*} request Request object
 * @param {*} h hapi object
 * @returns Hapi response
 */
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * Handle PUT /books/{id}
 * @param {*} request Request object
 * @param {*} h hapi object
 * @returns Hapi response
 */
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // validation
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // update
  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/**
 * Handle DELETE /books/{id}
 * @param {*} request Request object
 * @param {*} h hapi object
 * @returns Hapi response
 */
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
