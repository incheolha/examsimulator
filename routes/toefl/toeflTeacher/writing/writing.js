
// writing 라우팅 설정 


// html-entities module is required in showwriting.ejs
var Entities = require('html-entities').AllHtmlEntities;

var writing = function(req, res){

    console.log("toefl_Teacher에 있는 writing 호출됨");
    
    var paramExamNO = req.body.ExamNO || req.query.ExamNO;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramWritingProblemType = req.body.writingProblemType || req.query.writingProblemType;


    console.log("요청 파라미터 + problem type : " + paramExamNO + ", " + paramWritingProblemType);

    if (paramWritingProblemType == 1) {
      
        problemTypeRoutingPath = './toefl/toeflTeacher/writing/writingIntegrated.ejs';

    } else {

     
        problemTypeRoutingPath = './toefl/toeflTeacher/writing/writingIndependent.ejs';

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



module.exports.writing = writing;
