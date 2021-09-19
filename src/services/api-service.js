import axios from 'axios';

const API_KEY = '21325700-25e62cbcf61651ae4fee03a33';
axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  const url = `/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(url).then(response => response.data.hits);
};

export default fetchImages;
