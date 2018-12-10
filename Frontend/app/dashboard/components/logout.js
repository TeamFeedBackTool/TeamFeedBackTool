app.component("logout", {
    templateUrl: "components/logout.html",
    controller: "LogoutController"
});

app.controller("LogoutController", function ($http, $rootScope) {

    $rootScope.$watch('profileVisibility', () => {
        angular.element(document.querySelector('.logout_individualprofile')).slideToggle();
    });

    this.submit = () => {

        let url = "../../../Backend/LogoutUser.php";

        $http({
            method: 'POST',
            url: url
        });

        window.location.href = '../index.html';
    }
});