const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = 8080
const API_TIMEOUT = 2000

function apiAnswer(req) {
  let text = ''
  switch (req) {
    case '1':
      text = 'A'
      break
    case '2':
      text = 'B'
      break
    case '3':
      text = 'C'
      break
    default:
      text = req
      break
  }
  return {
    text,
  }
}

const app = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.url.startsWith('/api/')) {
    const _req = req.url.slice(5, req.url.length)
    const result = apiAnswer(_req)
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    }, API_TIMEOUT)
    return
  }

  let filePath = '.' + req.url
  if (filePath == './') filePath = './index.html'
  let contentType = 'text/html'

  let fileExtension = path.extname(filePath)
  switch (fileExtension) {
    case '.css':
      contentType = 'text/css'
      break
    case '.js':
      contentType = 'text/javascript'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.json':
      contentType = 'application/json'
      break
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error }))
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data, 'utf-8')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
