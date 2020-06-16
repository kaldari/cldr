'use strict';
{
	const assert = chai.assert;

	describe('cldrStForumFilter.createMenu', function() {
		it('should not return null', function() {
			cldrStForumFilter.setUserId(1);
			const actualOutput = cldrStForumFilter.createMenu(null);
			assert(actualOutput != null, "not null");
		});
	});

	describe('cldrStForumFilter.getFilteredThreadIds', function() {
		it('should return one thread for two related posts', function() {
			const posts = [
				{id: 1, parent: -1, poster: 100, locale: 'am'},
				{id: 2, parent: 1,  poster: 200, locale: 'am'},
			];
			const threadHash = cldrStForum.test.getThreadHash(posts);
			const actualOutput = cldrStForumFilter.getFilteredThreadIds(threadHash, false);
			const expectedOutput = ['am|1'];
			assert.deepEqual(actualOutput, expectedOutput);
		});
		it('should return one thread for three related posts', function() {
			const posts = [
				{id: 1, parent: -1, poster: 100, locale: 'zh'},
				{id: 2, parent: 1,  poster: 200, locale: 'zh'},
				{id: 3, parent: 2,  poster: 300, locale: 'zh'},
			];
			const threadHash = cldrStForum.test.getThreadHash(posts);
			const actualOutput = cldrStForumFilter.getFilteredThreadIds(threadHash, false);
			const expectedOutput = ['zh|1'];
			assert.deepEqual(actualOutput, expectedOutput);
		});
		it('should return two threads for two unrelated posts', function() {
			const posts = [
				{id: 1, parent: -1, poster: 100, locale: 'pt_PT'},
				{id: 2, parent: -1, poster: 200, locale: 'pt_PT'},
			];
			const threadHash = cldrStForum.test.getThreadHash(posts);
			const actualOutput = cldrStForumFilter.getFilteredThreadIds(threadHash, false);
			const expectedOutput = ['pt_PT|1', 'pt_PT|2'];
			assert.deepEqual(actualOutput, expectedOutput);
		});
	});
}