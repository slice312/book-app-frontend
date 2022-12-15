import {httpInstance} from "./httpInstance";
import {Constants} from "/src/shared/constants";


/**
 * @typedef User
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {number} age
 */

/**
 * @typedef BookInfo
 * @property {string} id
 * @property {string} name
 * @property {string} author
 * @property {boolean} isFavorite
 * @property {number} publishYear
 * @property {string} publishHouse
 * @property {number} pagesNumber
 * @property {Array<string>} genres
 * @property {string} originalLanguage
 */

/**
 * @returns {Promise<*>}
 */
const authMe = async () => {
    const response = await httpInstance.get("me", {
        "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
    });

    if (response.status === 200)
        return await response.json();
    if (response.status === 403)
        throw new Error("Incorrect login or password");
    await handleErrorStatuses(response);
};


/**
 * @param {string} username
 * @param {string} password
 * @returns {Promise<*>}
 */
const login = async (username, password) => {
    const response = await httpInstance.post("login", {
        username,
        password
    });

    if (response.status === 200)
        return await response.json();
    if (response.status === 403)
        throw new Error("Incorrect login or password");

    await handleErrorStatuses(response);
};

const handleErrorStatuses = async (failedResponse) => {
    const data = await failedResponse.json();
    const err = new Error(data.message);
    err.status = failedResponse.status;
    throw err;
};


/**
 *
 * @param {User} user
 * @returns {Promise<object>}
 */
const register = async (user) => {
    const response = await httpInstance.post("signin", user);

    if (response.status === 200)
        return await response.json();
    await handleErrorStatuses(response);
};


const getBooks = async () => {
    const response = await httpInstance.get("books", {
        "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
    });

    if (response.status === 200)
        return await response.json();
    if (response.status === 403)
        throw new Error("Incorrect login or password");
    await handleErrorStatuses(response);
};


/**
 * @param {string} bookId
 * @returns {Promise<BookInfo>}
 */
const getBook = async (bookId) => {
    const response = await httpInstance.get(`books/${bookId}`, {
        "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
    });

    if (response.status === 200)
        return await response.json();
    if (response.status === 403)
        throw new Error("Incorrect login or password");
    await handleErrorStatuses(response);
};



/**
 * @param {string} bookId
 * @returns {Promise<void>}
 */
const deleteBook = async (bookId) => {
    const response = await httpInstance.delete(`books/delete/${bookId}`, {
        "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
    });

    if (response.status === 200)
        return await response.json();
    await handleErrorStatuses(response);
};

/**
 *
 * @param {string} bookId
 * @param data
 * @returns {Promise<*>}
 */
const updateBook = async (bookId, data) => {
    const response = await httpInstance.put(`books/update/${bookId}`,
        data,
        {
            "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
        });


    if (response.status === 200)
        return await response.json();
    await handleErrorStatuses(response);
};

/**
 * @param {BookInfo} book
 * @returns {Promise<*>}
 */
const addBook = async (book) => {
    const response = await httpInstance.post(`books/create`,
        book,
        {
            "X-Auth": window.localStorage.getItem(Constants.USER_TOKEN_LS_KEY)
        });


    if (response.status === 200)
        return await response.json();
    await handleErrorStatuses(response);
};



export const Api = {
    authMe,
    login,
    register,
    getBooks,
    getBook,
    deleteBook,
    updateBook,
    addBook
};