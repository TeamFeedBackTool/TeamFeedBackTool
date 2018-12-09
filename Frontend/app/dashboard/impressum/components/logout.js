app.component("logout", {
    templateUrl: "components/logout.html",
    controller: "LogoutController"
});

app.controller("LogoutController", function ($http) {
    this.submit = () => {

        let url = "../../Backend/LogoutUser.php";

        $http({
            method: 'POST',
            url: url
        })

        window.location.href = 'index.html';
    }
});