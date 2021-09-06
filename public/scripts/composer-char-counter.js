$(document).ready(function() {
  console.log("Ready to rumble!")
  $('.new-tweet').on('keyup', '#tweet-text', function(){
    const maxChars = 140;
    const typedChars = $(this).val().length;
    const remainingChars = maxChars - typedChars;
    const currentCount = $(this).siblings('div').find('.counter').html(remainingChars);
    if(remainingChars <= 0 ){
      currentCount.addClass('color-red')
    } else{
      currentCount.removeClass('color-red')
    }
  })

});
 