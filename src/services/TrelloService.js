import axios from 'axios'

const API_URL = 'http://localhost:3001'

const http = axios.create({
  baseURL : API_URL,
  withCredentials: true
})

export const columns = () => {
  return http.get('/columns')
}

export const newColumn = (column) => {
  return http.post('/columns', column)
}

export const deleteColumn = (id) => {
  return http.delete(`/columns/${id}`)
}

export const deleteCard = (id) => {
  return http.delete(`/cards/${id}`)
}

export const newCard = (card) => {
  const data =  new FormData();
  Object.keys(card).forEach(key => data.append(key, card[key]))
  return http.post('/cards', data)
}