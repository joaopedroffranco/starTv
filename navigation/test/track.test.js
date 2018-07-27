import Track from '../track';

/* Constructor */
describe('creating track', () => {
    test('valid startindex', () => {
        const track = new Track(2, false);
        expect(track).toEqual({
            index: 2,
            animated: false,
            vertical: false,
            startGroupIndex: 0
        });
    });

    test('animated', () => {
        const track = new Track(0, false, true);
        expect(track).toEqual({
            index: 0,
            animated: true,
            vertical: false,
            startGroupIndex: 0
        });
    });

    test('vertical', () => {
        const track = new Track(0, true);
        expect(track).toEqual({
            index: 0,
            animated: false,
            vertical: true,
            startGroupIndex: 0
        });
    });
});

describe('updating with elements', () => {
    const track = new Track(0, false);
    const expectGroupLenght = (groups, expectLenght) => {
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

    test('track starts with 2 groups and update for the same', () => {
        const track = new Track(0, false);
        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        track.right();

        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(1);

        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(1);

        track.right();
        expect(track.startGroupIndex).toBe(2);
    });

    test('track starts with 2 groups and update for 2 groups, but less elements', () => {
        const track = new Track(0, false);
        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        track.right();

        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(1);

        track.update([[1, 2], [1]]);
        expectGroupLenght(track.groups, [2, 1]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(0);

        track.right();
        expect(track.startGroupIndex).toBe(0);

        track.up();
        expect(track.index).toBe(0);
    });

    test('track starts with 2 groups, go to second group and update for 1 group', () => {
        const track = new Track(0, false);
        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        track.right();

        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(1);

        track.update([[1, 2, 3]]);
        expectGroupLenght(track.groups, [3]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(1);

        track.right();
        expect(track.startGroupIndex).toBe(1);

        track.right();
        expect(track.startGroupIndex).toBe(2);

        track.up();
        expect(track.index).toBe(0);
    });

    test('track starts with 2 groups and update for 1 group', () => {
        const track = new Track(0, false);
        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.right();

        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(1);

        track.update([[1, 2, 3]]);
        expectGroupLenght(track.groups, [3]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(1);

        track.right();
        expect(track.startGroupIndex).toBe(2);

        track.right();
        expect(track.startGroupIndex).toBe(2);

        track.down();
        expect(track.index).toBe(0);
    });

    test('track starts with 2 groups and update for no group', () => {
        const track = new Track(0, false);
        track.update([[1, 2], [1, 2, 3]]);
        expectGroupLenght(track.groups, [2, 3]);
        expect(track.groups.length).toBe(2);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        track.right();

        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(1);

        track.update([[]]);
        expectGroupLenght(track.groups, [0]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(1);

        track.right();
        expect(track.startGroupIndex).toBe(0);

        track.right();
        expect(track.startGroupIndex).toBe(0);

        track.up();
        expect(track.index).toBe(0);
    });

    test('track starts with 1 groups with 5 elements and update to same group, but 6 elements, and update to 5 elements again', () => {
        const track = new Track(0, true);
        track.update([[1, 2, 3, 4, 5]]);
        expectGroupLenght(track.groups, [5]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        track.down();
        track.down();
        track.down();
        track.down();
        track.down();

        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(4);

        track.update([[1, 2, 3, 4, 5, 6]]);
        expectGroupLenght(track.groups, [6]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(4);

        track.down();
        expect(track.startGroupIndex).toBe(5);

        track.update([[1, 2, 3, 4, 5]]);
        expectGroupLenght(track.groups, [5]);
        expect(track.groups.length).toBe(1);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(0);

        track.down();
        expect(track.startGroupIndex).toBe(1);
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
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(1);
        track.next();
        expect(track.index).toBe(2);
        track.next();
        expect(track.index).toBe(2);
    });

    test('track with 1 group', () => {
        const track = new Track(0, false)
        track.update([[1]]);
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
    });

    test('track with no group', () => {
        const track = new Track(0, false)
        track.update([[]]);
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
        track.next();
        expect(track.index).toBe(0);
    });
});

/* Previous */
describe('previous element', () => {
    test('track with 3 groups', () => {
        const track = new Track(0, false)
        track.update([[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
        track.previous();
        track.next();
        track.next();
        track.next();
        expect(track.index).toBe(2);
        track.previous();
        expect(track.index).toBe(1);
        track.previous();
        expect(track.index).toBe(0);
    });

    test('track with 1 group', () => {
        const track = new Track(0, false)
        track.update([1]);
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
    });

    test('track with no group', () => {
        const track = new Track(0, false)
        track.update([]);
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
        track.previous();
        expect(track.index).toBe(0);
    });
});