const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = 8080
const API_TIMEOUT = 2000

const app = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.url.startsWith('/api/sin')) {
    const _req = parseFloat(req.url.slice(9, req.url.length))
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({ result: Math.sin((_req * Math.PI) / 180).toFixed(2) })
      )
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
