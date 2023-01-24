/* Data used in exercises */
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
            french: 'Le Seigneur des anneaux'
        }
    },
    {
        title: 'The Cyberiad',
        publicationDate: 1965,
        author: 'Stanislaw Lem',
        genres: ['science fiction'],
        otherLanguagesTitle: {
            polish: 'Cyberiada',
            spanish: 'Ciberiada',
            french: 'Cybériade'
        }
    },
    {
        title: 'Dune',
        publicationDate: 1965,
        author: 'Frank Herbert',
        genres: ['science fiction', 'novel', 'adventure'],
        filmAdaptation: true,
        otherLanguagesTitle: {}
    },
    {
        title: 'Harry Potter and the Philosopher\'s Stone',
        publicationDate: '1997-06-26',
        author: 'J. K. Rowling',
        genres: ['fantasy', 'adventure'],
        filmAdaptation: true,
        otherLanguagesTitle: {
            spanish: 'Harry Potter y la piedra filosofal',
            korean: '해리 포터와 마법사의 돌',
            bengali: 'হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন',
            portuguese: 'Harry Potter e a Pedra Filosofal'
        }
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
            spanish: 'Juego de tronos'
        }
    }
];

/* ⚠️ YOU WILL CALL THE FUNCTIONS BELOW IN EXERCISES.
     DON'T WORRY IF THEY DON'T MAKE SENSE FOR NOW.
     YOU WILL LEARN EVERYTHING A BIT LATER IN THE COURSE.
     FOR NOW TREAT THEM AS BLACK BOXES (focus on the values they return).
     YOU CAN CALL THEM AND LOG THE RETURNED VALUE TO THE CONSOLE TO SEE WHAT EXACTLY THEY RETURN. */

const getBooksByGenre = genre => books.filter(book => book.genres.includes(genre));
const getBooksAsArrays = () => books.map(book => Object.entries(book));
const getBookAuthors = () => books.map(book => book.author);

/*
*  ********************************************
*  2) DESTRUCTURING OBJECTS                   *
*  ********************************************
*/

/* A) Take the first object from the 'books' array, and assign the author to the 'author' variable using destructuring.
      Use the 'let' statement because the 'author' variable may change later. */
let { author } = books[0];
console.log(author); //!J. R. R. Tolkien


/* B) Take the second object from the 'books' array, and destructure the title into a variable called 'bookTitle'. */
const { title: bookTitle } = books[1];
console.log(bookTitle); //! The Cyberiad

/* C) The book objects aren't consistent in their form.
      For example, the second book doesn't have the 'filmAdaptation' property.
      Destructure it into a variable called 'hasFilmAdaptation' with a default value of false. */

const { filmAdaptation: hasFilmAdaptation = false } = books[1];


/* D) Remember the 'author' variable from exercise A? It's time to reassign it.
      Destructure the author of the third book into existing variable called 'author'. */
({ author } = books[2]);
console.log(author);//Frank Herbert



/* ⚠️ COMMENT OUT YOUR SOLUTIONS AFTER YOU FINISH SO THAT IT DOESN'T COLLIDE WITH NEXT EXERCISES 🠕 */