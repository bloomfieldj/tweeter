$(document).ready(function() {
  console.log("Ready to rumble!")
  $('.new-tweet').on('keyup', '#tweet-text', function(){
    const maxChars = 140;
    const typedChars = $(this).val().length;
    const remainingChars = maxChars - typedChars;
    const htmlCounter = document.getElementById("counter")
    if(remainingChars <= 0 ){
      htmlCounter.style.color = "red";
    } else{
      htmlCounter.style.color = "black";
    }
  })

});
 