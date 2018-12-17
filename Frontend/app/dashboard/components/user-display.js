"use strict";

app.component("userDisplay", {
    templateUrl: "components/user-display.html",
    controller: "UserDisplayController",
    bindings: {
        username: "@"
    }
});


app.controller("UserDisplayController", function ($log, $rootScope) {
    $log.debug("UserDisplayController()");

    this.$onInit = function () {
        $rootScope.profileVisibility = false;
    };

});
