app.component("giveFeedback", {
    templateUrl: "components/give-feedback.html",
    controller: "giveFeedbackController"
});

app.controller("giveFeedbackController", function ($http, $scope){

    $scope.rating1 = 0;

    $scope.rating2 = 0;
});