/// <reference path='./directives/Square.ts'/>

var ngArmyKnife = angular.module('ngArmyKnife');

ngArmyKnife.directive('ngArmyKnifeSquare', ['$window', Square.Directive]);
