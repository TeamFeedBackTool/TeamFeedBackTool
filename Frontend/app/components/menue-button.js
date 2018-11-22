"use strict";

app.component("menueButton", {
    templateUrl: "components/menue-button.html",
    controller: "MenueButtonController",
    bindings: {}
});


app.controller("MenueButtonController", function ($log) {
    $log.debug("MenueButtonController()");

    this.menu_open = false;

    this.toggle_menu = function() {
        if (this.menu_open === false) {
            this.menu_open = true;
            angular.element(document.querySelector('.menue-icon')).addClass('button-active');
        } else {
            this.menu_open = false;
            angular.element(document.querySelector('.menue-icon')).removeClass('button-active');
        }
    }
});
