/* 토플 메인페이지 호출시 사용하는 모듈

    '/'   ----
              인증이 안된경우   (!req.user)
    
              각 사용자 권한별 접속 페이지 설정
                    req.user에서 permissionTag 값이 toeflAdmin이면 관리자
                    req.user에서 permissionTag 값이 toeflTeacher이면 출제자
                          RegisterModel에서 find({})를 호출하여 모든 시험출제 명단 확보
                    requ.user에서 permissionTag값이 "" or 기타 이면 일반사용자  
*/

module.exports = function(router, passport) {
    console.log('user_passport 호출됨.');

// 홈 페이지 화면 index.ejs
    router.route('/').get(function(req, res) {
        console.log('/ 패스 요청됨.');
        console.log('req.user의 정보');
        console.dir(req.user);

// 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');            
            res.render('index.ejs', {login_success:false});
 

//인증 된 경우   
               
            } else if (req.user.permissionTag == 'toeflAdmin') {      
                console.log('관리자 인증된 상태임.');                                        // 총 관리자  모드
                console.dir(req.user);

                var context = {login_success:true, user:req.user};
                    res.render('index.ejs', context, function(err,html) {
                        if (err) {throw err;}
                    res.end(html);
                    }); 

            } else if (req.user.permissionTag == 'toeflTeacher') {                             // 출제자 모드
                console.log('시험 출제자  인증된 상태임.');
 
 
//시험등록 정보 불러오기             

                                    var database = req.app.get('database');
                                
                                    // 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
                                    if (database) {
                                        // 1. 모든 사용자 검색
                                        database.RegisterModel.find({}).sort({'_id': -1}).exec(function(err, registerLists) {
                                            // 에러 발생 시, 클라이언트로 에러 전송
                                            if (err) {
                                                console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
                                                
                                                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                                res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
                                                res.write('<p>' + err.stack + '</p>');
                                                res.end();
                                                
                                                return;
                                            }
                                            
                                            if (registerLists) {  // 결과 객체 있으면 리스트 전송
                                                console.dir(registerLists);
                                            }
  
                                                var context = {login_success:true, user:req.user, lists:registerLists};
                                                        res.render('./toefl/toeflTeacher/registration/registerIndex.ejs', context, function(err,html) {
                                                            if (err) {throw err;}
                                                        res.end(html);
                                                        }); 
    
                                      });
                                    } else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
                                        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                                        res.write('<h2>데이터베이스 연결 실패</h2>');
                                        res.end();
                                    };

// 시험등록정보 불러오기 끝

            } else if (req.user.permissionTag != 'toeflAdmin') {                                 //일반사용자 모드
                console.log('일반 사용자 인증된 상태임.');
                console.dir(req.user);
                var context = {login_success:true, user:req.user};
                    res.render('index.ejs', context, function(err,html) {
                        if (err) {throw err;}
                    res.end(html);
                      
                 }); 

            }
    });
    

    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        res.render('member/login.ejs', {message: req.flash('loginMessage')});
    });
	 
    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('member/signup.ejs', {message: req.flash('signupMessage')});
    });

     // 회원가입 화면
    router.route('/signupadmin').get(function(req, res) {
        console.log('/signupadmin 패스 요청됨.');
        res.render('toefladmin/signupadmin.ejs', {message: req.flash('signupMessage')});
    });
     
    

       router.route('/register/updateregister').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('./toefl/toeflTeacher/index.ejs', {user: req.user[0]._doc});
            } else {
                res.render('./NewToefl/index.ejs', {user: req.user});
            }
        }
    });

    // 프로필 화면
    router.route('/profile').get(function(req, res) {
        console.log('/profile 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('사용자 인증된 상태임.');
            console.log('/profile 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('member/profile.ejs', {user: req.user[0]._doc});
            } else {
                res.render('member/profile.ejs', {user: req.user});
            }
        }
    });

    // 프로필 화면
    router.route('/payment').get(function(req, res) {
        console.log('/payment 패스 요청됨.');

        // 인증된 경우, req.user 객체에 사용자 정보 있으며, 인증안된 경우 req.user는 false값임
        console.log('req.user 객체의 값');
        console.dir(req.user);

        // 인증 안된 경우
        if (!req.user) {
            console.log('사용자 인증 안된 상태임.');
            res.redirect('/');
        } else {
            console.log('결재 인증정보  상태임.');
            console.log('/payment 패스 요청됨.');
            console.dir(req.user);

            if (Array.isArray(req.user)) {
                res.render('payments/payment1.ejs', {user: req.user[0]._doc});
            } else {
                res.render('payments/payment1.ejs', {user: req.user});
            }
        }
    });
    // 로그아웃
    router.route('/logout').get(function(req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });
   // 로그인 인증
    router.route('/login').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    // 회원가입 인증
    router.route('/signup').post(passport.authenticate('local-signup', {
        successRedirect : '/', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));


    // 로그인 인증
    router.route('/loginadmin').post(passport.authenticate('local-login', {
        successRedirect : '/', 
        failureRedirect : '/toefl/admin', 
        failureFlash : true 
    }));

    // 토플 관리자 인증
    router.route('/signupadmin').post(passport.authenticate('local-signup', {
        successRedirect : '/', 
        failureRedirect : '/toefl/admin', 
        failureFlash : true 
    }));




    // 패스포트 - 페이스북 인증 라우팅 
    router.route('/auth/facebook').get(passport.authenticate('facebook', { 
        scope : 'email' 
    }));
    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/facebook/callback').get(passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

    // 패스포트 - google 인증 라우팅 
    router.route('/auth/twitter').get(passport.authenticate('twitter', { 
        failureRedirect : '/'
    }));
    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/twitter/callback').get(passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

    // 패스포트 - google 인증 라우팅 
    router.route('/auth/google').get(passport.authenticate('google', { 
        scope : 'email' 
    }));
    // 패스포트 - 페이스북 인증 콜백 라우팅
    router.route('/auth/google/callback').get(passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
    
 // 패스포트 - instagram 인증 라우팅 
    router.route('/auth/instagram').get(passport.authenticate('instagram', { 
       failureRedirect : '/'
    }));
    // 패스포트 - instagram 인증 콜백 라우팅
    router.route('/auth/instagram/callback').get(passport.authenticate('instagram', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
   
    // 패스포트 - kakao 인증 라우팅 
    router.route('/auth/kakao').get(passport.authenticate('kakao', { 
        scope: 'email'
	}));
    // 패스포트 - kakao 인증 콜백 라우팅
    router.route('/auth/kakako/callback').get(passport.authenticate('kakao', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

    // 패스포트 - naver 인증 라우팅 
    router.route('/auth/naver').get(passport.authenticate('kakao', { 
        scope: 'email'
    	}));
    // 패스포트 - naver 인증 콜백 라우팅
    router.route('/auth/naver/callback').get(passport.authenticate('kakao', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

};