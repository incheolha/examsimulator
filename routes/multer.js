

// 파일 업로드용 미들웨어
 var multer = require('multer');
 var fs = require('fs');

 var setting = true;
 var setting2 = true;
 var modifyFileName1 = ""
 var modifyFileName2 = ""
 var paramExamNO = ""
 var paramExamDesc = ""
 var paramlisteningChapterNumber = ""
 var path = 'uploads/toefl/lc/'
 var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, path)
	},

	filename: function(req, file, callback) {
		if (setting == true) {
		 modifyFileName1 = file.originalname; 
		 callback(null,  modifyFileName1);
		 console.log("야호" + modifyFileName1);
			 setting = false;
		}
		else {
			 modifyFileName2 = file.originalname;
			callback(null,  modifyFileName2);
			console.log("야호2" + modifyFileName2);
	
			setting = true;
		}
	}
});

 var updatelistening = function(req, res){

	console.log('/process/multer/updatelistening 호출 됨')
	
	var upload = multer({
		storage: storage
	}).any('userFile')
	upload(req, res, function(err) {

		paramExamNO = req.body.ExamNO;
		paramExamDesc = req.body.ExamDesc;
		paramlisteningChapterNumber = req.body.listeningChapterNumber;
		paramlisteningChapterImage = modifyFileName1;
		paramlisteningChapterAudio = modifyFileName2;
		console.log(paramExamNO + "점검 회차 넘버확인 ");
		console.log(paramExamDesc + "점검 회차 설명확인");
		console.log(paramlisteningChapterNumber + "점검 챕터넘버 확인")

		 
		var database = req.app.get('database');
		
					if(database.db){
						console.log("db ok");
						
						database.ListeningModel.findByExamNO(paramExamNO,function(err, results){
								if(err){
									console.error('회차를 찾던 중 에러 발생 : ' +err.stack);
		
									res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
									res.write('<h2>회차를 찾던 중 에러 발생</h2>');
									res.write('<p>' +err.stack + '</p>');
									res.end();
		
									return;
								}
								console.log("회차 넘바 " +paramExamNO)
								console.dir('result =' +results);
		
								if(results !=null)
									{
										database.ListeningModel.update({
											'ExamNO':paramExamNO},{"$set":{'listeningParagraph':[{
												'listeningChapterNumber':paramlisteningChapterNumber,
												'listeningChapterImage':modifyFileName1,
												'listeningChapterAudio':modifyFileName2
		
											}]}}, {'upsert': true}, function(err, results){
												if(err){
													console.error('Chapter Number 추가중 에러 발생 ' +err.stack);
		
													res.writeHead('200', {'Content-Type':'text/html:charset=utf8'});
													res.write('<h2>listening chapter number 추가 중 에러 발생 </h2>');
													res.write('<p>'+err.stack+'</p>');
													res.end();
		
													return;
												};
												console.log("chatperNumber 추가됨")
												console.log(paramExamNO + "이곳은 fs를 위한 곳이당 ");
												console.log(paramlisteningChapterAudio)

												var rename="toefl_LC_"+paramExamNO+"_"+paramlisteningChapterNumber+"_"
												console.log(rename + "바꾸고자 하는 이름");
												var path2="../uploads/toefl/lc/"
												// var realorigin=
												// var newone= "";
												// fs.realpath(paramlisteningChapterAudio, function(err,stats){
												// 	if(err) throw err;
												// 	console.log("진짜경로는 요거" +stats)
												// })
												
													if(setting2 ==true){

													fs.rename(path+paramlisteningChapterAudio, path+rename+paramlisteningChapterAudio+".mp3", function(err){
														if(err) throw err;
														console.log("성공 ??")
														setting2=false;
													})

													fs.rename(path+paramlisteningChapterImage, path+rename+paramlisteningChapterImage+".png", function(err){
														if(err) throw err;
														console.log("성공 ?");
														setting2=true;
													})
													};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
												

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
		
	})
				
	
	
};

module.exports.updatelistening = updatelistening;



