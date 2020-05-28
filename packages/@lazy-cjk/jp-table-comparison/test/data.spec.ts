import teachKanjiComparison from '../lib/table/teachKanjiComparison';
import teachKanjiComparisonSafe from '../lib/table/teachKanjiComparison.safe';
import teachKanjiComparisonCache from '../lib/table/teachKanjiComparison.cache';
import teachKanjiComparisonCache2 from '../lib/table/teachKanjiComparison.cache2';

test(`teachKanjiComparison`, () =>
{

	expect(teachKanjiComparison).not.toStrictEqual(teachKanjiComparisonSafe);

});

test(`teachKanjiComparisonCache`, () =>
{

	expect(teachKanjiComparisonCache).not.toStrictEqual(teachKanjiComparisonCache2);

});
