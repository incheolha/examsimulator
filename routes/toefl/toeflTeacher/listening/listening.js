
// listening 라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var listening = function(req, res) {
    console.log("listening에 있는 updatelistening 호출됨");
    console.log(req.body.listeningChapterNumber);

    var paramExamNO = req.body.ExamNO || req.query.ExamNO; 
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramlisteningChapterNumber = req.body.listeningChapterNumber || req.query.listeningChapterNumber;


  
    console.log("요청 파라미터 : "+ paramExamNO +"회차 " +paramExamDesc + ", 챕터넘버 : "+ paramlisteningChapterNumber);

    var database = req.app.get('database');

    if(database.db){
        console.log("데이터베이스를 초기화했습니다.");

        database.ListeningModel.findByExamNO(paramExamNO, function(err, results){
            if(err){
                console.error("db안에 회차정보를 확인하는데 실패했습니다." +err.stack);
                errorHandling(err);

            } else {
                console.log(results);
                console.log("db에 저장된 챕터넘버를 확인합니다.");
                if(results[0].listeningParagraph[0] !=null){ //db에 저장된 내용이 있을때
                    console.log("db에 1개 이상의 정보가 저장되어있습니다.")
                    console.log("db에서 파라미터와 정보가 일치하는 내용을 찾습니다.");
                    
                    for(var i = 0; i < results[0].listeningParagraph.length; i++){
                        //console.log("프린트문 안으로 들어왔습니다.")
                        if(results[0].listeningParagraph[i].listeningChapterNumber == paramlisteningChapterNumber){
                            console.log("db에 저장된 유형과 이동하고자 하는 챕터 넘버가 일치합니다.");
                            console.log("db의 정보와 함께 랜더링 합니다.");
                            console.log("문제유형 "+ results[0].listeningParagraph[i].listeningChapterNumber)

                            var context = {
                                resultsModifyTag : true,
                                ExamNO : results[0].ExamNO,
                                ExamDesc : results[0].ExamDesc,
                                listeningChapterNumber : results[0].listeningParagraph[i].listeningChapterNumber,
                                login_success : true,
                                user : req.user
                            }
                            
                            
                        } else {
                            var context = {
                                resultsModifyTag : false,
                                ExamNO : paramExamNO,
                                ExamDesc : paramExamDesc,
                                listeningChapterNumber : paramlisteningChapterNumber,
                                login_success : true,
                                user : req.user
                            }
                        } 
                    break;   
                    }
                    console.log("counter i 의 값 : "+ i);
                } else if(results[0].listeningParagraph[0] == undefined) {
                    //db에 아무런 정보가 저장되어있지 않을때 

                    console.log("db에 저장된 챕터가 없습니다.");
                    console.log("새로운 문제정보를 db에 저장합니다.");

                        var context = {
                            resultsModifyTag : false ,
                            ExamNO : paramExamNO, 
                            ExamDesc : paramExamDesc ,
                            listeningChapterNumber : paramlisteningChapterNumber,
                            login_success : true,
                            user : req.user
                        }

                    }

                
                res.app.render("./toefl/toeflTeacher/listening/listeningindex.ejs", context , function(err, html){
                    if(err){
                        errorHandling(err);
                        return;
                    }
                    console.log("응답 웹문서 : " + html);
                    res.end(html);
                })

            }
        })
    } else {
        res.writeHead("200", {'Content-Type':'text/html;charset=utf8'});
        res.write("<h2>데이터베이스 연결에 실패했습니다.</h2>");
        res.end()
    }


}

function errorHandling(err){
	console.error("speaking으로 랜더링중 에러가 발생했습니다. "+ err.stack);

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h2>랜더링 중 에러가 발생했습니다.</h2>');
	res.write('<p>'+err.stack+'</p>');
	res.end();

	return;
}
 


module.exports.listening = listening;