
var p1 = "";
var p2 = "";
var p3 = "";

// 파일 업로드용 미들웨어
 var multer = require('multer');
// var fs = require('fs');

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
// var cors = require('cors

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'uploads')
	},
	filename: function(req, file, callback) {
		var modifyFileName = file.originalname + Date.now();
		
		console.log("여기 점검하기" + modifyFileName);
		callback(null,  modifyFileName);
        console.log("두번째 점검하기" + modifyFileName);
	}

})

var singleupload = function(req, res) {
	console.log('/process/photo 호출됨.');
	var upload = multer({
		storage: storage
	}).single('userFile')
	upload(req, res, function(err) {
		res.end('File is uploaded')
	})
};


var multipleupload = function(req, res) {
	console.log('/process/multipleupload 호출됨.');
	var upload = multer({
		storage: storage
	}).any('userFile')
	upload(req, res, function(err) {
		res.end('Files is uploaded')
	})
};

var updatelistening = function(req, res){
	console.log('/process/multer/updatelistening 호출 됨')
	var upload = multer({
		storage: storage
	}).any('userFile')
	upload(req, res, function(err){
		console.log('file이 업로드 되었습니다.')
		var paramExamNO = req.body.ExamNO || req.query.ExamNO;
		var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
		var paramlisteningChapterNumber = req.body.listeningChapterNumber || req.query.listeningChapterNumber;
        var paramlisteningChapterImage = modifyFileName;
        var paramlisteningChapterAudio = "";
	    console.log("멱혀라............." + paramExamNO);
		console.log("멱혀라............." + paramExamDesc);
		console.log("멱혀라............." + paramlisteningChapterNumber);
		console.log("멱혀라............." + paramlisteningChapterAudio);
		console.log("멱혀라............." + paramlisteningChapterImage);
		
			
var database = req.app.get('database');

	if(database.db){
		console.log(database.UserModel);
		database.ListeningModel.findByExamNO(paramExamNO,
			
			function(err, results){
				if(err){
					console.error('챕텁 넘버를 찾던 중 에러 발생 : ' +err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>챕터 넘버를 찾던 중 에러 발생</h2>');
					res.write('<p>' +err.stack + '</p>');
					res.end();

					return;
				}
				console.dir('result =' +results);
				if(results !=null)
					{
						database.ListeningModel.update({
							'ExamNO':paramExamNO},{'$push':{'listeningParagraph':{
								'listeningChapterNumber':paramlisteningChapterNumber,
								'listeningChapterImage':paramlisteningChapterImage,
								'listeningChapterAudio':paramlisteningChapterAudio

							}}}, {'upser':true}, function(err, results){
								if(err){
									console.error('Chapter Number 추가중 에러 발생 ' +err.stack);

									res.writeHead('200', {'Content-Type':'text/html:charset=utf8'});
									res.write('<h2>listening chapter number 추가 중 에러 발생 </h2>');
									res.write('<p>'+err.stack+'</p>');
									res.end();

									return;
								};
								console.log("chatperNumber 추가됨")
								
								var context = 
								{
									ExamNO : paramExamNO,
									ExamDesc : paramExamDesc,
									listeningChapterNumber : paramlisteningChapterNumber
								};

								req.app.render('./toefl/listening/Add_Listening.ejs', context, function(err, html){
									if(err){
										console.error('Add_Listening.ejs 랜더링중 에러 발생 ' +err.stack);

										res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
										res.write('<h2>랜더링중 문제 발생 </h2>');
										res.write('<p>'+err.stack+'</p>');
										res.end();

										return;
									}
									console.log('응답 웹문서 : '+ html);
									res.end(html);

								});
							}
					)}
			})
	}else {
		res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
		res.end();
	}


	});

	console.log(" this is a image upload filename...." + result100);

};



module.exports.singleupload = singleupload;
module.exports.multipleupload = multipleupload;
module.exports.updatelistening = updatelistening;