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
        rand,
        paragraph = "",
        separators = ['. ', ', ', ' '],
        textContent = document.getElementById('content'),
        i;

    function getRandomInt(min, max) {
        rand = Math.floor(Math.random() * (max + 1 - min) + min);
        return rand;
    }

    function buildParagraph(itemsNumber, tab) {
        var p = document.createElement('P'),
            paragraph = "";
        p.classList.add('paragraph');

        for (i = 0; i < itemsNumber; i += 1) {
            if (i === itemsNumber - 1) {
                paragraph += tab[getRandomInt(0, tab.length - 1)] + separators[0];
            } else {
                paragraph += tab[getRandomInt(0, tab.length - 1)] + separators[getRandomInt(0, separators.length - 1)];
            }
        }

        p.innerHTML = paragraph;
        return p;
    }

    function makeLorem(datas) {
        while (textContent.hasChildNodes()) {
            textContent.removeChild(textContent.lastChild);
        }

        textContent.appendChild(buildParagraph(getRandomInt(1, 15), datas.facts));
        textContent.appendChild(buildParagraph(getRandomInt(1, 15), datas.facts));
        textContent.appendChild(buildParagraph(getRandomInt(1, 15), datas.facts));
        textContent.appendChild(buildParagraph(getRandomInt(1, 15), datas.facts));
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
            e.preventDefault();
            generateLorem();
        });
    });

    window.setTimeout(function () {
      generateLorem();
    }, 500);
}());
