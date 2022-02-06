const express = require('express')
const router = express()
const create = require('../controller/CRUD/create')
const read = require('../controller/CRUD/read')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.get('/book/:code', read?.read);

router.post('/create/:code', create);
// router.patch('/:id',library.update)
// router.delete('/delete/:id',library.remove)

module.exports = router
