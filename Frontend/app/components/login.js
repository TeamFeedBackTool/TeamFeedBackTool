app.component("login", {
    templateUrl: "components/login.html",
    controller: "LoginController"
});

app.controller("LoginController", function($http){
    this.submit = () => {
        if(this.frm_email === undefined){
            this.info = "Bitte überprüfen Sie ihre Email-Addresse";
        }else if(this.frm_password === undefined){
            this.info = "Ihr Passwort muss mindestens 6 Zeichen lang sein";
        }
        else {
            let parameter = JSON.stringify({
                email: this.frm_email,
                password: this.frm_password
            });
            let url = "../../Backend/LoginUser.php";

            $http({
                method: 'POST',
                url: url,
                data: parameter
            }).then(
                (response) => {
                    console.log(response);
                    this.info = response.data.infotext;
                    let statusCode = response.data.status;
                    if(statusCode === "201"){
                        $window.location.href = 'test.html';
                    }
                }, function (error) {
                    console.log(error);
                });
        }
    }
});