const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const rmw = require('../index');
const src = 'test';
const dir = 'dummy';
const dist = 'dist';
const code = 'const a = [];';
const html = '<html lang="en"><head><meta charset="utf-8"><script src="script.js"></script></head></html>';

test('Should properly read files', () => {
    const compareContent = (c, i) => Object.values(rmw(src, dir))[i].content === c;
    assert.ok([html, code].every(compareContent));
});

test('Should properly apply filter', () => {
    const filter = c => c.endsWith('.js');
    assert.ok(/^.*.js$/.test(Object.keys(rmw(src, dir, null, filter))[0]));
});

test('Should properly modify file content', () => {
    const filterHtml = c => c.endsWith('.html');
    const modify = c => c.replace('<script src="script.js"></script>', `<script>${code}</script`);
    assert.equal(Object.values(rmw(src, dir, null, filterHtml, modify))[0].content, modify(html));
});

test('Should properly copy files to destination folder', () => {
    rmw(src, dir, dist);
    assert.equal(fs.readdirSync(path.join(__dirname, '../', dist, dir)).join(), 'index.html,script.js');
});