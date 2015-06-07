angular.module('ng-slick-input', [])


    .directive('ngSlickInput', function() {
        return {
            restrict: 'C',
            scope: {
                ngModel: '=',
                placeholder: '@'
            },
            controller: function($scope, $element) {

                console.log($scope.ngModel)

                $scope.container = angular.element('<div class="ng-slick-input-container"></div>');
                $element.after($scope.container);
                $scope.container.append($element);

                var defaults = {
                    placeholder: '',
                    animationDuration: 300
                };

                if ($scope.placeholder) {
                    defaults.placeholder = $scope.placeholder;
                    $element.removeAttr('placeholder');
                    $scope.placeholder = angular.element('<div class="ng-slick-input-placeholder">'+defaults.placeholder+'</div>');
                    $scope.container.append($scope.placeholder);
                }

                //if (attrs.animationDuration) {
                    //defaults.animationDuration = attrs.animationDuration;
                //}


                $scope.container.on('click', function() {
                    $element[0].focus();

                    animate.start();

                });

                $element.on('blur', function() {
                    if (!$scope.ngModel) {
                        animate.end();
                    }
                });

                var animate = {
                    start: function() {
                        console.log('start')
                        Velocity($scope.placeholder[0], {
                            top: '90%'
                        }, {
                            duration: 200,
                            easing: 'ease'
                        })
                    },
                    end: function() {
                        console.log('end')
                        Velocity($scope.placeholder[0], 'reverse');
                    }
                }

            }
        }
    });