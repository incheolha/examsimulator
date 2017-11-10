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
            console.log("회차 : " +paramExamNO +"Description : " + paramExamDesc +"ProblemType : " +paramwritingProblemType );
            console.log("확인해보자 라이팅 타입 " + paramwritingProblemType);




            if(paramwritingProblemType ==1){
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
                                }
                               
                                    
                                
                                //찾은 내용이 있다면 진행합니다.
                                else{
                                    console.log(results[0].Problem[0] + "확인")
                                    console.log('결과값' + results[0].Problem[0].writingProblemType);
                                    //두번째 조건문으로 문제가 있는지 확인합니다.
                                    if(results[0].Problem[0].writingProblemType == undefined){
                                        
                                        console.log("작업하는 회차 확인" +results); 
                                        //문제를 추가하는 함수를 사용합니다.
                                        database.WritingModel.update({
                                            'ExamNO':paramExamNO},{"$push":{'Problem':{
                                                'writingProblemType':paramwritingProblemType,
                                                'writingProblem' : paramwritingProblem,
                                                'writingProblemReading' : paramwritingProblemReading,
                                                'writingProblemListeningImage' : paramwritingProblemListeningImage,
                                                'writingProblemListeningAudio':paramwritingProblemListeningAudio,
                                                'writingProblemAnswer' : paramwritingProblemAnswer
                    
                                            }}}, function(err, results){
                                                if(err){
                                                    console.error('DB에 문제 추가 중 에러가 발생했습니다.' +err.stack);
                    
                                                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                                    res.write('<h2>writing 문제 추가 중 에러 발생</h2>');
                                                    res.write('<p>'+err.stack+'</p>');
                                                    res.end();
                    
                                                    return;
                                                }
                                                console.log('DB에 내용을 성공적으로 추가하였습니다.')
                                                console.log('fs를 이용한 이름 재설정');
                    
    
    
    
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


                                                console.log("통합형으로 랜더링 합니다.")
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
                                                req.app.render('./NewToefl/writing/AddWriting_int.ejs', context, function(err, html){
                                                    if(err){
                                                        console.error('Add_writing 랜더링 중 에러 발생 '+err.stack);
                                                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                        res.write('<h2>랜더링중 문제 발생</h2>');
                                                        res.write('<p>'+err.stack+'</p>');
                                                        res.end();
                    
                                                        return;
                                                    }
                                                    console.log("응답 웹문서 : " +html);
                                                    res.end(html);
                                                })
                                              
                                    })
                                    //두번째 조건을 처리합니다. 여기서는 Problem안에 최소한 한개의 값이 있을때 problem 을 찾아 업데이트 시킵니다.
                                }else if(results[0].Problem[0].writingProblemType == 1){
                                    console.log("db에서 최소 1개이상의 문제가 저장되어 있습니다.");
                                    console.log("db에 저장된 통합형을 찾아 비교하여 문제 내용을 업데이트 합니다.")
                                    console.log("결과값"+ results[0].Problem[0].writingProblemType);
                                    database.WritingModel.find({'$and':[{"ExamNO":paramExamNO}, {"Problem":{'$elemMatch':{'writingProblemType':paramwritingProblemType}}}]} , function(err, results){

                                        if(err){
                                            console.error('라이팅 DB안에 Problem을 찾던 중 에러가 발생했습니다.'+err.stack);

                                            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                            res.write('<h2>라이팅 Db에 유형을 찾던중 에러가 발생했습니다.</h2>');
                                            res.write('<p>'+err.stack+'</p>');
                                            res.end()

                                            return;
                                        }
                                        console.log('db에서 통합형 문제를 찾았습니다.')
                                        console.log('저장되어있는 결과값 : '+results);

                                        database.WritingModel.update(
                                            {'ExamNO':paramExamNO},{"$set":{'Problem':[{
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
                    
    
    
    
                                                var rename="toefl_WR_"+paramExamNO+"_"+paramwritingProblemType+"_";
                                                var concre = path+rename;
                                                console.log("바꾸고자 하는 이름" + concre);
                                               
                                               
                                                fs.exists("./uploads/"+paramwritingProblemListeningAudio, function(exists){
                                                    console.log(exists? 'yes':"no");
                                                    if(exists = 'yes'){
                                                        fs.rename("./uploads/"+paramwritingProblemListeningAudio, concre+paramwritingProblemListeningAudio, function(err){
                                                            if(err) throw err;
                                                          
                                                        })
                                                        console.log("할룽");
                                                    }
                                                });
                    
                                                fs.exists("./uploads/"+ paramwritingProblemListeningImage, function(exists){
                                                    console.log(exists? 'yes':"no");
                                                    if(exists = 'yes'){
                                                        fs.rename("./uploads/"+paramwritingProblemListeningImage, concre+paramwritingProblemListeningImage, function(err){
                                                            if(err) throw err;
                                                            
                                                        })
                                                        console.log("할룽할룽");
                                                    }
                                                });

                                                console.log("통합형으로 랜더링 합니다.")
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
                                                req.app.render('./NewToefl/writing/AddWriting_int.ejs', context, function(err, html){
                                                    if(err){
                                                        console.error('Add_writing 랜더링 중 에러 발생 '+err.stack);
                                                        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                        res.write('<h2>랜더링중 문제 발생</h2>');
                                                        res.write('<p>'+err.stack+'</p>');
                                                        res.end();
                    
                                                        return;
                                                    }
                                                    console.log("응답 웹문서 : " +html);
                                                    res.end(html);
                                                })

                                            })

                                    })
                                }else{
                                      console.log("어떠한 작업도 수행하지 못했습니다.")
                                    }
        
                                }
                            })
                        
                 }else{
                    res.writeHead('200', {'content-Type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 연걸에 실패했습니다. </h2>');
                    res.end();
                    }
                
                
                
            }else if(paramwritingProblemType ==2){
                        console.log("독립형으로 랜더링합니다.");
                
                        var paramExamNO = req.body.ExamNO || req.query.ExamNO;
                        var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
                        var paramwritingProblemType = req.body.writingProblemType || req.query.writingProblemType;
                        var paramwritingProblem = req.body.writingProblem || req.query.writingProblem;
                        var paramwritingProblemAnswer = req.body.writingProblemAnswer || req.query.writingProblemAnswer;

                        var database = req.app.get('database');

                            if(database.db){
                                console.log("데이터베이스를 초기화했습니다.");

                                database.WritingModel.findByExamNO(paramExamNO, function(err, results){
                                    if(err){
                                        console.error("회차를 찾던 중 에러 발생 : " + err.stack);

                                        res.writeHead('200', {'Content-Type':'text/html;charset'});
                                        res.write("<h2>회차를 찾던 중 에러 발생 </h2>");
                                        res.write('<p>'+err.stack+'</p>');
                                        res.end();

                                        return;
                                    }
                                    //회차를 찾았다면 진행합니다.
                                    else{
                                         // 두번째 조건문으로 문제가 있는지 확인합니다.
                                        console.log("독립형 문제가 있나요?" + results[0].Problem[1]);
                                        

                                        //문제가 저장이 되있지 않다면 두번째 조건문으로 이동해 문제를 추가합니다.
                                        if(results[0].Problem[1] == undefined){
                                            console.log("작업하는 회차 확인 " + results);
                                            //문제를 추가하는 함수를 사용합니다.
                                            database.WritingModel.update({
                                                'ExamNO':paramExamNO},{"$push":{'Problem':{
                                                    'writingProblemType':paramwritingProblemType,
                                                    'writingProblem':paramwritingProblem,
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

                                                    var context = {
                                                        ExamNO : paramExamNO,
                                                        ExamDesc : paramExamDesc,
                                                        writingProblemType : paramwritingProblemType,
                                                        writingProblem : paramwritingProblem,
                                                        writingProblemAnswer : paramwritingProblemAnswer,
                                                        login_success : true,
                                                        user : req.user
                                                    }

                                                    req.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                                                        if(err){
                                                            console.error("Add_Writing_ind로 랜더링 중 에러 발생"+ err.stack);

                                                            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                            res.write('<h2>독립형으로 랜더링 중 에러 발생</h2> ');
                                                            res.write('<p>'+err.stack+'</p>');
                                                            res.end();

                                                            return;
                                                        }
                                                        console.log("응답 웹문서 : " + html);
                                                        res.end(html);
                                                    })
                                            })
                                        // 세번째 조건입니다. 문제가 저장이 되어있다면 그 문제와 넘어온 값을 비교하여 디비의 내용을 업데이트 시킵니다.
                                        }else if(results[0].Problem[1] !=null){

                                            console.log("db에서 최소 1개 이상의 문제가 저장되어 있습니다.");
                                            console.log("db에 저장된 독립형을 찾아 비교하여 문제 내용을 업데이트 합니다.");
                                            
                                            database.WritingModel.find({'$and':[{'ExamNO':paramExamNO},{"Problem":{'$elemMatch':{'writingProblemType':paramwritingProblemType}}}]}, function(err, results){
                                                if(err){
                                                    console.error('Writing Database 안에 문제를 찾던 중 에러가 발생했습니다.' + err.stack);

                                                    res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                    res.write('<h2>라이팅 DB안에 유형을 찾던중 에러 발생!</h2>');
                                                    res.write('<p>'+err.stack+'</p>');
                                                    res.end();

                                                    return;
                                                }
                                                //에러가 없으면 디비의 내용을 업데이트 합니다.
                                                // 문제를 업데이트 시에는 스키마 구조와 동일하게 써 주어야 어레이를 손상시키지 않습니다!
                                                // push하는 부분과 비교하시면 한눈에 알수 있습니다.
                                                database.WritingModel.update(
                                                    {'ExamNO':paramExamNO},{"$set":{'Problem':[{
                                                        'writingProblem':paramwritingProblem,
                                                        'writingProblemAnswer':paramwritingProblemAnswer
                                                    }]}}, function(err, results){
                                                        if(err){
                                                            console.error('문제를 수정하던 중 에러가 발생했습니다.'+err.stack);

                                                            res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                            res.write('<h2>문제를 업데이트 하던 중 에러가 발생했습니다. </h2>');
                                                            res.write('<p>'+err.stack+'</p>');
                                                            res.end();

                                                            return;
                                                        }
                                                        console.log('DB에 내용을 성공적으로 업데이트 했습니다.')
                                                        console.log("독립형으로 랜더링 합니다.")

                                                        var context = {
                                                            ExamNO : paramExamNO,
                                                            ExamDesc : paramExamDesc,
                                                            writingProblemType : paramwritingProblemType,
                                                            writingProblem : paramwritingProblem,
                                                            writingProblemAnswer : paramwritingProblemAnswer,
                                                            login_success : true,
                                                            user : req.user
                                                        }
                                                        req.app.render('./NewToefl/writing/AddWriting_ind.ejs', context, function(err, html){
                                                            if(err){
                                                                console.error('Add_writing_Ind 로 랜더링 하던 중 에러 발생'+err.stack);
                                                                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                                                res.write('</h2>독립형 랜더링 중 문제 발생</h2>');
                                                                res.write('<p>'+err.stack+'</p>');
                                                                res.end();

                                                                return;


                                                            }
                                                            console.log("응답 웹문서 : " +html);
                                                            res.end(html);
                                                        })
                                                    })
                                            })
                                        }else{
                                            console.log("어떠한 작업도 수행하지 못했습니다.")
                                            console.log("메인 화면으로 돌아갑니다.")
                                            res.redirect('/');
            
                                        }
                                    }
                                })
                            }else{
                                res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
                                res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
                                res.end();
                               
                            }



                
                }else{
                    console.log("잘못된 접근입니다.")
                    console.log("메인 화면으로 돌아갑니다.")
                    res.redirect('/');

                }
          
    })
}
    
      
     
    
   

module.exports.addProblemWriting = addProblemWriting;
