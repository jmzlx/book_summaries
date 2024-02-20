import React from "react";
import { promises as fs } from 'fs';
import Book from "@/lib/Book";
import { IBook } from "@/lib/Book";
import Link from "next/link";


async function getBooks () {

    const file = await fs.readFile(process.cwd() + '/data/books.json', 'utf8');
    const book_data:IBook[] = JSON.parse(file);

    let books:Book[] = book_data.map(({title}) => new Book(title));
  
    return books;
};


export default async function Page() {
    const books = await getBooks();

    return (
      <>
        <h1 className="text-3xl font-bold underline">Book List</h1>
        <div>
          <ul>
              {books.map((book, index) => (
                  <li key={index}><Link href={`/books/${book.slug}`}>{book.title}</Link></li>
              ))}
          </ul>
        </div>
      </>
    );
}
