

// toefl_teacher 라우팅 설정 


var Entities = require('html-entities').AllHtmlEntities;

var reading = function(req, res) {
	console.log("reading에 있는 updatereading 호출됨");
	console.log(req.body.readingChapterNumber);

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramreadingChapterNumber = req.body.readingChapterNumber || req.query.readingChapterNumber;
	var paramreadingScript = req.body.readingScript || req.query.readingScript;
	console.log("챕터넘버 : " +paramExamNO + "챕터설명 : "+paramExamDesc );
	console.log("요청 파라미터 : " + paramreadingChapterNumber);
	var database = req.app.get('database'); 

	if(database.db){
		console.log(database.UserModel);
		database.ReadingModel.findByExamNO(paramExamNO,
	
			function(err, results){
				if(err){
					console.error('챕터 넘버를 찾던 중 에러 발생 : ' + err.stack);
					res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
					res.write('<h2>챕터 넘버를 찾던 중 에러 발생</h2>');
					res.write('<p>'+err.stack+'</p>');
					res.end();
					return;
				}
				console.dir("result = " + results) //console을 활용해 내가 어디를 찾고있는지 확인
				if(results != null) //find 한 내용이 들어왔다면 업데이트 한다.
					{
						database.ReadingModel.update(
							{'ExamNO':paramExamNO}, {'$push':{'readingParagraph':{
								'readingChapterNumber':paramreadingChapterNumber
							}}}, {'upsert':true}, function(err, results){
								if(err){
									console.error('Chapter Number 추가중 에러 발생 :' +err.stack);

									res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
									res.write('<h2>listening chapter number 추가 중 에러 발생 </h2>');
									res.write('<p>'+err.stack+'</p>');
									res.end();

									return;
								}
								console.log("Chapter Number 추가됨");

								var context = {
									ExamNO : paramExamNO,
									ExamDesc : paramExamDesc,
									readingChapterNumber : paramreadingChapterNumber,
									login_success : true,
                       				user:req.user
								};
								//parameter와 함께 addReading.ejs로 넘어가기.	
								req.app.render('./NewToefl/reading/AddReading.ejs', context, function(err, html){
									if(err){
										console.error('Add_reading.ejs 랜더링중 에러 발생'+ err.stack);

										res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
										res.write('<h2>랜더링중 문제 발생</h2>');
										res.write('<p>'+ err.stack + '</p>');
										res.end();

										return;
									};
									console.log('응답 웹 문서 : ' + html);
									res.end(html);

								});
							}
						)}
			})
	}else{
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
		res.end();
	}
};

var listening = function(req, res){
    console.log("toefl_Teacher 에 있는 reading 호출됨")
    
    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramlisteningChapterNumber = req.body.listeningChapterNumber || req.query.listeningChapterNumber;
    console.log("회차 : " + paramExamNO + "회차설명 : " +paramExamDesc);
    console.log("챕터 넘버 : " +paramlisteningChapterNumber );

    var database = req.app.get('database');

    if(database.db){
        console.log("db가 초기화 되었습니다.");
        database.ListeningModel.findByExamNO(paramExamNO, function(err, results){
            if(err){
                console.error("db와 현재 작업중인 회차가 맞지 않습니다.");
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>db와 현재 작업중인 회차가 맞지 않습니다.</h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;

            }
            console.dir("result = " +results) //console을 활용해 내가 어디 작업하는지 확인하기
            if(results !=null) //찾은 내용이 있을경우 함수 진행
                {

                    database.ListeningModel.update(
                        {'ExamNO':paramExamNO}, {'$push':{'listeningParagraph':{
                            'listeningChapterNumber':paramlisteningChapterNumber
                        }}},{'upsert':true}, function(err, results){
                            if(err){
                                console.error('Chapter Number를 추가중 에러가 발생했습니다.'+err.stack);
                                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                res.write('<h2>listening chapter number 추가중 에러가 발생했습니다 </h2>');
                                res.write('<p>'+err.stack+'</p>');
                                res.end();

                                return;

                            }
                            console.log('Chatper number를 성공적으로 추가했습니다.');

                            var context = {
                                ExamNO : paramExamNO,
                                ExamDesc : paramExamDesc,
                                listeningChapterNumber : paramlisteningChapterNumber,
                                login_success : true,
                                user: req.user
                            }
                            //parameter와 함께 addListening.ejs로 넘기기
                            req.app.render('./NewToefl/listening/AddListening.ejs', context, function(err, html){
                                if(err){
                                    console.error('AddListening으로 렌더링 중 에러가 발생했습니다.'+ err.stack);

                                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                    res.write('<h2>렌더링 중 문제가 발생했습니다.</h2>');
                                    res.write('<p>'+err.stack+'</p>');
                                    res.end();

                                    return;
                                }
                                console.log('응답 웹문서 : ' +html);
                                res.end(html);
                            })
                        } 
                    )}
                 })
    }else{
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8;'});
        res.write('<h2>데이터베이스 연결에 실패했습니다 </h2>');
        res.end();
    }

};

