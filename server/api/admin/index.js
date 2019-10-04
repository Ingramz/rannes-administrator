const { Router } = require('express')
const login = require('./login')
const list = require('./list')
const edit = require('./edit')

const router = Router()

router.use(login)
router.use(list)
router.use(edit)

module.exports = router
