'use strict';

angular.module('ekathuwaApp')
    .controller('MainCtrl', function ($scope, $ekathuwa) {
    $scope.ekathuwaModalBasic = function () {
        $ekathuwa.modal({
            id: "ekathuwaModalBasicId"
        });
    }
    $scope.ekathuwaModalStyle = function () {
        $ekathuwa.modal({
            id: "ekathuwaModalTempId",
            scope: $scope,
            templateURL: "./views/modal-template.html",
            contentStyle: "width:350px;heigth:400px;background-color:#1b78f7;",
            contentCustomSize: 80,
            contentPreSize: "fl"
        });
    }
    $scope.ekathuwaModalTemp = function () {
        $ekathuwa.modal({
            id: "ekathuwaModalTempId",
            scope: $scope,
            templateURL: "./views/modal-template.html"
        });
    }
    $scope.ekathuwaModalTempHTML = function () {
        $ekathuwa.modal({
            id: "ekathuwaTemlHTMLId",
            scope: $scope,
            contentPreSize: "fl",
            templateHTML: '<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade" id="ekathuwaTemlHTMLId" style="display: none;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button><h4 id="myModalLabel" class="modal-title">Ekathuwa Modal Heading</h4></div><div class="modal-body"><h4>Ekathuwa modal body.</h4><button class="btn btn-warning" ng-click="btnMsgFromCntl()">Get Message</button><div class="modal-footer"><button data-dismiss="modal" class="btn btn-default" type="button">Close</button><button class="btn btn-primary" type="button">Save changes</button></div></div></div></div>'
        });
    }
    $scope.ekathuwaModalBodyTempURL = function () {
        $ekathuwa.modal({
            id: "ekathuwaBodyTempLId",
            scope: $scope,
            bodyTemplateURL: './views/modal-template-body.html'
        });
    }

    $scope.btnMsgFromCntl = function () {
        alert('How about Ekathuwa Modal Service?');
    };
});
