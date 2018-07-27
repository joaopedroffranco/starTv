const Track = '../track';

/* Constructor */
describe('creating track', () => {
    test('valid startindex', () => {
        const track = new Track({ groupIndex: 2, elementIndex: 1 }, false);
        expect(track).toEqual({
            startindex: { groupIndex: 2, elementIndex: 1 },
            vertical: false,
            animated: false
        });
    });
    
    test('invalid startindex (0)', () => {
        const track = new Track(0, false);
        expect(track).toEqual({
            startindex: { groupIndex: 0, elementIndex: 0 },
            vertical: false,
            animated: false
        });
    });

    test('invalid startindex (3)', () => {
        const track = new Track(3, false);
        expect(track).toEqual({
            startindex: { groupIndex: 0, elementIndex: 0 },
            vertical: false,
            animated: false
        });
    });

    test('animated', () => {
        const track = new Track(0, false, true);
        expect(track).toEqual({
            startindex: { groupIndex: 0, elementIndex: 0 },
            vertical: false,
            animated: true
        });
    });

    test('vertical', () => {
        const track = new Track(0, true);
        expect(track).toEqual({
            startindex: { groupIndex: 0, elementIndex: 0 },
            vertical: true,
            animated: false
        });
    });
});

describe('updating with elements', () => {
    const track = new Track(0, false);
    expectGroupLenght = (groups, expectLenght) => {
        groups.forEach((group, index) => {
            expect(group.elements.length).toBe(expectLenght[index]);
        });
    }

    test('track with no groups', () => {
        track.update([[]]);
        expect(track.groups.length).toBe(1);
        expectGroupLenght(track.groups, [0]);
    });

    test('track with one groups', () => {
        track.update([[1, 2, 3]]);
        expect(track.groups.length).toBe(1);
        expectGroupLenght(track.groups, [3]);
    });

    test('track with two groups', () => {
        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        expect(track.groups.length).toBe(2);
        expectGroupLenght(track.groups, [3, 4]);
    });

    test('track with two groups, one is empty', () => {
        track.update([[1, 2, 3], []]);
        expect(track.groups.length).toBe(2);
        expectGroupLenght(track.groups, [3, 0]);
    });
});

/* Up */
describe('up', () => {
    test('horizontal', () => {
        const track = new Track(0, false);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.up();

        expect(track.previous).toBeCalled();
    });

    test('vertical', () => {
        const track = new Track(0, true);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.up();

        expect(track.previous).not.toBeCalled();
    });
});

/* Down */
describe('down', () => {
    test('horizontal', () => {
        const track = new Track(0, false);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.down();

        expect(track.next).toBeCalled();
    });

    test('vertical', () => {
        const track = new Track(0, true);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.down();

        expect(track.next).not.toBeCalled();
    });
});

/* Left */
describe('left', () => {
    test('horizontal', () => {
        const track = new Track(0, false);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.left();

        expect(track.previous).not.toBeCalled();
    });

    test('vertical', () => {
        const track = new Track(0, true);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.left();

        expect(track.previous).toBeCalled();
    });
});

/* Right */
describe('right', () => {
    test('horizontal', () => {
        const track = new Track(0, false);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.right();

        expect(track.next).not.toBeCalled();
    });

    test('vertical', () => {
        const track = new Track(0, true);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.right();

        expect(track.next).toBeCalled();
    });
});

/* Next */
describe('next group', () => {
    test('track with 3 groups', () => {
        const track = new Track(0, false)
        track.update([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(1);
        track.next();
        expect(track.groupIndex).toBe(2);
        track.next();
        expect(track.groupIndex).toBe(2);
    });

    test('track with 1 group', () => {
        const track = new Track(0, false)
        track.update([[1]]);
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
    });

    test('track with no group', () => {
        const track = new Track(0, false)
        track.update([[]]);
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
        track.next();
        expect(track.groupIndex).toBe(0);
    });
});

/* Previous */
describe('previous element', () => {
    test('track with 3 groups', () => {
        const track = new Track(0, false)
        track.update([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
        track.previous();
        track.next();
        track.next();
        track.next();
        expect(track.groupIndex).toBe(2);
        track.previous();
        expect(track.groupIndex).toBe(1);
        track.previous();
        expect(track.groupIndex).toBe(0);
    });

    test('track with 1 group', () => {
        const track = new Track(0, false)
        track.update([1]);
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
    });

    test('track with no group', () => {
        const track = new Track(0, false)
        track.update([]);
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
        track.previous();
        expect(track.groupIndex).toBe(0);
    });
});