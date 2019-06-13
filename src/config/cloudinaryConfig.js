module.exports = function (app) {
    const cloud_name = process.env.CLOUDINARY_CLOUDNAME
    const api_key = process.env.API_KEY_CLOUDINARY
    const api_secret = process.env.API_SECRET_CLOUDINARY

    return {
        cloud_name, api_key, api_secret
    }
}