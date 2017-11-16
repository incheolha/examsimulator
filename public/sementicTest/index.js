
    $( document ).ready(function() {
        
//		$(document).load('index_modal.html');
            
         $('.ui.dropdown').dropdown( 
            );

        
        
        
        var selectVal = $("#selectVal")
        var selectVal2= $("#selectVal2");
        var a = document.getElementById("chapter_value")

 


		$("#select_Dropdown").dropdown()
		.change (function(){
        
        var value = JSON.stringify($(this).dropdown('get value'));
        $("#chapter_value").val(value)
        alert(a);
             
        
		});
		 
      
        $("#listening_dropdown").dropdown(
		).on('change', function(){
			 var b =($("#listening_dropdown").dropdown('get value'))
			 selectVal2.text(b);
		});
	     
		   
        
        $('.card .image').dimmer({
          on: 'hover'
        });
        
        $('.ui.modal').modal();
        $('ui.fourth.longer.modal').modal('show');

  
        $('#test1').click(function(){
            $('.first.modal')
            .modal('show');
        });
        
        $('#lc_next').click(function(){
            $('.third.longer.modal')
            .modal('show');
        });
        $('#sp_next').click(function(){
            $('.fifth.modal')
            .modal('show');
        });
        $('#wr_next').click(function(){
            $('.sixth.modal')
            .modal('show');
        });        

            $('.coupled.longer.modal')
          .modal({
            allowMultiple: true
          })
        ;
  
        

        
        
        $('.ui.radio.checkbox')
            .checkbox();
          
    //  CKEDITOR.replace( 'readingScript' );
	
//    document.getElementById("lc_ch_1_img_ipt").onchange = function(){
//         var preview = document.getElementById("lc_ch_1_img_pre");
//         var files = document.getElementById("lc_ch_1_img_ipt").files;
        
//         function readAndPreview(file){
//              if ( /\.(jpe?g|png|gif)$/i.test(file.name)){
//                  var reader = new FileReader();
                 
//                  reader.addEventListener("load", function(){
//                      if(!files.length){
//                          preview.innerHTML = "<p>선택된 파일이 없습니다 </p>"
//                      }else{
//                          preview.innerHTML = ""; //초기화 
//                          var list = document.createElement("ul");
//                          preview.appendChild(list);
//                          for (var i = 0; i<files.length; i++){
//                              var li = document.createElement("li");
//                              list.appendChild(li);
//                              var img = document.createElement("img");
//                              img.src = window.URL.createObjectURL(files[i]);
//                              img.height= 100;
//                              img.width= 100;
//                              img.onload = function(){
//                             window.URL.revokeObjectURL(this.src);
//                              }
//                              li.appendChild(img)
//                              var info = document.createElement("span");
//                              info.innerHTML = files[i].name + ": " +files[i].size + "bytes";
//                              li.appendChild(info)
//                          }
                         
//                      }
//                  }, false);
//                  reader.readAsDataURL(file);
//              }
//         }
//         if(files){
//             [].forEach.call(files, readAndPreview);
//         }
//     }      
    
//     document.getElementById("lc_ch_1_mp3_ipt").onchange = function(){
//         var preview = document.getElementById("lc_ch_1_mp3_pre");
//         var files = document.getElementById('lc_ch_1_mp3_ipt').files;
        
//         function readAndPreview(file){
//              if ( /\.(?:wav|mp3)$/i.test(file.name)){
//                  var reader = new FileReader();
                 
//                  reader.addEventListener("load", function(){
//                      if(!files.length){
//                          preview.innerHTML = "<p>선택된 파일이 없습니다 </p>"
//                      }else{
//                         preview.innerHTML="";
//                         var list = document.createElement("ol");                    
//                         preview.appendChild(list)
                       
//                           for(var j=0; j<files.length; j++)
//                             {
//                             var li = document.createElement("li");
//                             list.appendChild(li);
//                             var aud = document.createElement("audio");
//                             aud.src=window.URL.createObjectURL(files[j]);
//                             aud.controls= "controls";
//                             aud.onload= function(){
//                             window.URL.revokeObjectURL(this.src);
//                             }
//                             li.appendChild(aud)
//                             var info = document.createElement("span");
//                             info.innerHTML = files[j].name + ": "+files[j].size+"bytes";
//                             li.appendChild(info);
//                         }
                         
//                      }
//                  }, false);
//                  reader.readAsDataURL(file);
//              }
            
//         }
//         if(files){
//             [].forEach.call(files, readAndPreview);
//         }
//     };      
    
});         

     

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var i = document.getElementById("good");
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    i+ h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i}; // 숫자가 10보다 작을 경우 앞에 0을 붙여줌
    return i;
}
  

