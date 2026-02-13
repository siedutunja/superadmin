import axios from 'axios'

const ApiColegios = {
  BASE_URL: 'https://www.datos.gov.co/resource/d64g-7qfy.json',
  
  async getAll (limit = 50000) {
    try {
      const url = `${this.BASE_URL}?$limit=${limit}`
      return axios.get(url)
    } catch (error) {
      console.error('Error fetching colegios:', error)
      throw error
    }
  },


}

export default ApiColegios

