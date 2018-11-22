app.component("register", {
    templateUrl: "components/register.html",
    controller: "RegisterController"
});

app.controller("RegisterController", function($http){
    this.status = "You have not submitted anything yet.";

    this.submit = () => {
        let parameter = JSON.stringify({email:this.frm_email,
                                        firstname:this.frm_firstname,
                                        surname:this.frm_surname,
                                        password:this.frm_password});
        let  url = "../../Backend/registerUser.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                console.log(response);
                this.status = response.data.infotext;
            },function (error){
                console.log(error);
            });
    }
});