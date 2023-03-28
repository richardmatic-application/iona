import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  timeout: 10000,
  headers: {
    'x-api-key': 'live_GNsJSZX7ElbNvqkimZtQ0uu5EZEMGdZ7qDpmxshvASUTnZ7ICoo5fyIoXrNGaSzr',
  },
});
