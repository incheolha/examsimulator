
// reading 라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;


var removereading = function(req, res) {

};

var listreading = function(req, res) {						// 내가 출제한 문제 리스트 뽑는 함수 
	console.log('post 모듈 안에 있는 listpost 호출됨.');
  
    var paramPage = req.body.page || req.query.page;
    var paramPerPage = req.body.perPage || req.query.perPage;
	
    console.log('요청 파라미터 : ' + paramPage + ', ' + paramPerPage);
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 글 리스트
		var options = {
			page: paramPage,
			perPage: paramPerPage
		}
		
		database.ReadingModel.list(options, function(err, results) {
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
				database.ReadingModel.count().exec(function(err, count) {
					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					// 뷰 템플레이트를 이용하여 렌더링한 후 전송
					var context = {
						title: '글 목록',
						posts: results,
						page: parseInt(paramPage),
						pageCount: Math.ceil(count / paramPerPage),
						perPage: paramPerPage, 
						totalRecords: count,
						size: paramPerPage
					};
					req.app.render('./toefl/reading/listpost.ejs', context, function(err, html) {
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

var showreading = function(req, res) {			// 지문보여주고 문제 출제하는 함수
	console.log('post 모듈 안에 있는 showpost 호출됨.');
  
    // URL 파라미터로 전달됨
    var paramId = req.body.id || req.query.id || req.params.id;
	
    console.log('요청 파라미터 : ' + paramId);
    
    
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 글 리스트
		database.ReadingModel.load(paramId, function(err, results) {   // 아이디 물고오는데 굳이 안넣어도됨 세션으로바꿀경우
			console.log(paramId);
			console.log(results);
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
				
				req.app.render('./toefl/reading/Add_Reading.ejs', context, function(err, html) {
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

var addproblemreading = function(req, res) {				//문제 디비에 저장하는 함수
	console.log('reading 모듈 안에 있는 addproblemreading 호출됨.');
 
    var paramId = req.body.id || req.query.id;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramWriter = req.body.writer || req.query.writer;
    var paramReadingProblemType = req.body.readingProblemType || req.query.readingProblemType; 
	var paramReadingProblem = req.body.readingProblem || req.query.readingProblem;
	var paramReadingSunProblem = req.body.readingSubProblem || req.query.readingSubProblem;
	var paramReadingSunProblem2 = req.body.readingSubProblem2 || req.query.readingSubProblem2;
    var paramReadingArticle1 = req.body.readingArticle1 || req.query.readingArticle1;
    var paramReadingArticle2 = req.body.readingArticle2 || req.query.readingArticle2;
    var paramReadingArticle3 = req.body.readingArticle3 || req.query.readingArticle3;
    var paramReadingArticle4 = req.body.readingArticle4 || req.query.readingArticle4;
	var paramReadingAnswer = req.body.readingAnswer || req.query.readingAnswer;
	var paramReadingAnswer2 = req.body.readingAnswer2 || req.query.readingAnswer2;
    var paramReadingComment = req.body.readingComment || req.query.readingComment;
    var paramReadingGlossary = req.body.readingParagraphGlossary || req.query.readingParagraphGlossary;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramExamDesc + ', ' + paramWriter);
	var database = req.app.get('database');
	// 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		// 아이디를 이용해 사용자 검색 후 맞는자리에 어레이 추가
        console.log(database.UserModel);
		database.ReadingModel.findByIdAndUpdate(paramId,    
            {'$push' : {'readingParagraph' : 
             {'problems':{'readingProblemType':paramReadingProblemType, 
								  'readingProblem':paramReadingProblem,
								  'readingSubProblem':paramReadingSunProblem,
								  'readingSubProblem2':paramReadingSunProblem2,
                                  'readingArticle1':paramReadingArticle1,
                                  'readingArticle2':paramReadingArticle2,
                                  'readingArticle3':paramReadingArticle3,
                                  'readingArticle4':paramReadingArticle4,
								  'readingAnswer' : paramReadingAnswer,
								  'readingAnswer' : paramReadingAnswer2,
                                  'readingComment' : paramReadingComment,
                                  'readingParagraphGlossary' : paramReadingGlossary
                                  }}}},
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

                return res.redirect('/process/showreading/' + paramId); 
        });
 
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


module.exports.removereading = removereading;
module.exports.listreading = listreading;
module.exports.showreading = showreading;
module.exports.addproblemreading = addproblemreading;
