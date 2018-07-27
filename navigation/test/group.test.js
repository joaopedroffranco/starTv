import Group from '../group';

/* Constructor */
describe('creating group', () => {
    test('simple', () => {
        const group = new Group([]);
        expect(group).toEqual({
            index: 0,
            parent: null,
            animated: false,
            elements: []
        });
    });
    
    test('animated', () => {
        const group = new Group([], 0, true);
        expect(group).toEqual({
            index: 0,
            parent: null,
            animated: true,
            elements: []
        });
    });
});

/* Next */
describe('next element', () => {
    test('group of 3', () => {
        const group = new Group([1, 2, 3]);
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(1);
        group.next();
        expect(group.index).toBe(2);
        group.next();
        expect(group.index).toBe(2);
    });

    test('group of 1', () => {
        const group = new Group([1]);
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
        group.next();
        expect(group.index).toBe(0);
    });

    test('group of nothing', () => {
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
describe('previous element', () => {
    test('group of 3', () => {
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

    test('group of 1', () => {
        const group = new Group([1]);
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
        group.previous();
        expect(group.index).toBe(0);
    });

    test('group of nothing', () => {
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
describe('is first element', () => {
    test('group of 3', () => {
        const group = new Group([1, 2, 3]);
        expect(group.isFirstElement()).toBeTruthy();
        group.next();
        expect(group.isFirstElement()).toBeFalsy();
    });

    test('group of 1', () => {
        const group = new Group([1]);
        expect(group.isFirstElement()).toBeTruthy();
        group.next();
        expect(group.isFirstElement()).toBeTruthy();
    });

    test('group of nothing', () => {
        const group = new Group([]);
        expect(group.isFirstElement()).toBeFalsy();
        group.next();
        expect(group.isFirstElement()).toBeFalsy();
    });
});

/* isLast */
describe('is last element', () => {
    test('group of 3', () => {
        const group = new Group([1, 2, 3]);
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeTruthy();
    });

    test('group of 1', () => {
        const group = new Group([1]);
        expect(group.isLastElement()).toBeTruthy();
        group.next();
        expect(group.isLastElement()).toBeTruthy();
    });

    test('group of nothing', () => {
        const group = new Group([]);
        expect(group.isLastElement()).toBeFalsy();
        group.next();
        expect(group.isLastElement()).toBeFalsy();
    });
});