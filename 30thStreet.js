'use strict';
// For Time, Number, and Train Columns.
const alpha = ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'.split('');

// For To/From Cities.
const cities = [
    ' ',
    'BOSTON',
    'SPRINGFIELD',
    'NEW HAVEN',
    'STAMFORD',
    'NEW YORK',
    'NEWARK',
    'TRENTON',
    'PHILADELPHIA',
    'WILMINGTON',
    'BALTIMORE',
    'WASHINGTON',
    'CHICAGO',
    'SAVANNAH',
    'JACKSONVILLE',
    'ORLANDO',
    'TAMPA',
    'NEW ORLEANS',
    'ST PETERSBURG',
    'MIAMI',
    'NEWPORT NEWS',
    'ATLANTA',
    'MONTREAL',
    'PITTSBURGH',
    'HARRISBURG',
    'RICHMOND',
    'CAPE COD',
    'ATLANTIC CITY',
    'CHARLOTTE',
    'VERMONT'
];

// For Train Status.
const trainStatus = [ 
    ' ',
    'ON TIME',
    'CANCELLED',
    'DELAYED',
    'BOARDING',
    'DEPARTED',
    'ARRIVED',
    ' 5mins LATE',
    '10mins LATE',
    '15mins LATE',
    '20mins LATE',
    '25mins LATE',
    '30mins LATE',
    '40mins LATE',
    '50mins LATE',
    '1hr 15min LATE',
    '1hr 30min LATE',
    '1hr 45min LATE',
    '2hr LATE',
    '2hr 15min LATE',
    '2hr 30min LATE',
    '2hr 45min LATE',
    '3hr LATE',
    'SPECIAL TRAIN',
    'CONNECTION',
    'ONE HOUR LATE'
];

// For Stairway assignment.
const stairways = [
    ' ',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    'A',
    'B',
    'C'
];

//(1  , 1031, 2158,   BIEBER-TOURWAYS, ATLANTIC CITY, ATLANTIC CITY, 2hr 45min LATE, 3)
const update = (row, time, num, train, to, from, status, stairway) => {
    var rowNumber = 'r' + row;
    var timeArr = time.split('');
    var numberArr = num.split('');
    var trainArr = train.split('');
    
    // time [0,3]
    for (let idx = 0; idx < timeArr.length; idx++) {
        var coordinate = rowNumber + 'c' + idx;
        //document.getElementById(coordinate).textContent = timeArr[i];
        changeCell(alpha, coordinate, timeArr[idx]);
    }
    
    // number [4, 7]
    // changing var from i to j doesn't matter. It's locally scoped.
    for (let idx = 0; idx < numberArr.length; idx++) {
        var coordinate = rowNumber + 'c' + (idx + 4);
        //console.log(coordinate, numberArr[i]);
        //document.getElementById(coordinate).textContent = numberArr[i];
        changeCell(alpha, coordinate, numberArr[idx]);
    }
    
    // train [8, 23]
    for (let idx = 0; idx < trainArr.length; idx++) {
        var coordinate = rowNumber + 'c' + (idx + 8);
        //document.getElementById(coordinate).textContent = trainArr[i];
        changeCell(alpha, coordinate, trainArr[idx]);
    }
    
    // to 24
    //document.getElementById(rowNumber + 'c24').textContent = to;
    changeCell(cities, rowNumber + 'c24', to);
    
    // from 25
    //document.getElementById(rowNumber + 'c25').textContent = from;
    changeCell(cities, rowNumber + 'c25', from);
    
    // status 26
    //document.getElementById(rowNumber + 'c26').textContent = status;
    
    const boardingCheck = (trainStatus, rowNumber, status) => {
        
        changeCell(trainStatus, rowNumber + 'c26', status);

        // boarding_light 28
        // This will eventually activate a CSS class or something to place a
        // yellow light to in indicate boarding.
        // console.log(rowNumber);

        if (typeof(Number(rowNumber)) === "number" && status === "BOARDING") {
            document.getElementById(rowNumber + 'c28').children[0].className += " blink-image";
        } else {
            document.getElementById(rowNumber + 'c28').children[0].className = "blinker";
        }

    };
    
    boardingCheck(trainStatus, rowNumber, status);
    // stairway 27
    //document.getElementById(rowNumber + 'c27').textContent = stairway;
    changeCell(stairways, rowNumber + 'c27', stairway);

};

