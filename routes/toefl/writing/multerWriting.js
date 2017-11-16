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
var storage = multer.diskStorage({
    destination: function(req, file,callback){
        callback(null, 'uploads')
    },

    filename: function(req,file,callback){
        console.log(file)
        if(file.fieldname=='writingProblemListeningImage'){
            writingProblemListeningImage = file.originalname;
            console.log("Announce Image : "+writingProblemListeningImage );
            // AnnounceImage = newArray[i]

            callback(null, writingProblemListeningImage);
            // console.log(newArray[i]);
            // console.log(i);
            // i++;
        }
        else  if(file.fieldname=='writingProblemListeningAudio'){
            writingProblemListeningAudio = file.originalname;
             console.log("Announcement Audio : "+writingProblemListeningAudio );
            callback(null, writingProblemListeningAudio);
            // console.log(newArray[i]);
            // console.log(i);
            // i++;
        }
    }
   
})


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
                    console.log('데이터베이스를 초기화했습니다.')
                        
                    database.WritingModel.findByExamNO(paramExamNO, function(err, results){
                                
                        if(err){
                            console.error("회차를 찾던중 에러 발생 : " + err.stack);
                
                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write("<h2>회차를 찾던 중 에러 발생</h2>");
                            res.write('<p>'+err.stack+'</p>');
                            res.end();
                
                            return;

                        } else{
                            console.log("데이타 검색결과 값은" + results[0]);
                            console.log("파라미터 writing problem type 검색결과 값은" + paramwritingProblemType);
                            
                            
                            var context = {
                                ExamNO : paramExamNO,
                                ExamDesc : paramExamDesc,
                                writingProblemType : paramwritingProblemType,
                                writingProblemReading : paramwritingProblemReading,
                                writingProblemListeningAudio : paramwritingProblemListeningAudio,
                                writingProblemListeningImage : paramwritingProblemListeningImage,
                                writingProblemAnswer : paramwritingProblemAnswer,
                                login_success : true,
                                user:req.user
                            };

                            if (results[0].Problem[0] == undefined) {
                                    resultTag = 0;
                                    console.log("db problem이 존재하지 않으경우 " + resultTag + " 값"+ " db내 problem 배열생성")
                            } else {
                               

                            for (i=0; i < results[0].Problem.length; i++) {

                                if (results[0].Problem[i].writingProblemType == paramwritingProblemType) {                                    
                                   resultTag = 1;
                                   console.log("db에 존재하고 writing Problem Type 이 " + resultTag + "인 경우")   
                                } else if (results[0].Problem[i].writingProblemType == paramwritingProblemType) {
                                    resultTag = 2;
                                    console.log("db에 존재하고 writing Problem Type 이 " + resultTag + "인 경우")
                              } else {
                                    resultTag = 3;
                                    console.log("db에 존재하고 writing Problem Type  " + resultTag + "존재하지 않은 경우")             
                              }
                                                                          

                            }      // for 구문끝 지점
                                          
                                      
                                    
                     }   //result[0].Problem 비교교구문끝

                       if (resultTag == 0) {
                            updateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                                paramwritingProblemReading, paramwritingProblemListeningImage, 
                                paramwritingProblemListeningAudio,paramwritingProblemAnswer);
        
                            req.app.render('./NewToefl/writing/AddWriting_int.ejs', context, function(err, html){
                                        if(err){
                                            errorHanding(err);
                                            return;
                                        }
                                        console.log("응답 웹문서 : " + html);
                                        res.end(html);
                            })
          
                     } else if (resultTag == 1) {

                                                            
                        updateWritingSet(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                                         paramwritingProblemReading, paramwritingProblemListeningImage, 
                                         paramwritingProblemListeningAudio,paramwritingProblemAnswer);
                 
                        
                        req.app.render('./NewToefl/writing/AddWriting_int.ejs', context, function(err, html){
                                        if(err){
                                                errorHanding(err);
                                                return;
                                            }
                                            console.log("응답 웹문서 : " + html);
                                            res.end(html);
                            })
                        
                       } else if (resultTag == 2) {

                        updateWritingSet(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                            paramwritingProblemReading, paramwritingProblemListeningImage, 
                            paramwritingProblemListeningAudio,paramwritingProblemAnswer);
    
                        req.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                            if(err){
                                    errorHanding(err);
                                    return;
                                }
                                console.log("응답 웹문서 : " + html);
                                res.end(html);
                         })
            



                        
                       } else if (resultTag == 3) {

                        updateWritingPush(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                            paramwritingProblemReading, paramwritingProblemListeningImage, 
                            paramwritingProblemListeningAudio,paramwritingProblemAnswer);
    
                     
                        req.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                                        if(err){
                                            errorHanding(err);
                                            return;
                                        }
                                        console.log("응답 웹문서 : " + html);
                                        res.end(html);
                        })
          

                       }
                       
                    }  //db 검색에러 끝구문
            
                });
                                              
                 } else{
                    res.writeHead('200', {'content-Type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 연걸에 실패했습니다. </h2>');
                    res.end();
                 }
        
          
});
}

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

        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>writing 문제 추가 중 에러 발생</h2>');
        res.write('<p>'+err.stack+'</p>');
        res.end();

        return;
    }
        console.log("DB에 성공적으로 문제를 추가했습니다.")
        console.log("통합형으로 랜더링 합니다.");


            
    
        var rename="toefl_WR_"+paramExamNO+"_"+paramwritingProblemType+"_";
        var concre = path+rename;
        console.log("바꾸고자 하는 이름" + concre);
       
       
        fs.exists("./uploads/"+paramwritingProblemListeningAudio, function(exists){
            console.log(exists? 'yes':"no");
            if(exists = 'yes'){
                fs.rename("./uploads/"+paramwritingProblemListeningAudio, concre+paramwritingProblemListeningAudio, function(err){
                    if(err) throw err;
                    console.log("업로드 실패?");  
                })
                console.log("할룽");
            }
        });

        fs.exists("./uploads/"+ paramwritingProblemListeningImage, function(exists){
            console.log(exists? 'yes':"no");
            if(exists = 'yes'){
                fs.rename("./uploads/"+paramwritingProblemListeningImage, concre+paramwritingProblemListeningImage, function(err){
                    if(err) throw err;
                    console.log("업로드 실팽 ");
                })
                console.log("할룽할룽");
            }
        });



   
   }
   
)
return;
}

