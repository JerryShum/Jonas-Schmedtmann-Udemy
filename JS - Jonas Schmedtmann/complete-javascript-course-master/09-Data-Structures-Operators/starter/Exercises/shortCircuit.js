const books = [
    {
        title: 'The Lord of the Rings',
        publicationDate: '1954-07-29',
        author: 'J. R. R. Tolkien',
        genres: ['fantasy', 'high-fantasy', 'adventure'],
        filmAdaptation: true,
        otherLanguagesTitle: {
            spanish: 'El señor de los anillos',
            chinese: '魔戒',
            french: 'Le Seigneur des anneaux',
        },
    },
    {
        title: 'The Cyberiad',
        publicationDate: 1965,
        author: 'Stanislaw Lem',
        genres: ['science fiction'],
        otherLanguagesTitle: {
            polish: 'Cyberiada',
            spanish: 'Ciberiada',
            french: 'Cybériade',
        },
    },
    {
        title: 'Dune',
        publicationDate: 1965,
        author: 'Frank Herbert',
        genres: ['science fiction', 'novel', 'adventure'],
        filmAdaptation: true,
        otherLanguagesTitle: {},
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: '1997-06-26',
        author: 'J. K. Rowling',
        genres: ['fantasy', 'adventure'],
        filmAdaptation: true,
        otherLanguagesTitle: {
            spanish: 'Harry Potter y la piedra filosofal',
            korean: '해리 포터와 마법사의 돌',
            bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
            portuguese: 'Harry Potter e a Pedra Filosofal',
        },
    },
    {
        title: 'A Game of Thrones',
        publicationDate: '1996-08-01',
        author: 'George R. R. Martin',
        genres: ['fantasy', 'high-fantasy', 'novel', 'fantasy fiction'],
        filmAdaptation: true,
        otherLanguagesTitle: {
            korean: '왕좌의 게임',
            polish: 'Gra o tron',
            portuguese: 'A Guerra dos Tronos',
            spanish: 'Juego de tronos',
        },
    },
];

/* ⚠️ YOU WILL CALL THE FUNCTIONS BELOW IN EXERCISES.
     DON'T WORRY IF THEY DON'T MAKE SENSE FOR NOW.
     YOU WILL LEARN EVERYTHING A BIT LATER IN THE COURSE.
     FOR NOW TREAT THEM AS BLACK BOXES (focus on the values they return).
     YOU CAN CALL THEM AND LOG THE RETURNED VALUE TO THE CONSOLE TO SEE WHAT EXACTLY THEY RETURN. */

const getBooksByGenre = genre =>
    books.filter(book => book.genres.includes(genre));
const getBooksAsArrays = () => books.map(book => Object.entries(book));
const getBookAuthors = () => books.map(book => book.author);

/*
 *  ********************************************
 *  5) SHORT CIRCUITING (&& and ||)            *
 *  ********************************************
 */

/* A) Each book has the 'otherLanguagesTitle' property, which stores an object containing the language as a key,
      and the title of the book in that language as a value.

      Example 'otherLanguagesTitle' property:
      otherLanguagesTitle: {
        spanish: 'El señor de los anillos',
        chinese: '魔戒',
        french: 'Le Seigneur des anneaux'
      }

      Write a function called 'getTitleInSpanish' that takes a 'book' object as an argument,
      and returns a title in Spanish or a string "No data available" if there is no title in Spanish.
      Using the 'if' statement or the ternary operator is not allowed. */

const getTitleInSpanish = function (book) {
    return book.otherLanguagesTitle.spanish || 'No data available';
};

console.log(getTitleInSpanish(books[0]));

/* B) Loop over the 'books' array, and for each book check if it has the title in Spanish and Korean.
      If it's true, log a string "<title> by <author> has title in Spanish and Korean" to the console,
      where <title> is the book title (in English), and <author> is the author of the book.
      Using the 'if' statement or the ternary operator is not allowed.
      Example output:
      "A Game of Thrones by George R. R. Martin has translations in Spanish and Korean."
      */

for (let i = 0; i < books.length; i++) {
    books[i].otherLanguagesTitle.korean &&
        books[i].otherLanguagesTitle.spanish &&
        console.log(
            `${books[i].title} by ${books[i].author} has title in Spanish and Korean`
        );
}

/* C) Loop over the 'books' array, and for each book check if it has the title in Portuguese or Spanish, but not in both.
      If it's true, log a string "<title> by <author> has title in Portuguese or Spanish, but not in both" to the console,
      where <title> is the book title (in English), and <author> is the author of the book.
      Using the 'if' statement or the ternary operator is not allowed.
      Example output:
      "A Game of Thrones by George R. R. Martin has translations in Spanish and Korean."
      */

for (let i = 0; i < books.length; i++) {
    (books[i].otherLanguagesTitle.portuguese && !books[i].otherLanguagesTitle.spanish) || (!books[i].otherLanguagesTitle.portuguese && books[i].otherLanguagesTitle.spanish) && "String output";

    console.log((books[i].otherLanguagesTitle.portuguese && !books[i].otherLanguagesTitle.spanish));
    console.log((!books[i].otherLanguagesTitle.portuguese && books[i].otherLanguagesTitle.spanish));
}


