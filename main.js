const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = 8080

const factorial = (n) => (n === 0 ? 1 : n * factorial(n - 1))

const app = http.createServer((req, res) => {
  console.log(req.method, req.url)

  if (req.url.startsWith('/api/factorial')) {
    const value = req.url.match(/value=([^&]*)/)?.[1]
    const timeout = req.url.match(/timeout=([^&]*)/)?.[1]

    if (!value) return

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })

    setTimeout(() => {
      const result = factorial(+value)
      res.end(JSON.stringify(result))
    }, timeout)

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
