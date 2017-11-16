// 시험등록 스키마 코딩 영역

var registerSchemaObj = {};

registerSchemaObj.createSchema = function(mongoose) {
	
// 시험등록 스키마 정의
	var RegisterSchema = mongoose.Schema({
	    
        RegisterNo: {type: Number, required: true},     	                                       //시험등록 회차    
        RegisterDesc:{type: String, default:"", required: true},                                 //시험등록 간단 설명
        RegisterCreatedDate:{type: Date, 'default': Date.now},                     //시험출제 생성일자
		RegisterCompletionTag:{type: Boolean, default: false}                                      // yes= 완료, no=미완료                         
	});

	RegisterSchema.methods = {
		saveRegister: function(callback) {		                                  // 시험등록 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				self.save(callback);
			});
		}
    };

// 스키마에 static 메소드 추가
	RegisterSchema.static('findByNo', function(RegisterNo, callback) {
		console.log("시험등록 번호는:" + RegisterNo);
		return this.find({RegisterNo:RegisterNo}, callback);
	});
	
	
    console.log('Register Schema 설정됨') 
    return RegisterSchema;    
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = registerSchemaObj;

