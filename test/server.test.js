const server = require('../src/server');

beforeAll(async () => {
  await server.start();
});

afterAll(async () => {
  await server.stop();
});

test('GET /books', async () => {
  const options = {
    method: 'GET',
    url: '/books'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(200);
  expect(data.result.status).toBe('success');
  expect(data.result.data.books).toStrictEqual([]);
});

test('success POST /books', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  expect(data.result.data.bookId).toBeTruthy();
});

test('success GET /books?reading=0', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Unique Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: false,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'GET',
    url: `/books?reading=0`,
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.data.books).toBeTruthy();
  expect(dataUpdate.result.data.books.length).toBeGreaterThanOrEqual(1);
});

test('success GET /books?finished=1', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Finished Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 2,
      reading: false,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'GET',
    url: `/books?finished=1`,
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.data.books).toBeTruthy();
  expect(dataUpdate.result.data.books.length).toBeGreaterThanOrEqual(1);
});

test('success GET /books?name=jiahaha', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New jiahaha Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: false,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'GET',
    url: `/books?name=jiahaha`,
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.data.books).toBeTruthy();
  expect(dataUpdate.result.data.books.length).toBeGreaterThanOrEqual(1);
});

test('success PUT /books/{id}', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Unique Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: false,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'PUT',
    url: `/books/${bookId}`,
    payload: JSON.stringify({
      name: "New Update Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: false,
    })
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.message).toBe('Buku berhasil diperbarui');
});


test('success DELETE /books/{id}', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'DELETE',
    url: `/books/${bookId}`,
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.message).toBe('Buku berhasil dihapus');
});

test('success GET /books/{id}', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: "New Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(201);
  expect(data.result.status).toBe('success');
  expect(data.result.message).toBe('Buku berhasil ditambahkan');
  const bookId = data.result.data.bookId;
  expect(bookId).toBeTruthy();
  const optionsUpdate = {
    method: 'GET',
    url: `/books/${bookId}`,
  };
  const dataUpdate = await server.inject(optionsUpdate);
  expect(dataUpdate.statusCode).toBe(200);
  expect(dataUpdate.result.status).toBe('success');
  expect(dataUpdate.result.data.book).toBeTruthy();
});



test('failed POST /books without name', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(400);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Gagal menambahkan buku. Mohon isi nama buku');
});

test('failed POST /books because book count', async () => {
  const options = {
    method: 'POST',
    url: '/books',
    payload: JSON.stringify({
      name: 'Great Book',
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 3,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(400);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
});

test('failed DELETE /books because not found', async () => {
  const options = {
    method: 'DELETE',
    url: '/books/random',
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(404);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Buku gagal dihapus. Id tidak ditemukan');
});

test('failed PUT /books because not found', async () => {
  const options = {
    method: 'PUT',
    url: '/books/random',
    payload: JSON.stringify({
      name: "New Book",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(404);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Gagal memperbarui buku. Id tidak ditemukan');
});

test('failed PUT /books because missing name', async () => {
  const options = {
    method: 'PUT',
    url: '/books/random',
    payload: JSON.stringify({
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 1,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(400);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Gagal memperbarui buku. Mohon isi nama buku');
});

test('failed PUT /books because wrong count', async () => {
  const options = {
    method: 'PUT',
    url: '/books/random',
    payload: JSON.stringify({
      name: "Random book name",
      year: 2020,
      author: "Berv",
      summary: "Great book",
      publisher: "Berv Project",
      pageCount: 2,
      readPage: 3,
      reading: true,
    })
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(400);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
});

test('failed GET /books/{id} because not found', async () => {
  const options = {
    method: 'GET',
    url: '/books/random'
  };
  const data = await server.inject(options);
  expect(data.statusCode).toBe(404);
  expect(data.result.status).toBe('fail');
  expect(data.result.message).toBe('Buku tidak ditemukan');
});