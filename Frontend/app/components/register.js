app.component("register", {
    templateUrl: "components/register.html",
    controller: "RegisterController"
});

app.controller("RegisterController", function($http){
    this.status = "Bitte Registrieren Sie sich";

    this.submit = () => {
        if(this.frm_email === undefined || this.frm_firstname === undefined || this.frm_surname === undefined || this.frm_password === undefined){
            this.status = "Fehler bei der Eingabe!";
        }else {
            this.status = "Sie wurden erfolgreich registriert!"

            let parameter = JSON.stringify({
                email: this.frm_email,
                firstname: this.frm_firstname,
                surname: this.frm_surname,
                password: this.frm_password
            });

            let url = "../../Backend/RegisterUser.php";

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