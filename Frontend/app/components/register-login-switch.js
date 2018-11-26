"use strict";

app.component("registerLoginSwitch", {
    templateUrl: "components/register-login-switch.html",
    controller: "registerLoginSwitchController",
    bindings: {
        toggleText: "@"
    }
});


app.controller("registerLoginSwitchController", function ($log, $scope) {
    $log.debug("registerLoginSwitchController()");

    this.$onInit = function () {
        $scope.registerLoginSwitch = {register: false, login: true};
        this.toggleText = 'Erstellen Sie Ihr Konto';
    };

    this.toggleSwitch = () => {
        if ($scope.registerLoginSwitch.login) {
            $scope.registerLoginSwitch.register = true;
            $scope.registerLoginSwitch.login = false;
            this.toggleText = 'Melden Sie sich hier an';
        } else {
            $scope.registerLoginSwitch.register = false;
            $scope.registerLoginSwitch.login = true;
            this.toggleText = 'Erstellen Sie Ihr Konto';
        }
    };

});