var speaking = function(req, res){
    console.log("toefl_Teacher 에 있는 speaking 호출됨");

    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;
    console.log("요청 파라미터 : " + paramExamNO + ", " +paramExamDesc);

    var database = req.app.get('database');
    //데이터 베이스 초기화

    if(database.db){
        console.log("데이터 베이스를 초기화 했습니다.")

        database.SpeakingModel.findByExamNO(paramExamNO, function(err, results){
            if(err){
                console.error("챕터넘버와 db 의 챕터넘버가 맞지 않습니다." + err.stack);
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2> 챕터 넘버를 찾던 중 에러가 발생했습니다. </h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;
            }
            console.dir("results = " + results) // 현재 내가 어디를작업하는지 확인

            if(results[0].Problem[0] != null) // 찾은 내용이 있다면 진행
                {

                    var temp = results[0].Problem[0].speakingProblem;
                    var temp2 = results[0].Problem[0].speakingProblemAnswer;
                    var temp3 = results[0].Problem[0].speakingAnnouncementAudio;

                    console.log("db 에 저장된 문제를 찾았습니다.!");
                    console.log("db 에서 저장된 문제를 불러옵니다.")

                    // 넘길 정보를 묶어 파라미터로 넘깁니다..

                    var context= {
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc,
                        speakingProblemType : paramspeakingProblemType,
                        speakingProblem : temp,
                        speakingProblemAnswer : temp2,
                        speakingAnnouncementAudio : temp3,
                        login_success : true,
                        user:req.user
                    };

                    res.app.render('./NewToefl/speaking/AddSpeaking.ejs', context, function(err, html){
                        if(err){
                            console.error("응답 웹 문서 생성 중 에러 발생 : " + err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2> 응답 웹문서 생성 중 에러 발생 </h2>' + err.stack);
                            res.end();

                            return;
                        }
                        console.log('응답 웹문서 : ' + html);
                        res.end(html)
                    });
                }else if(results[0].Problem[0]==undefined){ //찾은 내용이없다면 이곳에서 진행
                    console.log("db에 저장된 문제가 없네요!");
                    console.log("문제 새로 만들기로 이동합니다.");

                    var context = {
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc, 
                        speakingProblemType : paramspeakingProblemType,
                        speakingProblem : 1,
                        speakingAnnouncementAudio : 1,
                        speakingProblemAnswer:1,
                        login_success : true,
                        user:req.user
                    };

                    req.app.render('./NewToefl/speaking/AddSpeaking.ejs',context, function(err, html){
                        if(err){
                            console.error("Addspeaking.ejs 로 랜더링중 에러가 발생했습니다."+ err.stack)

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
        })
    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
}


// writing 통합형/ 독립형 기능

var writing = function(req, res){

    console.log("toefl_Teacher에 있는 writing 호출됨");
    
    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramWritingProblemType = req.body.writingProblemType || req.query.writingProblemType;


    console.log("요청 파라미터 + problem type : " + paramExamNO + ", " + paramWritingProblemType);

    if (paramWritingProblemType == 1) {
      
        problemTypeRoutingPath = './NewToefl/writing/AddWriting_int.ejs';

    } else {

     
        problemTypeRoutingPath = './NewToefl/writing/AddWriting_ind.ejs';

    }

    var database = req.app.get('database');
    //데이터베이스 초기화
    if(database.db){
        console.log("데이터베이스를 초기화 했습니다.");

        database.WritingModel.findByExamNO(paramExamNO, function(err, results){
            if(err){
         
                errorHandling(err);

            }
            console.dir("results = " +results); //내가 찾고 있는 영역확인

            if(results[0].Problem[0] != null) //찾은 내용이 있다면 진행
            {


                console.log("db 에 저장된 문제를 찾았습니다.");
                console.log("db 의 문제와함께 랜더링합니다.");
                //회차정보와 로그인 정보를 파라미터로 묶어 넘긴다.
                for (var i = 0; i < results[0].Problem.length; i++) {

                    console.log("i 값은:"+ results[0].Problem.length);
                    if (results[0].Problem[i].writingProblemType == paramWritingProblemType) {
                        console.log("db측 문제 유형은 "+ results[0].Problem[i].writingProblemType);
                        console.log("문제 유형은 "+ paramWritingProblemType);
                        
                        var context = {
                            resultModifyTag: true,
                            ExamNO: paramExamNO,
                            ExamDesc: paramExamDesc,
                            writingProblemType: results[0].Problem[i].writingProblemType,
                            writingProblem: results[0].Problem[i].writingProblem,
                            writingProblemReading: results[0].Problem[i].writingProblemReading,
                            writingProblemListeningImage: results[0].Problem[i].writingProblemListeningImage,
                            writingProblemListeningAudio: results[0].Problem[i].writingProblemListeningAudio,
                            writingProblemAnswer: results[0].Problem[i].writingProblemAnswer,
                            login_success: true,
                            user: req.user
                        };
   
                        
                        console.log("라우팅 경로:"+problemTypeRoutingPath);
                        console.log("문제유형:"+context.writingProblemType);
                        console.log("시험문제:"+context.ExamNO);
                        console.log("시험설명:"+context.ExamDesc);
                        console.log("시험지문:"+context.writingProblemReading);
                        console.log("라이팅 문제:"+context.writingProblem);
                        console.log("라이팅 문제 정답:"+context.writingProblemAnswer);
                        
                        break;

                    } else {
                        
                        var context = {
                            resultModifyTag: false,
                            ExamNO : paramExamNO,
                            ExamDesc : paramExamDesc,
                            writingProblemType : paramWritingProblemType,
                            writingProblem : '',
                            writingProblemReading : '',
                            writingProblemListeningImage : '',
                            writingProblemListeningAudio : '',
                            writingProblemAnswer : '',
                            login_success : true,
                            user : req.user

                        };
                    }

                    console.log("count I 값은"+ i);
                }
     
         

            } else if (results[0].Problem[0]== undefined ) {

                console.log("db에 저장된 문제가 없습니다.");
                console.log("새로운 문제 만들기로 이동합니다.");



                var context = {
                    resultModifyTag: false,
                    ExamNO : paramExamNO,
                    ExamDesc : paramExamDesc,
                    writingProblemType : paramWritingProblemType,
                    writingProblemReading : '',
                    writingProblemListeningImage : '',
                    writingProblemListeningAudio : '',
                    writingProblemAnswer : '',
                    login_success : true,
                    user : req.user

                };

               
            }

            console.log("문제 resultMotifyTag: " + context.resultModifyTag);


            res.app.render(problemTypeRoutingPath, context, function(err, html){
                if(err){
                    errorHandling(err);
                }
                console.log("응답 웹문서 : " + html);
                res.end(html);
             });

        });


    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
};

// error 핸들링 기능

function errorHandling(err) {
    
            console.error("Add_Writing_ind로 랜더링 중 에러 발생"+ err.stack);
    
            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>통합형으로 랜더링 중 에러 발생</h2> ');
            res.write('<p>'+err.stack+'</p>');
            res.end();
    
            return;
    
        }
    


module.exports.reading = reading;
module.exports.listening = listening;
module.exports.speaking = speaking;
module.exports.writing = writing;
