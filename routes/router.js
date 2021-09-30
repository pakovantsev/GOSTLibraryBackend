const express = require('express')
var router = express()
const create = require('../controller/library')
const view = require('../controller/library')
const update = require('../controller/library')
const remove = require('../controller/library')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.post('/create/:code',create.create)
router.get('/',view.view)
router.patch('/:id',update.update)
router.delete('/delete/:id',remove.remove)

module.exports = router
