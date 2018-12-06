app.factory("Userdata", function() {

    function Userdata(id, firstname, surname) {
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
    }

    return Userdata;

});