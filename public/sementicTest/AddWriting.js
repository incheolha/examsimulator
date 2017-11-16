
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
           

                

            CKEDITOR.replace( 'ckeditor1', {
                skin:'office2013',
                width:'100%',
                height:'500'
        
            });
            
        $("#wr_chapter_complete_btn").on("click", function(){
            
            $('#go_back_main_modal').modal('show');
        }); 
        $("#breadcrumbMain").on("click", function(){
		   
			$('#go_back_main_modal').modal('show');
	   });             
                
                
            document.getElementById("wr_int_img_ipt").onchange = function(){
            var preview = document.getElementById("wr_int_img_pre");
            var files = document.getElementById("wr_int_img_ipt").files;
            
            function readAndPreview(file){
                if ( /\.(jpe?g|png|gif)$/i.test(file.name)){
                    var reader = new FileReader();
                    
                    reader.addEventListener("load", function(){
                        if(!files.length){
                            preview.innerHTML = "<p>선택된 파일이 없습니다 </p>"
                        }else{
                            preview.innerHTML = ""; //초기화 
                            var list = document.createElement("ul");
                            preview.appendChild(list);
                            for (var i = 0; i<files.length; i++){
                                var li = document.createElement("li");
                                list.appendChild(li);
                                var img = document.createElement("img");
                                img.src = window.URL.createObjectURL(files[i]);
                                img.height= 100;
                                img.width= 100;
                                img.onload = function(){
                                window.URL.revokeObjectURL(this.src);
                                }
                                li.appendChild(img)
                                var info = document.createElement("span");
                                info.innerHTML = files[i].name + ": " +files[i].size + "bytes";
                                li.appendChild(info)
                            }
                            
                        }
                    }, false);
                    reader.readAsDataURL(file);
                }
            }
            if(files){
                [].forEach.call(files, readAndPreview);
            }
        }      
        
        document.getElementById("wr_int_mp3_ipt").onchange = function(){
            var preview = document.getElementById("wr_int_mp3_pre");
            var files = document.getElementById('wr_int_mp3_ipt').files;
            
            function readAndPreview(file){
                if ( /\.(?:wav|mp3)$/i.test(file.name)){
                    var reader = new FileReader();
                    
                    reader.addEventListener("load", function(){
                        if(!files.length){
                            preview.innerHTML = "<p>선택된 파일이 없습니다 </p>"
                        }else{
                            preview.innerHTML="";
                            var list = document.createElement("ol");                    
                            preview.appendChild(list)
                        
                            for(var j=0; j<files.length; j++)
                                {
                                var li = document.createElement("li");
                                list.appendChild(li);
                                var aud = document.createElement("audio");
                                aud.src=window.URL.createObjectURL(files[j]);
                                aud.controls= "controls";
                                aud.onload= function(){
                                window.URL.revokeObjectURL(this.src);
                                }
                                li.appendChild(aud)
                                var info = document.createElement("span");
                                info.innerHTML = files[j].name + ": "+files[j].size+"bytes";
                                li.appendChild(info);
                            }
                            
                        }
                    }, false);
                    reader.readAsDataURL(file);
                }
                
            }
            if(files){
                [].forEach.call(files, readAndPreview);
            }
        };      	
          
        

        $(function(){
            
                   
            $("#btn1").hide();
            $("#btn2").hide();
            $("#btn3").hide();
            $("#btn4").hide();

                    $("#btn1").click(function(){
                    var text = $(this).text();
                     $("#ckeditor1").val(text); 
           
                    });
                   
                    
                    $("#btn2").click(function(){
                    var text = $(this).text();
                     $("#inputtest2").val(text); 
              
                    });
                    
                    
                    
                    $("#btn3").click(function(){
                    var text = $(this).text();
                    $("#inputtest3").val(text); 
                    });



                    $("#btn4").click(function(){
                        var text = $(this).text();
                        $("#inputtest4").val(text);
                     });            
        
                     
            
                    $('#btn1').trigger('click');
                    $('#btn2').trigger('click');
                    $('#btn3').trigger('click');
                    $('#btn4').trigger('click');

                   
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
            
   