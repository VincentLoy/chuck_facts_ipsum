/**
 * Author: Vincent Loy <vincent.loy1@gmail.com>
 * License : MIT
 */

(function () {
    'use strict';

    var factsLength,
        request,
        data,
        lorem,
        textField,
        paragraph = "",
        separation = ['. ', ', ', ' '],
        i;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function buildParagraph(itemsNumber, tab) {
        for (i = 0; i < itemsNumber; i += 1) {
            if (i === itemsNumber - 1) {
                paragraph += tab[getRandomInt(0, tab.length - 1)];
            } else {
                paragraph += tab[getRandomInt(0, tab.length - 1)] + separation[getRandomInt(0, separation.length - 1)];
            }
        }
        return paragraph + '\n\n';
    }

    function makeLorem(datas) {
        factsLength = datas.facts.length;
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
        request.open('GET', 'assets/chuck.json', true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                // Success
                data = JSON.parse(request.responseText);
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
        generateLorem();
    });
}());