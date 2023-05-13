/**
 * Paginator: A data pagination module.
 * @module Paginator
 * @author Olawoore Emmanuel Collins
 * @link https://github.com/devbadass
 */
class Paginator {
    /**
     * @param {Number} numberPerPage number of data to be loaded per page.
     * @param {Object} data data to be paginated.
     */
    constructor(numberPerPage, data) {
        this.list = [];
        this.pageList = [];
        this.numberOfPages = 0;
        this.numberPerPage = numberPerPage;
        this.data = data;
        this.currentPage = 1;
    }

    /**
     * Generates list for data.
     */
    makeList() {
        for (let x = 0; x < this.data.length; x++) {
            this.list.push(x);
        }
        this.numberOfPages = Math.ceil(this.list.length / this.numberPerPage);
    }

    /**
     * Loads first page.
     */
    firstPage() {
        this.currentPage = 1;
        this.load();
        return this.pageList;
    }

    /**
     * Loads last page.
     */
    lastPage() {
        this.currentPage = this.numberOfPages;
        this.load();
        return this.pageList;
    }

    /**
     * Loads next page.
     */
    nextPage() {
        this.currentPage += 1;
        this.load();
        return this.pageList;
    }

    /**
     * Loads previous page.
     */
    previousPage() {
        this.currentPage -= 1;
        this.load();
        return this.pageList;
    }

    /**
     * paginates data list
     */
    loadList() {
        let begin = (this.currentPage - 1) * this.numberPerPage;
        let end = begin + this.numberPerPage;
        this.pageList = this.list.slice(begin, end);
        return this.pageList;
    }

    /**
     * Load paginated data
     */

    load() {
        this.makeList();
        this.loadList();
    }
}

export default Paginator;