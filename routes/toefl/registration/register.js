
// 시험등록  라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var addregister = function(req, res) {
		console.log('register 모듈 안에 있는 add register 호출됨.');

	var paramRegisterNo = req.body.registerNo || req.query.registerNo;
    var paramRegisterDesc = req.body.registerDesc || req.query.registerDesc;

	console.log(paramRegisterNo+ " ," + paramRegisterDesc);

 	var database = req.app.get('database');
	 
if (database.db) {
				//회차 정보 저장
				var register = new database.RegisterModel({
				RegisterNo: paramRegisterNo,
				RegisterDesc: paramRegisterDesc
				});
				//reading 정보 저장
				var readingContext = new database.ReadingModel({
					ExamNO: paramRegisterNo,
					ExamDesc: paramRegisterDesc
				});
				//listening 정보 저장
				var listeningContext = new database.ListeningModel({
					ExamNO : paramRegisterNo,
					ExamDesc : paramRegisterDesc
				});
				//speaking 정보 저장 
				var speakingContext = new database.SpeakingModel({
					ExamNO : paramRegisterNo,
					ExamDesc : paramRegisterDesc
				}); 
				// listening 정보 저장
				var writingContext = new database.WritingModel({
					ExamNO : paramRegisterNo,
					ExamDesc : paramRegisterDesc,
					
				});

			register.saveRegister(function(err, result) {
			        if (err) {
                        console.error('회차정보 저장중 에러 발생: ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>회차 정보 저장 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
            	
			    console.log("register collection에 회차정보를 저장함.");
			    console.log('회차정보', + register.RegisterNo);
			    
			    return res.redirect('/'); 
			});

			readingContext.saveReading(function(err, result){
				if(err) {
					console.error('리딩 정보 저장 중 에러 발생 : ' +err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>리딩 정보 저장 중 에러 발생</h2>');
					res.write('<p>'+ err.stack +'</p>');
					res.end();
					return;
				}
			console.log("reading collection에 회차정보를 저장함")
			console.log('회차정보', + readingContext.RegisterNo);	

		})

			listeningContext.saveListening(function(err, result){
				if(err){
					console.error('리스닝 정보 저장 중 에러 발생 : '+ err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>리스닝 정보 저장 중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end()
				}
			console.log("speaking collection 회차정보를 저장함")
			console.log('회차정보', + listeningContext.RegisterNo);		


		});

			speakingContext.saveSpeaking( function(err, result){
				if(err){
					console.error('스피킹 정보 저장 중 에러 발생 :' + err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>스피킹 정보 저장 중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();

				
				}
			console.log("writing collection에 회차정보를 저장함")
			console.log('회차정보', + speakingContext.registerNo);	
		});

			writingContext.saveWriting(function (err, result){
				if(err){
					console.error('라이팅 정보 저장 중 에러 발생 : '+ err.stack);
					res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>라이팅 정보 저장 중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
				}
			console.log("reading 스키마에 회차정보를 저장함")
			console.log('회차정보', + writingContext.RegisterNo);		
		})


		
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

var updateregister = function(req, res) {
	console.log('register 모듈 안에 있는 add register 호출됨.');
	var paramRegisterNo = req.body.registerNo || req.query.registerNo;
	var paramRegisterDesc = req.body.registerDesc || req.query.registerDesc;


	console.log("회차 :" +paramRegisterNo +" ," + "Desc" + ":"+ paramRegisterDesc);
	
	var context= {
		ExamNO : paramRegisterNo,
		ExamDesc : paramRegisterDesc,
		login_success:true,
		user:req.user
	};

 	var database = req.app.get('database');
	 

if (database.db) {

	console.log('database ok');
	database.RegisterModel.findOne({ RegisterNo: paramRegisterNo }, function (err, doc){
 		doc.RegisterDesc = paramRegisterDesc;
  		doc.save();
			        if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();
                        return;
                    }
            	
			    console.log("글 데이터 추가함.");
			    console.log('글 작성', '포스팅 글을 생성했습니다. : ' + doc.RegisterNo);
			    return;
			    // return res.redirect('/'); 
			});
		 console.log(context.ExamNO);
		 console.log(context.ExamDesc); 
		 
		 
		 //context안에 parameter를 담아서 Addexam으로 보냄  
			res.app.render('./NewToefl/index.ejs', context, function(err, html){
			
			if(err){
				console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>응답 웹문서 생성 중 에러 발생'+ err.stack);
				res.end();
				
				return;
				
			}
			console.log('응답 웹문서 : ' + html );
			res.end(html);
		})
	
	
	
		}else{
	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	res.write('<h2>데이터베이스 연결 실패</h2>');
	res.end();
	}
};

var removeregister = function(req, res) {

};

var listregister = function(req, res) {

};

var exampost = function(req,res) {
	console.log('post 모듈 안에 있는 showpost 호출됨.');
  
    // URL 파라미터로 전달됨
    var paramId = req.body.id || req.query.id || req.params.id;
	
    console.log('요청 파라미터 : ' + paramId);
    
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		database.RegisterModel.load(paramId, function(err, results) {
			if (err) {
                console.error('게시판 글 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
				console.dir(results);
  
                // 조회수 업데이트
                console.log('trying to update hits.');
                
                database.PostModel.incrHits(results._doc._id, function(err2, results2) {
                    console.log('incrHits executed.');
                    
                    if (err2) {
                        console.log('incrHits 실행 중 에러 발생.');
                        console.dir(err2);
                        return;
                    }
                    
                });
                
                
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '글 조회 ',
					posts: results,
					Entities: Entities
				};
				
				req.app.render('board/showpost.ejs', context, function(err, html) {
					if (err) {
                        console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);
                
                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }
					
					console.log('응답 웹문서 : ' + html);
					res.end(html);
				});
			 
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}

}

module.exports.addregister = addregister;
module.exports.updateregister = updateregister;
module.exports.removeregister = removeregister;
module.exports.listregister = listregister;
module.exports.exampost = exampost;


