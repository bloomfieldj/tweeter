/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Fills tweet template with user-entered data
const createTweetElement = function(tweet){
  console.log(tweet);
  const formattedTweet =  
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
      ${tweet.content.text}
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
  
  return formattedTweet
  
}



//Renders all tweets in database
const renderTweets = function(tweets){
  for (tweet of tweets){
    const newTweet = createTweetElement(tweet);
    $('#tweets-container').append(newTweet)
  }
  
}

//Fetches tweets from database
const loadTweets = function() {
  $.getJSON('/tweets/')
  .then(data => { 
    console.log('success');
    ;
    renderTweets(data);
  })
}

$(document).ready(function() {   
  loadTweets();

  $('#tweet-button').on('submit', (event) => {
    event.preventDefault();
    const tweetContent = $('#tweet-button').serialize();
    const allSpacesCheck = tweetContent.substring(5).replaceAll('%20', '');

    const counter = Number($('#counter').html());

    if(counter <= 0){
      alert("Too verbose!");
    } else if (counter === 140){
      alert("Get to typing!");
    } else {
      if(!allSpacesCheck){
        alert("Please type something... ANYTHING...");
      } else {
        $.post('/tweets/', tweetContent);
        $('#tweets-container').empty();
        loadTweets();
      }
    }

  })

})


