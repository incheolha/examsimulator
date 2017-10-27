
var NaverStrategy = require('passport-naver').Strategy;
var config = require('../config');

module.exports = function(app, passport) {
	return new NaverStrategy({
    	clientID: config.naver.clientID,
    	clientSecret: config.naver.clientSecret,
    	callbackURL: config.naver.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		console.log('passport의 facebook 호출됨.');
		console.dir(profile);
		
		var options = {
		    'naver.id': profile.id
		};
		
		var database = app.get('database');
	    database.UserModel.findOne(options, function (err, user) {
			if (err) return done(err);
      
			if (!user) {
				var user = new database.UserModel({
					name: profile.nickname,
			        email: profile.email,
			        provider: 'naver',
			        naver: profile._json
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
