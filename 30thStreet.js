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


function generateWheelSequence(coordinate, ltr) {
    // Index of current cell.
    var startingPosition = wheel.indexOf(document.querySelector(coordinate).textContent);
    // Index of new cell to transition to.
    var endingPosition = wheel.indexOf(ltr);

    var wheelOrder = [];

    // ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'
    //  0                                      40
    for ( var i = startingPosition; i < wheel.length; i++ ) {

        // If the letter doesn't change before and after, do nothing.
        if (startingPosition === endingPosition) {
            break;
        }
        // If the index equals the last character's index in the sequence,
        // add it to the wheel and stop.
        if (i === endingPosition) {
            wheelOrder.push(wheel[i]);
            break;
        }

        // When the last index of the wheel is reached.
        if ( i === (wheel.length-1) ) {
            // Indexing starts from the beginning again.
            if (endingPosition < i) {
                // Push last index of wheel and start over at i=0.
                wheelOrder.push(wheel[i]);
                i = 0;
                // If the index of the last character in the sequence coincides
                // with the first index of the wheel, add it and break out.
                // Otherwise add it to the wheel and continue.
                if (i === endingPosition) {
                    wheelOrder.push(wheel[i]);
                    break;
                } else {
                    wheelOrder.push(wheel[i]);
                }
            // endingPosition ahead of index, so
            // add to wheel and continue.
            } else {
                wheelOrder.push(wheel[i]);
            }
        // For all other cases where index hasn't reached the
        // last character of the wheel.
        } else {
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

function washington() {
    changeCell(c9,  'W');
    changeCell(c10, 'A');
    changeCell(c11, 'S');
    changeCell(c12, 'H');
    changeCell(c13, 'I');
    changeCell(c14, 'N');
    changeCell(c15, 'G');
    changeCell(c16, 'T');
    changeCell(c17, 'O');
    changeCell(c18, 'N');
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