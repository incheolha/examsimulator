//writing chapter에서 문제 업로드시 이곳에서 처리합니다.

//file 처리에 필요한 모듈 정의
var multer = require('multer');
var fs = require('fs');

//문제 변수 초기화

var paramExamNO = "";
var paramExamDesc = "";
var paramwritingProblemType = "";
var paramwritingAnnounceDirection = "";
var paramwritingAnnouncementAudio = "";
var paramwritingProblem = "";
var paramwritingProblemReading = "";
var writingProblemListeningImage = "";
var writingProblemListeningAudio = "";
var paramwritingProblemAnswer = "";
var temp = true;
var path = "./uploads/toefl/wr/";
var array = {};

// 저장공간 확보 기능
    var storage = multer.diskStorage({
        destination: function(req, file,callback){
            callback(null, 'uploads')
        },

        filename: function(req,file,callback){
            console.log(file)
            if(file.fieldname=='writingProblemListeningImage'){
                writingProblemListeningImage = file.originalname;
                console.log("Announce Image : "+writingProblemListeningImage );

                callback(null, writingProblemListeningImage);
     ;
            }
            else  if(file.fieldname=='writingProblemListeningAudio'){
                writingProblemListeningAudio = file.originalname;
                 console.log("Announcement Audio : "+writingProblemListeningAudio );
                callback(null, writingProblemListeningAudio);

            }
        }

    });

