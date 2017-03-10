#!/usr/bin/env node

require('dotenv').config()

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const port = parseInt(process.env.PORT || 3000, 10)

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/', (req, res) => app.render(req, res, '/Home', req.query))
    server.get('/about', (req, res) => app.render(req, res, '/About', req.query))
    server.get('/contact', (req, res) => app.render(req, res, '/Contact', req.query))
    // Add new route here

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`) // eslint-disable-line
    })
  })
