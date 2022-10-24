export class Api {
  #API_KEY = '28871664-21007d01445281d8ccfafe378';
  #BASE_URL = 'https://pixabay.com/api/';

  constructor() {
    this.perPage = 12;
    this.remainPages = 0;
  }

  async fetchImages(query, page = 1) {
    const response = await fetch(
      `${this.#BASE_URL}?q=${query}&page=${page}&key=${
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
}
