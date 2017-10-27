var autoplayInterval = 3000;
$(function(){
    $("#m1b").m({
        imageBG: "assets/images/backgrounds/1.jpg", //Just for presentation purpose
        slideWidth: 350,
        slideHeight: 320,
        slideBG: "custom",
        buttons: [
            ["search-plus","View More"],
            ["fire","Mark as Hot"]
        ]
    });

    //OPTIONALLY YOU CAN INITIATE ALL MULTIPLE CAROUSELS ON PAGE (ALL WITH THE SAME OPTIONS) AT ONCE USING .multiple selector
    /*$(".multiple").m({
        navigation: "t",
        imageBG: "assets/images/backgrounds/1.jpg",
        colorBG: "#e0d4b1"
    });*/

    //QUICK AND BASIC  INITIATION WITH THE DEFAULT OPTIONS
    //$(".multiple").m();

    //CONFIGURE THE ACTION OF EACH SLIDE BUTTON(S) HERE
    $('.m-item .m-view a i').on({
        'click': function(event) {
            if($(this).hasClass("fa-search-plus")){
                //event.preventDefault();
                //event.stopPropagation();
                //Your code here
            }
            else if($(this).hasClass("fa-share-alt")){
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
                //Your code here
            }
            else if($(this).hasClass("fa-heart-o")){
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
                //Your code here
            }
            else if($(this).hasClass("fa-shopping-basket")){
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
                //Your code here
            }
            else if($(this).hasClass("fa-fire")){
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
                //Your code here
            }
            else if($(this).hasClass("fa-flag-o")){
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
                //Your code here
            }
            else{
                event.preventDefault();
                event.stopPropagation();
                mAlert(); //Delete it
            }
        }
    });
});
