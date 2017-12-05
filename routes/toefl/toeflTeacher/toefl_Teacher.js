

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
								req.app.render('./toefl/toeflTeacher/reading/reading.ejs', context, function(err, html){
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
                            req.app.render('./toefl/toeflTeacher/listening/listening.ejs', context, function(err, html){
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


var goBackMain = function(req, res){
    console.log("toefl_Teacher js 에 있는 gobackMain 호출됨 ");

    var paramExamNO = req.body.ExamNO || req.query.ExamNO ;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    console.log("회차 : " + paramExamNO + " 회차설명 : " + paramExamDesc );
    
    var database = req.app.get('database');

    if(database.db){
        console.log("db가 초기화되었습니다.")

        database.RegisterModel.findOne({'RegisterNo':paramExamNO}, function(err, results){
            if(err){
                console.error("db의 내용과 비교중 에러가 발생했습니다.." +err.stack)
                errorHandling(err);


            } else {
                console.log("db에 이동하려는 회차를 찾았습니다.")
                console.log("메인으로 랜더링 합니다.");

                var context = {
                    ExamNO : paramExamNO,
                    ExamDesc : paramExamDesc,
                    login_success : true,
                    user : req.user
                }

                req.app.render('./toefl/toeflTeacher/index.ejs', context, function(err, html){
                    if(err){
                        console.error("메인페이지 랜더링중 에러가 발생했습니다." + err.stack);
                        errorHandling(err);

                        return;
                    }

                    console.log('응답 웹문서 : '+html);
                    res.end(html);

                })

            }
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write("<h2>데이터 베이스 연결에 실패했습니다.</h2>");
        res.end();
    }
}


// error 핸들링 기능

function errorHandling(err) {
    
            console.error("Add_Writing_ind로 랜더링 중 에러 발생"+ err.stack);
    
            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>통합형으로 랜더링 중 에러 발생</h2> ');
            res.write('<p>'+err.stack+'</p>');
            res.end();
    
            return;
    
        }
    


module.exports.goBackMain = goBackMain;
module.exports.reading = reading;
module.exports.listening = listening;
