"use strict";

app.component("registerLoginSwitch", {
    templateUrl: "components/register-login-switch.html",
    controller: "registerLoginSwitchController",
    bindings: {
        toggleText: "@",
        funktionsSpezifikation: "@"
    }
});


app.controller("registerLoginSwitchController", function ($log, $scope) {
    $log.debug("registerLoginSwitchController()");

    this.$onInit = function () {
        $scope.registerLoginSwitch = {register: false, login: true};
        this.toggleText = 'Erstellen Sie Ihr Konto';
        this.funktionsSpezifikation = 'Anmelden';
    };

    this.toggleSwitch = () => {
        if ($scope.registerLoginSwitch.login) {
            $scope.registerLoginSwitch.register = true;
            $scope.registerLoginSwitch.login = false;
            this.toggleText = 'Melden Sie sich hier an';
            this.funktionsSpezifikation = 'Registrieren';
        } else {
            $scope.registerLoginSwitch.register = false;
            $scope.registerLoginSwitch.login = true;
            this.toggleText = 'Erstellen Sie Ihr Konto';
            this.funktionsSpezifikation = 'Anmelden';
        }
    };

});
