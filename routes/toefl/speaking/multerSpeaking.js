var multer = require('multer');
var fs = require('fs');

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
var newArray =[];
var i = 0;
var temp = true;
var temp2 = true;

var path = "./uploads/toefl/sp/";


var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'uploads')
    },
    filename: function(req, file, callback){
        console.log(file)
            if(file.fieldname=='speakingAnnounceImage'){
                speakingAnnounceImage = file.originalname;
                console.log("Announce Image : "+speakingAnnounceImage );
                // AnnounceImage = newArray[i]

                callback(null, speakingAnnounceImage);
                // console.log(newArray[i]);
                // console.log(i);
                // i++;
            }
            else  if(file.fieldname=='speakingAnnouncementAudio'){
                speakingAnnouncementAudio = file.originalname;
                 console.log("Announcement Audio : "+speakingAnnouncementAudio );
                callback(null, speakingAnnouncementAudio);
                // console.log(newArray[i]);
                // console.log(i);
                // i++;
            }
            else  if(file.fieldname=='speakingProblemListeningAudio'){
               speakingProblemListeningAudio = file.originalname; 
            console.log("ProblemListening Audio : "+speakingProblemListeningAudio );
                callback(null, speakingProblemListeningAudio);
                // console.log(newArray[i]);
                // console.log(i);
                // i++;
            }
            else if(file.fieldname=='speakingProblemListeningImage'){
               speakingProblemListeningImage = file.originalname; 
             console.log("Problem Listening Image : "+speakingProblemListeningImage );
                callback(null, speakingProblemListeningImage);
                // console.log(newArray[i]);
                // console.log(i);
                // i++;
            }
            
           
        

        
    }     
});

var addProblemSpeaking = function(req, res){
    console.log('/process/toefl/speaking/multerAddSpeaking 호출 됨');

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
                console.log("db 초기화");

                database.SpeakingModel.findByExamNO(paramExamNO, function(err, results){
                    if(err){
                        console.error("회차를 찾던중 에러 발생 : " + err.stack);

                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                        res.write('<h2>회차를 찾던 중 에러 발생</h2>');
                        res.write('<p>'+err.stack+'</p>');
                        res.end();

                        return;

                    }
                    console.log(results)
                    console.log("회차 넘버 double check " + paramExamNO);

                    if(results !=null)
                        {
                            database.SpeakingModel.update({
                                'ExamNO':paramExamNO},{"$push":{'Problem':{
                                    'speakingProblemType': paramspeakingProblemType,
                                    'speakingAnnounceImage':speakingAnnounceImage,
                                    'speakingAnnouncementAudio':speakingAnnouncementAudio,
                                    'speakingProblem':paramspeakingProblem,
                                    'speakingProblemReading':paramspeakingProblemReading,
                                    'speakingProblemListeningImage':speakingProblemListeningImage,
                                    'speakingProblemListeningAudio':speakingProblemListeningAudio,
                                    'speakingProblemAnswer':paramspeakingProblemAnswer

                                }}}, function(err, results){
                                    if(err){
                                        console.error('DB에 내용 추가 중 에러 발생' + err.stack);

                                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                        res.write('<h2>listening chapter number 추가 중 에러 발생 <h2>');
                                        res.write('<p>'+err.stack+'</p>');
                                        res.end();

                                        return;
                                    }
                                    console.log('DB에 내용을 성공적으로 추가하였습니다.')
                                    console.log('fs를 이용한 이름 재설정');

                                    var rename="toefl_SP_"+paramExamNO+"_"+paramspeakingProblemType+"_";
                                    var concre = path+rename;
                                    console.log("바꾸고자 하는 이름 "+ concre);
                                    // var path2="../uploads/toefl/sp/";
                                    console.log("paramspeakingAnnounce : " + paramspeakingAnnouncementAudio);
                                    console.log("2nd"+ speakingAnnouncementAudio);
                

                                    //fs exists 를 이용하여 업로드된 파일이 ./uploads에  존재하는 지 확인후 경로와 이름을 바꿔줍니다.
                                    fs.exists("./uploads/"+speakingAnnouncementAudio, function(exists){
                                        console.log(exists ? 'yes': "no");
                                        if(exists = 'yes'){
                                                   fs.rename("./uploads/"+paramspeakingAnnouncementAudio, path+rename+paramspeakingAnnouncementAudio, function(err){
                                                    if(err) throw err;
                                                    console.log("kggkgk");
                                    })
                                            console.log("할룽");
                                        }
                                    })

                                            // if(paramspeakingAnnounceImage != null){
                                            //     console.log(paramspeakingAnnounceImage)
                                            //     fs.rename('uploads'+paramspeakingAnnounceImage, path+rename+paramspeakingAnnounceImage, function(err){
                                            //         if(err) throw err;
                                            //         console.log("????")
                                                    
                                            //     })

                                            // }
                                            // else if(speakingAnnouncementAudio !=null){
                                            //     console.log(paramspeakingAnnouncementAudio + "파람")
                                            //     console.log(speakingAnnouncementAudio + "그냥 ")
                                            //     fs.rename('uploads/'+paramspeakingAnnouncementAudio, path+rename+paramspeakingAnnouncementAudio, function(err){
                                            //         if(err) throw err;
                                            //         console.log("kggkgk");


                                            //     })

                                            // }
                                            // else if(paramspeakingProblemListeningAudio !=null){

                                            //     fs.rename('uploads/'+paramspeakingProblemListeningAudio, path+rename+paramspeakingProblemListeningAudio, function(err){
                                            //         if(err) throw err;
                                            //         console.log('hihihihi');
                                            //     })
                                            // }
                                            // else if(paramspeakingProblemListeningImage !=null){
                                            //     fs.rename(path+paramspeakingProblemListeningImage, path+rename+paramspeakingProblemListeningImage, function(err){
                                            //         if(err) throw err;
                                            //         console.log("fsjfsdf");
                                                    

                                            //     })
                                            // }

               

									var context = 
												{
													ExamNO : paramExamNO,
													ExamDesc : paramExamDesc,
                                                    speakingProblemType : paramspeakingProblemType,
                                                    speakingProblem : paramspeakingProblem,
                                                    speakingAnnouncementAudio : paramspeakingAnnouncementAudio,
                                                    speakingProblemAnswer : paramspeakingProblemAnswer,
                                                    login_success:true,
                                                    user:req.user
												};
												req.app.render('./NewToefl/speaking/AddSpeaking.ejs', context, function(err, html){
													if(err){
														console.error('Add_Listening.ejs 랜더링중 에러 발생 ' +err.stack);
		
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
                            
                            )}




                })
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
                res.end();
            }

    })
};

module.exports.addProblemSpeaking = addProblemSpeaking;