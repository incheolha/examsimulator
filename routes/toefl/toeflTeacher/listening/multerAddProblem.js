
//addProblem을 위한 미들웨어 설정 

var multer = require('multer');
var fs = require('fs');

var paramExamNO = "";
var paramExamDesc = "";
var paramlisteningChapterNumber = "";
var paramlisteningProblemType = "";
var paramlisteningAnnouncementText1 = "";
var paramlisteningProblemArticle1 = "";
var paramlisteningProblemArticle2 = "";
var paramlisteningProblemArticle3 = "";
var paramlisteningProblemArticle4 = "";
var paramlisteningProblemArticle5 = "";
var paramlisteningProblemArticle6 = "";
var paramlisteningProblemAnswer = "";
var paramlisteningProblemComment = "";
var testAudio1 = "";
var testAudio2 = "";
var narrAudio1 = "";
var narrAudio2 = "";
var testImg = "";
var newArray = [];
var i = 0;
var temp = true;

 var storage = multer.diskStorage({
      destination: function(req, file, callback){
            callback(null, 'uploads')
     },

    filename: function(req, file, callback){

        
            while(temp = true){
                 if(testAudio1 != "")
                {
                    testAudio1 = newArray[i];
                     i++;
                     callback(null, newArray[i])
                     console.log(newArray[i]);
                     console.log(i)
                     
                }
            else if(testAudio2 != "")
                {
                    testAudio2 = newArray[i];
                    i++;
                    callback(null, newArray[i])
                    console.log(newArray[i]);
                    console.log(i);    
                    }
            else if(testImg != "")
                    {
                    testAudio2 = newArray[i];
                    i++;
                    callback(null, newArray[i])
                    console.log(newArray[i]);
                    console.log(i);     
                    }
                else if(narrAudio1 != "")
                    {
                        narrAudio1 = newArray[i];
                        i++;
                        callback(null, newArray[i])
                        console.log(newArray[i]);
                        console.log(i);
                    }
                else if(narrAudio2 != "")
                    {
                        narrAudio2 = newArray[i];
                        i++;
                        callback(null, newArray[i])
                        console.log(newArray[i]);
                        console.log(i);
                    };
                    temp=false;
            }
           






                for(var j=0; j<=newArray.length;j++){
                    newArray[j] = file.originalname + Date.now();
                    callback(null, newArray[j])
                    console.log("저장되는 파일,"+ newArray[j]);
                    j++;

             }
        }
    });

    

var addProblemListening = function(req, res){
    console.log('/process/toefl/listening/multerAddProblemListening 호출 됨 ');

    var upload = multer({
        storage: storage
    }).any('userFile')
    upload(req, res, function(err){

        paramExamNO = req.body.ExamNO;
        paramExamDesc = req.body.ExamDesc;
        paramlisteningProblemType = req.body.listeningProblemType
        paramlisteningChapterNumber = req.body.listeningChapterNumber;
        paramlisteningProblemType = req.body.listeningProblemType;
        paramlisteningAnnouncementText1 = req.body.listeningAnnouncementText1;
        paramlisteningProblemArticle1 = req.body.listeningProblemArticle1;
        paramlisteningProblemArticle2 = req.body.listeningProblemArticle2;
        paramlisteningProblemArticle3 = req.body.listeningProblemArticle3;
        paramlisteningProblemArticle4 = req.body.listeningProblemArticle4;
        paramlisteningProblemArticle5 = req.body.listeningProblemArticle5;
        paramlisteningProblemArticle6 = req.body.listeningProblemArticle6;
        paramlisteningProblemAnswer = req.body.listeningProblemAnswer;
        paramlisteningProblemComment = req.body.listeningProblemComment;    
        paramlisteningAnnouncementAudio1 = narrAudio1;
        paramlisteningAnnouncementAudio2 = narrAudio2;
        paramlisteningProblemAudio1 = testAudio1;
        paramlisteningProblemAudio2 = testAudio2;
        paramlisteningProblemImage = testImg;
    

    console.log("ggggggg" + paramExamNO);
    console.log("hhhhhhhh" + paramExamDesc);
    console.log("iiiiiiii" + paramlisteningChapterNumber);
    console.log("1111111" + testAudio1);
    console.log("222222222" + testAudio2);
    console.log("333333333" + narrAudio1);
    console.log("44444444" + narrAudio2);
    console.log("5555555" + testImg);

    var database = req.app.get('database');

        if(database.db){
            console.log("db에 연결되었습니다.");

            database.ListeningModel.findByExamNO(paramExamNO, function(err, results){
                if(err){
                    console.error("회차를 찾던 중 에러 발생 : " + err.stack);
                    
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8;'});
                    res.write('<h2>회차를 찾던 중 에러 발생</h2>');
                    res.write('<p>'+err.stack+'</p>');
                    res.end();

                    return;
                }
                console.dir('result =' +results);

                if(results != null)
                    {
                        database.ListeningModel.update({
                            'ExamNo':paramExamNO},{"$push":{'listeningParagraph':{'Problem':{
                               'listeningProblemType':paramlisteningProblemType,
                               'listeningAnnouncementText1':paramlisteningAnnouncementText1,
                               'listeningAnnouncementAudio1':narrAudio1,
                               'listeningAnnouncementAudio2':narrAudio2,
                               'listeningProblemAudio1':testAudio1,
                               'listeningProblemAudio2':testAudio2,
                               'listeningProblemImage':testImg,
                               'listeningProblemArticle1':paramlisteningProblemArticle1,
                               'listeningProblemArticle2':paramlisteningProblemArticle2,
                               'listeningProblemArticle3':paramlisteningProblemArticle3,
                               'listeningProblemArticle4':paramlisteningProblemArticle4,
                               'listeningProblemArticle5':paramlisteningProblemArticle5,
                               'listeningProblemArticle6':paramlisteningProblemArticle6,
                               'listeningProblemAnswer':paramlisteningProblemAnswer,
                               'listeningProblemComment':paramlisteningProblemComment

                            }}}}, function(err, results){
                                if(err){
                                    console.error('listening problem 추가 중 에러 발생' + err.stack);

                                    res.writeHead('200', {'Content-Type':'text/html:charset=utf8;'});
                                    res.write('<h2>listening probelm 추가 중 에러 발생</h2>');
                                    res.write('<p>'+err.stack+'</p>');
                                    res.end();

                                    return;
                                }
                                console.log("problem 저장됨");
                                res.redirect('back');

                            })
                        }
                    }
            )}
            else{
                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결에 실패했습니다 </h2>');
                res.end();
            }
        });
    };
module.exports.addProblemListening = addProblemListening;



