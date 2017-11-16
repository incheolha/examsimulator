

$(document).ready(function() {
	//제이쿼리 탭 선언
	var reading, listening, speaking, writing;  
    reading = $( "#Reading").tabs();
	listening = $( "#Listening").tabs();
	speaking = $( "#Speaking").tabs();
	writing = $( "#Writing").tabs();
	
	//초기화면 리딩탭이 나오게 하고 나머지 탭은 가려놓기
	listening.hide();
	speaking.hide();
	writing.hide();  
	
	//각 버튼을 눌렀을때 그에 맞는 탭 보이기/감추기  
  	$( "#Reading_Btn" ).click(function() {
   		reading.show();
		listening.hide();
		speaking.hide();
		writing.hide();
	 });
	
  	$( "#Listening_Btn" ).click(function() {
   		listening.show();
		reading.hide();
		speaking.hide();
		writing.hide();
	 });	  

  	$( "#Speaking_Btn" ).click(function() {
   		speaking.show();
		listening.hide();
		reading.hide();
		writing.hide();
	 });	  
  
  	$( "#Writing_Btn" ).click(function() {
   		writing.show();
		listening.hide();
		speaking.hide();
		reading.hide();
   }); 
   

  

   $( "#hi" ).click(function(event){

        event.preventDefault();
        window.alert("saved")

  });  

    

   
	  
  $(".img_upload_lc1").on('change', function() {
 		  var countFiles = $(this)[0].files.length;
          var imgPath = $(this)[0].value;
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc1");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });
	  


 $(".img_upload_lc2").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc2");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	

 $(".img_upload_lc3").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc3");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	  
 $(".img_upload_lc4").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc4");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	  
 $(".img_upload_lc5").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc5");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
 $(".img_upload_lc6").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_lc6");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
 $(".img_upload_sp1").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp1");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	  $(".img_upload_sp2").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp2");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	  $(".img_upload_sp3").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp3");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	  $(".img_upload_sp4").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp4");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	 $(".img_upload_sp5").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp5");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });	
	
	  $(".img_upload_sp6").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp6");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });

	  $(".img_upload_wr1").on('change', function() {
	 
		  var countFiles = $(this)[0].files.length;
		//imgpath 설정
          var imgPath = $(this)[0].value;
			
          var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
			
          var image_holder = $("#image_holder_sp6");
		  
			
          image_holder.empty();
		 
			
          if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) != "undefined") {
              //loop for each file selected for uploaded.
              for (var i = 0; i < countFiles; i++) 
              {	
				var reader = new FileReader();
				
                reader.onload = function(e) {	
                  $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image"
                  }).appendTo(image_holder);
                 }
			    
                image_holder.show();
                reader.readAsDataURL($(this)[0].files[i]);	  
              }
            } else {
              alert("This browser does not support FileReader.");
            }
          } else {
            alert("Pls select only images");
          }
        });        
	 
////////////////////////////////////////////audio
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc1').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc1').addEventListener('change', handleFileSelect, false);	
	  
function handleFileSelect2(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc2').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc2').addEventListener('change', handleFileSelect2, false);		  

function handleFileSelect3(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc3').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc3').addEventListener('change', handleFileSelect3, false);		  
	  
function handleFileSelect4(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc4').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc4').addEventListener('change', handleFileSelect4, false);		  

function handleFileSelect5(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc5').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc5').addEventListener('change', handleFileSelect5, false);		  

	  
function handleFileSelect6(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_lc6').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_lc6').addEventListener('change', handleFileSelect6, false);		  
		  
function handleFileSelect7(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp1').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_sp1').addEventListener('change', handleFileSelect7, false);		  
			  
function handleFileSelect8(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp2').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_sp2').addEventListener('change', handleFileSelect8, false);		  
	
function handleFileSelect9(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp3').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_sp3').addEventListener('change', handleFileSelect9, false);	
	  
	  
function handleFileSelect10(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp4').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_sp4').addEventListener('change', handleFileSelect10, false);		  
	  
	  
function handleFileSelect11(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp5').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  }
  document.getElementById('mp3_upload_sp5').addEventListener('change', handleFileSelect11, false);
	  
function handleFileSelect12(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_sp6').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  };
  document.getElementById('mp3_upload_sp6').addEventListener('change', handleFileSelect12, false);		  
	  	  


function handleFileSelect13(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
	if(f.type.match('audio.*')){
		  
	  var reader = new FileReader();
		  
		reader.onload =(function(theFile){
			return function(e) {
				
			var span = document.createElement('span');	
		    span.innerHTML = ['<audio controls><source src="', e.target.result,'   "type="audio/ogg"><source src="', e.target.result,' "type="audio/mpeg"></audio>'].join('');
			document.getElementById('mp3_holder_wr1').insertBefore(span, null);
			}
		})(f);	  
		
		reader.readAsDataURL(f);  
		continue;  
	  	}
      }
	
  };
  document.getElementById('mp3_upload_wr1').addEventListener('change', handleFileSelect13, false);		  
	  	  
  });	  