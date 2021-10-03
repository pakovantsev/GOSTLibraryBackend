const express = require('express')
var router = express()
const library = require('../controller/library')
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.get('/book',library.viewBook)
router.get('/articleBook',library.viewArticleBook)
router.get('/articleMagazine',library.viewArticleMagazine)
router.get('/articleNewspaper',library.viewArticleNewspaper)
router.get('/conference',library.viewConference)
router.get('/site',library.viewSite)

router.post('/create',library.create)
router.patch('/:id',library.update)
router.delete('/delete/:id',library.remove)

module.exports = router
