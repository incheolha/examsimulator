

var fs = require('fs');

var path = "./uploads/toefl/wr/";
var rename="toefl_WR_"+21+"_";
var strIndex = 0;
var testarray = [];

//저장 디렉토리에 파일이 있는지 검색
fs.readdir(path, function(err, results){
    if(err) {
        throw err;
        
    } else {

        console.log(results)
        //결과값은 배열로 반환됩니다. 콘솔을 이용해 확인합니다.
        //반복문을 통해 디렉토리 내에 파일이 있는지 검색
        for(i=0; i<results.length;i++){
           
            //finder 변수를 하나 만들어 파일이 있는지 확인합니다.
            var finder = results[i].indexOf(rename);
           
            //파일이 존재 한다면, 파일을 빈 배열에 추가합니다.
            if(finder>=0){
                
                console.log(results[i] + "찾은 값 확인")
                console.log("디렉토리 내에서 파일을 찾았습니다.")
                console.log("디렉토리에 있는 파일을 빈 배열에 추가합니다.")
                testarray.push(results[i]);

                //파일을 찾았다면 폴더내의 파일을 제거합니다.
                fs.unlink(path+results[i], function(err, results){
                    if(err){ throw err;

                    } else {
                        //에러 처리 이후 콘솔창을통해 제거가 잘 이루어지는지 확인합니다.
                        console.log("저장되어있는 문제를 제거했습니다.");
                    }    

                })

                
            } 
                
        }//반복문 종료
        

        //빈 배열에 저장된 문제 목록을 통해 어떤 파일이 제거되었는지 확인할 수 있습니다.   
        console.log("제거된 파일 목록 : " + testarray)

        fs.exists("./uploads/"+paramwritingProblemListeningAudio, function(exists){
                console.log(exists? 'yes':"no");
                if(exists = 'yes'){
                    fs.rename("./uploads/"+paramwritingProblemListeningAudio, uploadpath+paramwritingProblemListeningAudio, function(err){
                        if(err) {throw err;
                                                    
                        } else {
                        console.log("문제를 성공적으로 업로드 했습니다."+paramwritingProblemListeningAudio); 

                        };
                    })
                }else{
                console.log("업로드하려는 파일이 없습니다."); 
                }    
        });

        fs.exists("./uploads/"+paramwritingProblemListeningImage, function(exists){
                console.log(exists? 'yes':"no");
                if(exists = 'yes'){
                    fs.rename("./uploads/"+paramwritingProblemListeningImage, uploadpath+paramwritingProblemListeningImage, function(err){
                        if(err) {throw err;
                                                    
                        } else {
                        console.log("문제를 성공적으로 업로드 했습니다."+paramwritingProblemListeningImage); 

                        };
                    })
                }else{
                console.log("업로드하려는 파일이 없습니다."); 
                }    
        });



    }

})
