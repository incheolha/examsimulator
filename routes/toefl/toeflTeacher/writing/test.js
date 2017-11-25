
var multer = require('multer');
var fs = require('fs');

var paramExamNO = "";
var paramExamDesc = "";
var paramwritingProblemType = "";
var paramwritingAnnounceDirection = "";
var paramwritingAnnouncementAudio = "";
var paramwritingProblem = "";
var paramwritingProblemReading = "";
var writingProblemListeningImage = "";
var writingProblemListeningAudio = "";
var parawritingProblemAnswer = "";
var temp = true;
var paht = "./uploads/toefl/wr";
var array = {};
var storage = multer.discStorage({
    destination : function(Req, file, callback){
        callback(null, 'uploads');
    },

    filename: function(req, file, callback){
        console.log(file);
        if(file.fieldname=='writingProblemListeningImage'){
            writingProblemListeningImage = file.originalname;
            console.log("announce image : "+ writingProblemListeningImage);

            callback(null, writingProblemListeningImage);

        }else if(file.fieldname=='writingProlbemListeningAudio'){
            writingProblemListeningAudio = file.originalname;
            console.log("Announcement Audio : "+ writingProblemListeningAudio);
            callback(null, writingProblemListeningAudio);

        }
        
    }
})

var addProblemWriting = function(req, res){
    console.log('/process/toefl/writing/multerAddwriting 호출됨');

    var upload = multer({
        storage : storage
    }).any('userFile')

    upload(req, res, function(err){
        paramExamNO : req.body.ExamNO;
        paramExamDesc : req.body.ExamDesc;
        paramwritingProblemType = req.body.writingProblemType;
        paramwritingProblemReading = req.body.writingProblemReading;
        paramwritingProblemListeningImage = writingProblemListeningImage;
        paramwritingProblemListeningAudio = writingProblemListeningAudio;
        paramwritingProblemAnswer = req.body.writingProblemAnswer;

        console.log(paramwritingProblemListeningAudio + "오디오");
        console.log(paramwritingProblemListeningImage+ "이미지");
        console.log("회차" + paramExamNO + "Description : " +paramExamDesc);
        console.log("writingProblemType" + paramwritingProblemType);

        var database = req.app.get('database');

            if(database.db){
                console.log('데이터베이스에 연결되었습니다.');

                database.WritingModel.findByExamNO(paramExamNO, function(err, results){
                    if(err){
                        console.error("회차를 찾던중 에러 발생 : "+ err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>회차를 찾던 중 에러 발생</h2>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();

                        return;
                    }else{
                        console.log('results' + results[0]);

                        var context = {
                            ExamNO : paramExamNO,
                            ExamDesc : paramExamDesc, 
                            writingProblemType : paramwritingProblemType,
                            writingProblemReading : paramwritingProblemReading,
                            writingProblemListeningAudio : paramwritingProblemListeningAudio,
                            writingProblemListeningImage : paramwritingProblemListeningImage,
                            writingProblemAnswer : paramwritingProblemAnswer,
                            login_success : true,
                            user : req.user
                        }

                        if(results[0].Problem[0]==undefined){
                            resultTag = 0;
                            console.log('db problem 이 존재하지 않는경우 ' + resultTag);

                        } else{
                            for(i=0; i<results[0].Problem.length; i++){
                                if(results[0].Problem[i].writingProblemType==paramwritingProblemType){
                                    resultTag = 1;
                                    console.log('db에 존재하고 writingProblemType 이 1인 경우 ')
                                }
                            }
                        }
                    }
                })
            }


    })

}