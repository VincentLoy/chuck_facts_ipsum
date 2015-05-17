/**
 * Author: Vincent Loy <vincent.loy1@gmail.com>
 * License : MIT
 */

(function () {
    'use strict';

    var request,
        data,
        lorem,
        button,
        textField,
        rand,
        paragraph = "",
        separators = ['. ', ', ', ' '],
        i;

    function getRandomInt(min, max) {
        rand = Math.floor(Math.random() * (max + 1 - min) + min);
        return rand;
    }

    function buildParagraph(itemsNumber, tab) {

        paragraph = "";

        for (i = 0; i < itemsNumber; i += 1) {
            if (i === itemsNumber - 1) {
                paragraph += tab[getRandomInt(0, tab.length - 1)] + separators[0];
            } else {
                paragraph += tab[getRandomInt(0, tab.length - 1)] + separators[getRandomInt(0, separators.length - 1)];
            }
        }
        return paragraph + '\n\n';
    }

    function makeLorem(datas) {
        return buildParagraph(getRandomInt(1, 15), datas.facts)
            + buildParagraph(getRandomInt(1, 15), datas.facts)
            + buildParagraph(getRandomInt(1, 15), datas.facts)
            + buildParagraph(getRandomInt(1, 15), datas.facts);
    }

    function insertLorem(myField, myValue) {
        myField.value = myValue;
    }

    function generateLorem() {
        request = new XMLHttpRequest();
        request.open('GET', 'assets/chuck.min.json', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success
                data = JSON.parse(request.responseText);
                paragraph = "";
                lorem = makeLorem(data);
                textField = document.getElementById('textField');
                insertLorem(textField, lorem);
            } else {
                console.error('Error ' + request.status);
            }
        };

        request.onerror = function () {
            // There was a connection error of some sort
            console.error('Connection Error');
        };
        request.send();
    }

    document.addEventListener('DOMContentLoaded', function () {
        button = document.querySelector(".button");
        button.addEventListener('click', function (e) {
            generateLorem();
        });
    });
}());