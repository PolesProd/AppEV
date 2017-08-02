/*
console.log($ ("body"))

$("body").on( "mouseover", ".connect", function(){
  console.log($( ".bgSplash" )[0].style.filter)
  // blur(0px)
  if($( ".bgSplash" )[0].style.filter == "blur(0px)"){
    $({blurRadius: 0 }).animate({ blurRadius: 10 }, {
      duration: 500,
      easing: 'swing', // use jQuery UI or Easing plugin for more options
      step: function() {
        $( ".bgSplash" ).css( {
          "-webkit-filter": "blur(" + this.blurRadius + "px)",
          "filter": "blur(" + this.blurRadius + "px)"
        } );
      },
      complete: function() {
        $( ".bgSplash" ).css({
          "-webkit-filter": "blur(10px)",
          "filter": "blur(10px)"
        })
      }
    });

  }
}).on("mouseout",".connect", function(){
  $({blurRadius: 10 }).animate({blurRadius: 0 } , {
    duration: 500,
    easing: 'swing',
    step: function() {
      $( ".bgSplash" ).css( {
        "-webkit-filter": "blur("+this.blurRadius+"px)",
        "filter": "blur("+this.blurRadius+"px)"
      } );
    },
    complete: function() {
      $( ".bgSplash" ).css({
        "-webkit-filter": "blur(0px)",
        "filter": "blur(0px)"
      } );
    }
  } );
});
*/
