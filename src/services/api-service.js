import axios from "axios";

const API_KEY = "21325700-25e62cbcf61651ae4fee03a33";
axios.defaults.baseURL = "https://pixabay.com/api";

const api = {
  page: 1,

  fetchGallery(name) {
    const url = `https://pixabay.com/api/?q=${name}&page=${this.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    return fetch(url).then((responce) => {
      this.page += 1;

      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(new Error(`Нет картинок по запросу ${name}`));
    });
  },
  resetPage() {
    this.page = 1;
  },
};

export default api;
