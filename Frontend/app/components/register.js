app.component("register", {
    templateUrl: "components/register.html",
    controller: "RegisterController"
});

app.controller("RegisterController", function($http, $window){
    this.submit = () => {
        if(this.frm_email === undefined || this.frm_firstname === undefined || this.frm_surname === undefined || this.frm_password === undefined){
            this.info = "Fehler bei der Eingabe!";
        }else {
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