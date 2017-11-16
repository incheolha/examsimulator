// module.exports = function(router, studentRouting) {
//     console.log('토플 라우팅 호출됨.');
// router.route('/toefl/student').get(function(req, res) {
    
//     console.log('/toefl 관리자 화면 요청됨.');

//        res.render('./testH/test3', function(err,html) {
//             if (err) {throw err;}
//             console.log('rendered: ' + html);
//             res.end(html);
//         });  
// });
// };
var Entities = require('html-entities').AllHtmlEntities;

var student = function(req, res){
    console.log("student test");
    //변수를 선언해주는 부분.
    //프런트에 폼 액션 안에 있는 3개의 파라미터를 정의해준다.
    var paramExamNO = req.body.ExamNO || req.query.ExamNO ;
    var paramExamDesc = req.body.ExamDesc || req.query.ExamDesc;
    var paramwritingProblemType = req.body.writingProblemType || req.query.writingProblemType;
    // 파라미터를 확인하자.

    console.log("넘어가는 회차" + paramExamNO +", 넘어가는 설명 : " +paramExamDesc +"갖고가는 문제유형  : "+ paramwritingProblemType);
    // 데이터베이스를 연결한다.
    // 왜? 지금 디비안에 있는 정보를 가져와서 비교한후, 뿌릴거니까.
    var database = req.app.get('database');
    // 조건문 데이터베이스 디비. 만약 데이터베이스에 연결되면.
    if(database.db){
        console.log("데이터베이스에 연결되었습니다.");

        //데이터베이스에 연결이 되면 해야할것. 
        // 우리가 가져와야 할 정보. 라이팅! 
        //라이팅 정보를 지금 우리가 가지고 온 파라미터와 비교하자. 
        // 데이터 베이스 안에 있는 정보를 사용하겠다.

        database.WritingModel.findByExamNO(paramExamNO, function(err, results){
            //function(err, results)  처음에 에러를 처리하고, 그다음에 에러가 아니라면 results.
            if(err){
                console.error("챕터넘버와 db의 챕터넘버가 맞지 않습니다." +err.stack);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>챕터 넘버를 찾던 중 에러가 발생 </h2>');
                res.write('<p>'+err.stack+'</p>');
                res.end();
                return;
            }
            // 이 위에부분은 에러 처리. 처리가끝난 이 브레이스 밑부분은 정상적인 결과가 나올것이다!
            else{ console.log("우리가 원하는 값이 나왔을까요? : " + results);

                //가장 첫번째 값하고, 그안에 프라브럼 0번에 저장된 값이 있다면! 
                if(results[0].Problem[0] !=null){
                    console.log("db에 저장된 값이 있네요 !");
                    console.log("db에 값을 불러와서 랜더링 합시다.");

                    // 디비에 문제를 찾은 상태이기 때문에 디비의 값과 함께 여기서 랜더링 한다.
                    // json 형식이다.
                    var context = {
                        //앞에부분 니가 정보를 넘겨서 그 랜더링한 페이지에서 불러올 이름 
                        //뒤에부분 우리가 지금 들고가는 부분/.
                        //넘어간 페이지에서 사용하기 쉽게 이름을 정한것이다.
                        ExamNO : paramExamNO,
                        ExamDesc : paramExamDesc,
                        writingProblemType : paramwritingProblemType,
                        //위의 세개의 파라미터는 우리가 폼 액션안에 저장한 값입니다.
                        // 나머지 우리가 데이터베이스 안에서 갖고오고 싶은 정보이다.
                        writingProblem : results[0].Problem[0].writingProblem,
                        writingProblemAnswer : results[0].Problem[0].writingProblemAnswer,
                        // 위에 값과 똑같이 써준것이다.
                        //나머지 로그인 정보도 묶자.
                        login_success : true,
                        user : req.user
                    }

                    
                    //이렇게 하면 우리가 갖고갈 정보를 context로 묶어서 다른 이제이에스로 랜더링 하면 된다!
                    // response 는 사용자에게 보여질 정보를 나타낸다. 
                    res.app.render('./testH/test3.ejs', context, function(err , html){
                        if(err){
                            console.error("랜더링중에 에러가 발생했습니다."+ err.stack);
                           // 콘솔 에러부분은 우리가 지금 작업하는 터미널 부분에서 확인가능

                           //밑에 리스폰스는 사용자에게 보여질 화면이다.\
                            //에러가 나면 밑에 부분이 html에서 보여질것이다.
                           
                            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                            res.write('<h2> 랜더링 중에 에러가 발생했습니다. </h2>');
                            res.write('<p>'+err.stack+'</p>');
                            res.end()

                            return;
                        }
                        console.log(html);
                        //에러가 나지않으면 랜더링 한다.
                        res.end(html);
                    })

                }

            }
           
        })
    }else{
        res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패<h2>');
        res.end();
    }
};

module.exports.student = student;
 

