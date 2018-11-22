"use strict";

app.component("userDisplay", {
    templateUrl: "components/user-display.html",
    controller: "UserDisplayController",
    bindings: {
        username: "@"
    }
});


app.controller("UserDisplayController", function ($log) {
    $log.debug("UserDisplayController()");

    this.$onInit = function() {
        this.username = "Florian Gödel";
        // usernamen holen und setzen
    }

});
