var path = require('path'),
    jwt= require('jsonwebtoken'),
    config = require('../config/key'),
    download = require('image-downloader'),
    fs = require('fs'),
    resizeImg = require('resize-img'),
    LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./jwtoken');


const validity = (req,res,next)=>{
	let token = localStorage.getItem("jwtoken");
  console.log(token);
	if(token){
		jwt.verify(token,config.secret_Key, function(err, decoded) {
			if (err) {
				res.render('unauthorized');
			}
			else{
				next();
			}
		});
	}
	else{
		res.render('unauthorized');
	}

};

const ThumbnailCreation = (req,res,next)=>{
  //con
	let url = req.query.url;
	let ext = path.extname(url);
  console.log(ext);
	if(ext === '.bmp' || ext === '.jpg' || ext ==='.png'){
		//generate
		const options = {
		 url: url,
		 dest: './images'
		};

		download.image(options)
		.then(({ filename, image }) => {
      console.log(filename);
			resizeImg(fs.readFileSync(filename), {width:50, height:50}).then(img => {
        console.log('working 2')
				fs.writeFileSync("./thumbnails/"+filename, img);
			next();
		}).catch((err) => {
			res.send(err);
		});

	})
	}

	else{
		res.send('File extensions allowed- [bmp,png,jpg]');
	}

};

module.exports.validity = validity;
module.exports.localStorage=localStorage;
module.exports.ThumbnailCreation = ThumbnailCreation;
