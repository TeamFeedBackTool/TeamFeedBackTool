app.component("giveFeedback", {
    templateUrl: "components/give-feedback.html",
    controller: "giveFeedbackController"
});

app.controller("giveFeedbackController", function ($http, $scope) {

    $scope.stress = 0;

    $scope.motivation = 0;

    $scope.data = {
        group1: 'Ja',
        group2: 'Ja'
    }

    $scope.antwort = "Danke fürs beantworten der Fragen! Kommen Sie in einer Woche wieder!";

    this.submit = () => {

        let satisfied = 0;

        let technicalSkills = 0;

        if ($scope.data.group1 === "Ja") {
            satisfied = 1;
        }

        if ($scope.data.group2 === "Ja") {
            technicalSkills = 1;
        }

        let parameter = JSON.stringify({
            projectId: 45,
            sliderValue_stress: $scope.stress,
            sliderValue_motivation: $scope.motivation,
            work_performance_satisfied: satisfied,
            technicalSkills: technicalSkills
        });

        let url = "../../Backend/GiveFeedback.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                $scope.info = response.data.infotext;
                console.log(response);
                console.log($scope.info)
            }, function (error) {
                console.log(error);
            });

        if ($scope.info === undefined) {
            $scope.antwort = "Sie haben bereits abgestimmt!";
            document.getElementById("done").style.color = "red";
        }

        document.getElementById("done").style = "display:block; transition:";
        new Promise((resolve) => setTimeout(resolve, 10000)).then(() => {
            document.getElementById("done").style = "display: none";
        });
    }
});