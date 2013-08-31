/**
 * ekathuwa
 * @version v0.1.0 - 2013-08-31
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
    this.$get = function ($compile, $rootScope, $document, $timeout) {
        this.modal = function (op) {
            var d = {
                id: "ekathuwaModalID",
                scope: $rootScope.$new(),
                controller: null,
                backdrop: true,
                keyboard: true,
                remote: false,
                modalClass: "fade",
                role: "dialog",
                contentStyle: null, //width:350px;heigth:400px;background-color:red;
                contentCustomSize: 0, //80%
                contentPreSize: "df", //df,sm,md,lg,fl
                templateURL: null,
                templateHTML: null,
                bodyTemplateURL: null,
                bodyTemplate: null,
                header: true,
                headerTemplate: null,
                headerCloseBtn: true,
                footer: true,
                footerTemplate: null,
                footerCloseBtn: true,
                footerSaveBtn: false
            };
            var t = '',
                s = '',
                c = '',
                b = '',
                f = '',
                h = '';
            op = angular.extend(d, op);
            //set bootstrap's options
            var btOPs = {
                backdrop: op.backdrop,
                keyboard: op.keyboard,
                remote: op.remote
            };
            //set current modal dom selector
            var modSelector = "#" + op.id + " .modal";
            //Set controller
            c = op.controller ? 'ng-controller=' + op.controller : '';
            //set modal by temp URL
            if (op.templateURL !== null && op.templateURL !== '') {
                t = '<div ' + c + ' id="' + op.id + '" ng-include="\'' + op.templateURL + '\'"></div>';
            } else {
                var a = '<div ' + c + ' id="' + op.id + '">';
                //set modal by temp HTML
                if (op.templateHTML !== null && op.templateHTML !== '') {
                    t = a + op.templateHTML + '</div>';
                } else {
                    //set modal body by temp URL
                    if (op.bodyTemplateURL !== null && op.bodyTemplateURL !== '') {
                        b = '<div class="modal-body" ng-include="\'' + op.bodyTemplateURL + '\'"></div>';
                    } else {
                        //set modal body by temp HTML
                        if (op.bodyTemplate !== null && op.bodyTemplate !== '') {
                            b = '<div class="modal-body">' + op.bodyTemplate + '</div>';
                        } else {
                            b = '<div class="modal-body">Ekathuwa modal body.</div>';
                        }
                    }

                    //set modal header HTML
                    if (op.header) {
                        if (op.headerTemplate !== null && op.headerTemplate !== '') {
                            h = '<div class="modal-header">' + op.headerTemplate + '<div>';
                        } else {
                            //set modal default header
                            h = '<div class="modal-header"><button ng-if="' + op.headerCloseBtn + '" aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button><h4 id="myModalLabel" class="modal-title">Modal Heading</h4></div>';
                        }
                    }
                    //set modal footer HTML
                    if (op.footer) {
                        if (op.footerTemplate !== null && op.footerTemplate !== '') {
                            f = '<div class="modal-footer">' + op.footerTemplate + '<div>';
                        } else {
                            //set modal default footer
                            f = '<div class="modal-footer"><button ng-if="' + op.footerCloseBtn + '" data-dismiss="modal" class="btn btn-default" type="button">Close</button><button ng-if="' + op.footerSaveBtn + '" class="btn btn-primary" type="button">Save changes</button></div>';
                        }
                    }
                    t = a + '<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" class="modal fade" id="myModal" style="display: none;"><div class="modal-dialog"><div class="modal-content">' + h + b + f + '</div></div></div></div>';
                }
            }
            //set style
            if (op.contentStyle !== null && op.contentStyle !== '') {
                s = op.contentStyle;
            }
            if (op.contentCustomSize !== 0 && angular.isNumber(op.contentCustomSize) && op.contentCustomSize !== "" && op.contentCustomSize !== null) {
                s = s + ';width: ' + op.contentCustomSize + '%;';
            }
            switch (op.contentPreSize) {
            case "sm":
                s = s + ';width:25%;';
                break;
            case "md":
                s = s + ';width:50%;';
                break;
            case "lg":
                s = s + ';width:75%;';
                break;
            case "fl":
                s = s + ';width:100%;';
                break;
            default:
                break;
            }
            angular.element("#ekathuwaSt" + op.id).remove();
            angular.element('head').append('<style id="ekathuwaSt' + op.id + '">' + "#" + op.id + ' .modal-dialog {' + s + '}</style>');
            angular.element("#" + op.id).remove();
            var m = angular.element(t);
            var body = $document.find('body');
            body.append(m);
            $compile(m)(op.scope);
            if (op.templateURL !== null && op.templateURL !== '') {
                $timeout(function () {
                    angular.element(modSelector).modal(btOPs);
                }, 200);
            } else {
                angular.element(modSelector).modal(btOPs);
            }
        };
        return this;
    }
});
