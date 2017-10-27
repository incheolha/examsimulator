
// listening 라우팅 설정 


// html-entities module is required in showpost.ejs
var Entities = require('html-entities').AllHtmlEntities;

var addlistening = function(req, res) {
// add~~~~ 는 더이상 사용하지 않습니다. 
// register.js 에서 addregister(회차생성)시 같이 생성되기때문에 update 만 사용합니다.
};

var addProblem = function(req, res){
    // console.log("listening에 있는 addProblem 호출됨")
    // var paramExamNO = req.body.ExamNO;
    // var paramExamDesc = req.body.ExamDesc;
    // var paramlisteningChapterNumber =req.body.listeningChapterNumber
    
    // console.log("요청 파라미터1 : " +paramExamNO)
    // console.log("요청 파라미터2 : " +paramExamDesc)
    // console.log("요청 파라미터3 : " +paramlisteningChapterNumber)


    // var context=
    //                 {
    //                 ExamNO : paramExamNO,
    //                 ExamDesc : paramExamDesc,
    //                 listeningChapterNumber : paramlisteningChapterNumber
    //                 };
                
    // req.app.render('./toefl/tabs_integrateQuestionType.ejs', context, function(err, html){
    //                 if(err){
    //                 console.error('파라미터를 보내던 중 에러가 발생했습니다.' + err.stack );

    //                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    //                 res.write('<h2>파라미터 전달 중 에러 발생 </h2>');
    //                 res.write('<p>'+ err.stack + '</p>');
    //                 res.end();

    //                 return;
    //                 }

    //                 console.log('응답 웹문서 : ');
    //                 return res.redirect('/process/multer/updatelistening')
    //                 });



    }

var updatelistening = function(req, res) {
    console.log("listening에 있는 updatelistening 호출됨");
    console.log(req.body.listeningChapterNumber);

    var paramExamNO = req.body.ExamNO || req.query.ExamNO; 
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramlisteningChapterNumber = req.body.listeningChapterNumber || req.query.listeningChapterNumber;
    var paramlisteningChapterImage = req.body.listeningChapterImage || req.query.listeningChapterImage;
    var paramlisteningChapterAudio = req.body.listeningChapterAudio || req.query.listeningChapterAudio;

    console.log("요청 파라미터 : " + paramlisteningChapterNumber);
    var database = req.app.get('database');
    

    if(database.db){
        console.log(database.UserModel);
        database.ListeningModel.findByExamNO(paramExamNO,
  

    function(err, results){
        if(err){
            console.error('챕터 넘버를 찾던 중 에러 발생 : ' +err.stack);

            res.writeHead('200', {'Content-Type':'text/html;charset=utf8;'});
            res.write('<h2>챕터 넘버를 찾던 중 에러 발생</h2>');
            res.wrtie('<p>' + err.stack + '</p>');
            res.end();

            return;

            var context=
                    {
                    ExamNO : paramExamNO,
                    ExamDesc : paramExamDesc,
                    listeningChapterNumber : paramlisteningChapterNumber
                    };
            req.app.render('./toefl/listening/Add_Listening.ejs', context, function(err, html){
                if(err){
                    console.error('Add_Listening.ejs 랜더링중 에러 발생' + err.stack );

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>랜더링중 문제 발생 </h2>');
                    res.write('<p>'+ err.stack + '</p>');
                    res.end();

                    return;
                }
                console.log('응답 웹문서 : ' +html);
                res.end(html);  
                });





        }
        console.dir("result = " + results);
        if(results !=null)
            {
            database.ListeningModel.update(
            {'ExamNO':paramExamNO}, {'$push':{'listeningParagraph':{
            'listeningChapterNumber':paramlisteningChapterNumber,
            'listeningChapterImage':paramlisteningChapterImage,
            'listeningChapterAudio':paramlisteningChapterAudio 
            }}}, {'upsert':true}, function(err, results){
                if(err){
                    console.error('Chapter Number 추가 중 에러 발생 : ' +err.stack);

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>listening chapter number추가 중 에러 발생 </h2>');
                    res.write('<p>'+err.stack+'</p>');
                    res.end();

                    return;
                };
                
                console.log("Chapter Number 추가됨");
                
                var context=
                        {
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc,
                        listeningChapterNumber : paramlisteningChapterNumber
                        };
                   
                req.app.render('./toefl/listening/Add_Listening.ejs', context, function(err, html){
                if(err){
                    console.error('Add_Listening.ejs 랜더링중 에러 발생' + err.stack );

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>랜더링중 문제 발생 </h2>');
                    res.write('<p>'+ err.stack + '</p>');
                    res.end();

                    return;
                }
                console.log('응답 웹문서 : ' +html);
                res.end(html);  
                });
            } 
                    
        )};

})
    
    }else {
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결에 실패했습니다.</h2>');
            res.end();
    }

};

var removelistening = function(req, res) {

};

var listlistening = function(req, res) {

};

module.exports.addlistening = addlistening;
module.exports.updatelistening = updatelistening;
module.exports.removelistening = removelistening;
module.exports.listlistening = listlistening;
module.exports.addProblem =addProblem;

