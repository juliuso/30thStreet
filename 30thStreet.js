var wheel = ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'.split('');

var c9 = "#c9";
var c10 = "#c10";
var c11 = "#c11";
var c12 = "#c12";
var c13 = "#c13";
var c14 = "#c14";
var c15 = "#c15";
var c16 = "#c16";
var c17 = "#c17";
var c18 = "#c18";
var c19 = "#c19";
var c20 = "#c20";
var c21 = "#c21";
var c22 = "#c22";
var c23 = "#c23";
var c24 = "#c24";

/*
1. Get current element.
2. If current element !== updated element, rotate to next element and check again.
*/

function generateWheelSequence(coordinate, ltr) {
	// in reality:
    var startingPosition = wheel.indexOf(document.querySelector(coordinate).textContent);
    var endingPosition = wheel.indexOf(ltr);
	// var endIndex = wheel.indexOf(newLetter);
	//
	// Ex. Start at J, end at A.
	// start at 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 31, 33, 34
	// 35, 36, 37, 38, 39, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11

	var wheelOrder = [];

	for ( var i = startingPosition; i < wheel.length; i++ ) {

        if (startingPosition === endingPosition) {
            break;
        }

        if (i === endingPosition) {
                //console.log(wheel[i]);
                wheelOrder.push(wheel[i]);
                break;
        }

        if ( i === (wheel.length-1) ) {
            if (endingPosition < i) {
                //console.log(wheel[i]);
                wheelOrder.push(wheel[i]);
                i = 0;
                if (i === endingPosition){
                    //console.log(wheel[i]);
                    wheelOrder.push(wheel[i]);
                    break;
                } else {
                    //console.log(wheel[i]);
                    wheelOrder.push(wheel[i]);
                }
            } else {
                //console.log(wheel[i]);
                wheelOrder.push(wheel[i]);
            }
        } else {
            //console.log(wheel[i]);
            wheelOrder.push(wheel[i]);
        }
	}
    return wheelOrder;
}

function changeCell(coordinate, ltr) {
    console.log(coordinate);
    console.log(ltr);
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    
    const audioCtx = new AudioContext({

    });
    
    var audio = new Audio('button2a.wav');
    var interval = 150; // how much time should the delay between two iterations be (in milliseconds)?
    var wheelOrder = generateWheelSequence(coordinate, ltr);

    wheelOrder.forEach(function (el, index) {
        setTimeout(function () {
        //console.log(el);
        //console.log("Tick: " + Math.floor(Date.now() ));
        //$(coordinate).slideDown("slow", function() {
            document.querySelector(coordinate).textContent = el;
        //});
        //console.log("Tock: " + Math.floor(Date.now() ));
        audio.play();
        }, index * interval);
    });
}

function hello() {
  changeCell(c9,  'H');
  changeCell(c10, 'E');
  changeCell(c11, 'L');
  changeCell(c12, 'L');
  changeCell(c13, 'O');
  changeCell(c14, ' ');
  changeCell(c15, 'W');
  changeCell(c16, 'O');
  changeCell(c17, 'R');
  changeCell(c18, 'L');
  changeCell(c19, 'D');
  changeCell(c20, ' ');
  changeCell(c21, ' ');
  changeCell(c22, ' ');
  changeCell(c23, ' ');
  changeCell(c24, ' ');
}

function keystone() {
  changeCell(c9,  'K');
  changeCell(c10, 'E');
  changeCell(c11, 'Y');
  changeCell(c12, 'S');
  changeCell(c13, 'T');
  changeCell(c14, 'O');
  changeCell(c15, 'N');
  changeCell(c16, 'E');
  changeCell(c17, ' ');
  changeCell(c18, ' ');
  changeCell(c19, ' ');
  changeCell(c20, ' ');
  changeCell(c21, ' ');
  changeCell(c22, ' ');
  changeCell(c23, ' ');
  changeCell(c24, ' ');
}

function acela() {
  changeCell(c9,  'A');
  changeCell(c10, 'C');
  changeCell(c11, 'E');
  changeCell(c12, 'L');
  changeCell(c13, 'A');
  changeCell(c14, ' ');
  changeCell(c15, 'E');
  changeCell(c16, 'X');
  changeCell(c17, 'P');
  changeCell(c18, 'R');
  changeCell(c19, 'E');
  changeCell(c20, 'S');
  changeCell(c21, 'S');
  changeCell(c22, ' ');
  changeCell(c23, ' ');
  changeCell(c24, ' ');
}

function regional() {
  changeCell(c9,  'R');
  changeCell(c10, 'E');
  changeCell(c11, 'G');
  changeCell(c12, 'I');
  changeCell(c13, 'O');
  changeCell(c14, 'N');
  changeCell(c15, 'A');
  changeCell(c16, 'L');
  changeCell(c17, ' ');
  changeCell(c18, ' ');
  changeCell(c19, ' ');
  changeCell(c20, ' ');
  changeCell(c21, ' ');
  changeCell(c22, ' ');
  changeCell(c23, ' ');
  changeCell(c24, ' ');
}

function clearRow() {
  changeCell(c9,  ' ');
  changeCell(c10, ' ');
  changeCell(c11, ' ');
  changeCell(c12, ' ');
  changeCell(c13, ' ');
  changeCell(c14, ' ');
  changeCell(c15, ' ');
  changeCell(c16, ' ');
  changeCell(c17, ' ');
  changeCell(c18, ' ');
  changeCell(c19, ' ');
  changeCell(c20, ' ');
  changeCell(c21, ' ');
  changeCell(c22, ' ');
  changeCell(c23, ' ');
  changeCell(c24, ' ');
}

// function clearRow() {
//   //changeCell(c9, ' ');
//   for (var i = 9; i < 25; i++) {
//     var c = 'c' + i;
//     changeCell(c, ' ');
//   }
// }


// function clearRow() {
//   changeCell(c9,  ' ');
//   changeCell(c10, ' ');
//   changeCell(c11, ' ');
//   changeCell(c12, ' ');
//   changeCell(c13, ' ');
//   changeCell(c14, ' ');
//   changeCell(c15, ' ');
//   changeCell(c16, ' ');
//   changeCell(c17, ' ');
//   changeCell(c18, ' ');
//   changeCell(c19, ' ');
//   changeCell(c20, ' ');
//   changeCell(c21, ' ');
//   changeCell(c22, ' ');
//   changeCell(c23, ' ');
//   changeCell(c24, ' ');
// }

// function exampleChange() {
//   var interval = 150; // how much time should the delay between two iterations be (in milliseconds)?
//   wheel.forEach(function (el, index) {
//     setTimeout(function () {
//       //console.log(el);
//       document.querySelector(c9).textContent = el;
//       document.querySelector(c10).textContent = el;
//       document.querySelector(c11).textContent = el;
//       document.querySelector(c12).textContent = el;
//       document.querySelector(c13).textContent = el;
//       document.querySelector(c14).textContent = el;
//       document.querySelector(c15).textContent = el;
//       document.querySelector(c16).textContent = el;
//       document.querySelector(c17).textContent = el;
//       document.querySelector(c18).textContent = el;
//       document.querySelector(c19).textContent = el;
//       document.querySelector(c20).textContent = el;
//       document.querySelector(c21).textContent = el;
//       document.querySelector(c22).textContent = el;
//       document.querySelector(c23).textContent = el;
//       document.querySelector(c24).textContent = el;
//     }, index * interval);
//   });
//   console.log('Loop finished.');
// }
//
// exampleChange();
