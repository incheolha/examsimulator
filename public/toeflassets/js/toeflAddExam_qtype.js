


var input_value= document.getElementsByName('question_field');
var checkbox_value= document.getElementsByName('answer_value');

function read_only(){
		alert(input_value.length);
		alert(checkbox_value.length); 
		for(var i=0; i < input_value.length+1; i++){
			var b=input_value.item(i);
			var d=checkbox_value.item(i);
			b.readOnly = true;
			d.disabled = true;
		}

	};
	
	function disable_read_only(){

		for(var j=0; j<input_value.length; j++){
			var g=input_value.item(j);
			var h=checkbox_value.item(j);
			g.readOnly = false;
			h.disabled = false;
		}
		alert("now you can overwrite!")
		
};
	



