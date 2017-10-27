

var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/tonydb';
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  
	database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo db coneecion error'));
database.on('open', function() {
    console.log('database 연결되었습니다......')
 	
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

 var addMember = new Member({name: 'kim dong cheon', age:52});


  addMember.save(function (err) {
});

var addTalk = new Talk({title: "Get away from there",_creator:addMember._id});

addTalk.save(function (err) {
    //    if (err) return handleError(err);
});

    console.log('addPerson model이 저장되었습니다'+ addMember);
    console.log('adStorymodel이 저장되었습니다'+ addTalk);

//Talk.findOne({title: 'Get away from there' }).populate('_creator').exec(function(err, talk) {
  //  if(err) return handleError(err);
  //   console.log('the creator is %s', talk._creator.name);
   //  console.log('the creator age is %d', talk._creator.age);
   //  console.log('the creator age is %s', talk.title);

 // });
});
// database.on('close' ,function() {
//     colsole.log("database 연걸을 닫습니다")
//    database.close();
// });