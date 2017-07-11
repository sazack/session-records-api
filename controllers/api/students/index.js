'use strict';

const mw = require('../middleware')
const express = require('express');
const router = express.Router();
const student = require('./students');

router.post('/add',student.collect,student.add,mw.respond,mw.error)
router.get('/view',student.retrieve,mw.respond,mw.error)
router.put('/update',student.collect,student.update,mw.respond,mw.error)
router.get('/delete/:id',student.collect,student.delete,mw.respond,mw.error)
router.get('/view/:id',student.collect,student.findById,mw.respond,mw.error)
router.get('/list/:interest',student.collect,student.findByInterest,mw.respond,mw.error)


module.exports = router
