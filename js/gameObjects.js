var Game = Game || {};
Game.event = {};

Game.data = {
	saveVersion : 1,
	registered : {},
	set : function (k,v) {
		this.registered[k] = v;
	},
	get : function (k) {
		return this.registered[k];
	},
	log : function () {
		console.log(JSON.stringify(this.registered));
		console.log(this.registered);
	},
	save : function () {
		localStorage.setItem("Game_tmp",JSON.stringify({
			version : this.saveVersion,
			data : this.registered
		})); // in case save breaks we make a temp save
		localStorage.setItem("Game",localStorage.getItem("Game_tmp"));
		localStorage.removeItem("Game_tmp");
	},
	load : function () {
		var saveFile = localStorage.getItem("Game");
		if !saveFile return;
		this.registered = this.saveVersion != saveFile.version ? this.adaptSave(saveFile.version,saveFile.data) : saveFile.data;
	},
	adaptSave : function (version,data) {
		return data;
	}
}

Game.event = {
    addListener: function(el, type, fn) {
		$(el).on(type,fn);
    },
   removeListener: function(el, type, fn) {
		$(el).off(type,fn);
   }
}



Game.data.set('test value',10);
Game.data.log();
$(function(){

	Game.event.addListener("#action1", "click", function() {
		Game.data.set('test value',20);
		Game.data.log();
	});
	
	Game.event.addListener("#action2", "click", function() {
		Game.data.set('test value 2',100);
		Game.data.log();
	});
	
});