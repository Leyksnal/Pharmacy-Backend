const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const userImage = multer({ storage: storage }).single('image')
  const postImage = multer({ storage: storage }).single('avatar')
  const itemimage = multer({ storage: storage }).single('ava')

  module.exports = {userImage, postImage, itemimage}