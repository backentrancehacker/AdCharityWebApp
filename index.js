const express = require('express')

const path = require('path')
const fs = require('fs')

const app = express()

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'html')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index.html')
})

app.use((req, res) => {
	res.status(404).render('error.html', {
		error: "Whoops! That page doesn't exist."
	})
})
app.use((req, res) => {
	res.status(500).render('error.html', {
		error: "Oh noes! Something went wrong on our side."
	})
})

app.listen(process.env.PORT || 8080)