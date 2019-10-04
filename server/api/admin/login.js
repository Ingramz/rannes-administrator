const { Router } = require('express')
const crypto = require('crypto')

const router = Router()

const users = requireUncached('../users')

function requireUncached (module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

function md5(str) {
  return crypto
          .createHash('md5')
          .update(str)
          .digest('hex')
}

const lockout = {}

router.post('/admin/login', (req, res) => {
  if (!req.session.email) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  if (req.body && req.body.password) {
    const email = req.session.email.toLowerCase()
    const password = md5(req.body.password)
    const foundUser = users.find(user => user.email === email && user.password === password)

    if (foundUser) {
      req.session.admin = true

      return res.status(200).json({ admin: true })
    }

    return res.status(403).json({ error: 'Invalid credentials' })
  }

  res.status(400).json({ error: 'Invalid request' })
})

module.exports = router
