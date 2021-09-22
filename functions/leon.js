exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Leon',
      age: 85,
      email: 'leon@abc.com'
    })
  }
}