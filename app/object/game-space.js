import Ember from 'ember';

let {
  Object,
  computed,
  isPresent,
  get
} = Ember;


export default Object.extend({

  xCoordinate: 0,
  yCoordinate: 0,

  player: null,

  hasPlayer: computed("player", function(){
    return isPresent(get(this, "player"));
  })

});
