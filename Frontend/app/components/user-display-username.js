"use strict";

app.component("userDisplayUsername", {
    templateUrl: "components/user-display-username.html",
    controller: "UserDisplayUsernameController",
    bindings: {
        username: "@"
    }
});


app.controller("UserDisplayUsernameController", function ($http, $log) {
    $log.debug("UserDisplayUsernameController()");

    this.$onInit = function() {

        let parameter = JSON.stringify({
            email: this.frm_email,
            surname: this.frm_password,
            firstname: this.frm_firstname,
            userId: this.frm_userId,
            lastLogin: this.frm_lastLogin
        });

        // Korrekten Link später einfügen
        let url = "../../Backend/SendUserData.php";

        // ToFix: [$http:badreq]
        $http.get({
            url: url,
            data: parameter
        }).then(
            (response) => {
                this.username = this.frm_firstname + this.frm_surname;
            }, function (error) {
                console.log(error);
            });
    }

});
