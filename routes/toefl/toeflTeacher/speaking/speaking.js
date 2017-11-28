
var Entities = require('html-entities').AllHtmlEntities;

var speaking = function(req, res){
	console.log("spekaing 에 있는 speaking.js 호출됨");

	var paramExamNO = req.body.ExamNO || req.query.ExamNO;
	var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
	var paramspeakingProblemType = req.body.speakingProblemType || req.query.speakingProblemType;
	var speakingRoutingPath = '';
	console.log("요청 파라미터 : " + paramExamNO +"회차, " + paramExamDesc + ",  스피킹타입 : " +paramspeakingProblemType);

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
	console.log("check :"+speakingRoutingPath);

	var database = req.app.get('database');
	//데이터베이스 연결


	if(database.db){
		console.log("데이터베이스를 초기화 했습니다.");

		database.SpeakingModel.findByExamNO(paramExamNO, function(err, results){
			if(err){
				console.error("db안에 챕터넘버를 확인하는데 실패했습니다." + err.stack);
				res.writeHead("200",{'Content-Type':'text/html;charset=utf8'});
				res.write("<h2> 챕터넘버를 찾던 중 에러가 발생했습니다. </h2>");
				res.write("<p>"+err.stack+'</p>');
				res.end();
				return;
			}
			else{
				console.log(results)
				if(results[0].Problem[0] != null)// 찾은 내용이 있다면 진행 
				{
					console.log("db에 저장된 문제가 있습니다.")
					console.log("db 의 문제와함께 랜더링합니다.");

					for(var i = 0; i<results[0].Problem.length; i++){

						console.log("저장된 문제의 갯수는" + results[0].Problem.length +1);
						if(results[0].Problem[i].speakingProblemType == paramspeakingProblemType){
							console.log("db에 저장된 문제유형 : "+ results[0].Problem[i].speakingProblemType);
							console.log("요청된 문제유형 : " + paramspeakingProblemType);

							var context = {
								resultModifyTag: true,
								ExamNO : paramExamNO,
								ExamDesc : paramExamDesc,
								speakingProblemType : results[0].Problem[i].speakingProblemType,
								speakingAnnounceImage: results[0].Problem[i].speakingAnnounceImage,
								speakingAnnouncementAudio : results[0].Problem[i].speakingAnnouncementAudio,
								speakingProblem : results[0].Problem[i].speakingProblem,
								speakingProblemReading : results[0].Problem[i].speakingProblemReading,
								speakingProblemListeningImage : results[0].Problem[i].speakingProblemListeningImage,
								speakingProblemListeningAudio : results[0].Problem[i].speakingProblemListeningAudio,
								speakingProblemAnswer: results[0].Problem[i].speakingProblemAnswer,
								login_success : true,
								user : req.user
							};

							console.log("라우팅 경로 : " + speakingRoutingPath);
							console.log("문제 유형 : " +context.speakingProblemType);
							console.log("시험회차 : " + context.ExamNO);
							
							break;
						} else {
							var context = {
								resultModifyTag : false,
								ExamNO : paramExamNO,
								ExamDesc : paramExamDesc,
								speakingProblemType : paramspeakingProblemType,
								speakingAnnounceImage : '',
								speakingAnnouncementAudio : '',
								speakingProblem : '',
								speakingProblemReading : '',
								speakingProblemListeningImage : '',
								speakingProblemAnswer : '',
								login_success : true,
								user : req.user
							}
						}
						console.log("count I 값은 : " +i);
					}
				} else if (results[0].Problem[0]==undefined){

					console.log("db에 저장된 문제가 없습니다.")
					console.log("새로운 문제 만들기로 이동합니다.");

						var context = {
								resultModifyTag : false,
								ExamNO : paramExamNO,
								ExamDesc : paramExamDesc,
								speakingProblemType : paramspeakingProblemType,
								speakingAnnounceImage : '',
								sspeakingAnnouncementAudio : '',
								speakingProblem : '',
								speakingProblemReading : '',
								speakingProblemListeningImage : '',
								speakingProblemAnswer : '',
								login_success : true,
								user : req.user
							}

				}
				
				console.log("문제 result tag : " + context.resultsModifyTag)

				res.app.render(speakingRoutingPath, context, function(err, html){
					if(err){
						errorHandling(err);

					}
					console.log("응답 웹문서 : " + html);
					res.end(html);

				})
			}
		})
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결에 실패했습니다.<h2>')
		res.end();
	}
};

function errorHandling(err){
	console.error("speaking으로 랜더링중 에러가 발생했습니다. "+ err.stack);

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h2>랜더링 중 에러가 발생했습니다.</h2>');
	res.write('<p>'+err.stack+'</p>');
	res.end();

	return;
}

module.exports.speaking = speaking;
