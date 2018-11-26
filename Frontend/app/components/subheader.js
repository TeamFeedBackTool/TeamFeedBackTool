"use strict";

app.component("subheader", {
    templateUrl: "components/subheader.html",
    controller: "SubheaderController",
    bindings: {
        whereAmI:"@"
    },
    transclude: true
});


app.controller("SubheaderController", function ($log) {
    $log.debug("SubheaderController()");

    this.$onInit = function() {
        this.whereAmI = this.whereAmI || 'Achtung: Sie tummeln sich auf einem unbekannten Pfad!';
    };

});
