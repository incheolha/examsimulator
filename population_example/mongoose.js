

var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/board200';
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo db coneecion error'));
database.on('open', function() {
    console.log('database 연결되었습니다......')
 	// 스키마 정의
	// personSchema 와  storySchema 규정
	var personSchema = mongoose.Schema({
	    _id: Number,
	    name: String,
	    age: Number,
        stories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Story'}]
		});

    var storySchema = mongoose.Schema({
        _creator: {type: Number, ref: 'Person'},
        title: String,
        fans: [{type: Number, ref: 'Person'}]
    });

var Person = mongoose.model("Person", personSchema);
var Story = mongoose.model("Story", storySchema);

 console.log('model이 생성되었습니다');

 var addPerson = new Person({_id: 1, name: 'kim dong cheon', age:52});
var addStory = new Story({title: "Get away from there",_creator:addPerson._id});

addPerson.save(function (err) {
  // if (err) return handleError(err);

    addStory.save(function (err) {
    //    if (err) return handleError(err);
    });
});
    console.log('addPerson model이 저장되었습니다'+ addPerson);
    console.log('adStorymodel이 저장되었습니다'+ addStory);

Story.findOne({title: 'Get away from there' }).populate('_creator').exec(function(err, story) {
  //  if(err) return handleError(err);
    console.log('the creator is %s', story._creator.name);
});
});
database.on('close' ,function() {
    colsole.log("database 연걸을 닫습니다")
    database.close();
});