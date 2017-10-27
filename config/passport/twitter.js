
var TwitterStrategy = require('passport-twitter').Strategy;
var config = require('../config');

module.exports = function(app, passport) {
	return new TwitterStrategy({
		consumerKey: config.twitter.clientID,
		consumerSecret: config.twitter.clientSecret,
		callbackURL: config.twitter.callbackURL
	}, function(accessToken, refreshToken, profile, cb) {        // 무조건 db로 return값을 반환한다 .... 절대로 바꾸면 안된다.... 이놈들아
		console.log('passport의 facebook 호출됨.');
		console.dir(profile);
		
		var options = {
		    criteria: { 'twitter.id': profile.id }
		};
		
		var database = app.get('database');
	    database.UserModel.load(options, function (err, user) {
			if (err) return cb(err);
      
			if (!user) {
				var user = new database.UserModel({
					name: profile.displayName,
			        provider: 'twitter',
			        twitter: profile._json
				});
        
				user.save(function (err) {
					if (err) console.log(err);
					return cb(err, user);
				});
			} else {
				return cb(err, user);
			}
	    });
	});
};
