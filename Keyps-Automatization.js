// ==UserScript==
// @name         keyps killer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://keyps.kuh.ku.edu.tr/karne/tip-form/add
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var count = 1 //dokunma

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);

    var tedavi = 0 //baslanacak yetkinlik sirasi-En basta 0 olmali
    var kotas = [10,10,10,10,10,10,2,5,10,10,1,5,5,5,3,3,2,5,5,2,10,5,10,2,5,4,2,2,2,5,3,5,2,5,5,2,5,5,5,1,1,5,5,5,3,3,3,5,3,2,1,2,2,3,3,1,1]

    var name = "AA" //hasta ismi
    var nameCount = 31 //hoca sirasi

    var goStart = function(){
        document.querySelector('[href="/karne/tip-form/add"]').children[0].click()

        setTimeout(run, 1500)
    }

    var clickButton = function(){
        console.log(count, "/", kotas[tedavi])

        var buttons = document.querySelectorAll(".btn")
        buttons[0].click()

        if(count < kotas[tedavi]){
            count++
            setTimeout(goStart, 1500)
        }
        else{
            console.log("Success", tedavi)

            tedavi++
            count = 1
            setTimeout(goStart, 1500)
        }
    }

    var selectItem1 = function(){
        var items = document.querySelectorAll(".vs__dropdown-option")
        items[tedavi].dispatchEvent(event);

        fillDropbox(1)
    }

    var selectItem2 = function(){
        var items = document.querySelectorAll(".vs__dropdown-option")
        items[nameCount].dispatchEvent(event);

        document.querySelectorAll(".form-control")[1].focus()
        document.querySelectorAll(".form-control")[1].blur()

        setTimeout(clickButton, 200)
    }

    var fillDropbox = function(index){
        var dropdowns = document.querySelectorAll(".vs__dropdown-toggle")

        dropdowns[index].dispatchEvent(event);
        if(index == 0)
            setTimeout(selectItem1, 200)
        else
            setTimeout(selectItem2, 200)
    }

    var run = function(){
        while(tedavi < kotas.length && kotas[tedavi] <= 0){
            console.log("Skipped", tedavi)
            tedavi++
        }

        if(tedavi >= kotas.length){
            console.log("All done :)")
            return
        }

        var inps = document.querySelectorAll(".form-control")

        // fill first 2 fields
        inps[0].value = name
        inps[1].value = 123 // protocol no

        // fill dropboxes, then click button
        fillDropbox(0)
    }

    setTimeout(run, 1500)
})();
