const express = require('express')
var router = express()
const create = require('../controller/CRUD/create')
const read = require('../controller/CRUD/read')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.get('/book',read.viewBook)
// router.get('/articleBook',library.viewArticleBook)
// router.get('/articleMagazine',library.viewArticleMagazine)
// router.get('/articleNewspaper',library.viewArticleNewspaper)
// router.get('/conference',library.viewConference)
// router.get('/site',library.viewSite)

router.post('/create',create.createBook)
// router.patch('/:id',library.update)
// router.delete('/delete/:id',library.remove)

module.exports = router
