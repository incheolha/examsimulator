//test
//test
var utils = require('../../utils/utils');

var readingSchemaObj = {};

readingSchemaObj.createSchema = function(mongoose) {

//리딩 스키마 정의 (Hyunse)
            var ReadingSchema = mongoose.Schema({

                ExamNO : {type: Number, trim: true, 'default':''}, //시험출제 회차
                ExamDesc:{type: String, trim: true, 'default':''}, //시험출제 간단 설명
                ExamCreatedTime:{type:Date, 'default':Date.now}, //시험출제 생성일자
                writer: {type: mongoose.Schema.ObjectId, ref:'users6'}, // 선생님 계정 로그인 아이디
                    
                readingParagraph: 
                [{
                    readingChapterNumber:{type:Number},             //Chapter Number (1,2,3)
                    readingScript :{type:String, trim:true, 'default':''}, //Ckeditor

                        Problem: [{
                                    readingParagraphTitle:{type: String, trim:true, 'default':''},  //지문의 제목
                                    readingParagraphGlossary:{type:String, trim:true, 'default':''}, //어려운 단어 설명
                                    readingParagrphImage: {type: String, trim: true, 'default':''}, //지문 관련 이미지
                                    readingProblemType:{type:Number, trim:true, 'default':''}, //문제유형
                                    readingProblem:{type:String, trim:true, 'default':''},  // 시험문제
                                    readingSubProblem1:{type:String, trim:true, 'default':''}, //8번유형 문제
                                    readingSubProblem2:{type:String, trim:true, 'default':''}, //8,9번 시혐유형 문제
                                    readingArticle1:{type:String, trim:true, 'default':''}, // 문제 a번
                                    readingArticle2:{type:String, trim:true, 'default':''}, // 문제 b번
                                    readingArticle3:{type:String, trim:true, 'default':''}, // 문제 c번
                                    readingArticle4:{type:String, trim:true, 'default':''}, // 문제 d번
                                    readingArticle5:{type:String, trim:true, 'default':''}, // 문제 e번
                                    readingArticle6:{type:String, trim:true, 'default':''}, // 문제 f번
                                    readingArticle7:{type:String, trim:true, 'default':''}, // 문제 g번
                                    readingAnswer:{type:String, trim:true, 'default':''},  //문제의 정답
                                    readingAnswer2:{type:String, trim:true, 'default':''}, //문제 정답2 (8번 또는 9번일때 정답)
                                    readingComment:{type:String, trim:true, 'default':''}, // 해설
                                    readingProblemAnswer:{type:[], trim:true, 'default':''}


                                 }]



                }]


            })   

// // 리딩 스키마 정의
// 기존 작성(Hyunsu)
// 	var ReadingSchema = mongoose.Schema({
 
//           ExamNO: {type: Number, trim: true, 'default':''},   //시험출제 횟차    -시험응시collection과 연결필요
//           ExamDesc:{type: String, trim: true, 'default':''}, //시험출제 간단 설명
// 	      ExamCreatedTime:{type: Date, 'default': Date.now}, //시험출제 생성일자  
//           writer: {type: mongoose.Schema.ObjectId, ref: 'users6'},
//           readingParagraph : {type: [], trim: true, 'default':''},

// //시험 유형
//     problems: [{
//                 readingParagraphType: {type: Number, trim: true, 'default':''},    // 총3개의 Section 표현         
//                 readingParagraphTitle: {type: String, trim: true, 'default':''},                 // 지문의 제목
//                 readingParagraphGlossary: {type: String, trim: true, 'default':''},              // 어려운 단어 설명
//                 readingParagraphImage: {type: String, trim: true, 'default':''},                 // 지문에 관한 이미지
//                 readingProblemType: {type: Number, trim: true, 'default':''}, //문제유형
//                 readingProblem: {type: String, trim:true, 'default': ' '},          // 시험 문제 
//                 readingSubProblem: {type: String, trim:true, 'default': ' '},        //8번유형 문제
//                 readingSubProblem2: {type: String, trim:true, 'default': ' '},      //8,9번유형 문제
//                 readingArticle1: {type: String, trim:true, 'default': ' '},         // A번
//                 readingArticle2: {type: String, trim:true, 'default': ' '},         // B번
//                 readingArticle3: {type: String, trim:true, 'default': ' '},			// C번
//                 readingArticle4: {type: String, trim:true, 'default': ' '},			// D번
//                 readingArticle5: {type: String, trim:true, 'default': ' '}, 	    // E번
//                 readingArticle6: {type: String, trim:true, 'default': ' '}, 	    // F번
//                 readingArticle7: {type: String, trim:true, 'default': ' '}, 		// G번
//                 readingAnswer: {type: String, trim:true, 'default': ' '},                    // 문제의 답
//                 readingAnswer2: {type: String, trim:true, 'default': ' '},			        // 9번유형일때 문제 답
//                 readingComment: {type: String, trim:true, 'default': ' '}                  // 해설
//               }]
//         });

	ReadingSchema.methods = {
		saveReading: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		},

		addProblem: function(user, problem, callback) {		// 글 추가
			this.problem.push({
                                readingParagraphType : problem.readingParagraphType,
                                readingParagraph : problem.readingParagraph,
                                readingParagraphTitle : problem.readingParagraphTitlem,
                                readingParagraphGlossary : problem.readingParagraphGlossary,
                                readingParagraphImage : problem.readingParagraphImage,
				                readingProblemType : problem.readingProblemType,
                                readingProblem : problem.readingProblem,
                                readingSubProblem1 : problem.readingSubProblem1,
                                readingSubProblem2 : problem.readingSubProblem2,
                                readingArticle1 : problem.readingArticle1,           
                                readingArticle2 : problem.readingArticle2,         
                                readingArticle3 : problem.readingArticle3,  		
                                readingArticle4 : problem.readingArticle4,			
                                readingArticle5 : problem.readingArticle5, 			
                                readingArticle6 : problem.readingArticle6,			
                                readingArticle7 : problem.readingArticle7,				
                                readingAnswer : problem.readingAnswer,
                                readingAnswer2 : problem.readingAnswer,
                                readingProblemAnswer:problem.readingProblemAnswer,  
                                readingComment : problem.readingComment,
                                writer: user._id
                                });
			
			this.save(callback);
		},
            removeProblem: function(id, callback) {		// 댓글 삭제
			var index = utils.indexOf(this.problems, {id: id});
			if (~index) {
				this.problems.splice(index, 1);
			} else {
				return callback('ID [' + id + '] 를 가진 댓글 객체를 찾을 수 없습니다.');
			}
			
			this.save(callback);
		}
        }
        ReadingSchema.statics = {
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
        // 서로 약속된 함수를 사용하여 혼란방지. 시험회차넘버로 내용을 찾는 함수 등록
      ReadingSchema.static('findByExamNO', function(ExamNO, callback) {
		console.log(ExamNO);
		return this.find({ExamNO:ExamNO}, callback);
	});    
    console.log('reading schema 정의함');
    return ReadingSchema;

    
};

// module.exports에 readingSchemaObj 객체 직접 할당
module.exports = readingSchemaObj;

