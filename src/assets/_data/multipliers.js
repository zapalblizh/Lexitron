
/* [0, 3, 'lx2'] => 0 is row (1st row), 3 is column (4th column) and 'lx2' is the bonus designated as background color */
/* Use class later for checking what bonus a letter fell into */

export default [

    /* Letter x2 Bonus Coordinates */
    [0, 3, 'lx2'], [0, 11, 'lx2'],
    [2, 6, 'lx2'], [2, 8, 'lx2'],
    [3, 0, 'lx2'], [3, 7, 'lx2'], [3, 14, 'lx2'],
    [6, 2, 'lx2'], [6, 6, 'lx2'], [6, 8, 'lx2'],
    [7, 3, 'lx2'], [7, 11, 'lx2'],
    [8, 2, 'lx2'], [8, 6, 'lx2'], [8, 8, 'lx2'],
    [11, 0, 'lx2'], [11, 7, 'lx2'], [11, 14, 'lx2'],
    [12, 6, 'lx2'], [12, 8, 'lx2'],
    [14, 3, 'lx2'], [14, 11, 'lx2'],

    /* Letter x3 Bonus Coordinates */
    [1, 5, 'lx3'], [1, 9, 'lx3'],
    [5, 1, 'lx3'], [5, 5, 'lx3'], [5, 9, 'lx3'], [5, 13, 'lx3'],
    [9, 1, 'lx3'], [9, 5, 'lx3'], [9, 9, 'lx3'], [9, 13, 'lx3'],
    [13, 5, 'lx3'], [13, 9, 'lx3'],

    /* Word x2 Bonus Coordinates */
    [1, 1, 'wx2'], [1, 13, 'wx2'],
    [2, 2, 'wx2'], [2, 12, 'wx2'],
    [3, 3, 'wx2'], [3, 11, 'wx2'],
    [4, 4, 'wx2'], [4, 10, 'wx2'],
    [10, 4, 'wx2'], [10, 10, 'wx2'],
    [11, 3, 'wx2'], [11, 11, 'wx2'],
    [12, 2, 'wx2'], [12, 12, 'wx2'],
    [13, 1, 'wx2'], [13, 13, 'wx2'],

    /* Word x3 Bonus Coordinates */
    [0, 0, 'wx3'], [0, 7, 'wx3'], [0, 14, 'wx3'],
    [7, 0, 'wx3'], [7, 14, 'wx3'],
    [14, 0, 'wx3'], [14, 7, 'wx3'], [14, 14, 'wx3']
];
