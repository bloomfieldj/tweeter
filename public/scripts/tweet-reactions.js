let tweet = document.getElementById("tweet")

tweet.addEventListener("mouseover", function( event ) {
  // highlight the mouseenter target
  event.target.style.boxShadow = "10px 20px 30px blue";
});

let icon = document.getElementsByClassName("icon");

icon.addEventListener("mouseover", function( event ) {
  // highlight the mouseenter target
  event.target.style.boxShadow = "10px 20px 30px blue";
});