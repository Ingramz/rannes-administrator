const { Router } = require('express')
const crypto = require('crypto')

const router = Router()

const users = requireUncached('./users')

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

router.post('/login', (req, res) => {
  const throttle = 15 // seconds
  const timeDiff = (+new Date - (lockout[req.connection.remoteAddress] || 0)) / 1000
  if (timeDiff < throttle) {
    return res.status(403).json({ error: `You are locked out due to invalid login attempt for ${Math.ceil(throttle - timeDiff)} seconds` })
  }

  if (req.body && req.body.email && req.body.password) {
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    if (password < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' })
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one digit.' })
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one uppercase letter.' })
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ error: 'Password must contain at least one lowercase letter.' })
    }

    const foundUser = users.find(user => user.email == email)

    try {
      if (foundUser.password = md5(password)) {
        req.session.loggedIn = true
        req.session.email = email

        return res.json({ email })
      }
    } catch (ignored) {
      lockout[req.connection.remoteAddress] = +new Date

      return res.status(403).json({ error: 'Invalid credentials' })
    }
  }

  res.status(400).json({ error: 'Invalid request' })
})

module.exports = router
