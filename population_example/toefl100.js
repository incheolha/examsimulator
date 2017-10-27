// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');
 
// mongoose 모듈 사용
var mongoose = require('mongoose');


// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

//===== 데이터베이스 연결 =====//

// 데이터베이스 객체를 위한 변수 선언
    var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
    var MemberSchema;
    var TalkSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
    var MemberModel;
    var TalkModel;

//데이터베이스 구성함수 

function connectDB() {
    //db 연결
        var databaseUrl = 'mongodb://localhost:27017/toefl100';
        console.log('데이터베이스 연결을 시도합니다.');
        mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
        mongoose.connect(databaseUrl);
        database = mongoose.connection;
        
        database.on('error', console.error.bind(console, 'mongoose connection error.'));    
    // db가 open되었을시 
        database.on('open', function () {
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

        // 스키마 정의
            MemberSchema = mongoose.Schema({
                id: String,
                name: String,
                password: String,
                stories:[], 
            //  stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Talk'}]
            });

            var TalkSchema = mongoose.Schema({
                _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
                title: String
            });

            console.log('MemberSchema 정의함.');
            console.log('TalkSchema 정의함.');
            
       // 스키마에 static으로 findAll 메소드 추가
        MemberSchema.static('findAll', function(callback) {
            return this.find({}, callback);
        });
    
        // Model 모델 정의
            MemberModel = mongoose.model("member", MemberSchema);
            TalkModel = mongoose.model("talk", TalkSchema);

            console.log('MemberModel 정의함.');
            console.log('TalkModel 정의함.');
        });
        
    // 연결 끊어졌을 때 5초 후 재연결
        database.on('disconnected', function() {
            console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
            setInterval(connectDB, 5000);
        });
}

//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

// login routing함수 호출시
    router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출됨.');

        var paramId = req.body.id || req.query.id;
        var paramPassword = req.body.password || req.query.password;
        console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
        
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
        if (database) {
            authUser(database, paramId, paramPassword, function(err, docs) {
                
                if (err) {throw err;}
                
                // 조회된 레코드가 있으면 성공 응답 전송
                if (docs) {
                    console.dir(docs);
                // 조회 결과에서 사용자 이름 확인
                
                    var username = docs[0].name;
                    var objectId = docs[0]._id;
                    var stories = docs[0].stories[0]

                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h1>로그인 성공</h1>');
                    res.write('<div><p>사용자 오브젝트 아이디: ' + objectId + '</p></div>');
                    res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
                    res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
                    res.write('<div><p>사용자 이야기 : ' + stories + '</p></div>');
                    res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
                    res.end();
                
                } else {  // 조회된 레코드가 없는 경우 실패 응답 전송
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h1>로그인  실패</h1>');
                    res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
                    res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
                    res.end();
                }
            });
        } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
            res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
            res.end();
        }
        
    });

// 사용자 추가 라우팅 함수
router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (database) {
        addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
            if (err) {throw err;}
            
            // 결과 객체 있으면 성공 응답 전송 
            // 절대로 array방식으로 표현 하면 안됨

            if (addedUser) {
                console.dir(addedUser);
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>사용자 추가 성공</h2>');
                    res.write('<div><p>사용자 오브젝트 아이디: ' + addedUser._id + '</p></div>');
                    res.write('<div><p>사용자 아이디 : ' + addedUser.name + '</p></div>');
                    res.write('<div><p>사용자 이름 : ' + addedUser.password + '</p></div>');
                    res.write('<div><p>사용자 아이디 : ' + addedUser.id + '</p></div>');
                    res.write("<br><br><a href='/public/adduser.html'>추가하기</a>");

                res.end();
            } else {  // 결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가  실패</h2>');
                res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
});

// 사용자 추가 라우팅 함수
router.route('/process/updateuser').post(function(req, res) {
    console.log('/process/updateuser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramStory = req.body.story || req.query.story;
    
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName + ',' + paramStory);
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (database) {
        updateUser(database, paramId, paramPassword, paramName, paramStory, function(err, updatedUser) {
            if (err) {throw err;}
            
            // 결과 객체 있으면 성공 응답 전송 
            // 절대로 array방식으로 표현 하면 안됨

            if (updatedUser) {
                console.dir(updatedUser);
                    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                    res.write('<h2>사용자 업데이트 성공</h2>');
                    res.write("<br><br><a href='/public/updateuser.html'>추가하기</a>");
                    res.end();
            } else {  // 결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가  실패</h2>');
                res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
    
});


// 라우터 객체 등록
app.use('/', router);



// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password);
    
    // 아이디와 비밀번호를 이용해 검색
    MemberModel.find({"id":id, "password":password}, function(err, results) {
        if (err) {  // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
            callback(err, null);
            return;
        }
        console.log('아이디 [%s], 패스워드 [%s]로 사용자 검색결과', id, password);
        console.dir(results);
        
        if (results.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
            console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
            callback(null, results);
        } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null, null);
        }
    });
};


//사용자를 추가하는 함수
var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);
    
    // UserModel 인스턴스 생성
    var user = new MemberModel({"id":id, "password":password, "name":name,"$push" : {"stories" :1000}});

    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
    user.save(function(err, addedUser) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("사용자 데이터 추가함.");
        callback(null, addedUser);
    });
};

//사용자를 추가하는 함수
var updateUser = function(database, id, password, name, story, callback) {
    console.log('updated 호출됨 : ' + id + ', ' + password + ', ' + name + ',' + story);
    
    // UserModel 인스턴스 생성
    
var conditions = { "id" : id };
var update1 = {name: name, $push: { "stories" : story }};
//options not included in above code
var options = { multi: false };
var callback1 = function (err, updatedUser) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log("사용자 데이터 추가함.");
        callback(null, updatedUser);
    };

MemberModel.update(conditions, update1, options, callback1);

    // save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
//  MemberModel.update( {"id" : id},
//                     { $addToSet: { "stories" : story}}, function(err, updatedUser) {
//      if (err) {
//          callback(err, null);
//          return;
//      }
//      console.log("사용자 데이터 추가함.");
//      callback(null, updatedUser);
//  });

};
//사용자 리스트 함수
router.route('/process/listuser').post(function(req, res) {
    console.log('/process/listuser 호출됨.');

    // 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
    if (database) {
        // 1. 모든 사용자 검색
        MemberModel.findAll(function(err, results) {
            // 에러 발생 시, 클라이언트로 에러 전송
            if (err) {
                console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                
                return;
            }
              
            if (results) {  // 결과 객체 있으면 리스트 전송
                console.dir(results);
 
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트</h2>');
                res.write('<div><ul>');
                
                for (var i = 0; i < results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
                    for (var ii=0; ii < results[i].stories.length; ii++) {
                        curstory = results[i].stories[ii];
                    res.write('    <li>#' + i + ' : ' + curstory + '</li>');
                        
                    }
                }   
            
                res.write('</ul></div>');
                res.end();
            } else {  // 결과 객체가 없으면 실패 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회  실패</h2>');
                res.end();
            }
        });
    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }   
    
});

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
    console.log("Express 서버 객체가 종료됩니다.");
    if (database) {
        database.close();
    }
});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출
  connectDB();
   
});
