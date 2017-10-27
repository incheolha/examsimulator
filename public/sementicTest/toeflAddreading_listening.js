  $( document ).ready(function() {
    var tabTitle = $( "#tab_title" ),
      tabContent = $( "#tab_content" ),
      tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
      tabCounter = 2;
 
    var tabs = $( "#tabs" ).tabs();
     $( "#tabs" ).tabs({
      beforeLoad: function( event, ui ) {
        ui.jqXHR.fail(function() {
          ui.panel.html(
            "Couldn't load this tab. We'll try to fix this as soon as possible. " +
            "If this wouldn't be a demo." );
        });
      }
    });
 
    // Modal dialog init: custom buttons and a "close" callback resetting the form inside
    var dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      modal: true,
      buttons: {
        Add: function() {
          addTab();
          $( this ).dialog( "close" );
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
      }
    });
 
    // AddTab form: calls addTab function on submit and closes the dialog
    var form = dialog.find( "form" ).on( "submit", function( event ) {
      addTab();
      dialog.dialog( "close" );
      event.preventDefault();
    });
 
    // Actual addTab function: adds new tab using the input from the form above
    function addTab() {
      var label = tabTitle.val() || "Tab " + tabCounter,
        id = "tabs-" + tabCounter,
		    qtype = $("#addProblem").val(),  
        li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
		  
        tabContentHtml = tabContent.val() ||tabCounter ;
	
 	alert(qtype);
      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
  
  console.log(qtype + "qtype 점검하기");
  
	if(qtype ==="listening_qtype_1")
	{	
	  $("#"+id).load("/public/toefl/tabs_integrateQuestionType.html?ExamNo=qtype1 #listening_qtype_1");
  } 
	else if(qtype==="listening_qtype_2"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_2");
	}
	else if(qtype==="listening_qtype_3"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_3");
	}	
	else if(qtype==="listening_qtype_4"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_4");
	}
	else if(qtype==="listening_qtype_5"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_5");
	}
	else if(qtype==="listening_qtype_6"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_6");
	}
	else if(qtype==="listening_qtype_7"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #listening_qtype_7");
	}
  else if(qtype==="reading_qtype_1")
    {
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_1");
	}
	else if(qtype==="reading_qtype_2"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_2");
	}
	else if(qtype==="reading_qtype_3"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_3");
	}
	else if(qtype ==="reading_qtype_4"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_4");
	}		
	else if(qtype ==="reading_qtype_5"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_5");
	}		
	else if(qtype==="reading_qtype_6"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_6");
	}
	else if(qtype==="reading_qtype_7"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_7");
	}		
	else if(qtype==="reading_qtype_8"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_8");
	}		
	else if(qtype==="reading_qtype_9"){
		$("#"+id).load("../../../public/toefl/tabs_integrateQuestionType.ejs #reading_qtype_9");
	}		

      tabs.tabs( "refresh" );
		
      tabCounter++;
	
	 
    }
 
    // AddTab button: just opens the dialog
    $( "#add_tab" )
      .button()
      .on( "click", function() {
        dialog.dialog( "open" );
		$( "#addProblem" ).selectmenu({
			// change: function(event, data){
			// // qtype: data.item.value,
			// // 	alert(data);
			// }
		});
      });
 
    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
 
    tabs.on( "keyup", function( event ) {
      if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
        var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
      }
    });
  });