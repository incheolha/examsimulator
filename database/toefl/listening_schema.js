
var utils = require('../../utils/utils');

var listeningSchemaObj = {};

listeningSchemaObj.createSchema = function(mongoose) {
	 
// 스피킹 스키마 정의
	var ListeningSchema = mongoose.Schema({
	    
        ExamNO: {type: Number, trim:true, unique:true, 'default':''},     	                                  //시험출제 횟차    -시험응시collection과 연결필요
        ExamDesc:{type: String, trim:true, 'default':''},                                                          //시험출제 간단 설명
        ExamCreatedTime:{type: Date, 'default': Date.now},                                //시험출제 생성일자
        writer : {type: mongoose.Schema.ObjectId, ref:'users6'},                           //출제자 
        listeningParagraph :[{
                // type:[], trim: true, 'default':'',
                listeningChapterNumber:{type:Number},
                listeningChapterAudio:{type: String, trim:true, 'default':''},
                listeningChapterImage:{type: String, trim:true, 'default':''},
                
                    


                        Problem: [{     
                                        listeningProblemType: { type: Number },                                   // 1~7번 까지의 유형       
                                        listeningAnnouncementText1: {type: String, trim:true, 'default':''},
                                        listeningAnnouncementAudio1: {type: String, trim:true, 'default': ''},     //나레이터  멘트  ------ audio 파일이름
                                        listeningAnnouncementAudio2: {type: String, trim:true, 'default': ''},    // 나레이터  멘트 2 ----- 2개가 필요한 문제의 경우 사용 
                                        listeningProblemAudio1 : {type: String, trim:true, 'default':''},		  //강의내용 or 대화내용 -- audio 파일 이름
                                        listeningProblemAudio2: {type: String, trim:true, 'default':''},          //강의내용 or 대화내용 2 -- audio 파일 2개가 필요한 경우 사용
                                        listeningProblemImage:{type: String, trim: true, 'default':''},		  //강의 or 대화 이미지 -- image 파일 이름
                                        listeningProblem: {type:String, trim:true, 'default': ''},                // 시험 1번문제
                                        listeningProblemArticle1 : {type:String, trim:true, 'default':''},         // question 1      
                                        listeningProblemArticle2 : {type:String, trim:true, 'default':''},         // question 2
                                        listeningProblemArticle3 : {type:String, trim:true, 'default':''},         // question 3
                                        listeningProblemArticle4 : {type:String, trim:true, 'default':''},         // question 4
                                        listeningProblemArticle5 : {type:String, trim:true, 'default':''},
                                        listeningProblemArticle6 : {type:String, trim:true, 'default':''},
                                        listeningProblemAnswer:{type:String, trim:true, 'default':''},		  // 정답
                                        listeningProblemComment:{type:String, trim:true, 'default':''}		  // 해설 

                                        
                                }]

        }] 

});

	ListeningSchema.methods = {
		saveListening: function(callback) {		// listening save
			var self = this;
			this.validate(function(err) {
				if (err) return callback(err);
				
			self.save(callback);
			});
                },
                updateListening: function(callback){
                        var self = this;

                        this.validate(function(err){
                                if(err) return callback(err);

                                self.update(callback);
                        });
                },

		addProblem: function(user, problem, callback) {		//문제추가 
                
                this.problem.push({
                listeningProblemType : problem.listeningProblemType,
                listeningAnnouncementAudio1: problem.listeningAnnouncementAudio1,
                listeningAnnouncementAudio2: problem.listeningAnnouncementAudio2,
                listeningProblemAudio1 : problem.listeningProblemAudio1,
                listeningProblemAudio2: problem.listeningProblemAudio2, 
                listeningProblemImage : problem.listeningProblemImage,
                listeningProblem: problem.listeningProblem,
                listeningProblemArticle1: problem.listeningProblemArticle1,
                listeningProblemArticle2: problem.listeningproblemArticle2,
                listeningProblemArticle3: problem.listeningproblemArticle3,
                listeningProblemArticle4: problem.listeningproblemArticle4,
                listeningproblemArticle5: problem.listeningproblemArticle5,
                listeningProblemArticle6 : problem.listeningProblemArticle6,
                listneingProblemAnswer: problem.listeningProblemAnswer,
                listeningProblemComment: problem.listeningProblemComment
			});
	
    	this.save(callback);
		}
    
    
    
        };

  
        ListeningSchema.static('findByExamNO', function(ExamNO, callback) {
		console.log(ExamNO);
		return this.find({ExamNO:ExamNO}, callback);
	});
	
        console.log('listening schema 정의함');
    
    
        return ListeningSchema;
 
}; 

// module.exports에 listeningSchemaObj 객체 직접 할당
module.exports = listeningSchemaObj;

