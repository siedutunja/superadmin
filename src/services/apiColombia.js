import axios from 'axios'

const ApiColombia = {
  BASE_URL: 'https://api-colombia.com',
  resolve (endpoint = '') {
    if (!endpoint) return this.BASE_URL
    if (endpoint.startsWith('http')) return endpoint
    return this.BASE_URL + (endpoint.startsWith('/') ? endpoint : '/' + endpoint)
  },
  async get (endpoint) {
    const url = this.resolve(endpoint)
    return axios.get(url)
  }
}

export default ApiColombia
