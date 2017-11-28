//speaking chapter 문제 업로드시 이곳에서 처리 


//file 처리에 필요한 모듈 정의 
var multer = require('multer');
var fs = require('fs');

//문제 변수 초기화

var paramExamNO = "";
var paramExamDesc = "";
var paramspeakingProblemType = "";
var speakingAnnounceImage = "";
var speakingAnnouncementAudio = "";
var paramspeakingProblem = "";
var paramspeakingProblemReading = "";
var speakingProblemListeningImage= "";
var speakingProblemListeningAudio= "";
var paramspeakingProblemAnswer = "";
var temp = true;
;


var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        console.log(file)
            if(file.fieldname=='speakingAnnounceImage'){
                speakingAnnounceImage = file.originalname;
                console.log("Announce Image : "+speakingAnnounceImage );

                callback(null, speakingAnnounceImage);

            }
            else  if(file.fieldname=='speakingAnnouncementAudio'){
                speakingAnnouncementAudio = file.originalname;
                 console.log("Announcement Audio : "+speakingAnnouncementAudio );
                callback(null, speakingAnnouncementAudio);

            }
            else  if(file.fieldname=='speakingProblemListeningAudio'){
               speakingProblemListeningAudio = file.originalname; 
            console.log("ProblemListening Audio : "+speakingProblemListeningAudio );
                callback(null, speakingProblemListeningAudio);
 
            }
            else if(file.fieldname=='speakingProblemListeningImage'){
               speakingProblemListeningImage = file.originalname; 
             console.log("Problem Listening Image : "+speakingProblemListeningImage );
                callback(null, speakingProblemListeningImage);

            }
    }     
});

var addProblemSpeaking = function(req, res){
    console.log('/toefl/toeflTeacher/multerSpeaking 요청됨')

    var upload = multer({
        storage: storage
    }).any('userFile')
    upload(req, res, function(err){
        paramExamNO = req.body.ExamNO;
        paramExamDesc = req.body.ExamDesc;
        paramspeakingProblemType = req.body.speakingProblemType;
        paramspeakingAnnounceImage = speakingAnnounceImage;
        paramspeakingAnnouncementAudio = speakingAnnouncementAudio;
        paramspeakingProblem = req.body.speakingProblem;
        paramspeakingProblemReading = req.body.speakingProblemReading;
        paramspeakingProblemListeningAudio = speakingProblemListeningAudio;
        paramspeakingProblemListeningImage = speakingProblemListeningImage;
        paramspeakingProblemAnswer = req.body.speakingProblemAnswer;

        console.log("회차 : " +paramExamNO +"Description : " +paramExamDesc +"ProblemType : " + paramspeakingProblemType);

        var database = req.app.get('database');

        if(database.db){
            console.log("데이터베이스를 초기화했습니다. ");

            database.WritingModel.findByExamNO(paramExamNO, function(err, results){

                if(err){
                    console.error("회차를 찾던 중 에러 발생  : " +err.stack);

                    errorHandling(err);

                } else {

                    //에러 핸들링 후 디비에 저장할 컨텍스트 생성
                    var context = {
                        resultModifyTag : true,
                        ExamNO : paramExamNO,
                        ExamDesc: paramExamDesc,
                        speakingProblem : paramspeakingProblem,
                        speakingProblemType : paramspeakingProblemType,
                        speakingProblemReading : paramspeakingProblemReading,
                        speakingAnnounceImage : paramspeakingAnnounceImage,
                        speakingAnnouncementAudio : paramspeakingAnnouncementAudio,
                        speakingProblemListeningAudio : paramspeakingProblemListeningAudio,
                        speakingProblemListeningImage : paramspeakingProblemListeningImage,
                        speakingProblemAnswer : paramspeakingProblemAnswer,
                        login_success : true,
                        user : req.user
                    };
                    if(results[0].Problem[0] != undefined){
                        //db에 저장된 문제가 있다면 
                        deleteAndUpdateSpeakingPush(database, paramExamNO, paramspeakingProblem, paramspeakingProblemType,
                            paramspeakingProblemReading, paramspeakingAnnounceImage, paramspeakingAnnouncementAudio,
                            paramspeakingProblemListeningAudio, paramspeakingProblemListeningImage, paramspeakingProblemAnswer)
                        
                    } else {
                        //db에 저장된 문제가 없다면
                        updateSpeakingPush(database, paramExamNO, paramspeakingProblem, paramspeakingProblemType,
                            paramspeakingProblemReading, paramspeakingAnnounceImage, paramspeakingAnnouncementAudio,
                            paramspeakingProblemListeningAudio, paramspeakingProblemListeningImage, paramspeakingProblemAnswer)
                    }

                    //랜더링할 경로를 case문을 사용해 지정
                    switch(paramspeakingProblemType){
                        case '1': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType1.ejs';
                                break;
                        case '2': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType2.ejs';
                                break;
                        case '3': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType3.ejs';
                                break;
                        case '4': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType4.ejs';
                                break;
                        case '5': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType5.ejs';
                                break;
                        case '6': speakingRoutingPath = './toefl/toeflTeacher/speaking/speakingType6.ejs';
                                break;
                        default: speakingRoutingPath = "./";
                                break;
                    }
                    console.log("라우팅 경로 확인 :"+speakingRoutingPath);

                    res.app.render(speakingRoutingPath, context, function(err, html){
					if(err){
						errorHandling(err);

					}
					console.log("응답 웹문서 : " + html);
					res.end(html);

				    })

                }
            })
        } else{
            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
            res.end();
        }
    })
}

