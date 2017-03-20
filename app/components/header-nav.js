import Ember from 'ember';

let {
  Component,
  computed,
  get
  } = Ember;

export default Component.extend({

  classNames: ["row header-nav centered-vertical"],

  applicationTitle: "Multi-Player Battle Game",
  subTitle: "Fuse Code Camp 2017",

  playerCount: 0,
  onlineStatusText: computed("playerCount", function(){
    return get(this, "playerCount") + " player(s) online!";
  }),

  actions: {

    menuClick(){
      let menuClick = get(this, "onMenuClick");

      if(menuClick){
        menuClick();
      }
    }

  }

});
