'use strict';
var $finishedLine = $(window).width()-220;
var $winnerLabelEl = $('#winnerLabel');
var $winnerDivEl = $('.winner');
var $restartGame = $('.restartGame');
var $pinkCar = $('.pinkCar > img');
var $yellowCar = $('.yellowCar > img');

var gCars = [
    {
        name: 'Pink Bimba',
        left: 0,
        keyCodes:[1,2],
        isPreviewClicked : false,
        isFinished: false
    },
    {
        name: 'Taxi',
        left: 0,
        keyCodes: ['up','down'],
        isPreviewClicked : false,
        isFinished: false
    }
];

function checkWinner(carsObj) {
    
    if(carsObj.left >= $finishedLine) {
        $winnerLabelEl.text(carsObj.name + ' is the winner!!!');
        carsObj.isFinished = true;
        $winnerDivEl.attr('style','display:block; animation: bounceInDown 3s');
        setTimeout(function() {
            $restartGame.attr('style','display: block; animation: tada 1.5s')
        },5000);
    }
}

function restartGame() {
    gCars.forEach(function(car){
        car.left = 0;
        car.isFinished = false;
        car.isPreviewClicked = false;
        $winnerLabelEl.text('');
        $winnerDivEl.attr('style','display: none');
        $restartGame.attr('style','display: none');
        $pinkCar.attr('style', 'left : 0');
        $yellowCar.attr('style', 'left : 0');
    });
}

$(document).ready(function () {
    $('body').keyup(function (key) { 
        
        if(gCars[0].isFinished || gCars[1].isFinished) {
            return;
        } else {
            switch (key.key) {
                case '1':
                    gCars[0].isPreviewClicked = true;
                    break;
                case '2':
                    if(gCars[0].isPreviewClicked) {
                        gCars[0].left += 20;
                        checkWinner(gCars[0]);
                        $pinkCar.attr('style', 'left : '+ gCars[0].left +'px');
                    }
                    gCars[0].isPreviewClicked = false;
                    break;
                case 'ArrowUp':
                    gCars[1].isPreviewClicked = true;
                    break;
                case 'ArrowDown':
                    if(gCars[1].isPreviewClicked) {
                        gCars[1].left += 20;
                        checkWinner(gCars[1]);
                        $yellowCar.attr('style', 'left : '+ gCars[1].left +'px');
                    }
                    gCars[1].isPreviewClicked = false;
                    break;
                default:
                    break;
            }
        }
        
    });
});


