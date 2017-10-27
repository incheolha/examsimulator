



var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/tonydb';
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo db coneecion error'));
database.on('open', function() {
    console.log('database 연결되었습니다......')
 	// 스키마 정의
	// personSchema 와  storySchema 규정
	var memberSchema = mongoose.Schema({
	   
	    name: String,
	    age: Number,
        stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Talk'}]
		});

    var talkSchema = mongoose.Schema({
        _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Member'},
        title: String
    });

var Member = mongoose.model('Member', memberSchema);
var Talk = mongoose.model('Talk', talkSchema);
 console.log('model이 생성되었습니다');

Talk.find({title: 'Get away from there' }).populate('_creator').exec(function(err, talk) {
  //  if(err) return handleError(err);
  for (var i = 0; i < talk.length; i++) {
     console.log('the creator is %s', talk[i]._creator.name);
   console.log('  age is %d', talk[i]._creator.age);
   console.log('title is %s', talk[i].title);
  }
});
});
// database.on('close' ,function() {
//     colsole.log("database 연걸을 닫습니다")
//    database.close();
// });