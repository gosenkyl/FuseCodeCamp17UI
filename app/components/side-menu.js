import Ember from 'ember';

let {
  Component,
  get
  } = Ember;

export default Component.extend({

  classNames: ["side-menu"],

  content: Ember.A(),

  actions: {

    menuClick(){
      let menuClick = get(this, "onMenuClick");
      if(menuClick){
        menuClick();
      }
    }

  }

});
