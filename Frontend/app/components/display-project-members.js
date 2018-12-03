"use strict";

app.component("displayProjectMembers", {
    templateUrl: "components/display-project-members.html",
    controller: "displayProjectMembersController",
    bindings: {
        currentUserShown: "@"
    }
});


app.controller("displayProjectMembersController", function ($log, $rootScope) {
    $log.debug("displayProjectMembersController()");

    this.$onInit = function () {
        this.currentUserShown = ''; // automatisch wird der erste user der versendet wird angezeigt
    };



});
