const APIUtil = require('./api_util.js');

class FollowToggle {

  constructor(el) {
    this.$el = $(el);

    this.username = this.$el.data('username');
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    

    this.render();
    this.handleClick();
    
  }

  render() {
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    }
    else if (this.followState === "followed") {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "unfollowing") {
      this.$el.text("unfollowing!");
      this.$el.prop("disabled", true);
    } else if (this.followState === "following") {
      this.$el.text("following!");
      this.$el.prop("disabled", true);
    }
  }

  handleClick() {
    this.$el.on('click', (event) => {
      event.preventDefault();
      let that = this;

      if (this.followState === "unfollowed") {
        APIUtil.followUser(this.userId)
               .then(this.toggleState.bind(that))
               .then(this.render.bind(that))
               .then(this.addFollower(this.username));
               
        this.followState = "following";
        this.render();
      }
      else {
        APIUtil.unfollowUser(this.userId)
               .then(this.toggleState.bind(that))
               .then(this.render.bind(that))
               .then(this.removeFollower(this.username));

        this.followState = "unfollowing";
        this.render();
      }
    });
  }

  addFollower(id) {
    const ul = document.getElementById("followers")
    const li = document.createElement("li")
    li.textContent = id;
    li.setAttribute("data-username", id);
    ul.append(li);
  }

  removeFollower(id) {
  
    const ul = document.getElementById("followers")
    const li = document.querySelector(`li[data-username="${id}"`);
    ul.removeChild(li);
  }

  toggleState() {
    if (this.followState === "following") {
      this.followState = "followed";
      this.$el.data('initial-follow-state', "followed");
    }
    else if (this.followState === "unfollowing") {
      this.followState = "unfollowed";
      this.$el.data('initial-follow-state', "unfollowed");
    }
  }

}

module.exports = FollowToggle;

