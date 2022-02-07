const express = require('express')
const router = express()
const createSource = require('../controller/CRUD/Create/createSource')
const read = require('../controller/CRUD/read')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.get('/book/:code', read?.read);

router.post('/create/:code', createSource);
// router.patch('/:id',library.update)
// router.delete('/delete/:id',library.remove)

module.exports = router