const generateWheelSequence = (wheel, coordinate, ltr) => {
    // Index of current cell.
    var startingPosition = wheel
        .indexOf(document.querySelector('#'+coordinate).textContent);
    // Index of new cell to transition to.
    var endingPosition = wheel.indexOf(ltr);

    var wheelOrder = [];

    // ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'
    //  0                                      40
    for (let i = startingPosition; i < wheel.length; i++) {

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
};

const changeCell = (wheel, coordinate, ltr) => {
    // console.log(coordinate);
    // console.log(ltr);

    // var AudioContext = window.AudioContext || window.webkitAudioContext;
    // var audioCtx = new AudioContext();

    var audio = new Audio('button2a.wav');
    // var aud = new Audio('440short.wav');
    
    // var audioCtx = new Audio("button2a.wav");

    //var audio = new Audio('button2a.wav');
    var interval = 150; // how much time should the delay between two iterations be (in milliseconds)?
    var wheelOrder = generateWheelSequence(wheel, coordinate, ltr);

    wheelOrder.forEach( (el, index) => {

        setTimeout(function () {
            document.querySelector('#' + coordinate).textContent = el;
            audio.play();
        }, index * interval);

    });
};

const first = () => {
    update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');
    update(2, '1042', ' 8H ', 'REGIONAL        ', 'BOSTON', 'RICHMOND', 'BOARDING', '1');
};

const second = () => {
    update(3, '1055', '646 ', 'KEYSTONE -R     ', 'NEW YORK', 'PHILADELPHIA', 'BOARDING', '7');
    update(4, '1100', '643 ', 'KEYSTONE        ', 'HARRISBURG', 'PHILADELPHIA', 'ON TIME', '9');
};

const third = () => {
    update(5, '1110', '182 ', 'REGIONAL        ', 'NEW YORK', 'WASHINGTON', 'ON TIME', ' ');
    update(6, '1115', '2153', 'ACELA EXPRESS   ', 'WASHINGTON', 'BOSTON', 'ON TIME', ' ');
};

const fourth = () => {
    update(7, '1116', '141 ', 'REGIONAL        ', 'WASHINGTON', 'SPRINGFIELD', 'ON TIME', ' ');
};

const tc = () => {
    update(1, '1031', '2158', 'VERMONTER       ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');
};

const clearRow = (n) => {
    update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');
};

const clearBoard = () => {
    for (var i = 1; i < 8; i++) {
        clearRow(i);
    }
};

const populate = () => {
    first();
    second();
    third();
    fourth();
};

// First wave of updates.
const a = () => {
    //first wave of updates
    update(2, '1055', '646 ', 'KEYSTONE -R     ', 'NEW YORK', 'PHILADELPHIA', '10mins LATE', '7');
    update(3, '1100', '643 ', 'KEYSTONE        ', 'HARRISBURG', 'PHILADELPHIA', 'ON TIME', '9');
};

const b = () => {
    update(4, '1110', '182 ', 'REGIONAL        ', 'NEW YORK', 'WASHINGTON', 'ON TIME', ' ');
    update(5, '1115', '2153', 'ACELA EXPRESS   ', 'WASHINGTON', 'BOSTON', 'ON TIME', ' ');
};

const c = () => {
    update(6, '1116', '141 ', 'REGIONAL        ', 'WASHINGTON', 'SPRINGFIELD', 'ON TIME', ' ');
    update(7, '1123', '4623', 'N.J. TRANSIT    ', 'ATLANTIC CITY', 'PHILADELPHIA', 'ON TIME', ' ');
};


// Second wave of updates.
const d = () => {
    //second wave
    update(1, '1055', '646 ', 'KEYSTONE -R     ', 'NEW YORK', 'PHILADELPHIA', '10mins LATE', '7');
    update(2, '1100', '648 ', 'KEYSTONE        ', 'HARRISBURG', 'PHILADELPHIA', 'BOARDING', '9');
};

const e = () => {
    update(3, '1110', '182 ', 'REGIONAL        ', 'NEW YORK', 'WASHINGTON', 'ON TIME', ' ');
    update(4, '1115', '2153', 'ACELA EXPRESS   ', 'WASHINGTON', 'BOSTON', 'ON TIME', ' ');

};

const f = () => {
    update(5, '1116', '141 ', 'REGIONAL        ', 'WASHINGTON', 'SPRINGFIELD', 'ON TIME', ' ');
    update(6, '1123', '4623', 'N.J. TRANSIT    ', 'ATLANTIC CITY', 'PHILADELPHIA', 'ON TIME', ' ');
};

const g = () => {
    update(7, '1131', '216A', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'ON TIME', ' ');

};

// '                '
const thanks = () => {
  //update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');
    update(1, '    ', '    ', '   THANKS FOR   ', ' ', ' ', ' ', ' ', ' ');
    update(2, '    ', '    ', 'VISITING. PRESS ', ' ', ' ', ' ', ' ', ' ');
    update(3, '    ', '    ', ' PLAY TO REPEAT ', ' ', ' ', ' ', ' ', ' ');
    update(4, '    ', '    ', 'THE SEQUENCE OR ', ' ', ' ', ' ', ' ', ' ');
    update(5, '    ', '    ', 'USE THE CONSOLE ', ' ', ' ', ' ', ' ', ' ');
    update(6, '    ', '    ', '    FOR MORE    ', ' ', ' ', ' ', ' ', ' ');
    update(7, '    ', '    ', '    OPTIONS.    ', ' ', ' ', ' ', ' ', ' ');
};

const tuse = () => {
    //update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');
    update(1, '    ', '    ', 'GREETINGS TUSE. ', ' ', ' ', ' ', ' ', ' ');
    update(2, '    ', '    ', 'WISHING YOU AND ', ' ', ' ', ' ', ' ', ' ');
    update(3, '    ', '    ', '   EVERYONE A   ', ' ', ' ', ' ', ' ', ' ');
    update(4, '    ', '    ', '  TUSE-TACULAR  ', ' ', ' ', ' ', ' ', ' ');
    update(5, '    ', '    ', 'DAY IN THE GREAT', ' ', ' ', ' ', ' ', ' ');
    update(6, '    ', '    ', '    CITY OF     ', ' ', ' ', ' ', ' ', ' ');
    update(7, '    ', '    ', '  T U S E O N.  ', ' ', ' ', ' ', ' ', ' ');
};

const help = () => {
    console.log('Arrays used in all transitions are alpha, cities, trainStatus, and stairways.');
    console.log('There are 7 rows (1-7) in the flipboard. To update a row:');
    console.log("update(row, time, train_number, train, to, from, status, stairway);");
    console.log("EXAMPLE: update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');");
    console.log("All parameters are strings except for the row number. The 'train' parameter must be 16 characters long, and padded with spaces if less than 16 characters.");
    console.log('Clearing a row:');
    console.log("clearRow(rowNumber);");
    console.log("When a train's status is 'BOARDING', a yellow blinker appears");
    console.log("Changing the status to 'DEPARTED' deactivates the blinker.");
    console.log("update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'DEPARTED', '3');");
    console.log("clearBoard(); will clear the board completely.");
    console.log("populate(); will fill the board up all at once.");
    console.log("first() populates rows 1 and 2.");
    console.log("second() populates rows 3 and 4.");
    console.log("third() populates rows 5 and 6.");
    console.log("fourth() populates row 7.");
};

const Q = (f, interval) => {
    setTimeout(() => {
        f();
    }, interval);
}

const play = () => {
    Q(clearBoard, 0);
    Q(first, 3000);
    Q(second, 10000);
    Q(third, 17000);
    Q(fourth, 24000);
    Q(a, 29000);
    Q(b, 36000);
    Q(c, 47000);
    Q(d, 54000);
    Q(e, 61000);
    Q(f, 68000);
    Q(g, 75000);
    Q(thanks, 85000);
};

console.log('Welcome to the 30th Street Flipboard.');
console.log("Type 'help()' and Enter for a list of commands");
