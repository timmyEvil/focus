describe('unit testing focus', function () {
    'use strict';

    var $compile,
        $document,
        $rootScope;

    beforeEach(module('c.focus'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$document_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $document = _$document_;
        $rootScope = _$rootScope_;
    }));

    it('should focus on value === true', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile('<input c-focus-on="value">')($rootScope);
        angular.element($document[0].body).append(element);

        expect(element).not.toBeFocused();

        $rootScope.value = true;
        $rootScope.$digest();

        expect(element).toBeFocused();
    });
    
    it('should focus on expression hold', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile('<input c-focus-on="a && b">')($rootScope);
        angular.element($document[0].body).append(element);

        expect(element).not.toBeFocused();

        $rootScope.a = true;
        $rootScope.b = true;
        $rootScope.$digest();

        expect(element).toBeFocused();
    });
    
    it('should focus on function returns true', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile('<input c-focus-on="focusMe()">')($rootScope);
        angular.element($document[0].body).append(element);

        expect(element).not.toBeFocused();

        $rootScope.focusMe = function() {
            return true;
        };
        $rootScope.$digest();

        expect(element).toBeFocused();
    });
});
