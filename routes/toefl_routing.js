/* 이 코딩은 각 토플 영역중 시험출제에 관한 라우팅 규정 ejs파일 로
   접근 가능하도록 만들어 주는 곳입니다.
   각 팀원은 자기영역별 comment를 추가하여 코딩하여 주세요
   */


module.exports = function(router, toeflRouting) {
    console.log('토플 라우팅 호출됨.');

// 출제된 시험을 저장하고 각 r/c, l/c, s/p, w/r 영역을 들어간다

router.route('/toefl/addregister').get(function(req, res) {
        
        console.log('/toefl 시험 출제 저장화면 요청됨.');

    var paramRegisterNo = req.body.registerNo || req.query.registerNo;
	 var paramRegisterDesc = req.body.registerDesc || req.query.registerDesc;
	
    console.log('요청 파라미터 : ' + paramRegisterNo + paramRegisterDesc);

   // 이곳부터는 실제 영역에 출제가 가능한 페이지를 불러들인다

           res.render('./toefl/registration/addregister.ejs', function(err,html) {
                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);
            });  
});
 
router.route('/toefl/admin').get(function(req, res) {
        
        console.log('/toefl 관리자 화면 요청됨.');
   
           res.render('./toefladmin/loginadmin.ejs', function(err,html) {
                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);
            });  
});

 
router.route('/toefl/registerExamPost').get(function(req, res) {
        
        console.log('/toefl 관리자 화면 요청됨.');
   
    var paramRegisterNo = req.body.registerNo || req.query.registerNo;
	
    console.log('요청 파라미터 : ' + paramRegisterNo);

  					var context = {
                     SetregisterNo: paramRegisterNo
					};

           res.render('./toefl/registration/registerExamPosting.ejs', context, function(err,html) {
                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);
            });  
});
 

router.route('/toefl/updateExamPost').get(function(req, res) {
        
        console.log('/toefl 관리자 화면 요청됨.');
   
    var paramRegisterNo = req.body.registerNo || req.query.registerNo;
    var paramRegisterDesc = req.body.registerDesc || req.query.registerDesc;
	
    console.log('요청 파라미터 : ' + paramRegisterNo + paramRegisterDesc);

  					var context = {
                     SetregisterNo: paramRegisterNo,
                     SetregisterDesc: paramRegisterDesc
					};

           res.render('./toefl/registration/updateExamPosting2.ejs', context, function(err,html) {
                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);
            });  
});
	





};




