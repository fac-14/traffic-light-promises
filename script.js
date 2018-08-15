var time = 1000;

function blinkLight(element, colour) {
  var blink = function(callback) {
    element.classList.add(colour);
    setTimeout(function() {
      element.classList.remove(colour);
      if (callback) {
        callback();
      }
    }, time);
  };

  return blink;
}

var red = blinkLight(get("light-top"), "red");
var yellow = blinkLight(get("light-middle"), "yellow");
var green = blinkLight(get("light-bottom"), "green");


// this creates the promises version of blinklight - returns a 
const pBlinkLight = (element, colour) => {
  const blink = () => {
    return new Promise((resolve, reject) => {
      element.classList.add(colour);
      setTimeout(() => {
        resolve(element.classList.remove(colour));
      }, time);
    });
  };
  return blink;
};

const red2 = pBlinkLight(get("light-top2"), "red");
const yellow2 = pBlinkLight(get("light-middle2"), "yellow");
const green2 = pBlinkLight(get("light-bottom2"), "green");

function get(id) {
  return document.getElementById(id);
}

// CALLBACK HELL SOLUTION
function light(callback) {
  green(function() {
    yellow(function() {
      red(function() {
        red(function() {
          red(function() {
            red();
            yellow(function() {
              green();
            });
          });
        });
      });
    });
  });
}
light(light);

// PROMISES SOLUTION
green2()
  .then(yellow2) // .then is provided a function to use as a callback
  .then(red2)
  .then(red2)
  .then(red2)
  .then(() => {
    red2();
    yellow2().then(green2); // I'm not sure how to get around nesting this - seems to kind of ruin the spirit of promises. 
  });
