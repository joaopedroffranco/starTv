const Mosaic = require('../mosaic');

describe('updating with elements', function() {
    const mosaic = new Mosaic();
    const expectColumnLenght = function(mosaic, expectLenght) {
        for (var i = 0, len = mosaic.length; i < len; i++) {
            const line = mosaic[i];
            expect(line.length).toBe(expectLenght[i]);
        }
    }

    test('mosaic with no groups', function() {
        mosaic.update([[]]);
        expect(mosaic.elements.length).toBe(1);
        expectColumnLenght(mosaic.elements, [0]);
    });

    test('mosaic with one groups', function() {
        mosaic.update([[1, 2, 3]]);
        expect(mosaic.elements.length).toBe(1);
        expectColumnLenght(mosaic.elements, [3]);
    });

    test('mosaic with two groups', function() {
        mosaic.update([[1, 2, 3], [1, 2, 3, 4]]);
        expect(mosaic.elements.length).toBe(2);
        expectColumnLenght(mosaic.elements, [3, 4]);
    });

    test('mosaic with two groups, one is empty', function() {
        mosaic.update([[1, 2, 3], []]);
        expect(mosaic.elements.length).toBe(2);
        expectColumnLenght(mosaic.elements, [3, 0]);
    });

    test('squared', function() {
        const mosaic = new Mosaic();
        mosaic.update([[1, 2, 3], [1, 2, 3]]);
        mosaic.right();
        mosaic.right();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(0);

        mosaic.down();
        mosaic.right();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(1);

        mosaic.left();
        mosaic.up();
        expect(mosaic.y).toBe(1);
        expect(mosaic.x).toBe(0);
    });

    test('not squared less', function() {
        const mosaic = new Mosaic();
        mosaic.update([[1, 2, 3], [1, 2]]);
        mosaic.right();
        mosaic.right();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(0);

        mosaic.down();
        expect(mosaic.y).toBe(1);
        expect(mosaic.x).toBe(1);

        mosaic.up();
        expect(mosaic.y).toBe(1);
        expect(mosaic.x).toBe(0);
    });

    test('not squared more', function() {
        const mosaic = new Mosaic();
        mosaic.update([[1, 2, 3], [1, 2, 3, 4]]);
        mosaic.right();
        mosaic.right();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(0);

        mosaic.down();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(1);

        mosaic.right();
        expect(mosaic.y).toBe(3);
        expect(mosaic.x).toBe(1);

        mosaic.up();
        expect(mosaic.y).toBe(2);
        expect(mosaic.x).toBe(0);

        mosaic.left();
        expect(mosaic.y).toBe(1);
        expect(mosaic.x).toBe(0);
    });
});

/* Up */
describe('up', function() {
    test('up', function() {
        const mosaic = new Mosaic(false);

        mosaic.update([[1, 2, 3], [1, 2, 3]]);
        mosaic.up();
        expect(mosaic.x).toBe(0);

        mosaic.down();
        expect(mosaic.x).toBe(1);

        mosaic.up();
        expect(mosaic.x).toBe(0);
    });
});

/* Down */
describe('down', function() {
    test('down', function() {
        const mosaic = new Mosaic(false);

        mosaic.update([[1, 2, 3], [1, 2, 3]]);
        mosaic.down();
        expect(mosaic.x).toBe(1);
    });
});

/* Left */
describe('left', function() {
    test('left', function() {
        const mosaic = new Mosaic(false);

        mosaic.update([[1, 2, 3], [1, 2, 3]]);
        mosaic.left();
        expect(mosaic.y).toBe(0);

        mosaic.right();
        expect(mosaic.y).toBe(1);

        mosaic.left();
        expect(mosaic.y).toBe(0);
    });
});

/* Right */
describe('right', function() {
    test('right', function() {
        const mosaic = new Mosaic(false);

        mosaic.update([[1, 2, 3], [1, 2, 3]]);
        mosaic.right();
        expect(mosaic.y).toBe(1);
    });
});
