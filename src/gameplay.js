

const mapSize = 50;

var Gameplay = function () {
  this.map = null;
  this.monsterPositions = {};
};
Gameplay.prototype.shutdown = function() {
  this.map = null;
  this.monsterPositions = {};
};
Gameplay.prototype.preload = function () {
  this.game.cache.removeTilemap('gen_map');

  var mapCsv = '';
  noise.seed(0.24);
  for (var x = 0; x < mapSize; x++) {
    for (var y = 0; y < mapSize; y++) {
      if ((x === 0) || (y === 0) || (x === (mapSize-1)) || (y === (mapSize-1))) {
        mapCsv += '21';
      } else {
        var valueAt = noise.simplex2(x / 10, y / 10);
        if (valueAt < -0.6 && ((x % 2) === 0) && ((y % 2) === 1)) {
          mapCsv += '0';
        } else if (valueAt > 0.1) {
          mapCsv += '17';
        } else {
          mapCsv += '-1';
        }
      }
        
      if (y !== (mapSize - 1)) {
        mapCsv += ',';
      }
    }
    mapCsv += '\n';
  }

  this.game.cache.addTilemap('gen_map', null, mapCsv, Phaser.Tilemap.CSV);
};
Gameplay.prototype.create = function() {
  this.map = this.game.add.tilemap('gen_map', 32, 32);
  this.map.addTilesetImage('test_sheet_sprite', 'test_sheet_sprite', 32, 32);
  var layer = this.map.createLayer(0);
  layer.resizeWorld();
  

  //this.game.camera.scale.set(0.5, 0.5);

};
Gameplay.prototype.update = function() {

  const camMoveSpeed = 10;
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
    this.game.camera.x += camMoveSpeed;
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
    this.game.camera.x -= camMoveSpeed;
  }
  if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
    this.game.camera.y += camMoveSpeed;
  } else if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
    this.game.camera.y -= camMoveSpeed;
  }

};