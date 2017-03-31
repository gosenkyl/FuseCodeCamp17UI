import Ember from 'ember';
import DS from 'ember-data';

let {
  Component,
  computed,
  inject,
  get,
  set,
  RSVP,
  Handlebars
  } = Ember;

let {
  PromiseObject
  } = DS;

export default Component.extend({

  classNames: ["application"],

  api: inject.service("application"),

  applicationTitle: "Multi-Player Battle Game",
  subTitle: "Fuse Code Camp 2017",

  grid: null,

  turnNumber: 0,

  gameState: computed("turnNumber", function(){
      return PromiseObject.create({
        promise: get(this, "api").getGameState().then(results => {
            let grid = get(results, "game.board.grid");
            set(this, "grid", grid);
            this.incrementProperty("turnNumber");
            return "Active";
          }).catch(error => {
            console.error(error);
            return "Error";
          })
      });
  }),

  width: computed("grid.[]", function(){
    return get(this, "grid.length");
  }),
  height: computed("grid.[]", function(){
    return get(this, "grid.firstObject.length");
  }),

  blockCSS: computed("width", "height", function(){
    let vw = 100 / get(this, "width") - 2;
    let vh = 100 / get(this, "height") - 2;

    return new Handlebars.SafeString("min-width: " + vw + "vw; min-height: " + vh + "vh;");
  })

});
