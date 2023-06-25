const express = require('express');

const router = express.Router();

const controller = require('../controllers/accountController');

const auth = require('../middlewares/auth');



const path = require('path');

const multer = require('multer');


const storage = multer.diskStorage({

 destination: 'public/uploads/',

 filename: (req, file, cd) => {

    cd(null, Date.now() + path.extname(file.originalname));

 }

});


const upload = multer({
 
    limits: { fieldSize: 1024 * 1024 },

    storage: storage, 

    fileFilter: (req, file, cb) => {

        let fileTypes = /jpeg|jpg|png/;

        let mimeType = fileTypes.test(file.mimetype); 

        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if(mimeType && extname) return cb(null, true); 
        
        cb(new Error ('لا يمكن رفع هذا الملف '))


    } 

});



router.post('/', [auth.authenticated, upload.single('avatar')], controller.profile);


router.post('/password',  auth.authenticated, controller.password);


module.exports = router; 