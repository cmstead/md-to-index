import { readFileSync } from 'fs';
import { readFrontMatterValuesFromPaths } from '../index.js';
import { expect } from 'chai';

describe('read front matter values from paths', function () {
    it('reads values from front matter, or returns appropriate error', async function () {
        const paths = [
            './tests/fixtures/md-with-front-matter.md',
            './tests/fixtures/md-without-front-matter.md',
            './tests/fixtures/md-with-bad-front-matter.md',
        ];

        const response = await readFrontMatterValuesFromPaths(paths);
        
        const expectedResult = readFileSync('./tests/gold-masters/readFrontMatterValuesFromPaths.json', 'utf8');
        const result = JSON.stringify(response, null, 4)

        expect(result).to.equal(expectedResult)
    });
});