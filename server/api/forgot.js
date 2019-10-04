const { Router } = require('express')

const router = Router()

const users = require('./users')

router.get('/forgot', (req, res) => {
  if (req.query.email) {
    const email = req.query.email.toLowerCase()

    const found = users.find(user => user.email === email)

    if (found) {
      return res.json({ message: `Email successfully sent to ${email}!` })
    }

    return res.status(404).json({ error: 'No such email exists in database' })
  }

  res.status(400).json({ error: 'Invalid request' })
})

module.exports = router
