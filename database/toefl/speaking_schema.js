// this is a sample test

var utils = require('../../utils/utils');

var speakingSchemaObj = {};

speakingSchemaObj.createSchema = function(mongoose) {
	
// 스피킹 스키마 정의
	var SpeakingSchema = mongoose.Schema({
	    
    ExamNO: {type: Number, unique: true},     	                                                 //시험출제 횟차    -시험응시collection과 연결필요
    ExamDesc:{type: String},                                                                     //시험출제 간단 설명
	ExamCreatedTime:{type: Date, 'default': Date.now},                                         //시험출제 생성일자
//시험 유형
    Problem: [{  
                speakingProblemType: {type: Number},
                speakingAnnounceImage: {type: String, trim:true, 'default': ''},              // 아나운서 이미지 --- 이미지파일 이름
                speakingAnnouncementAudio: {type: String, trim:true, 'default': ''},          // 아나운서 멘트  ------ audio 파일이름
                speakingProblem: {type: String, 'default':''},                                // 시험  4번문제
                speakingProblemReading: {type: String, trim:true, 'default': ''},             //  시험 4번문제 지문
                speakingProblemListeningImage: {type: String, trim:true, 'default': ''},      //  시험 4번문제 듣기에 삽입할 이미지
                speakingProblemListeningAudio: {type: String, trim:true, 'default': ''},           //  시험 4번문제 듣기
                speakingProblemAnswer: {type: String, trim:true, 'default': ''}               //  시험 4번문제 표준정답 audio파일
                
            }]                               

	});

    
	SpeakingSchema.methods = {
		saveSpeaking: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},
		addProblem: function(speaking, problem, callback) {		// 댓글 추가
			this.problem.push({
				speakingProblemType: problem.speakingProblemType,
                speakingAnnounceImage:problem.speakingAnnounceImage,
                speakingAnnouncementAudio:problem.speakingAnnouncementAudio,
                speakingProblem:problem.speakingProblem,
                speakingProblemReading:problem.speakingProblemReading,
                speakingProblemListeningImage:problem.speakingProblemListeningImage,
                speakingProblemListeningAudio:problem.speakingProblemListeningAudio,
                speakingProblemAnswer:problem.speakingProblemAnswer
			});
			
			this.save(callback);
	    }
    }
    SpeakingSchema.static('findByExamNO', function(ExamNO, callback) {
		console.log(ExamNO);
		return this.find({ExamNO:ExamNO}, callback);
	});
    
    SpeakingSchema.static('findBy')


    console.log('speaking Schema 설정됨') 
    return SpeakingSchema;    
};

// module.exports에 PostSchema 객체 직접 할당
module.exports = speakingSchemaObj;

