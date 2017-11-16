
        $(document).ready(function(){ 
            $('.ui.accordion')
            .accordion({
            exclusive:false})
            $('.ul.modal')
			.modal();    
            ; 
            $('.ui.dropdown')
             .dropdown()
            ;       
                
            $('.menu .item')
                .tab()
                ;    
           

                

 
            
        $("#wr_chapter_complete_btn").on("click", function(){
            
            $('#go_back_main_modal').modal('show');
        }); 
        $("#breadcrumbMain").on("click", function(){
		   
			$('#go_back_main_modal').modal('show');
	   });             
                
                

          
        

        $(function(){
            
                   
            $("#btn1").hide();
            $("#btn2").hide();
           

                    $("#btn1").click(function(){
                    var text = $(this).text();
                     $("#inputtest").val(text); 
           
                    });
                    $("#btn1").hide();
                    
                    $("#btn2").click(function(){
                    var text = $(this).text();
                     $("#inputtest2").val(text); 
              
                    });
                    $("#btn2").hide();
                    $('#btn1').trigger('click');
                    $('#btn2').trigger('click');
                    
   
                   
               })     
           
              
             
              

        

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
            
   