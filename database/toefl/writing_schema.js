var utils = require('../../utils/utils');

var writingSchemaObj = {};

writingSchemaObj.createSchema = function(mongoose) {
	
    var WritingSchema = mongoose.Schema({
	
        ExamNO: {type: Number, trim:true, unique:true, 'default':''},     	                                  //시험출제 횟차    -시험응시collection과 연결필요
        ExamDesc:{type: String, trim:true, 'default':''},                                                          //시험출제 간단 설명
        ExamCreatedTime:{type: Date, 'default': Date.now},      
        
            
	    Problem:[{ 
                    writingProblemType : {type: Number},  // 독립형인지, 통합형인지 구분  1:통합형 2:독립형
                    writingAnnounceDirection: {type: String, trim: true, 'default': ''}, // 문제출제전 나오는 direction db에서 읽어오기
                    writingAnnouncementAudio: {type: String, trim: true, 'default': ''}, // 디렉션 읽어주는 audio db에서 읽어오기
                    writingProblem: {type: String, trim: true, 'default': ''}, //문제 출제 파트. db에서 읽어오기만 한다.
                    writingProblemReading: {type: String, trim:true, 'default': ''}, //ck editor. 문제에 관련된 스크립트.
                    writingProblemListeningImage: {type: String, trim: true, 'default': ''}, //문제에 관련된 lecture image
                    writingProblemListeningAudio: {type: String, trim: true, 'default': ''}, //문제관련 lecture mp3
                    writingProblemAnswer: {type: String, trim: true, 'default': ''} //선생님이 달아주는 해설파트.
        }]
});

    WritingSchema.methods = {
		    saveWriting: function(callback) {		// 글 저장
			    var self = this;
			
			    this.validate(function(err) {
				    if (err) return callback(err);
				self.save(callback);
			    });
		    },

		addProblem: function(writing, problem, callback) {		// 댓글 추가
			
                this.problem.push({
                    writingProblemType: problem.writingProblemType,
                    writingAnnounceImage:problem.writingAnnounceImage,
                    writingAnnouncementAudio:problem.writingAnnouncementAudio,
                    writingProblem:problem.writingProblem,                              // 통합형 & 독립형 문제
                    writingProblemReading:problem.writingProblemReading,                // 통합형 문제 지문
                    writingProblemListeningImage:problem.writingProblemListeningImage,  // 통합형 이미지
                    writingProblemListening:problem.writingProblemListening,            // 통합형 듣기
                    writingProblemAnswer:problem.writingProblemAnswer                   // 글 쓰기
                });
			
    			this.save(callback);
		}    
    }
    
    WritingSchema.statics = {
		// ID로 글 찾기
		load: function(id, callback) {
			this.findOne({_id: id})
				.populate('writer', 'name provider email')
				.exec(callback);
		},
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
				.limit(Number(options.perPage))
				.skip(options.perPage * options.page)
				.exec(callback);
		},
        incrHits: function(id, callback) {
            var query = {_id: id};
            var update = {$inc: {hits:1}};
            var options = {upsert:true, 'new':true, setDefaultsOnInsert:true};
            
            this.findOneAndUpdate(query, update, options, callback);            
        }
	}
    WritingSchema.static('findByExamNO', function(ExamNO, callback) {
		console.log(ExamNO);
        return this.find({ExamNO:ExamNO}, callback);
        
    });
    
    WritingSchema.static('findByProblemType', function(writingProblemType, callback){
         console.log(writingProblemType);
         return this.find({Problem:[{writingProblemType:writingProblemType}]}, callback)
    });

    console.log('writing schema 정의함');
    return WritingSchema;
};

module.exports = writingSchemaObj;
