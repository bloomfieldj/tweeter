/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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


$(document).ready(function() {   
  renderTweets(data);

  $('#tweet-button').on('submit', (event) => {
    event.preventDefault();
    const tweetContent = $('#tweet-button').serialize();
    jQuery.post('/tweets/', tweetContent);
    // renderTweets(data);
  })
})
