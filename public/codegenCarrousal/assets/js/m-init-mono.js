var autoplayInterval = 3000;
$(function(){
    $("#m1").m({
        autoplay: false,
        navigation: "r",
        titleSize: "25px",
        titleColor: "#ffff00",
        titleBG: "#0d3464",
        imageBG: "assets/images/backgrounds/1.jpg",
        shadowBG: true,
        colorBG: "#40E0D0",
        slideWidth: 180,
        slideHeight: 280,
        buttons: [
            ["search-plus","View More"]
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
