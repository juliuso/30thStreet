// For Time, Number, and Train Columns.
var alpha = ' 1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-./'.split('');

// For To/From Cities.
var cities = [
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
var trainStatus = [ 
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
var stairways = [
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
update = (row, time, num, train, to, from, status, stairway) => {
	var rowNumber = 'r' + row;
	var timeArr = time.split('');
	var numberArr = num.split('');
	var trainArr = train.split('');
	
	// time [0,3]
	for (var i = 0; i < timeArr.length; i++) {
		var coordinate = rowNumber + 'c' + i;
		//document.getElementById(coordinate).textContent = timeArr[i];
		changeCell(alpha, coordinate, timeArr[i]);
	}
	
	// number [4, 7]
	// changing var from i to j doesn't matter. It's locally scoped.
	for (var i = 0; i < numberArr.length; i++) {
		var coordinate = rowNumber + 'c' + (i + 4);
		//console.log(coordinate, numberArr[i]);
		//document.getElementById(coordinate).textContent = numberArr[i];
		changeCell(alpha, coordinate, numberArr[i]);
	}
	
	// train [8, 23]
	for (var i = 0; i < trainArr.length; i++) {
		var coordinate = rowNumber + 'c' + (i + 8);
		//document.getElementById(coordinate).textContent = trainArr[i];
		changeCell(alpha, coordinate, trainArr[i]);
	}
	
	// to 24
	//document.getElementById(rowNumber + 'c24').textContent = to;
	changeCell(cities, rowNumber + 'c24', to)
	
	// from 25
	//document.getElementById(rowNumber + 'c25').textContent = from;
	changeCell(cities, rowNumber + 'c25', from);
	
	// status 26
	//document.getElementById(rowNumber + 'c26').textContent = status;
    
    boardingCheck = (trainStatus, rowNumber, status) => {
        
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

}

generateWheelSequence = (wheel, coordinate, ltr) => {
    // Index of current cell.
    var startingPosition = wheel
        .indexOf(document.querySelector('#'+coordinate).textContent);
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

changeCell = (wheel, coordinate, ltr) => {
    // console.log(coordinate);
    // console.log(ltr);

    // const AudioContext = window.AudioContext || window.webkitAudioContext;

    // const audioCtx = new AudioContext({
    // });
    
    var audio = new Audio('button2a.wav');
    var interval = 150; // how much time should the delay between two iterations be (in milliseconds)?
    var wheelOrder = generateWheelSequence(wheel, coordinate, ltr);

    wheelOrder.forEach( (el, index) => {
        setTimeout(function () {
            //console.log(el);
            //console.log("Tick: " + Math.floor(Date.now() ));
            //$(coordinate).slideDown("slow", function() {
            document.querySelector('#' + coordinate).textContent = el;
            //});
            //console.log("Tock: " + Math.floor(Date.now() ));
            
            // Turn off during development. Annoying to listen to.
            audio.play();

        }, index * interval);
    });
}

first = () => {
    update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');
    update(2, '1042', ' 8H ', 'REGIONAL        ', 'BOSTON', 'RICHMOND', 'BOARDING', '1');
}

second = () => {
    update(3, '1055', '646 ', 'KEYSTONE -R     ', 'NEW YORK', 'PHILADELPHIA', 'BOARDING', '7');
    update(4, '1100', '643 ', 'KEYSTONE        ', 'HARRISBURG', 'PHILADELPHIA', 'ON TIME', '9');
}

third = () => {
    update(5, '1110', '182 ', 'REGIONAL        ', 'NEW YORK', 'WASHINGTON', 'ON TIME', ' ');
    update(6, '1115', '2153', 'ACELA EXPRESS   ', 'WASHINGTON', 'BOSTON', 'ON TIME', ' ');
}

fourth = () => {
    update(7, '1116', '141 ', 'REGIONAL        ', 'WASHINGTON', 'SPRINGFIELD', 'ON TIME', ' ');
}

tc = () => {
    update(1, '1031', '2158', 'VERMONTER       ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');
}

clearRow = (n) => {
    update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');
}

clearBoard = () => {
    for (var i = 1; i < 8; i++) {
        clearRow(i);
    }
}

populate = () => {
    first();
    second();
    third();
    fourth();
}

// '                '
thanks = () => {
  //update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');
    update(1, '    ', '    ', '   THANKS FOR   ', ' ', ' ', ' ', ' ', ' ');
    update(2, '    ', '    ', 'VISITING. PRESS ', ' ', ' ', ' ', ' ', ' ');
    update(3, '    ', '    ', ' PLAY TO REPEAT ', ' ', ' ', ' ', ' ', ' ');
    update(4, '    ', '    ', 'THE SEQUENCE OR ', ' ', ' ', ' ', ' ', ' ');
    update(5, '    ', '    ', 'USE THE CONSOLE ', ' ', ' ', ' ', ' ', ' ');
    update(6, '    ', '    ', '  TO SEE MORE   ', ' ', ' ', ' ', ' ', ' ');
    update(7, '    ', '    ', '    OPTIONS.    ', ' ', ' ', ' ', ' ', ' ');
}

help = () => {
    console.log('There are 7 rows in the flipboard. To update a row:')
    console.log("update(row, time, train_number, train, to, from, status, stairway);")
    console.log("EXAMPLE: update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'BOARDING', '3');")
    console.log("All parameters are strings except for the row number. The 'train' parameter must be 16 characters long, and padded with spaces if less than 16 characters.")
    console.log('Clearing a row:');
    console.log("update(n, '    ', '    ', '                ', ' ', ' ', ' ', ' ', ' ');");
    console.log("When a train's status is 'BOARDING', a yellow blinker appears");
    console.log("Changing the status to 'DEPARTED' deactivates the blinker.");
    console.log("update(1, '1031', '2158', 'ACELA EXPRESS   ', 'BOSTON', 'WASHINGTON', 'DEPARTED', '3');");
    console.log("clearBoard(); will clear the board completely.");
    console.log("populate(); will fill the board up simultaneously.");

}

function Q(f, interval) {
    setTimeout(() => {
        f();
    }, interval);
}

play = () => {
    Q(clearBoard, 0);
    Q(first, 2000);
    Q(second, 9000);
    Q(third, 16000);
    Q(fourth, 22000);
    //Q(clearBoard, 35000);
    Q(thanks, 28000);
}

console.log('Welcome to the 30th Street Flipboard.');
console.log("Type 'help()' and Enter for a list of commands");
