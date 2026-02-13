import axios from 'axios'
 
const ApiColegios = {
  BASE_URL: 'http://localhost:3000/colegios',
  
  async getAll (page = 1, limit = 50000) {
    try {
      const url = `${this.BASE_URL}?page=${page}&limit=${limit}`
      return axios.get(url)
    } catch (error) {
      console.error('Error fetching colegios:', error)
      throw error
    }
  },
}

export default ApiColegios

