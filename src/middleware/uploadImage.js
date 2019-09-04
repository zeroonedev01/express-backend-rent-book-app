const { dataUri } = require("./multer")
const { uploader } = require("../configs/cloudinaryConfig")

const uploadImage = async rq => {
  const file = dataUri(rq).content
  let image = ""
  await uploader
    .upload(file, {
      folder: "rentbookapp"
    })
    .then(result => {
      console.log("Sukses Upload", result.public_id)
      image = result.url
    })
    .catch(err => console.log(err))
  return image
}

const deleteImage = id => {
  console.log("cek id", id)
  if (id.indexOf("cloudinary") > -1) {
    let newId = id.split("/")[8].substring(0, 20)
    return uploader.destroy(`rentbookapp/${newId}`, function(error, result) {
      console.log(result, error)
    })
  }
}

module.exports = { uploadImage, deleteImage }