function updateWritingSet(database, paramExamNO, paramwritingProblemType, paramwritingProblem,
                          paramwritingProblemReading, paramwritingProblemListeningImage, 
                          paramwritingProblemListeningAudio,paramwritingProblemAnswer) {
database.WritingModel.update(
    {'ExamNO':paramExamNO, 'Problem.writingProblemType' : paramwritingProblemType },
        {"$set":{'Problem':[{
        'writingProblemType':paramwritingProblemType,
        'writingProblem':paramwritingProblem,
        'writingProblemReading':paramwritingProblemReading,
        'writingProblemListeningImage':paramwritingProblemListeningImage,
        'writingProblemListeningAudio':paramwritingProblemListeningAudio,
        'writingProblemAnswer' : paramwritingProblemAnswer
    }]}}, function(err, results){
        if(err){
            console.error('문제를 업데이트 하던 중 에러가 발생했습니다.'+error.stack);

            res.writeHead('200',{'Content-Type':'text/html;charset=utf8;'});
            res.write('<h2>문제를 업데이트 하던 중 문제가 발생했습니다. <h2>');
            res.write('<p>'+err.stack+'</p>');
            res.end();

            return;

        }
        console.log('DB에 내용을 성공적으로 업데이트 하였습니다.')
        console.log('fs를 이용한 이름 재설정');
        return
    })
}
module.exports.addProblemWriting = addProblemWriting;
