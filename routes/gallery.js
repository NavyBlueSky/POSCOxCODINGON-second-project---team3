const express = require("express")
const galleryController =require("../controller/Cgallery")
const router = express.Router()

//갤러리 리뷰 페이지로
router.get("/review",galleryController.reviewPage)

module.exports = router;