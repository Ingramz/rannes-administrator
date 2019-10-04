const { Router } = require('express')

const router = Router()

const articles = require('../articles')

router.get('/admin/edit/:id', (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  const article = articles.find(article => article.id == req.params.id)

  if (article) {
    return res.json(article)
  }

  return res.status(404).json({ error: `Article ${req.params.id} not found` })
})

module.exports = router
