app.component("createProject", {
    templateUrl: "components/create-project.html",
    controller: "createProjectController"
});

app.controller("createProjectController", function ($http, $scope, $mdDialog) {

    $scope.showPrompt = function (ev) {
        var confirm = $mdDialog.prompt()
            .title('Geben Sie eine Projektnamen ein!')
            .placeholder('Projektname')
            .targetEvent(ev)
            .required(true)
            .ok('Hinzufügen!')
            .cancel('Abbrechen')

        $mdDialog.show(confirm).then(function (result) {
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
                });
            document.getElementById("working").style = "display: block; transition:";
            new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
                document.getElementById("working").style = "display: none";
            });
        });
    }
});