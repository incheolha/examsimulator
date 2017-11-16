

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
var writing_int = function(req, res){

    console.log("toefl_Teacher에 있는 writing 호출됨");
    
    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramwritingProblemType = req.body.writingProblemType || req.query.writingProblemType;


    console.log("요청 파라미터 : " + paramExamNO + ", " + paramExamDesc);

    var database = req.app.get('database');
    //데이터베이스 초기화
    if(database.db){
        console.log("데이터베이스를 초기화 했습니다.")

        database.WritingModel.findByExamNO(paramExamNO, function(err, results){
            if(err){
                console.error("챕터넘버와 db의 챕터넘버가 맞지 않습니다." +err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>챕터 넘버를 찾던 중 에러가 발생 </h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;
            }
            console.dir("results = " +results) //내가 찾고 있는 영역확인
            if(results[0].Problem[0] != null) //찾은 내용이 있다면 진행
                {
                    console.log("db 에 저장된 문제를 찾았습니다.");
                    console.log("db 의 문제와함께 랜더링합니다.")
                    //회차정보와 로그인 정보를 파라미터로 묶어 넘긴다.
                    var context = { 
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc,
                        writingProblemType : results[0].Problem[0].writingProblemType,
                        writingProblemReading : results[0].Problem[0].writingProblemReading,
                        writingProblemListeningImage : results[0].Problem[0].writingProblemListeningImage,
                        writingProblemListeningAudio : results[0].Problem[0].writingProblemListeningAudio,
                        writingProblemAnswer : results[0].Problem[0].writingProblemAnswer,
                        login_success:true,
                        user:req.user
                    };


                    res.app.render('./NewToefl/writing/AddWriting_int.ejs', context, function(err, html){
                        if(err){
                            console.error('응답 웹문서 생성 중 에러 발생 : ' +err.stack);

                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성중 에러 발생 </h2>'+ err.stack);
                            res.end();

                            return;
                        }
                        console.log('응답 웹문서 : ' +  html);
                        res.end(html);
                    })

                }else if(results[0].Problem[0]==undefined){

                    


                    console.log("db에 저장된 문제가 없습니다.");
                    console.log("새로운 문제 만들기로 이동합니다.");

                    //파라미터를 넘길때 가짜 정보를 묶어서 넘깁니다.
                    // 값 1을 주는 이유 : 새로운 문제만들기 랜더링으로 넘어가기위함.
                    var context = {
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc,
                        writingProblemType : paramwritingProblemType,
                        writingProblemReading :1,
                        writingProblemListeningImage : 1,
                        writingProblemListeningAudio : 1,
                        writingProblemAnswer : 1,
                        login_success : true,
                        user : req.user

                    }
                    
                    res.app.render('./NewToefl/writing/Addwriting_int.ejs', context, function(err, html){
                        if(err){
                            console.error("응답 웹문서 생성중 에러 발생 : "+err.stack)

                            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2>응답 웹문서 생성중 에러 발생 </h2>' +err.stack);
                            res.end();
                            
                            return;
                        }
                        console.log("응답 웹문서 : " + html);
                        res.end(html);
                    })

                }
        })


    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
};

var writing_ind = function(req, res){
    console.log("toefl_Teacher에 있는 writing 독립형 호출됨");

    var paramExamNO =req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramwritingProblemType = req.body.writingProblemType || req.query.writingProblemType;

    console.log("요청 파라미터 : " + paramExamNO + ", " +paramExamDesc +", " +paramwritingProblemType);

    var database = req.app.get('database');

    if(database.db){
        console.log("데이터베이스를 초기화 했습니다.");

        database.WritingModel.findByExamNO(paramExamNO , function(err, results){
            if(err){
                console.error("챕터넘버와 db의 챕터넘버가 맞지 않습니다." + err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>챕터넘버를 찾던 중 에러가 발생 </h2>');
                res.write('<p>'+err.stack+"</p>");
                res.end();
                return;
            }
            
            console.log("results = "+ results) // 찾은 영역을 확인합니다.
            if(results[0].Problem[1]!=null) //찾은 내용이 있다면 진행
            {
                //db에서 찾은 내용과 함께 파라미터로 묶어 넘깁니다.
                var context = {
                    ExamNO : paramExamNO,
                    ExamDesc : paramExamDesc,
                    writingProblemType : paramwritingProblemType,
                    writingProblem : results[0].Problem[1].writingProblem,
                    // writingProblemReading : results[0].Problem[1].writingProblemReading,
                    writingProblemAnswer : results[0].Problem[1].writingProblemAnswer,
                    login_success: true,
                    user:req.user
                }

                

                res.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                    if(err){
                        console.error('응답 웹문서 생성 중 에러 발생 : '+ err.stack);
                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>독립형으로 랜더링중 에러 발생 <h2>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();
                        return;
                    }
                    console.dir('응답 웹문서' + html);
                    res.end(html);


                })


            }else if(results[0].Problem[1]==undefined){
                //db에서 찾은 내용이 없을경우 
                //가짜 파라미터를 만들어서 넘깁니다.
                console.log("db에 저장된 문제가 없습니당");
                console.log("문제 새로 만들기로 랜더링!");
              
                var context = {
                    ExamNO : paramExamNO,
                    ExamDesc : paramExamDesc,
                    writingProblem : 1,
                    // writingProblemReading :1,
                    writingProblemAnswer :1,
                    writingProblemType : paramwritingProblemType,
                    login_success : true,
                    user:req.user
                };

                req.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                    if(err){
                        console.error("독립형으로 랜더링중 문제가 발생했습니다."+ err.stack);

                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>랜더링중 문제가 발생했습니다.</h2>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();

                        return;
                    }
                    console.log('응답 웹문서 : '+ html);
                    res.end(html);
                })

            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패<h2>');
        res.end();
    }
};




module.exports.reading = reading;
module.exports.listening = listening;
module.exports.speaking = speaking;
module.exports.writing_int = writing_int;
module.exports.writing_ind = writing_ind;