import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withredentials: false,
  header: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getCards() {
    return apiClient.get('/cards')
  }
}
