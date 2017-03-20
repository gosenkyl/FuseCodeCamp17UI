import Ember from 'ember';

import GameSpace from '../object/game-space';

let {
  Component,
  get,
  set,
  computed
  } = Ember;

export default Component.extend({
  classNames: ["row"],

  grid: null,

  width: computed("grid.[]", function(){
    return get(this, "grid.length");
  }),
  height: computed("grid.[]", function(){
    return get(this, "grid.firstObject.length");
  }),

  blockCSS: computed("width", "height", function(){
    let vw = 100 / get(this, "width") - 2;
    let vh = 100 / get(this, "height") - 2;

    return new Ember.Handlebars.SafeString("min-width: " + vw + "vw; min-height: " + vh + "vh;");
  }),

  //gridRows: Ember.A(),

  //players: Ember.A(),

  didReceiveAttrs: function(){
    this._super(...arguments);

    /*let grid = get(this, "grid");

    for(var y=0; y < width; y++){

      let gridRow = {
        gridColumns: Ember.A()
      };

      get(this, "gridRows").addObject(gridRow);

      for(var x=0; x<get(this, "height"); x++){

        let gridSpace = new GameSpace();
        set(gridSpace, "xCoordinate", x);
        set(gridSpace, "yCoordinate", y);

        let player = get(this, "players").filter(function(player){
          return get(player, "coordinate.x") === x && get(player, "coordinate.y") === y;
        });

        set(gridSpace, "player", player.get("firstObject"));

        get(gridRow, "gridColumns").addObject(gridSpace);
      }
    }*/

  }


});
