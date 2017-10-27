
// speaking 라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;
var addspeaking = function(req, res) {

	
};
var updatespeaking = function(req, res) {
	console.log("speaking에 있는 updatespeaking 호출됨");
	
	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;
	var paramspeakingAnnounceImage = req.body.speakingAnnounceImage || req.query.speakingAnnounceImage;
	var paramspeakingAnnouncementAudio = req.body.speakingAnnouncementAudio || req.query.speakingAnnouncementAudio;
	var paramspeakingProblem = req.body.speakingProblem || req.query.speakingProblem;
	var paramspeakingProblemReading = req.body.speakingProblemreading || req.query.speakingProblemreading;
	var paramspeakingProblemListeningImage = req.body.speakingProblemListeningImage || req.query.speakingProblemListeningImage;
	var paramspeakingProblemListeningAudio = req.body.speakingProblemListeningAudio || req.query.speakingProblemListeningAudio;
	var paramspeakingProblemAnswer = req.body.speakingProblemAnswer || req.query.speakingProblemAnswer;
	console.log("회차 : " + paramExamNO + "회차 설명 : " + paramExamDesc);
	console.log("요청 파라미터 : " +paramspeakingProblemType);
	var database = req.app.get('database');

	if(database.db){
		console.log(database.UserModel);
		database.SpeakingModel.findByExamNO(paramExamNO,

		function(err, results){
			if(err){
				console.error('챕터 넘버를 찾던 중 에러 발생 : '+ err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8;'});
				res.write('<h2>챕터 넘버를 찾던 중 에러 발생 </h2>');
				res.write('<p>'+err.stack+'</p>');
				res.end();

				return;
			}
			console.dir("result = "+ results);
			if(results != null)
				{
					database.ListeningModel.update(
						{'ExamNO':paramExamNO},{'$push':{'Problem':{
						'speakingProblemType':paramspeakingProblemType,
						'speakingAnnounceImage':paramspeakingAnnounceImage,
						'speakingAnnouncementAudio':paramspeakingAnnouncementAudio,
						'speakingProblem':paramspeakingProblem,
						'speakingProblemReading':paramspeakingProblemReading,
						'speakingProblemListeningImage':paramspeakingProblemListeningImage,
						'speakingProblemListeningAudio':paramspeakingProblemListeningAudio,
						'speakingProblemAnswer':paramspeakingProblemAnswer	
						}}}, {'upsert':true}, function(err, results){
							if(err){
								console.error('문제 추가 중 에러 발생 : ' +err.stack);

								res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
								res.write('<h2>speaking 문제 추가 중 에러 발생 </h2>');
								res.write('<p>'+err.stack+'</p>');
								res.end();

								return;
							}
							console.log('speaking 문제를 추가했습니다!');

							return res.redirect('./toefl/addExam.ejs');
						})
				}
		    })
	} else{
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
		res.end();
	}

};

var removespeaking = function(req, res) {

};

var listspeaking = function(req, res) {

};

var speaking_ch2 = function(req, res){
	console.log("toeflSpekaing ch2로 이동함.")

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;
	console.log("요청 파라미터 : " + paramExamNO + " , " + paramExamDesc);
	console.log("요청 스피킹 타입 : " + paramspeakingProblemType);

	var database = req.app.get('database');
	//데이터 베이스 초기화

	if(database.db){
		console.log("데이터 베이스를 초기화 했습니다.")
		
		database.SpeakingModel.findByExamNO(paramExamNO, function(err, results){
			if(err){
				console.error('회차를 찾던중 에러가 발생했습니다. : ' +err.stack);

				res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>회차를 찾던 중 에러가 발생했습니다.</h2>');
				res.write('<p>'+err.stack+'</p>');
				res.end();
				
				return;
			}
			console.log("results" +results);


			
				if(results[0].Problem[1] != null){
												
					var temp = results[0].Problem[1].speakingProblem;
					var temp2 = results[0].Problem[1].speakingProblemAnswer;
					var temp3 = results[0].Problem[1].speakingAnnouncementAudio
					console.log(temp);
					console.log("db에서 저장된 문제를 찾았습니다!");
					console.log("db에서 저장된 문서를 불러옵니다.")
						var context = {
							ExamNO : paramExamNO,
							ExamDesc : paramExamDesc,
							speakingProblemType : paramspeakingProblemType,
							speakingAnnouncementAudio : temp3,
							speakingProblem : temp,
							speakingProblemAnswer : temp2,
							login_success : true,
							user:req.user
							};
					console.log(context.speakingProblem);

					req.app.render('./NewToefl/speaking/AddSpeaking_ch2.ejs',context, function(err, html){

					if(err){
						console.error('AddSpeaking_ch2_ejs 로 랜더링중 에러 발생' + err.stack);

						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>렌더링중 문제 발생 </h2>');
						res.write('<p>'+err.stack+'</p>');
						res.end();

						return;
					}
					console.log('응답 웹문서 : ' +html);
					res.end(html);

						});	

				}else if(results[0].Problem[1] == undefined){

				console.log("db에 저장된 문제가 없습니다. ");
				console.log("새로 만들기로 이동합니다.")
						var context = {
							ExamNO : paramExamNO,
							ExamDesc : paramExamDesc,
							speakingProblemType : paramspeakingProblemType,
							speakingProblem : 1,
							speakingAnnouncementAudio :1,
							speakingProblemAnswer:1,
							login_success : true,
							user:req.user
							};
					req.app.render('./NewToefl/speaking/AddSpeaking_ch2.ejs',context, function(err, html){

					if(err){
						console.error('AddSpeaking_ch2_ejs 로 랜더링중 에러 발생' + err.stack);

						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>렌더링중 문제 발생 </h2>');
						res.write('<p>'+err.stack+'</p>');
						res.end();

						return;
					}
					console.log('응답 웹문서 : ' +html);
					res.end(html);

						});
					}		
				})
			}else{
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
				res.end()
				}
};
var speaking_ch3 = function(req, res){
	console.log("toeflSpeaking ch3 로 이동합니다.");

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;

	console.log("요청 회차 : " + paramExamNO + "요청 회차 설명 " + paramExamDesc);
	console.log("요청 스피킹 타입 : " +paramspeakingProblemType);

	var database = req.app.get('database');
	//데이터베이스를 초기화 합니다.

	if(database.db){
		console.log("데이터베이스를 초기화 했습니다.");

		database.SpeakingModel.findOne(
			{'Problem':{'speakingProblemType':paramspeakingProblemType}}, function(err, results){
				if(err){
					console.error('Chapter Number 를 찾던 중 에러가 발생 : ' +err.stack);
					
					res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>speaking chapterNumber 찾는중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');

					return;
				}

				console.log('db에 저장된 챕터넘버가 없습니다.');
				console.log('chapter3 새로만들기로 이동합니다.');

				var context= {
					ExamNO : paramExamNO,
					ExamDesc : paramExamDesc,
					speakingProblemType : paramspeakingProblemType,
					// speakingProblem : "novalue",
					// speakingProblemAnswer : "novalue",
					login_success : true,
					user: req.user
				};

				req.app.render('./NewToefl/speaking/AddSpeaking_ch3.ejs', context, function(err, html){
					if(err){
						console.error('AddSpeaking_ch3_ejs 를 랜더링하는중 에러가 발생했습니다' + err.stack);

						res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>랜더링중 문제 발생 </h2>');
						res.write('<p>'+err.stack+'</p>');
						res.end();

						return;
					}
					console.log('응답 웹문서 : ' +html);
					res.end(html);
				})
			})
	}else{
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

var speaking_ch4 = function(req, res){
	console.log("toeflSpeaking ch_4로 이동합니다.")

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.body.speakingProblemType;

	console.log("요청 회차 : " + paramExamNO + "회차 설명 : " + paramExamDesc);
	console.log("요청 스피킹 타입 : " + paramspeakingProblemType);

	var database = req.app.get('database');
	//데이터베이스를 초기화 합니다.

	if(database.db){
		console.log("데이터베이스를 초기화 했습니다.");

		database.SpeakingModel.findOne({
			'Problem':{'speakingProblemType':paramspeakingProblemType}
		}, function(err, results){
			if(err){
				console.error('Chapter Number 를 찾던 중 에러가 발생 : ' +err.stack);
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>speaking chapterNumber 찾는 중 에러 발생 <h2>');
				res.write('<p>'+ err.stack + '</p>');

				return;
			}
			console.log('db에 저장된 챕터 넘버가 없습니다.');
			console.log('chapter4 새로 만들기로 이동합니다.');

			var context = {
				ExamNO : paramExamNO,
				ExamDesc : paramExamDesc,
				speakingProblemType : paramspeakingProblemType,
				login_success : true,
				user: req.user
			};

			req.app.render('./NewToefl/speaking/AddSpeaking_ch4.ejs', context, function(err, html){
				if(err){
					console.error('AddSpeaking_ch_4 를 랜더링하는중 에러가 발생했습니다 ' );

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>렌더링중 문제 발생 </h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();

					return;
				}
				console.log('응답 웹문서 : ' + html);
				res.end(html);
			})

		})
	}else{
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

var speaking_ch5 = function(req, res){
	console.log('toeflSpeaking ch5로 이동합니다.');

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;

	console.log('요청 회차 : ' + paramExamNO + "요청 회차 설명 : " + paramExamDesc);
	console.log("요청 스피킹 타입 : " + paramspeakingProblemType);

	var database  = req.app.get('database');
	//데이터베이스 초기화 

	if(database.db){
		console.log("데이터베이스를 초기화 했습니다.");
		
		database.SpeakingModel.findOne(
			{'Problem':{'speakingProblemType':paramspeakingProblemType}}, function(err, result){
				if(err){
					console.error("db에서 챕터 넘버를 찾던 중 에러가 발생했습니다.");
					res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>speaking chapterNumber 찾는중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');

					return;
				}
				console.log('db에 저장된 챕터 넘버가 없습니다.');
				console.log('chapter5 새로만들기로 이동합니다.');

				var context={
					ExamNO : paramExamNO,
					ExamDesc : paramExamDesc,
					speakingProblemType : paramspeakingProblemType,
					login_success : true,
					user : req.user
				};

				res.app.render('./NewToefl/speaking/AddSpeaking_ch5.ejs', context, function(err, html){
					if(err){
						console.error('AddSpeaking_ch5.ejs 를 렌더링 하던 중 에러가 발생했습니다.');
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>랜더링 중 에러가 발생했습니다.</h2>');
						res.write('<p>'+err.stack+'</p>');

						return;
					}
					console.log('응답 웹문서 : ' + html);
					res.end(html);
				});

			})
	}else{
	   res.writeHead('200', {'content-Type':'text/html;charset=utf8'});
	   res.write('<h2>데이터베이스 연결 실패</h2>');
	   res.end();
	}
}


var speaking_ch6 = function(req, res){
	console.log('toeflSpeaking ch6로 이동합니다.');

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;

	console.log('요청 회차 : ' + paramExamNO + "요청 회차 설명 : " + paramExamDesc);
	console.log("요청 스피킹 타입 : " + paramspeakingProblemType);

	var database  = req.app.get('database');
	//데이터베이스 초기화 

	if(database.db){
		console.log("데이터베이스를 초기화 했습니다.");
		
		database.SpeakingModel.findOne(
			{'Problem':{'speakingProblemType':paramspeakingProblemType}}, function(err, result){
				if(err){
					console.error("db에서 챕터 넘버를 찾던 중 에러가 발생했습니다.");
					res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>speaking chapterNumber 찾는중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');

					return;
				}
				console.log('db에 저장된 챕터 넘버가 없습니다.');
				console.log('chapter6 새로만들기로 이동합니다.');

				var context={
					ExamNO : paramExamNO,
					ExamDesc : paramExamDesc,
					speakingProblemType : paramspeakingProblemType,
					login_success : true,
					user : req.user
				};

				res.app.render('./NewToefl/speaking/AddSpeaking_ch6.ejs', context, function(err, html){
					if(err){
						console.error('AddSpeaking_ch6.ejs 를 렌더링 하던 중 에러가 발생했습니다.');
						res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
						res.write('<h2>랜더링 중 에러가 발생했습니다.</h2>');
						res.write('<p>'+err.stack+'</p>');

						return;
					}
					console.log('응답 웹문서 : ' + html);
					res.end(html);
				});

			})
	}else{
	   res.writeHead('200', {'content-Type':'text/html;charset=utf8'});
	   res.write('<h2>데이터베이스 연결 실패</h2>');
	   res.end();
	}
}

module.exports.addspeaking = addspeaking;
module.exports.updatespeaking = updatespeaking;
module.exports.removespeaking = removespeaking;
module.exports.listspeaking = listspeaking;

module.exports.speaking_ch2 = speaking_ch2;
module.exports.speaking_ch3 = speaking_ch3;
module.exports.speaking_ch4 = speaking_ch4;
module.exports.speaking_ch5 = speaking_ch5;
module.exports.speaking_ch6 = speaking_ch6;


// module.exports.showspeaking = showspeaking;

