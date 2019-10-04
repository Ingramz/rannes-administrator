const { Router } = require('express')

const router = Router()

const articles = require('../articles')

router.get('/admin/list', (req, res) => {
  if (!req.session.admin) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  res.json(articles)
})

module.exports = router
