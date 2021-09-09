/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Fills HTML tweet template with user-entered data
const createTweetElement = function(tweet){
  const tweetElement =  
  `
    <article class = "tweet">
      <header class = tweetHeader>
        <div class = profileInfo>
          <img  class = profilePic src=${tweet.user.avatars}> 
          <p class = 'userName' >${tweet.user.name}</p>
        </div>
        <h3 class = "tweeterHandle">${tweet.user.handle}</h3>
      </header>
      <p class = 'tweetBody'>
      ${escape(tweet.content.text)}
      </p>
      <footer class = tweetFooter>
        <p> ${timeago.format(tweet.created_at)}</p>
        <div class = 'icons'>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
    </footer>
  </article>
  `
  
  return tweetElement;
  
}



//Renders all tweets in database
const renderTweets = function(tweets){
  for (tweet of tweets){
    const newTweet = createTweetElement(tweet);
    $('#tweets-container').append(newTweet);
  }
  
}

//Fetches tweets from database and renders them
const loadTweets = function() {
  $.getJSON('/tweets/')
  .then(data => { 
    console.log('success');
    ;
    renderTweets(data.reverse());
  })
}

//Escapes potentially insecure text upon new tweet submission
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Ensures page is loaded before fetching and loading tweets
$(document).ready(function() {   
  
  loadTweets();

  //Checks for and displays any errors upon submission of tweets  
  $('#tweet-button').on('submit', (event) => {
    event.preventDefault();
    const tweetContent = $('#tweet-button').serialize();
    const allSpacesCheck = tweetContent.substring(5).replaceAll('%20', '');

    const counter = Number($('#counter').html());

    if(counter <= 0){
      $('#error-verbosity').slideDown(1000);
    } else if (counter === 140){
      $('#error-empty').slideDown(1000);
    } else {
      if(!allSpacesCheck){
        $('#error-spaces').slideDown(1000);
      } else {
        $('.new-tweet-error').slideUp(100);
        $.post('/tweets/', tweetContent);
        $('#tweets-container').empty();
        loadTweets();
      }
    }

  })

})


