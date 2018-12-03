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
                        console.log($scope.info);
                    })
            } else {
                $scope.showPrompt(ev, 'Der Projektname darf maximal 40 Zeichen lang sein!');
            }

            if($scope.info === "") {

            }
        });
    }

    $scope.showAlert = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .textContent('Ihr Projekt wurde erstellt')
                .ok('Verstanden')
        );
    }
});