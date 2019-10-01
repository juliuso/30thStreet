'use strict';
// Time, Number, and Train Columns.
const alpha = ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'.split('');

// To/From Cities.
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

// Train Status.
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

// Stairway assignment.
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

// Check if boarding light should be activated.
const checkBoardingLight = (trainStatus, rowNumber, status) => {
        
    // Train status, column 26.
    changeCell(trainStatus, rowNumber + 'c26', status);

    // Boarding light indicator, column 28.
    // Boarding light only triggered when status parameter
    // in update() equals "BOARDING" and stairway number is assigned.
    if (typeof(Number(rowNumber)) === "number" && status === "BOARDING") {
        document.getElementById(rowNumber + 'c28').children[0].className += " blink-image";
    } else {
        document.getElementById(rowNumber + 'c28').children[0].className = "blinker";
    }

};

// Updates rows in the board.
// Ex.: update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');
const update = (row, time, num, train, to, from, status, stairway) => {
    const rowNumber = 'r' + row;
    const timeArr = time.split('');
    const numberArr = num.split('');
    const trainArr = train.split('');
    
    // Time, columns 0-3.
    timeArr.forEach(function(i, val) {
        let coordinate = rowNumber + 'c' + val;
        changeCell(alpha, coordinate, i);
    });
    
    // Train number, columns 4-7.
    numberArr.forEach(function(i, val) {
        let coordinate = rowNumber + 'c' + (val + 4);
        changeCell(alpha, coordinate, i);
    })
    
    // Train service, columns 8-23.
    trainArr.forEach(function(i, val) {
        let coordinate = rowNumber + 'c' + (val + 8);
        changeCell(alpha, coordinate, i);
    })
    
    // Train destination (TO), column 24.
    changeCell(cities, rowNumber + 'c24', to);
    
    // Train origin (From), column 25.
    changeCell(cities, rowNumber + 'c25', from);
    
    // Checks if boarding light should be turned on for the row.
    checkBoardingLight(trainStatus, rowNumber, status);
    
    // Stairway number, column 27.
    changeCell(stairways, rowNumber + 'c27', stairway);

};


const generateWheelSequence = (wheel, coordinate, ltr) => {
    // Index of current cell.
    const startingPosition = wheel
        .indexOf(document.querySelector('#'+coordinate).textContent);
    // Index of new cell to transition to.
    const endingPosition = wheel.indexOf(ltr);

    // Array to be built and returned.
    let wheelOrder = [];

    // ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'
    //  0                                      40
    for (let idx = startingPosition; idx < wheel.length; idx++) {

        // If the letter doesn't change before and after, do nothing.
        if (startingPosition === endingPosition) {
            break;
        }
        // If the index equals the last character's index in the sequence,
        // add it to the wheel and stop.
        if (idx === endingPosition) {
            wheelOrder.push(wheel[idx]);
            break;
        }

        // When the last index of the wheel is reached.
        if (idx === (wheel.length-1)) {
            // Indexing starts from the beginning again.
            if (endingPosition < idx) {
                // Push last index of wheel and start over at i=0.
                wheelOrder.push(wheel[idx]);
                idx = 0;
                // If the index of the last character in the sequence coincides
                // with the first index of the wheel, add it and break out.
                // Otherwise add it to the wheel and continue.
                if (idx === endingPosition) {
                    wheelOrder.push(wheel[idx]);
                    break;
                } else {
                    wheelOrder.push(wheel[idx]);
                }
            // endingPosition ahead of index, so
            // add to wheel and continue.
            } else {
                wheelOrder.push(wheel[idx]);
            }
        // For all other cases where index hasn't reached the
        // last character of the wheel.
        } else {
            wheelOrder.push(wheel[idx]);
        }
    }

    return wheelOrder;
};

const changeCell = (wheel, coordinate, ltr) => {

    const audio = new Audio('flip.wav');
    // Time delay between two iterations (in milliseconds).
    const interval = 150;
    const wheelOrder = generateWheelSequence(wheel, coordinate, ltr);

    wheelOrder.forEach((el, idx) => {
        setTimeout(function () {
            document.querySelector('#' + coordinate).textContent = el;
            audio.play();
        }, idx * interval);
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
    update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ');
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
    update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'DEPARTED', '3');
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
    console.log(`Arrays used in all transitions are alpha, cities, trainStatus, and stairways.`);
    console.log(`There are 7 rows (1-7) in the flipboard. To update a row:`);
    console.log(`update(row, time, train_number, train, to, from, status, stairway);`);
    console.log(`EXAMPLE: update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');`);
    console.log(`All parameters are strings except for the row number. The 'train' parameter must be 16 characters long, and padded with spaces if less than 16 characters.`);
    console.log(`Clearing a row:`);
    console.log(`clearRow(rowNumber);`);
    console.log(`When a train's status is 'BOARDING', a yellow blinker appears`);
    console.log(`Changing the status to 'DEPARTED' deactivates the blinker.`);
    console.log(`update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'DEPARTED', '3');`);
    console.log(`clearBoard(); will clear the board completely.`);
    console.log(`populate(); will fill the board up all at once.`);
    console.log(`first() populates rows 1 and 2.`);
    console.log(`second() populates rows 3 and 4.`);
    console.log(`third() populates rows 5 and 6.`);
    console.log(`fourth() populates row 7.`);
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

console.log(`Welcome to the 30th Street Flipboard.`);
console.log(`Type 'help()' and Enter for a list of commands`);
