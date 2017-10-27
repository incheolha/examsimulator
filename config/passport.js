
var local_login = require('./passport/local_login');
var local_signup = require('./passport/local_signup');
var facebook = require('./passport/facebook');
var twitter = require('./passport/twitter');
var google = require('./passport/google');
var kakao = require('./passport/kakao');
var instagram = require('./passport/instagram');
var naver = require('./passport/naver');
module.exports = function (app, passport) {
	console.log('config/passport 호출됨.');

    passport.serializeUser(function(user, done) {
        console.log('serializeUser() 호출됨.');
        console.dir(user);

        done(null, user);  // 이 인증 콜백에서 넘겨주는 user 객체의 정보를 이용해 세션 생성
    });

    passport.deserializeUser(function(user, done) {
        console.log('deserializeUser() 호출됨.');
        console.dir(user);
        done(null, user);  
    });

	// 인증방식 설정
	passport.use('local-login', local_login);
	passport.use('local-signup', local_signup);
	passport.use('facebook', facebook(app, passport));
	passport.use('twitter', twitter(app, passport));
	passport.use('google', google(app, passport));
    passport.use('kakao', kakao(app, passport));
    passport.use('instagram', instagram(app,passport));

	console.log('5가지 passport 인증방식 설정됨.');
	
};