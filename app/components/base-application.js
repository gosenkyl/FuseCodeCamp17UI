import Ember from 'ember';
import DS from 'ember-data';

let {
  Component,
  computed,
  inject,
  get,
  set,
  RSVP
  } = Ember;

let {
  PromiseObject
  } = DS;

export default Component.extend({

  classNames: ["application"],

  api: inject.service("application"),

  grid: null,

  didInsertElement(){
    this._super(...arguments);

    //this.updateGameState();
  },

  turnNumber: 0,

  gameState: computed("turnNumber", function(){

      return PromiseObject.create({
        promise: get(this, "api").getGameState().then(results => {
            let grid = get(results, "game.board.grid");
            set(this, "grid", grid);
            this.incrementProperty("turnNumber");
            return "Active";
          }).catch(error => {
            console.log(error);
            return "Error";
          })
      });
  }),

  playerCount: 0,

  isMenuOpen: false,

  actions: {

    menuClick(){
      this.toggleProperty("isMenuOpen");
    }

  }

});
