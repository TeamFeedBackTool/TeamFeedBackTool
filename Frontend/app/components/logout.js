app.component("logout", {
    templateUrl: "components/logout.html",
    controller: "LogoutController"
});

app.controller("LogoutController", function ($log, $http, $rootScope, $timeout) {
    $log.debug("LogoutController()");

    this.$onInit = function() {
        this.initializing = true;
        angular.element(document.querySelector('.logout')).hide();
        $rootScope.profileVisibility = false;
    };

    $rootScope.$watch('profileVisibility', () => {
        if (this.initializing) {
            $timeout(() => { this.initializing = false; });
        } else {
            angular.element(document.querySelector('.logout')).slideToggle();
            $log.debug($rootScope.profileVisibility);
        }
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