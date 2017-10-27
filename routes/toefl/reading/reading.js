
// reading 라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var addreading = function(req, res) {												//지문 추가하는 함수, confing.js에 라우팅 잡혀있음
	// console.log('post 모듈 안에 있는 addpost 호출됨.');
    // var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    // var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    // var paramWriter = req.body.writer || req.query.writer;
    // var paramContents = req.body.contents || req.query.contents;
    // var paramReadingParagraph = req.body.readingParagraph || req.query.readingParagraph;
    // console.log('요청 파라미터 : ' + paramExamNO + ', ' + paramExamDesc + ', ' + paramWriter);
	// var database = req.app.get('database');
	// // 데이터베이스 객체가 초기화된 경우 
	// if (database.db) {
    //     console.log(database.UserModel);

	// 	database.UserModel.find( function(err, results) {

	// 		if (err) {
    //             console.error('게시판 글 추가 중 에러 발생 : ' + err.stack);
    //             res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	// 			res.write('<h2>게시판 글 추가 중 에러 발생</h2>');
    //             res.write('<p>' + err.stack + '</p>');
	// 			res.end();
    //             return;
    //         }
	// 		if (results == undefined || results.length < 1) {
	// 			res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	// 			res.write('<h2>사용자 [' + paramWriter + ']를 찾을 수 없습니다.</h2>');
	// 			res.end();	
	// 			return;
	// 		}
	// 		var userObjectId = results[0]._doc._id;
	// 		console.log('사용자 ObjectId : ' + paramWriter +' -> ' + userObjectId);
	// 		// Reading Model 인스턴스 생성
	// 		var reading = new database.ReadingModel({
	// 			ExamNO: paramExamNO,
	// 			ExamDesc: paramExamDesc,
	// 			writer: userObjectId,
    //             readingParagraph : paramReadingParagraph
	// 		}); 
	// 		//save
	// 		reading.saveReading(function(err, result) {
	// 			if (err) {
    //                 if (err) {
    //                     console.error('응답 웹문서 생성 중 에러 발생 : ' + err.stack);

    //                     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    //                     res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
    //                     res.write('<p>' + err.stack + '</p>');
    //                     res.end();
    //                     return;
    //                 }
    //             }
				
	// 		    console.log("글 데이터 추가함.");
	// 		    console.log('글 작성', '포스팅 글을 생성했습니다. : ' + reading._id);
			    
	// 		    return res.redirect('/process/showreading/' + reading._id); 
	// 		});
			
	// 	});
		
	// } else {
	// 	res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
	// 	res.write('<h2>데이터베이스 연결 실패</h2>');
	// 	res.end();
	// }	
};
 var updatereading = function(req, res) {
// 	console.log("reading에 있는 updatereading 호출됨");
// 	console.log(req.body.readingChapterNumber);

// 	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
// 	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
// 	var paramreadingChapterNumber = req.body.readingChapterNumber || req.query.readingChapterNumber;
// 	var paramreadingScript = req.body.readingScript || req.query.readingScript;
// 	console.log("챕터넘버 : " +paramExamNO + "챕터설명 : "+paramExamDesc );
// 	console.log("요청 파라미터 : " + paramreadingChapterNumber);
// 	var database = req.app.get('database'); 

// 	if(database.db){
// 		console.log(database.UserModel);
// 		database.ReadingModel.findByExamNO(paramExamNO,
		
// 			function(err, results){
// 				if(err){
// 					console.error('챕터 넘버를 찾던 중 에러 발생 : ' + err.stack);
// 					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 					res.write('<h2>챕터 넘버를 찾던 중 에러 발생</h2>');
// 					res.write('<p>'+err.stack+'</p>');
// 					res.end();
// 					return;
// 				}
// 				console.dir("result = " + results) //console을 활용해 내가 어디를 찾고있는지 확인
// 				if(results != null) //find 한 내용이 들어왔다면 업데이트 한다.
// 					{
// 						database.ReadingModel.update(
// 							{'ExamNO':paramExamNO}, {'$set':{'readingParagraph':{
// 								'readingChapterNumber':paramreadingChapterNumber,
// 								'readingScript':paramreadingScript
// 							}}}, {'upsert':true}, function(err, results){
// 								if(err){
// 									console.error('Chapter Number 추가중 에러 발생 :' +err.stack);

// 									res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 									res.write('<h2>listening chapter number 추가 중 에러 발생 </h2>');
// 									res.write('<p>'+err.stack+'</p>');
// 									res.end();

// 									return;
// 								}
// 								console.log("Chapter Number 추가됨");

// 								var context = {
// 									ExamNO : paramExamNO,
// 									ExamDesc : paramExamDesc,
// 									readingChapterNumber : paramreadingChapterNumber,
// 									readingScript : paramreadingScript,
// 									login_success : true,
//                        				 user:req.user
// 								};
// 								//parameter와 함께 addReading.ejs로 넘어가기.	
// 								req.app.render('./NewToefl/reading/AddReading.ejs', context, function(err, html){
// 									if(err){
// 										console.error('Add_reading.ejs 랜더링중 에러 발생'+ err.stack);

// 										res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 										res.write('<h2>랜더링중 문제 발생</h2>');
// 										res.write('<p>'+ err.stack + '</p>');
// 										res.end();

// 										return;
// 									};
// 									console.log('응답 웹 문서 : ' + html);
// 									res.end(html);

// 								});
// 							}
// 						)}
// 			})
// 	}else{
// 		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 		res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
// 		res.end();
// 	}
 };

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


module.exports.addreading = addreading;
module.exports.updatereading = updatereading;
module.exports.removereading = removereading;
module.exports.listreading = listreading;
module.exports.showreading = showreading;
module.exports.addproblemreading = addproblemreading;
