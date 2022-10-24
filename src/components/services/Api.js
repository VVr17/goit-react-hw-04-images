export class Api {
  #API_KEY = '28871664-21007d01445281d8ccfafe378';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.page = 1;
    this.perPage = 12;
    this.remainPages = 0;
  }

  async fetchImages(query) {
    const response = await fetch(
      `${this.#BASE_URL}?q=${query}&page=${this.page}&key=${
        this.#API_KEY
      }&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
    );
    if (!response.ok) {
      throw new Error(
        'There are no images found for your request. Please, try again'
      );
    }

    return await response.json();
  }

  incrementPage() {
    this.page += 1;
  }

  countRemainPages(totalPictures) {
    this.remainPages =
      Math.ceil(totalPictures / this.picturesPerPage) - this.page;
  }

  resetPageAndCounter() {
    this.page = 1;
    this.remainPages = 0;
  }
}
