const { Router } = require('express')

const router = Router()

const users = requireUncached('./users')

function requireUncached (module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

router.get('/profile', (req, res) => {
  if (!req.session.email) {
    return res.status(403).json({ error: 'Unauthenticated' })
  }

  const foundUser = users.find(user => user.email == req.session.email)

  res.json(foundUser)
})

module.exports = router
