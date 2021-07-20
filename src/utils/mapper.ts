import { Book } from '../models/Book';

const mapBook = (book: Book) => ({
  id: book.id,
  name: book.name,
  publisher: book.publisher,
});

export { mapBook };