//error 핸들링 함수 선언 
    function errorHandling(err){
        
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>통합형으로 랜더링 중 에러 발생 </h2>');
        res.write('<p>'+err.stack+'</p>');
        res.end();

        return;
    };
 
    function updateSpeakingPush(database, paramExamNO, paramspeakingProblem, paramspeakingProblemType,
                            paramspeakingProblemReading, paramspeakingAnnounceImage, paramspeakingAnnouncementAudio,
                            paramspeakingProblemListeningAudio, paramspeakingProblemListeningImage, paramspeakingProblemAnswer){

                                database.SpeakingModel.update({
                                    'ExamNO':paramExamNO} , {"$push":{'problem':{
                                        'speakingProblemType':paramspeakingProblemType,
                                        'speakingProblem':paramspeakingProblem,
                                        'speakingProblemReading':paramspeakingProblemReading,
                                        'speakingAnnounceImage':paramspeakingAnnounceImage,
                                        'speakingAnnouncementAudio':paramspeakingAnnouncementAudio,
                                        'speakingProblemListeningAudio':paramspeakingProblemListeningAudio,
                                        'speakingProblemListeningImage':paramspeakingProblemListeningImage,
                                        'speakingProblemAnswer':paramspeakingProblemAnswer
                                    }}}, function(err, results){
                                        if(err){
                                            console.error('DB에 문제를 추가하던중 에러가 발생했습니다. ' +err.stack);

                                            errorHandling(err);
                                        }
                                        console.log("DB에 성공적으로 문제를 추가했습니다.")

                                        var path = "./uploads/toefl/sp/";
                                        var rename = "toefl_SP_"+paramExamNO+"_"+paramspeakingProblemType+"_";
                                        var uploadpath = path+rename;

                                    }
                                )



                            }


    
    function deleteAndUpdateSpeakingPush(database, paramExamNO, paramspeakingProblem, paramspeakingProblemType,
                            paramspeakingProblemReading, paramspeakingAnnounceImage, paramspeakingAnnouncementAudio,
                            paramspeakingProblemListeningAudio, paramspeakingProblemListeningImage, paramspeakingProblemAnswer){

                                database.SpeakingModel.update({'ExamNO':paramExamNO},
                                {$pull:{'Problem':{writingProblemType: paramwritingProblemType}}}, function(err, results){

                                    if(err){
                                        errorHandling(err);
                                    } else {
                                        database.SpeakingModel.update({'ExamNO':paramExamNO}, {"$push":{'problem':{
                                            'speakingProblemType':paramspeakingProblemType,
                                            'speakingProblem':paramspeakingProblem,
                                            'speakingProblemReading':paramspeakingProblemReading,
                                            'speakingAnnounceImage':paramspeakingAnnounceImage,
                                            'speakingAnnouncementAudio':paramspeakingAnnouncementAudio,
                                            'speakingProblemListeningAudio':paramspeakingProblemListeningAudio,
                                            'speakingProblemListeningImage':paramspeakingProblemListeningImage,
                                            'speakingProblemAnswer':paramspeakingProblemAnswer
                                        }}}, function(err, results){
                                            if(err){
                                                console.error("DB에 문제를 추가하던중 에러가 발생했습니다."+err.stack);

                                                errorHandling(err);

                                            }
                                            console.log("DB에 성공적으로 문제를 추가했습니다.");


                                            var path = "./uploads/toefl/wr/";
                                            var checkArray = {};
                                            var rename="toefl_WR_"+paramExamNO+"_"+paramwritingProblemType+"_";
                                            var uploadpath = pah+rename;
                                        

                                        })

                                    }
                                }
                                )
                            }
module.exports.addProblemSpeaking = addProblemSpeaking;


