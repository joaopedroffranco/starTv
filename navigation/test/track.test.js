const Track = require('../track');

/* Constructor */
describe('creating track', function() {
    test('valid startindex', function() {
        const track = new Track(2, false);
        expect(track.index).toBe(2);
    });

    test('vertical', function() {
        const track = new Track(0, true);
        expect(track.vertical).toBeTruthy();
    });
});

describe('updating with elements', function() {
    const track = new Track(0, false);
    const expectGroupLenght = function(groups, expectLenght) {
        for (var i = 0, len = groups.length; i < len; i++) {
            const group = groups[i];
            expect(group.elements.length).toBe(expectLenght[i]);
        }
    }

    test('track with no groups', function() {
        track.update([[]]);
        expect(track.groups.length).toBe(1);
        expectGroupLenght(track.groups, [0]);
    });

    test('track with one groups', function() {
        track.update([[1, 2, 3]]);
        expect(track.groups.length).toBe(1);
        expectGroupLenght(track.groups, [3]);
    });

    test('track with two groups', function() {
        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        expect(track.groups.length).toBe(2);
        expectGroupLenght(track.groups, [3, 4]);
    });

    test('track with two groups, one is empty', function() {
        track.update([[1, 2, 3], []]);
        expect(track.groups.length).toBe(2);
        expectGroupLenght(track.groups, [3, 0]);
    });

    test('track starts with 2 groups and update for the same', function() {
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

    test('track starts with 2 groups and update for 2 groups, but less elements', function() {
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

    test('track starts with 2 groups, go to second group and update for 1 group', function() {
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

    test('track starts with 2 groups and update for 1 group', function() {
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

    test('track starts with 2 groups and update for no group', function() {
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

    test('track starts with 1 groups with 5 elements and update to same group, but 6 elements, and update to 5 elements again', function() {
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

    test('track starts in first group and last element', function() {
        const track = new Track(0, false, 2);
        track.update([[1, 2, 3], [1, 2, 3]]);
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(2);

        track.left();
        expect(track.index).toBe(0);
        expect(track.startGroupIndex).toBe(1);

        track.down();
        expect(track.index).toBe(1);
        expect(track.startGroupIndex).toBe(0);
    });
});

/* Up */
describe('up', function() {
    test('horizontal', function() {
        const track = new Track(0, false);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.up();

        expect(track.previous).toBeCalled();
    });

    test('vertical', function() {
        const track = new Track(0, true);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.up();

        expect(track.previous).not.toBeCalled();
    });
});

/* Down */
describe('down', function() {
    test('horizontal', function() {
        const track = new Track(0, false);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.down();

        expect(track.next).toBeCalled();
    });

    test('vertical', function() {
        const track = new Track(0, true);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.down();

        expect(track.next).not.toBeCalled();
    });
});

/* Left */
describe('left', function() {
    test('horizontal', function() {
        const track = new Track(0, false);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.left();

        expect(track.previous).not.toBeCalled();
    });

    test('vertical', function() {
        const track = new Track(0, true);
        track.previous = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.left();

        expect(track.previous).toBeCalled();
    });
});

/* Right */
describe('right', function() {
    test('horizontal', function() {
        const track = new Track(0, false);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.right();

        expect(track.next).not.toBeCalled();
    });

    test('vertical', function() {
        const track = new Track(0, true);
        track.next = jest.fn();

        track.update([[1, 2, 3], [1, 2, 3, 4]]);
        track.right();

        expect(track.next).toBeCalled();
    });
});

/* Next */
describe('next group', function() {
    test('track with 3 groups', function() {
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

    test('track with 1 group', function() {
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

    test('track with no group', function() {
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
describe('previous element', function() {
    test('track with 3 groups', function() {
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

    test('track with 1 group', function() {
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

    test('track with no group', function() {
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

/* First */
describe('checks if is a first track', function() {
    test('track with no group', function() {
        const track = new Track(0, false, 0);
        track.update([]);
        expect(track.isFirst()).toBeFalsy();
    });

    test('track with 2 group', function() {
        const track = new Track(0, false, 0);
        track.update([[1], [1]]);
        expect(track.isFirst()).toBeTruthy();

        track.down();
        expect(track.isFirst()).toBeFalsy();
    });
});

describe('checks if is a last track', function() {
    test('track with no group', function() {
        const track = new Track(0, false, 0);
        track.update([]);
        expect(track.isLast()).toBeFalsy();
    });

    test('track with 2 group', function() {
        const track = new Track(0, false, 0);
        track.update([[1], [1]]);
        expect(track.isLast()).toBeFalsy();

        track.down();
        expect(track.isLast()).toBeTruthy();
    });
});