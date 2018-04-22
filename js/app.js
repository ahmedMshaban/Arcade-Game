var Time = function () {
 this.gameStart = Date.now();
 this.timeNow = Date.now();
};

Time.prototype.timeCalculate = function() {
   this.timeNow = Date.now();
   return this.timeNow - this.gameStart;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ((time.timeCalculate()) >= this.show  ) {
      this.x += (this.step)*dt;
    }
    if(this.x > 505) {
      this.random();
      this.show += time.timeCalculate();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.random = function() {
    this.x = -101;
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 21 ;
    this.step = Math.floor(Math.random() * 250) + 70;
    this.show = Math.floor(Math.random() * 7000) + 1;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-pink-girl.png';
  this.x = 202;
  this.y = 394;
};

Player.prototype.update = function(allowedKeys) {
  if(allowedKeys === "left") {
    this.x = this.x - 101;
  }
  if(allowedKeys === "right") {
    this.x = this.x + 101;
  }
  if(allowedKeys === "up") {
    this.y = this.y - 83;
    if(this.y === -21) {
      this.win();
   }
  }
  if(allowedKeys === "down") {
    this.y = this.y + 83;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
  if(allowedKeys === "left") {
    if(this.x !== 0) {
      this.update(allowedKeys);
    }
  }
  if(allowedKeys === "right") {
    if(this.x !== 404) {
      this.update(allowedKeys);
    }
  }
  if(allowedKeys === "up") {
    if(this.y !== -21) {
      this.update(allowedKeys);
    }
  }
  if(allowedKeys === "down") {
    if(this.y !== 394) {
      this.update(allowedKeys);
    }
  }
};

Player.prototype.reset = function() {
  this.x = 202;
  this.y = 394;
};

//Display message when player wins
Player.prototype.win = function() {
   setTimeout(function(){
     player.reset();
   }, 500);
   modal.style.display = "block";
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var time = new Time();

var allEnemies = [];
for(var i = 0; i < 7; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Get the modal
var modal = document.getElementById('resultModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
