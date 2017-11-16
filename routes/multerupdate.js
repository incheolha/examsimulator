

// 파일 업로드용 미들웨어
var multer = require('multer');

 var setting = true;
 var modifyFileName1 = ""
 var modifyFileName2 = ""
 var paramExamNO = ""
 var paramExamDesc = ""
 var paramlisteningChapterNumber = ""
 var updatelistening = function(req, res){

	console.log('/process/multer/updatelistening 호출 됨')
	var upload = multer({
		storage: storage
	}).any('userFile')
	upload(req, res, function(err) {
	})
			
	console.log("멱혀라............." + paramExamNO);
	console.log("멱혀라............." + paramExamDesc);
	console.log("멱혀라............." + paramlisteningChapterNumber);
	console.log("멱혀라............." + modifyFileName1);
	console.log("멱혀라............." + modifyFileName2);
    			
		var database = req.app.get('database');

			if(database.db){
				console.log(database.UserModel);
				database.ListeningModel.findByExamNO(paramExamNO,function(err, results){
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
										'listeningChapterImage':modifyFileName1,
										'listeningChapterAudio':modifyFileName2

									}}}, {'upsert': true}, function(err, results){
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
 }

 
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, 'uploads')
	},

	filename: function(req, file, callback) {
		if (setting == true) {
		   modifyFileName1 = file.originalname + Date.now();
		 callback(null,  modifyFileName1);
		 console.log("야호" + modifyFileName1);
			 setting = false;
		}
		else {
			 modifyFileName2 = file.originalname + Date.now();
			callback(null,  modifyFileName2);
			console.log("야호2" + modifyFileName2);
			setting = true;
			paramExamNO = req.body.ExamNO;
			paramExamDesc = req.body.ExamDesc;
			paramlisteningChapterNumber = req.body.listeningChapterNumber;
			paramlisteningChapterImage = modifyFileName1;
			paramlisteningChapterAudio = modifyFileName2;

		    }
	     }
})

module.exports.updatelistening = updatelistening;