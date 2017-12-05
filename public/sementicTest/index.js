
    $( document ).ready(function() {
        
//		$(document).load('index_modal.html');
            
         $('.ui.dropdown').dropdown( 
            );

        
        
        
        var selectVal = $("#selectVal")
        var selectVal2= $("#selectVal2");
   

 
        $("#reading_dropdown").dropdown(
		).on('change', function(){
			 var a =($("#reading_dropdown").dropdown('get value'))
			 selectVal.text(a);
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
  

