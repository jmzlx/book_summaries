import React from "react";
import { promises as fs } from 'fs';
import Book from "@/lib/Book";
import { IBook } from "@/lib/Book";


async function getBook (slug:string) {

  let book = new Book(slug);

  return {
      title: book.title,
      summary: await book.summarize()
  };
};

export default async function Page({ params: { slug } } : { params: { slug: string } } ) {
    const book = await getBook(slug);

    return (
      <>
          <h1>{book.title}</h1>
          <p>{book.summary}</p>
      </>
    );
}

export const generateStaticParams = async () => {

    const file = await fs.readFile(process.cwd() + '/data/books.json', 'utf8');
    const book_data:IBook[] = JSON.parse(file);

    let paths:{slug: string}[] = book_data.map(({title}) => {
        const book = new Book(title);
        return {slug: book.slug};
    });

    return paths;
}