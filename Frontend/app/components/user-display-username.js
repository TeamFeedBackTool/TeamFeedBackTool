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

        let url = "../../Backend/IndividualProfile.php";

        $http({
            method: 'POST',
            url: url
        }).then(
            (response) => {
                this.username = response.data.firstname + ' ' + response.data.surname;
            }, function (error) {
                console.log(error);
            });


    }

});
