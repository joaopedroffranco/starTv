const Group = require('../group');

/* Constructor */
describe('creating group', function() {
    test('simple', function() {
        const group = new Group([]);
        expect(group.elements).toEqual([]);
    });
    
    test('animated', function() {
        const group = new Group([], 0, true);
        expect(group.animated).toBe(true);
    });
});

/* Next */
describe('next element', function() {
    test('group of 3', function() {
        const group = new Group([1, 2, 3]);
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(1);
        group.next();
        expect(group.index).toBe(2);
        group.next();
        expect(group.index).toBe(2);
    });

    test('group of 1', function() {
        const group = new Group([1]);
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
    });

    test('group of nothing', function() {
        const group = new Group([]);
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
    });
});

/* Previous */
describe('previous element', function() {
    test('group of 3', function() {
        const group = new Group([1, 2, 3]);
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        group.next();
        group.next();
        group.next();
        expect(group.index).toBe(2);
        group.previous();
        expect(group.index).toBe(1);
        group.previous();
        expect(group.index).toBe(0);
    });

    test('group of 1', function() {
        const group = new Group([1]);
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
    });

    test('group of nothing', function() {
        const group = new Group([]);
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
    });
});

/* isFirst */
describe('is first element', function() {
    test('group of 3', function() {
        const group = new Group([1, 2, 3]);
        expect(group.isFirstElement()).toBeTruthy();
        group.next();
        expect(group.isFirstElement()).toBeFalsy();
    });

    test('group of 1', function() {
        const group = new Group([1]);
        expect(group.isFirstElement()).toBeTruthy();
        group.next();
        expect(group.isFirstElement()).toBeTruthy();
    });

    test('group of nothing', function() {
        const group = new Group([]);
        expect(group.isFirstElement()).toBeFalsy();
        group.next();
        expect(group.isFirstElement()).toBeFalsy();
    });
});

/* isLast */
describe('is last element', function() {
    test('group of 3', function() {
        const group = new Group([1, 2, 3]);
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeTruthy();
    });

    test('group of 1', function() {
        const group = new Group([1]);
        expect(group.isLastElement()).toBeTruthy();
        group.next();
        expect(group.isLastElement()).toBeTruthy();
    });

    test('group of nothing', function() {
        const group = new Group([]);
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeFalsy();
    });
});