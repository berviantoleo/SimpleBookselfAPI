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