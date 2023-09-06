/**
 * ClientDB: A JavaScript module for storing and manipulating data in Local and Session Storage in browsers.
 * @module ClientDB
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */
class ClientDB {
    /**
     * Create a new ClientDB instance.
     * @param {string} name - The name of the database.
     * @param {Object} options - Database options.
     * @param {('local'|'session')} options.type - Database type (local or session).
     * @throws {Error} Throws an error if database type is not supported.
     */
    constructor(name, { type }) {
        this.dbName = name;
        this.type = type;
        this.initializeDatabase();
    }

    /**
     * Initialize the database if it doesn't exist.
     * If the database already exists, this method does nothing.
     * @private
     */
    initializeDatabase() {
        if (!this.isDatabaseExists()) {
            this.createDatabase();
        }
    }

    /**
     * Check if the database already exists in storage.
     * @private
     * @returns {boolean} True if the database exists, false otherwise.
     */
    isDatabaseExists() {
        const storedData = this.getStoredData();
        return !!storedData;
    }

    /**
     * Create a new database with an empty object.
     * @private
     */
    createDatabase() {
        this.setData({});
    }

    /**
     * Retrieve the database and its contents.
     * @returns {Object} The database and its contents.
     */
    getDb() {
        return this.getStoredData();
    }

    /**
     * Query data from the database.
     * @param {string} key - The key to query.
     * @returns {*} The queried data or undefined if not found.
     */
    query(key) {
        const data = this.getDb();
        return data ? data[key] : undefined;
    }

    /**
     * Insert data into the database.
     * @param {Object} data - Data to be inserted.
     */
    insert(data) {
        const existingData = this.getDb();
        const newData = { ...existingData, ...data };
        this.setData(newData);
    }

    /**
     * Delete the database from storage.
     * After deletion, the instance is no longer usable.
     */
    delete() {
        this.clearStorage();
    }

    /**
     * Clear the database from storage.
     * @private
     */
    clearStorage() {
        if (this.type === "local") {
            window.localStorage.removeItem(this.dbName);
        } else if (this.type === "session") {
            window.sessionStorage.removeItem(this.dbName);
        }
    }

    /**
     * Get the stored data from storage.
     * @private
     * @returns {Object|null} The stored data or null if not found.
     */
    getStoredData() {
        const rawData = (this.type === "local")
            ? window.localStorage.getItem(this.dbName)
            : window.sessionStorage.getItem(this.dbName);
        
        return rawData ? JSON.parse(rawData) : null;
    }

    /**
     * Set data into storage.
     * @private
     * @param {Object} data - Data to be stored.
     */
    setData(data) {
        const jsonData = JSON.stringify(data);
        if (this.type === "local") {
            window.localStorage.setItem(this.dbName, jsonData);
        } else if (this.type === "session") {
            window.sessionStorage.setItem(this.dbName, jsonData);
        }
    }
}

// const localDB = new ClientDB("myLocalDB", { type: "local" });
// const sessionDB = new ClientDB("mySessionDB", { type: "session" });
// localDB.insert({ username: "john_doe", email: "john@example.com" });
// const email = localDB.query("email");
// console.log(email); // Output: "john@example.com"
// localDB.delete();
// const data = localDB.getDb();
// console.log(data); // Output: { username: "john_doe", email: "john@example.com" }


export default ClientDB;
