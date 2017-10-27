
var InstagramStrategy = require('passport-instagram').Strategy;
var config = require('../config');
module.exports = function(app, passport) {
	return new InstagramStrategy({
    	clientID: config.instagram.clientID,
    	clientSecret: config.instagram.clientSecret,
    	callbackURL: config.instagram.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		console.log('passport의 facebook 호출됨.');
		console.dir(profile);	
		var options = {
//아래 둘중 하나를 사용하기바람
		    'instagram.id': profile.email  //id값이 이메일칸으로 대체됨 이메일 반환안됨
//			'instagram.id': profile['instagram.id']  //id값은 배열로 받음 
			
		};
		var database = app.get('database');
	    database.UserModel.findOne(options, function (err, user) {
			if (err) return done(err); 
			if (!user) {
				var user = new database.UserModel({
					name: profile.username,
		//	        email: profile.emails[0].value,       email 값 반환하지 않음
			        provider: 'instagram',
			        instagram: profile._json
				});       
				user.save(function (err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
	    });
	});
};
