const { Router } = require('express')

const router = Router()

router.get('/logout', (req, res) => {
  req.session.destroy()

  res.json({ logged_out: true })
})

module.exports = router
