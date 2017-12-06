
//addProblem을 위한 미들웨어 설정 

var multer = require('multer');
var fs = require('fs');

var paramExamNO = "";
var paramExamDesc = "";
var paramlisteningChapterNumber = "";
var paramlisteningProblemType = "";
var paramlisteningAnnouncementText1 = "";
var paramlisteningProblemArticle1 = "";
var paramlisteningProblemArticle2 = "";
var paramlisteningProblemArticle3 = "";
var paramlisteningProblemArticle4 = "";
var paramlisteningProblemArticle5 = "";
var paramlisteningProblemArticle6 = "";
var paramlisteningProblemAnswer = "";
var paramlisteningProblemComment = "";
var testAudio1 = "";
var testAudio2 = "";
var narrAudio1 = "";
var narrAudio2 = "";

var addProblemListening = function(req, res){

}

module.exports.addProblemListening = addProblemListening;