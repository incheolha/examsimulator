/* 이 코딩은 각 토플 영역중 시험출제에 관한 라우팅 규정 ejs파일 로
   접근 가능하도록 만들어 주는 곳입니다.
   각 팀원은 자기영역별 comment를 추가하여 코딩하여 주세요
   */

// Deemo's writing_routing
module.exports = function(router, writingRouting) {
    console.log('토플 라우팅 호출됨.');

// 시험출제 첫번째로 뛰워야 하는 Main Screen ejs파일입니다

router.route('/toefl/mainexam').get(function(req, res) {
        
        console.log('/toefl 출제자 화면 요청됨.');
   
           res.render('./toefl/mainexam.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});
  
 
// 시험출제 두번째로 뛰워야 하는 Reading Screen ejs파일입니다



// 시험출제 세번째로 뛰워야 하는 Listening Screen ejs파일입니다


// 시험출제 세번째로 뛰워야 하는 Writing Screen ejs파일입니다
router.route('/toefl/writing/writing').get(function(req, res) {
        
        console.log('/toefl writing 출제자 화면 요청됨.');
   
           res.render('./toefl/writing/writing.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});
    
router.route('/toefl/writing/writing1').get(function(req, res) {
        
        console.log('/toefl writing1 출제자 화면 요청됨.');
   
           res.render('./toefl/writing/writing1.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});
    
router.route('/toefl/writing/writing2').get(function(req, res) {
        
        console.log('/toefl writing2 출제자 화면 요청됨.');
   
           res.render('./toefl/writing/writing2.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});

router.route('/toefl/writing/showwriting').get(function(req, res) {
        
        console.log('/toefl showwriting 출제자 화면 요청됨.');
   
           res.render('./toefl/writing/showwriting.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});
    
router.route('/toefl/writing/listwriting').get(function(req, res) {
        
        console.log('/toefl listwriting 출제자 화면 요청됨.');
   
           res.render('./toefl/writing/listwriting.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});


// 시험출제 세번째로 뛰워야 하는 Speaking Screen ejs파일입니다


};
