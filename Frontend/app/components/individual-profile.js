app.component("individualProfile", {
    templateUrl: "components/individual-profile.html",
    controller: "IndividualProfileController"
});


app.controller("IndividualProfileController", function ($http) {
    let url = "../../Backend/IndividualProfile.php";

    $http({
        method: 'POST',
        url: url
    }).then(
        (response) => {
            console.log(response);
            this.email = response.data.email;
            this.firstname = response.data.firstname;
            this.surname = response.data.surname;
        }, function (error) {
            console.log(error);
        });

    this.submitFirstname = () => {
        if(this.frm_firstname === undefined){
            this.infoFirstname = "Bitte überprüfen Sie ihre Eingabe";
        }
        else {
            let parameter = JSON.stringify({
                firstname: this.frm_firstname,
            });
            let url = "../../Backend/ChangeFirstname.php";

            $http({
                method: 'POST',
                url: url,
                data: parameter
            }).then(
                (response) => {
                    console.log(response);
                    this.infoFirstname = response.data.infotext;
                    this.firstname = this.frm_firstname;
                }, function (error) {
                    console.log(error);
                });
        }
    };

    this.submitSurname = () => {
        if(this.frm_surname === undefined){
            this.infoSurname = "Bitte überprüfen Sie ihre Eingabe";
        }
        else {
            let parameter = JSON.stringify({
                surname: this.frm_surname,
            });
            let url = "../../Backend/ChangeSurname.php";

            $http({
                method: 'POST',
                url: url,
                data: parameter
            }).then(
                (response) => {
                    console.log(response);
                    this.infoSurname = response.data.infotext;
                    this.surname = this.frm_surname;
                }, function (error) {
                    console.log(error);
                });
        }
    }

    this.submitPassword = () => {
        if(this.frm_oldpassword === undefined || this.frm_newpassword === undefined){
            this.infoPassword = "Bitte überprüfen Sie ihre Eingabe";
        }else if(this.frm_newpassword !== this.frm_passwordcheck){
            this.infoPassword = "Ihre neuen Passwörter stimmen nicht überein"
        }else if(this.frm_oldpassword === this.frm_newpassword){
            this.infoPassword = "Ihr neues Passwort unterscheidet sich nicht vom alten Passwort"
        }
        else {
            let parameter = JSON.stringify({
                oldPassword: this.frm_oldpassword,
                newPassword: this.frm_newpassword
            });
            let url = "../../Backend/ChangePassword.php";

            $http({
                method: 'POST',
                url: url,
                data: parameter
            }).then(
                (response) => {
                    console.log(response);
                    this.infoPassword = response.data.infotext;
                }, function (error) {
                    console.log(error);
                });
        }
    }
});