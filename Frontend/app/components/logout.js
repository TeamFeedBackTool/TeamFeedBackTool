app.component("logout", {
    templateUrl: "components/logout.html",
    controller: "LogoutController"
});

app.controller("LogoutController", function ($http, $rootScope) {

    this.$onInit = function() {
        $rootScope.profileVisibility = false;
    };

    $rootScope.$watch('profileVisibility', () => {
        angular.element(document.querySelector('.logout')).slideToggle();
    });

    this.submit = () => {

        let url = "../../Backend/LogoutUser.php";

        $http({
            method: 'POST',
            url: url
        });

        window.location.href = '#!/';
    };

    this.userdata = () => {
        window.location.href = '#!/userdata'
    }
});