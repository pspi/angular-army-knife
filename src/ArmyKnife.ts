/// <reference path='./directives/Expand.ts'/>

var ngArmyKnife = angular.module('ngArmyKnife', []);

ngArmyKnife.directive('ngArmyKnifeExpandSquare', ['$window', Expand.ExpandSquare]);
ngArmyKnife.directive('ngArmyKnifeExpand', ['$window', Expand.Expand]);
