const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, fn) {
        fn(null, 'assets/');
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const fileFilter = (req, file, fn) => {
    const formats = [
        'image/png',
        'image/jpg'
    ];
    if (formats.includes(file.mimetype)) {
        fn(null, true);
    } else {
        fn(null, false);
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}


module.exports = multer({storage, fileFilter, limits})
