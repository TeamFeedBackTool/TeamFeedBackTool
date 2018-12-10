"use strict";

app.component("userDisplayUsername", {
    templateUrl: "components/user-display-username.html",
    controller: "UserDisplayUsernameController",
    bindings: {}
});


app.controller("UserDisplayUsernameController", function ($log, UserdataService) {
    $log.debug("UserDisplayUsernameController()");

    UserdataService.getUserdata().then(x => {
        this.username = x.firstname + ' ' + x.surname;
    });

    this.toggleProfileMenue = () => {
        $rootScope.profileVisibility = !$rootScope.profileVisibility;
    };

});
