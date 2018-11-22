app.component("login", {
    templateUrl: "components/login.html",
    controller: "LoginController"
});

app.controller("LoginController", function($http){
    this.status = "Bitte loggen Sie sich ein!";

    this.submit = () => {
        if(this.frm_email === undefined || this.frm_password === undefined){
            this.status = "Fehler bei der Eingabe";
        }else {
            this.status = "Sie wurden erfolgreich angemeldet"

            let parameter = JSON.stringify({
                email: this.frm_email,
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