// Data model for Book (OpenLibrary)
/**
 * @typedef {Object} Book
 * @property {string} id - Unique book ID (OpenLibrary work key)
 * @property {string} key - OpenLibrary key
 * @property {string} title - Book title
 * @property {string} author - Author name
 * @property {string} coverUrl - Cover image URL
 * @property {string} shortDescription - Short description or topics
 */

// Data model for Book Details
/**
 * @typedef {Object} BookDetails
 * @property {string} id - Unique book ID
 * @property {string} title - Book title
 * @property {string} key - OpenLibrary key
 * @property {string} description - Book description
 * @property {string} firstPublishDate - First publish date
 * @property {string} subjectPlaces - Subject places
 * @property {string} subjectGenres - Subject genres
 * @property {string} coverUrl - Cover image URL
 * @property {number} revision - Revision count
 * @property {string} latestRevisionDate - Last revision date
 */

// Data model for Profile
/**
 * @typedef {Object} Profile
 * @property {string} uid - User ID
 * @property {string} email - User email
 * @property {string} photoURL - Profile picture URL (base64)
 */

// Data model for Favorites
/**
 * @typedef {Object} Favorites
 * @property {string[]} items - Array of favorite book IDs
 */
