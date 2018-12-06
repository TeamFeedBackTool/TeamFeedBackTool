app.component("createProject", {
    templateUrl: "components/create-project.html",
    controller: "createProjectController"
});

app.controller("createProjectController", function ($http, $scope, $mdDialog) {

    $scope.showPrompt = function (ev, text) {
        var confirm = $mdDialog.prompt()
            .title('Geben Sie eine Projektnamen ein!')
            .textContent(text)
            .placeholder('Projektname')
            .targetEvent(ev)
            .required(true)
            .ok('Bestätigen!')
            .cancel('Abbrechen')

        $mdDialog.show(confirm).then(function (result) {
                if (result.length <= 40) {
                    let parameter = JSON.stringify({
                        projectName: result
                    });

                    let url = "../../Backend/CreateProject.php";

                    $http({
                        method: 'POST',
                        url: url,
                        data: parameter
                    }).then(
                        (response) => {
                            console.log(response);
                            $scope.info = response.data.infotext;

                            if ($scope.info === "This projectName is already taken.") {
                                $scope.showAlert("Dieser Projektname wird bereits verwendet!");
                            }
                            if ($scope.info === undefined) {
                                $scope.showAlert("Ihr Projekt wurde erstellt!");
                            }
                        })
                } else {
                    $scope.showPrompt(ev, 'Der Projektname darf maximal 40 Zeichen lang sein!');
                }
            }
        );
    }
    $scope.showAlert = function (text) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .textContent(text)
                .ok('Verstanden')
        );
    }
})
;