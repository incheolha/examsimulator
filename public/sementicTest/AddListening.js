  $( document ).ready(function() {   
           
         $("#ui_import_listening_modal").load("index.html .ui.coupled.longer.modal"); 
           
        $("#lc_chapter_complete_btn").on("click", function(){
            $('.ui.dropdown').dropdown();
            
            
            $('.coupled.longer.modal')
              .modal({
                allowMultiple: true
              })
            ;
            // reading modal
        $('.fourth.longer.modal')
          .modal('attach events', '.third.longer.modal .blue.button')
        ;
        $('.third.longer.modal')
          .modal('attach events', '.fourth.longer.modal .yellow.button')
			
			
		$('.third.longer.modal')
              .modal('attach events', '#ch_com_modal .blue.button')

           $('#go_back_main_modal')
            .modal('attach events', '#ch_com_modal .green.button');
            
			$('#ch_com_modal').modal('attach events', '#go_back_main_modal', 'grey.button');
			
            $("#ch_com_modal").modal('show');	
            
        }) ;   
           
           
        var selectVal = "";
        var menu = "";   
        var counter = 1;   
        //modal open!
        $("#addProblem").click(function(){
            $('#lc_addproblem_modal')
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
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_1.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="2")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_2.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="3")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_3.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="4")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_4.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="5")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_5.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="6")
            {
                menu="<a href="+"../../../public/sementicTest/QuestionType/lc_6.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
            else if(selectVal==="7")
            {
                menu="../../../public/sementicTest/QuestionType/lc_7.html"+" "+"class=item target=output>" +counter +"</a>"
                
            }
     
//            var menu = "<a class=item>"+counter+"</a>";
//              "<a href="+
            
            counter++;
            
            $("#test").append(menu);
            
            
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