const FollowToggle = require("./follow_toggle.js");

$(() => {
  $('.follow-toggle').each((i, el) => {
    const test = new FollowToggle(el);
    console.log(test);
  })


})