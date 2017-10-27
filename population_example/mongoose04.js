

var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/toefl';
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo db conection error'));
database.on('open', function() {
    console.log('database 연결되었습니다......')
 	// 스키마 정의
// 시험 등록 정보 스키마 정의
	
	var registerSchema = mongoose.Schema({
        registNo: Number,
		desc : String,
		createDate: {type: Date, 'default': Date.now}
    });

// 회원정보 스키마 정의
	
	var personSchema = mongoose.Schema({
	    name: String,
	    age: Number,
		examInfo: [{
		registId: {type: mongoose.Schema.Types.ObjectId, ref: 'Register'},
		paymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}
		}]
	});

// 결재정보 스키마 정의
		
	var paymentSchema = mongoose.Schema({
	    desc: String,
	    amt: Number,
		registId: {type: mongoose.Schema.Types.ObjectId, ref: 'Register'},
		personId: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'}
	});
	
// 각 collection 모델 생성	

var Register = mongoose.model("Register", registerSchema);
var Person = mongoose.model("Person", personSchema);
var Payment = mongoose.model("Payment", paymentSchema);
console.log('model이 생성되었습니다');
		

var r1 = new Register({registNo: 1, desc:'제 1회차 토플모의시험입니다'});
var r2 = new Register({registNo: 2, desc:'제 2회차 토플모의시험입니다'});
var r3 = new Register({registNo: 3, desc:'제 3회차 토플모의시험입니다'});
var r4 = new Register({registNo: 4, desc:'제 4회차 토플모의시험입니다'});
var r5 = new Register({registNo: 5, desc:'제 5회차 토플모의시험입니다'});
	
r1.save();
r2.save();
r3.save();
r4.save();
r5.save();

console.log('r1 model이 저장되었습니다'+ r1);
console.log('r2 model이 저장되었습니다'+ r2);
console.log('r3 model이 저장되었습니다'+ r3);
console.log('r4 model이 저장되었습니다'+ r4);
console.log('r5 model이 저장되었습니다'+ r5);

var person = new Person({
	name: "kim dong Cheol",
	age: 30
});
var person1 = new Person({
	name: "kim Sang Kyun",
	age: 22
});
var person2 = new Person({
	name: "kim Hyun Su",
	age: 25
});
var person3 = new Person({
	name: "Seo Hyun Seo",
	age: 26
});
var person4 = new Person({
	name: "Maeng Rya Hyun",
	age: 22
});

person.save();
person1.save();
person2.save();
person3.save();
person4.save();

console.log('person1 model이 저장되었습니다'+ person);
console.log('person1 model이 저장되었습니다'+ person1);
console.log('person1 model이 저장되었습니다'+ person2);
console.log('person1 model이 저장되었습니다'+ person3);
console.log('person1 model이 저장되었습니다'+ person4);
	
	
var p1 = new Payment({
    desc: "1회차 결재정보",
	amt: 30000,
    registId:r1._id,
    personId:person._id
})  

var p2 = new Payment({
    desc: "3회차 결재정보",
	amt: 30000,
    registId:r3._id,
    personId:person1._id
})  
var p3 = new Payment({
    desc: "3회차 결재정보",
	amt: 30000,
	registId:r3._id,
    personId:person4._id
})

var p4 = new Payment({
    desc: "4회차 결재정보",
	amt: 30000,
	registId:r4._id,
    personId:person2._id
})  

p1.save();
p2.save();
p3.save();
p4.save();

console.log('person1 model이 저장되었습니다'+ p1);
console.log('person1 model이 저장되었습니다'+ p2);
console.log('person1 model이 저장되었습니다'+ p3);
console.log('person1 model이 저장되었습니다'+ p4);
	
var result = Payment.find()
      .populate('registId')
      .populate('personId')
      .exec(function(error, pays) {   
		 return(null, pays);   
  });
	
if (result.length >0) {
    for (var i = 0; i<= result.length; i++) {
        console.log(result[i].personId.name);
    };
};
	
});
database.on('close' ,function() {
    colsole.log("database 연걸을 닫습니다")
    database.close();
});