const { Router } = require('express')

const guides = require('./guides')
const login = require('./login')
const logout = require('./logout')
const forgot = require('./forgot')
const profile = require('./profile')
const admin = require('./admin/index')

const router = Router()

router.use(guides)
router.use(login)
router.use(logout)
router.use(forgot)
router.use(profile)
router.use(admin)

module.exports = router
