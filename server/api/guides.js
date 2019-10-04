const { Router } = require('express')

const router = Router()

const articles = require('./articles').filter(article => article.published)

router.get('/guides', (req, res) => {
  res.json(articles)
})

module.exports = router
