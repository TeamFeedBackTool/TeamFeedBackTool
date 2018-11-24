app.component("createProject", {
    templateUrl: "components/create-project.html",
    controller: "createProjectController"
});

app.controller("createProjectController", function($http){
    this.submit = () => {
        if(this.frm_projectName === undefined){
            this.status = "Fehler bei der Eingabe!";
        } else {
            this.status = "Ihr Projekt wurde erfolgreich erstellt!"

            let parameter = JSON.stringify({
                projectName: this.frm_projectName,

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