import Ember from 'ember';
import DS from 'ember-data';

let {
  Component,
  computed,
  inject,
  get,
  set,
  Handlebars,
  isPresent,
  run,
  isEmpty
  } = Ember;

export default Component.extend({

  classNames: ["application"],

  api: inject.service("application"),

  applicationTitle: "Multi-Player Battle Game",
  subTitle: "Fuse Code Camp 2017",

  grid: null,

  requestCount: 0,

  gameStatuses: {NS: "Not Started", ST: "Started", E: "Error", L: "Loading", U: "Unknown"},
  gameStatus: "L",
  gameStatusDisplay: computed("gameStatus", function(){
    let statusText = get(get(this, "gameStatuses"), get(this, "gameStatus"));
    if(isEmpty(statusText)){
      statusText = get(get(this, "gameStatuses"), "U");
    }
    return statusText;
  }),

  isLoading: computed.equal("gameStatus", "L"),
  isNotStarted: computed.equal("gameStatus", "NS"),
  isStarted: computed.equal("gameStatus", "ST"),
  isError: computed.equal("gameStatus", "E"),

  errorMessage: "",

  gameState: Ember.observer("requestCount", function(){
    run.once(() => {
        get(this, "api").getGameState().then(results => {
          this.gameSuccess(results);
        }).catch(error => {
          this.gameError(error);
        });
    });
  }).on("init"),

  gameSuccess(results){
    let grid = get(results, "game.board.grid");
    set(this, "grid", grid);
    set(this, "gameStatus", "ST");

    run.later(() => {
      this.incrementProperty("requestCount");
      set(this, "errorCount", 0);
    });
  },

  gameError(error){
    console.error(error);
    set(this, "gameStatus", "E");

    let errorMessage = "Default Error";
    if(isPresent(get(error, "responseText"))){
      errorMessage = get(error, "responseText");

      if(isPresent(errorMessage)){
        let json = JSON.parse(errorMessage);

        if(isPresent(get(json, "reason"))){
          errorMessage = get(json, "reason");
        }
      }
    }

    set(this, "errorMessage", errorMessage);

    run.later(this, () => {
       this.incrementProperty("requestCount");
    }, 5000);
  },

  width: computed("grid.[]", function(){
    return get(this, "grid.length");
  }),
  height: computed("grid.[]", function(){
    return get(this, "grid.firstObject.length");
  }),

  blockCSS: computed("width", "height", function(){
    let vw = 90 / get(this, "width");
    let vh = 90 / get(this, "height");

    return new Handlebars.SafeString(`min-width: ${vw}vw; max-width: ${vw}vw; min-height: ${vh}vh; max-height: ${vh}vh;`);
  })

});
