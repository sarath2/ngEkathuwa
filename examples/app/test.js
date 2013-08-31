/**
 * ekathuwa
 * @version v0.1.0 - 2013-08-30
 * @link https://github.com/sarath2
 * @author Sarath Ambegoda <sarath2mail@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('ngEkathuwa', ['ngRoute'])
    .run(function ($rootScope, $ekathuwa) {
    $rootScope.$ekathuwa = $ekathuwa;
})
    .provider('$ekathuwa', function () {
    this.$get = function ($compile, $rootScope, $document) {
        this.modal = function (op) {
            var d = {
                scope: $rootScope.$new(),
                controller: null,
                id: null,
                backdrop: true,
                keyboard: true,
                remote: false,
                modalClass: "fade",
                role: "dialog",
                contentStyle: "", //width:350px;heigth:400px;background-color:red;
                contentCustomSize: 0, //80%
                contentPreSize: "df", //df,sm,md,lg,fl
                contentTemplateURL: "",
                headerTemplate: "",
                headerMsg: "",
                headerClass: "modal-title",
                bodyTemplateURL: null,
                bodyTemplate: null,
                bodyMsg: "",
                bodyClass: "modal-body",
                footerTemplate: "",
                footerCloseBtn: true, //true,false
                footerSaveBtn: true //true,false
            };

            var c = '',
                s = '',
                t = '',
                h = '',
                b = '',
                f = '',
                fcb = '',
                fsb = '';
            op = angular.extend(d, op);
            //set contoller
            if (op.controller !== "" && op.controller !== null) {
                c = 'ng-controller=' + op.controller;
            }
            //set style
            if (op.style !== "" && op.style !== null) {
                s = op.style;
            } else {
                //set size
                if (op.customSize !== 0 && angular.isNumber(op.customSize) && op.customSize !== "" && op.customSize !== null) {
                    s = 'width: ' + op.customSize + '%;';
                } else {
                    switch (op.size) {
                    case "sm":
                        s = 'width:25%;';
                        break;
                    case "md":
                        s = 'width:50%;';
                        break;
                    case "lg":
                        s = 'width:75%;';
                        break;
                    case "fl":
                        s = 'width:100%;';
                        break;
                    default:
                        s = "";
                        break;
                    }
                }
            }

            //set Template
            if (op.templateURL !== "" && op.templateURL !== null) {
                t = '<div ' + c + ' class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div ng-include="\'' + op.templateURL + '\'"></div></div></div></div>';
            } else {
                //set title
                if (op.titleTemplate !== "" && op.titleTemplate !== null) {
                    h = op.titleTemplate;
                } else {
                    h = '<div class="modal-header"><button type="button" class="close" ng-click="$mClose()" aria-hidden="true">&times;</button><h4 class="' + op.titleClass + '">' + op.title + '</h4></div>';
                }
                //set body
                if (op.bodyTemplateURL !== "" && op.bodyTemplateURL !== null) {
                    b = '<div ng-include="\'' + op.bodyTemplateURL + '\'"></div>';
                } else {
                    if (op.bodyTemplate !== "" && op.bodyTemplate !== null) {
                        b = op.bodyTemplate;
                    } else {
                        b = '<div class="' + op.bodyClass + '">' + op.bodyMsg + '</div>';
                    }
                }
                //set footer
                if (op.footerTemplate !== '' && op.footerTemplate !== null) {
                    f = op.footerTemplate;
                } else {
                    if (op.footerCloseBtn) {
                        fcb = '<button type="button" class="btn btn-default" ng-click="$mClose()">Close</button>';
                    }
                    if (op.footerSaveBtn) {
                        fsb = '<button type="button" class="btn btn-primary">Save changes</button>';
                    }
                    f = '<div class="modal-footer">' + fcb + fsb + '</div>';
                }
                t = '<div ' + c + ' class="modal ' + op.modalClass + '" id=' + op.id + ' tabindex="-1" role="' + op.role + '" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content">' + h + b + f + '</div></div></div>';
            }


            var m = angular.element(t);
            var body = $document.find('body');
            body.append('<style>.modal-dialog {' + s + '}</style>');
            m.modal({
                backdrop: op.backdrop,
                keyboard: op.keyboard,
                remote: op.remote
            });
            m.modal('show');
            var sc = op.scope;
            sc.$mClose = function () {
                m.remove();
                m.modal('hide');
            };
            $compile(m)(sc);
        };
        return this;
    }
});

var t='',s='';
 t='<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade" id="myModal" style="display: none;">'+
    '<div class="modal-dialog">'+
        '<div class="modal-content">'+
            '<div class="modal-header">'+
                '<button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>'+
                '<h4 id="myModalLabel" class="modal-title">Modal Heading</h4>'+
            '</div>'+
            '<div class="modal-body">'+
                '<h4>Text in a modal</h4>'+
                '<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>'+
                '<h4>Popover in a modal</h4>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button data-dismiss="modal" class="btn btn-default" type="button">Close</button>'+
                '<button class="btn btn-primary" type="button">Save changes</button>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';
