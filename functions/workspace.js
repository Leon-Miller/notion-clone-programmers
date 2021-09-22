require('dotenv').config()
const axios = require('axios')
const { API_ENDPOINT, API_KEY } = process.env

exports.handler = async function (event) {
  const options = JSON.parse(event.body)
  const { id = '', method, body } = options
  const { data } = await axios({
    url: `${API_ENDPOINT}${id}`,
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-username': API_KEY
    },
    data: body
  })
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}