// writing problem 기능 부분

    var addProblemWriting = function(req, res){
		console.log('/process/toefl/speaking/multerAddWriting 호출됨');



			var upload = multer({
				storage: storage
			}).any('userFile')

			upload(req, res, function(err){
				paramExamNO = req.body.ExamNO;
				paramExamDesc = req.body.ExamDesc;
				paramwritingProblemType = req.body.writingProblemType;
				paramwritingProblem = req.body.writingProblem;
				paramwritingProblemReading = req.body.writingProblemReading;
				paramwritingProblemListeningImage = writingProblemListeningImage;
				paramwritingProblemListeningAudio = writingProblemListeningAudio;
				paramwritingProblemAnswer = req.body.writingProblemAnswer;

				console.log(paramwritingProblemListeningImage +"이미지" )
				console.log(paramwritingProblemListeningAudio +"오디오 ");
				console.log("회차 : " +paramExamNO +"Description : " + paramExamDesc );

					console.log("확인해보자 라이팅 타입 " + paramwritingProblemType);


				console.log("통합형으로 랜더링하자.");

				var database = req.app.get('database');

					if(database.db){
						console.log('데이터베이스를 초기화했습니다.'+ database.db)

						database.WritingModel.findByExamNO(paramExamNO, function(err, results) {

                            if (err) {
                                console.error("회차를 찾던중 에러 발생 : " + err.stack);

                                errorHandling(err);

                            } else {


                                var context = {
                                    ExamNO: paramExamNO,
                                    ExamDesc: paramExamDesc,
                                    writingProblem: paramwritingProblem,
                                    writingProblemType: paramwritingProblemType,
                                    writingProblemReading: paramwritingProblemReading,
                                    writingProblemListeningAudio: paramwritingProblemListeningAudio,
                                    writingProblemListeningImage: paramwritingProblemListeningImage,
                                    writingProblemAnswer: paramwritingProblemAnswer,
                                    login_success: true,
                                    user: req.user
                                };

                                if (results[0].Problem[0] != undefined) {

                                    
                                    deleteAndUpdateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                                        paramwritingProblemReading, paramwritingProblemListeningImage,
                                        paramwritingProblemListeningAudio, paramwritingProblemAnswer);

                                    } else {
                                            // 새로 problem array 생성
                                      updateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                                        paramwritingProblemReading, paramwritingProblemListeningImage,
                                        paramwritingProblemListeningAudio, paramwritingProblemAnswer);

                                    } 


                                    if (paramwritingProblemType == 1) {
                                            problemTypeRoutingPath = './NewToefl/writing/AddWriting_int.ejs';

                                        } else {

                                            problemTypeRoutingPath = './NewToefl/writing/AddWriting_ind.ejs';

                                        }
                                            req.app.render(problemTypeRoutingPath, context, function (err, html) {
                                                if (err) {
                                                    errorHandling(err);
                                                    return;
                                                }
                                                console.log("응답 웹문서 : " + html);
                                                res.end(html);
                                            });
                            }
                        });

                 } else{
                    res.writeHead('200', {'content-Type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 연걸에 실패했습니다. </h2>');
                    res.end();
                 }
	        });
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




    
    function updateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
        paramwritingProblemReading, paramwritingProblemListeningImage,
        paramwritingProblemListeningAudio,paramwritingProblemAnswer) {

  
            database.WritingModel.update({
                'ExamNO':paramExamNO},{"$push":{'Problem':{
                'writingProblemType':paramwritingProblemType,
                'writingProblem':paramwritingProblem,
                'writingProblemReading':paramwritingProblemReading,
                'writingProblemAnswer':paramwritingProblemAnswer
            }}}, function(err, results){
                if(err){
                    console.error('DB에 문제를 추가하던중 에러가 발생했습니다.'+ err.stack);

                    errorHandling(err);
                }
                    console.log("DB에 성공적으로 문제를 추가했습니다.")


                    var rename="toefl_WR_"+paramExamNO+"_"+paramwritingProblemType+"_";
                    var concre = path+rename;
                    console.log("바꾸고자 하는 이름" + concre);


                    fs.exists("./uploads/"+paramwritingProblemListeningAudio, function(exists){
                        console.log(exists? 'yes':"no");
                        if(exists = 'yes'){
                            fs.rename("./uploads/"+paramwritingProblemListeningAudio, concre+paramwritingProblemListeningAudio, function(err){
                                if(err) throw err;
                                console.log("업로드 실패?");
                            });
                            console.log("할룽");
                        }
                    });

                    fs.exists("./uploads/"+ paramwritingProblemListeningImage, function(exists){
                        console.log(exists? 'yes':"no");
                        if(exists = 'yes'){
                            fs.rename("./uploads/"+paramwritingProblemListeningImage, concre+paramwritingProblemListeningImage, function(err){
                                if(err) throw err;
                                console.log("업로드 실팽 ");
                            });
                        }
                    });


            });
           return;
    }
    function deleteAndUpdateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
        paramwritingProblemReading, paramwritingProblemListeningImage,
        paramwritingProblemListeningAudio,paramwritingProblemAnswer) {


            database.WritingModel.update({'ExamNO': paramExamNO},
            {$pull: {"Problem": {writingProblemType: paramwritingProblemType}}},
            function (err, results) {
                if (err) {
                    errorHandling(err);

                } else {
                
                        database.WritingModel.update({
                            'ExamNO':paramExamNO},{"$push":{'Problem':{
                            'writingProblemType':paramwritingProblemType,
                            'writingProblem':paramwritingProblem,
                            'writingProblemReading':paramwritingProblemReading,
                            'writingProblemAnswer':paramwritingProblemAnswer
                        }}}, function(err, results){
                            if(err){
                                console.error('DB에 문제를 추가하던중 에러가 발생했습니다.'+ err.stack);

                                errorHandling(err);
                            }
                                console.log("DB에 성공적으로 문제를 추가했습니다.")


                                var rename="toefl_WR_"+paramExamNO+"_"+paramwritingProblemType+"_";
                                var concre = path+rename;
                                console.log("바꾸고자 하는 이름" + concre);


                                fs.exists("./uploads/"+paramwritingProblemListeningAudio, function(exists){
                                    console.log(exists? 'yes':"no");
                                    if(exists = 'yes'){
                                        fs.rename("./uploads/"+paramwritingProblemListeningAudio, concre+paramwritingProblemListeningAudio, function(err){
                                            if(err) throw err;
                                            console.log("업로드 실패?");
                                        });
                                        console.log("할룽");
                                    }
                                });

                                fs.exists("./uploads/"+ paramwritingProblemListeningImage, function(exists){
                                    console.log(exists? 'yes':"no");
                                    if(exists = 'yes'){
                                        fs.rename("./uploads/"+paramwritingProblemListeningImage, concre+paramwritingProblemListeningImage, function(err){
                                            if(err) throw err;
                                            console.log("업로드 실팽 ");
                                        });
                                    }
                                });


                        }

                        );
                }

            });
                       
           return;
    }






module.exports.addProblemWriting = addProblemWriting;
