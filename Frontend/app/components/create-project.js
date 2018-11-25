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

            let a = document.cookie.split(",");

            let b = a.indexOf("pk_userId:*");

            let c = a[b].split(":");

            let parameter = JSON.stringify({
                projectName: this.frm_projectName,
                fk_leaderId: c[1]
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