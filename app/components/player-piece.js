import Ember from 'ember';

let {
  Component,
  set,
  get
  } = Ember;

export default Component.extend({

  player: null,
  isHover: false,
  hoverText: "",

  mouseEnter(){
    set(this, "hoverText", get(this, "player.name"));
    set(this, "isHover", true);
  },

  mouseLeave(){
    set(this, "isHover", false);
    set(this, "hoverText", "");
  }

});
