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
var express = require('express');
var test = require('../database/toefl/reading_schema');
var router = express.Router();

var student = function(req, res){
    console.log("student test");
    
    var database = req.app.get('database');
    
    if(database.db){
        console.log(database.UserModel);

        var context = {
            login_success : true,
            user:req.user
        };
        req.app.render('./testH/test3.ejs', context, function(err, html){
            if(err){
                console.error('test3.ejs 랜더링중 에러 발생'+ err.stack);
                
                 res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                 res.write('<h2>랜더링중 문제 발생</h2>');
                 res.write('<p>'+ err.stack + '</p>');
                 res.end();
                
                 return;
            };
            console.log('응답 웹 문서 : ' + html);
            res.end(html);
        });
    }else{
        res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결에 실패했습니다. </h2>');
		res.end();
    }
};
module.exports.student = student;
 

