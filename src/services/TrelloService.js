import axios from 'axios'

const API_URL = 'http://localhost:3001'

const http = axios.create({
  baseURL : API_URL
})

export const columns = () => {
  return http.get('/columns')
}

export const newColumn = (column) => {
  return http.post('/columns', column)
}

// export const newCard = (card) => {
//   return http.post('/cards', card)
// }


export const newCard = (card) => {
  
  const data =  new FormData();
  Object.keys(card).forEach(key => data.append(key, card[key]))
  return http.post('/cards', data)
}