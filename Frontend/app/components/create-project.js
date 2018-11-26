app.component("createProject", {
    templateUrl: "components/create-project.html",
    controller: "createProjectController"
});

app.controller("createProjectController", function ($http, $scope, $mdDialog) {
    $scope.status = '  ';
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
            $scope.status = ' ' + result;
        });
    };

    this.submit = () => {
        if (this.frm_projectName === undefined) {
            this.status = "Fehler bei der Eingabe!";
        } else {
            this.status = "Ihr Projekt wurde erfolgreich erstellt!"

            let a = document.cookie.split(",");

            let b = a.indexOf("");

            let c = a[b].split(":");

            let parameter = JSON.stringify({
                projectName: "Bitte"
            });

            let url = "../../Backend/CreateProject.php";

            $http({
                method: 'POST',
                url: url,
                data: parameter
            }).then(
                (response) => {
                    console.log(response);
                    this.status = response.data.infotext;
                }, function (error) {
                    console.log(error);
                });
        }
    }
});