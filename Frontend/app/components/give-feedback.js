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
            projectId: 45,
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
                this.projectId = response.data.projectId;
                this.info = response.data.infotext;
                console.log(response);
                console.log(info)
            }, function (error) {
                console.log(error);
            });

        if(info === "") {

        }

        document.getElementById("done").style = "display:block; transition:";
        new Promise((resolve) => setTimeout(resolve, 10000)).then(() => {
            document.getElementById("done").style = "display: none";
        });
    }
});