
       $( document ).ready(function() {   
		 $("#ui_import_reading_modal").load("./index.ejs .ui.coupled.longer.modal"); 
          
        $("#chapter_complete_btn").on("click", function(){
            
 
            $('.ui.dropdown').dropdown();
            
            var editor = CKEDITOR.instances['editor2'];
            if (editor) { editor.destroy(true); };
            CKEDITOR.replace( 'editor2', {
            skin:'office2013'
            })
            $('.coupled.longer.modal')
              .modal({
                allowMultiple: true
              })
            ;
            // reading modal
            $('.second.modal')
              .modal('attach events', '.first.modal .blue.button')
            
             $('.first.modal')
              .modal('attach events', '.second.modal .yellow.button')
            
            $('.first.modal')
              .modal('attach events', '#ch_com_modal .blue.button')

           $('#go_back_main_modal')
            .modal('attach events', '#ch_com_modal .green.button');
            
			$('#ch_com_modal').modal('attach events', '#go_back_main_modal', 'grey.button');
			
            $("#ch_com_modal").modal('show');
            
            

            
        }) ;  
           
     
           
           
        $('.ui.dropdown')
          .dropdown()
          
        ;   
           
       	CKEDITOR.replace( 'editor2', {
            skin:'office2013',
			width: '100%',
			height: 708
        });
  //    config.height = '708';
//    config.width = '100%';
        var selectVal = "";
        var menu = "";   
        var counter = 1;   
        //modal open!
        $("#addProblem").click(function(){
            $('.ui.addproblem.modal')
            .modal({
                    inverted: true
                    })
            .modal('show');
       });
           
        //dropdown event!   
        $('.selection.dropdown')
          .dropdown({
            onChange: function(value) {
                selectVal=value;
               
            }
          });
        
		   $("#test2").click(   
        function appendProblem() {  
            
            if(selectVal==="1")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_1.html"+" "+"class=item id="+counter+" target=output>" +counter +" </a>"
             
            }
            else if(selectVal==="2")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_2.html"+" "+"class=item target=output id=testtest>" +counter +"</a>"
                
            }
            else if(selectVal==="3")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_3.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="4")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_4.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="5")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_5.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            
            else if(selectVal==="6")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_6.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="7")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_7.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="8")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_8.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="9")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/rc_9.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
 
     
//            var menu = "<a class=item>"+counter+"</a>";
//              "<a href="+
            $("#test").append(menu);
            
            counter++;
           
            
    
            
        });  
       
    
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
};
function checkTime(i) {
    if (i < 10) {i = "0" + i}; // 숫자가 10보다 작을 경우 앞에 0을 붙여줌
    return i;
};
