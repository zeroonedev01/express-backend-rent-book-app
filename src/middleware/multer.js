const multer = require("multer")
const Datauri = require("datauri")
const path = require("path")

const storage = multer.memoryStorage()

const multerUploads = multer({ storage }).single("image")
const dUri = new Datauri()
const dataUri = rq =>
  dUri.format(path.extname(rq.file.originalname).toString(), rq.file.buffer)

exports.multerUploads = multerUploads
exports.dataUri = dataUri
