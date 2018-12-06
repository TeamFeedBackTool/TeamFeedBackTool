"use strict";

app.component("userDisplayUsername", {
    templateUrl: "components/user-display-username.html",
    controller: "UserDisplayUsernameController",
    bindings: {
        username: "@"
    }
});


app.controller("UserDisplayUsernameController", function ($http, $log, Userdata) {
    $log.debug("UserDisplayUsernameController()");

    this.$onInit = function() {

        this.username = Userdata.firstname + ' ' + Userdata.surname;

    };

    this.toggleProfileMenue = () => {
        $rootScope.profileVisibility = !$rootScope.profileVisibility;
    };

});
