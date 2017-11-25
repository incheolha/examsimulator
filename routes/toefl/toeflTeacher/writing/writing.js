
// writing 라우팅 설정 


// html-entities module is required in showwriting.ejs
var Entities = require('html-entities').AllHtmlEntities;

var addwriting = function(req, res) {

};

var updatewriting = function(req, res) {
    console.log('writing 모듈 안에 있는 updatewriting 호출됨.');
	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc; 
	var paramwritingProblemType= req.body.writingProblemType || req.query.writingProblemType;
	var paramwritingAnnounceImage = req.body.writingAnnounceImage || req.query.writingAnnounceImage;
	var paramwritingAnnouncementAudio = req.body.writingAnnouncementAudio || req.query.writingAnnouncementAudio;
	var paramwritingProblem = req.body.writingProblem || req.query.writingProblem;
	var paramwritingProblemReading = req.body.writingProblemReading || req.query.writingProblemReading;
	var paramwritingProblemListeningImage = req.body.writingProblemListeningImage || req.query.writingProblemListeningImage;
	var paramwritingProblemListening = req.body.writingProblemListening || req.query.writingProblemListening;
	var paramwritingProblemAnswer = req.body.writingProblemAnswer || req.query.writingProblemAnswer;

	console.log('요청 파라미터 : ' + paramwritingProblemType);
	var database = req.app.database('database');

	if(database.db){
		console.log(database.UserModel);
		database.WritingModel.findByExamNO(paramExamNO,
		
			function(err, results){
				if(err){
					console.error('챕터 넘버를 찾던 중 에러 발생 : ' +err.stack);

					res.writeHead('200', {'Content-Type':'text/html;charset=utf8;'});
					res.write('<h2>챕터 넘버를 찾던 중 에러 발생 </h2>');
					res.write('<p>'+ err.stack + '</p>');
					res.end();

					return;
				}
				console.dir("result = " + results);
				if(results != null)
					{
						database.WritingModel.update(
						{'ExamNO':paramExamNO},{'$push':{'Problem':{
							'writingProblemType':paramwritingProblemType,
							'wrtingAnnounceImage':paramwritingAnnounceImage,
							'writingAnnouncementAudio':paramwritingAnnouncementAudio,
							'writingProblem':paramwritingProblem,
							'writingProblemReading':paramwritingProblemReading,
							'writingProblemListening':paramwritingProblemListening,
							'writingProblemListeningImage':paramwritingProblemListeningImage,
							'writingProblemAnswer':paramwritingProblemAnswer
						}}}, {'upsert':true}, function(err, results){
							if(err){
								console.error('문제 추가 중 에러 발생 : '+ err.stack);

								res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
								res.write('<h2>writing 문제 추가 중 에러 발생 </h2>');
								res.write('<p>'+err.stack+'</p>');
								res.end()

								return;
							}
							return res.redirect('./toefl/addExam.ejs');

						})
					}
			})
	}else{

		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
		res.end();
	}

};

var removewriting = function(req, res) {
    
};

var listwriting = function(req, res) {
	console.log('writing 모듈 안에 있는 listwriting 호출됨.');
  
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
	
    console.log('요청 파라미터 : ' + paramPage + ', ' + paramPerPage);
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
		
		database.WritingModel.list(options, function(err, results) {
			if (err) {
                console.error('게시판 글 목록 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>게시판 글 목록 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
			if (results) {
				console.dir(results);
				// 전체 문서 객체 수 확인
				database.WritingModel.count().exec(function(err, count) {
					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						writings: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage
					};
					req.app.render('./board/listwriting.ejs', context, function(err, html) {
                        if (err) {
                            console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
                            res.write('<p>' + err.stack + '</p>');
                            res.end();
                            return;
                        }
						res.end(html);
					});
				});
			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>글 목록 조회  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
};

var showwriting = function(req, res) {
	console.log('writing 모듈 안에 있는 showwriting 호출됨.');
  
    // URL 파라미터로 전달됨
    var paramId = req.body.id || req.query.id || req.params.id;
	
    console.log('요청 파라미터 : ' + paramId);
    
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 1. 글 리스트
		database.WritingModel.load(paramId, function(err, results) {
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
  
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				
				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {
					title: '글 조회 ',
					writings: results,
					Entities: Entities
				};
				
				req.app.render('./toefl/writing/showwriting.ejs', context, function(err, html) {
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
				res.write('<h2>글 조회실패함</h2>');
				res.end();
			}
		});
	
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
    
	
};

var addproblem = function(req, res) {
	console.log('writing 모듈 안에 있는 addproblem 호출됨.');
 
	var paramId = req.body.id || req.query.id;
	
    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramContents = req.body.contents || req.query.contents;
    var paramWriter = req.body.writer || req.query.writer;
    var paramWritingProblemType = req.body.writingProblemType || req.query.writingProblemType;
    var paramWritingAnnounceImage = req.body.writingAnnounceImage || req.query.writingAnnounceImage;
    var paramWritingAnnounceMentAudio = req.body.writingAnnounceMentAudio || req.query.writingAnnounceMentAudio;
    var paramWritingProblem = req.body.writingProblem || req.query.writingProblem;
    var paramWritingProblemReading = req.body.writingProblemReading || req.query.writingProblemReading;
    var paramWritingProblemListeningImage = req.body.writingProblemListeningImage || req.query.writingProblemListeningImage;
    var paramWritingProblemListening = req.body.writingProblemListening || req.query.writingProblemListening;
    var paramWritingProblemAnswer = req.body.writingProblemAnswer || req.query.writingProblemAnswer;
	
    console.log('요청 파라미터 : ' + paramExamNO + ', ' + paramExamDesc + ', ' + paramContents + ', ' + 
               paramWriter + ', ' + paramWritingProblemType + ', ' + paramWritingAnnounceImage + ', ' + paramWritingAnnounceMentAudio + ', ' + paramWritingProblem + ', ' + paramWritingProblemReading + ', ' + paramWritingProblemListeningImage + ', ' + paramWritingProblemListening + ', ' + paramWritingProblemAnswer);
    
	var database = req.app.get('database');
	
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		
		// 1. 아이디를 이용해 사용자 검색
		database.WritingModel.findByIdAndUpdate(paramId,
            {'$push': {'Problem':{'writingProblem':paramWritingProblem, 'writingProblemReading':paramWritingProblemReading}}},
            {'new':true, 'upsert':true},
            function(err, results) {
                if (err) {
                    console.error('게시판 댓글 추가 중 에러 발생 : ' + err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>게시판 댓글 추가 중 에러 발생</h2>');
                    res.write('<p>' + err.stack + '</p>');
                    res.end();

                    return;
                }

                console.log("글 데이터 추가함.");
                console.log('글 작성', '포스팅 글을 생성했습니다. : ' + paramId);

                return res.redirect('/process/toefl/writing/showwriting/' + paramId); 
        });
 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


module.exports.addwriting = addwriting;
module.exports.updatewriting = updatewriting;
module.exports.removewriting = removewriting;
module.exports.listwriting = listwriting;
module.exports.showwriting = showwriting;
module.exports.addproblem = addproblem;
