app.component("createProject", {
    templateUrl: "components/create-project.html",
    controller: "createProjectController"
});

app.controller("createProjectController", function ($http, $scope, $mdDialog) {
    $scope.status = ' ';
    $scope.showPrompt = function (ev) {
        var confirm = $mdDialog.prompt()
            .title('Geben Sie eine Projektnamen ein!')
            .placeholder('Projektname')
            .ariaLabel('Projektname')
            .targetEvent(ev)
            .required(true)
            .ok('Okay!')
            .cancel('Abbrechen');

        $mdDialog.show(confirm).then(function (result) {
                let a = document.cookie.split(",");

                let b = a.indexOf("");

                let c = a[b].split(":");

                let parameter = JSON.stringify({
                    projectName: result,
                    userId: 1
                });

                let url = "../../Backend/CreateProject.php";

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
        });
    };
});