/* 이 코딩은 각 토플 영역중 시험출제에 관한 라우팅 규정 ejs파일 로
   접근 가능하도록 만들어 주는 곳입니다.
   각 팀원은 자기영역별 comment를 추가하여 코딩하여 주세요
   */

// localhost:3000/toefl/addreading 직접 주소창에 치고 들어갈때 표시할 페이지를 나타낸것. 

module.exports = function(router, readingRouting) {
    console.log('토플 라우팅 호출됨.');

// 시험출제 첫번째로 뛰워야 하는 Main Screen ejs파일입니다

router.route('/toefl/addReadingTest').get(function(req, res) {
        
        console.log('/toefl 출제자 화면 요청됨.');
   
           res.render('./toefl/reading/Add_Reading.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});

 router.route('/toefl/showpost9').get(function(req, res) {
        
        console.log('/toefl 출제자 화면 요청됨.');
   
           res.render('./toefl/reading/showpost_9.ejs', function(err,html) {

                if (err) {throw err;}
                console.log('rendered: ' + html);
                res.end(html);

            }); 
 
});
    
  
 


};

