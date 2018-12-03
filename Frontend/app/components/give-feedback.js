app.component("giveFeedback", {
    templateUrl: "components/give-feedback.html",
    controller: "giveFeedbackController"
});

app.controller("giveFeedbackController", function ($http, $scope) {

    $scope.rating1 = 0;

    $scope.rating2 = 0;

    this.submit = () => {

        rating11 = $scope.rating1;

        rating22 = $scope.rating2;

        let parameter = JSON.stringify({
            stress: rating11,
            motivation: rating22,
            satisfied: this.group1,
            technicalSkills: this.group2
        });

        let url = "../../Backend/GiveFeedback.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
    }
});