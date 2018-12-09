"use strict";

app.component("impressum", {
    templateUrl: "components/impressum.html",
    controller: "ImpressumController",
    bindings: {}
});


app.controller("ImpressumController", function ($log) {
    $log.debug("ImpressumController()");

});
