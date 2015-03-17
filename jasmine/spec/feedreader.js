/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined,
         * that the URL is a string and that it is not empty.
         */
        it('have URLs', function () {
            allFeeds.forEach(function (feed) {
                expect(feed['url']).toBeDefined();
                expect(typeof feed['url']).toBe('string');
                expect(feed['url']).not.toBe('');
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined,
         * that the name is a string and that it is not empty.
         */
        it('have names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed['name']).toBeDefined();
                expect(typeof feed['name']).toBe('string');
                expect(feed['name']).not.toBe('');
            });
        });
    });

    /*
     * Test suite for the visibility of the menu.
     */
    describe("The menu", function () {
        /*
         * A test that ensures the menu element is hidden by default.
         */
        it("is hidden by default", function () {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        /* A test that ensures the menu changes visibility
         * when the menu icon is clicked.
         */
        it("changes visibility when clicked", function () {
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(false);

            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    /*
     * Test suite for initial entries
     */
    describe('Initial Entries', function () {
        /*
         * We call loadFeed and pass the 'done' function as the 'cb' parameter.
         */
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, done);
        });

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are loaded', function () {
            expect($('.feed').find('.entry').length).not.toBe(0);
        });
    });

    /*
     * Test suite for new feed selection
     */
    describe('New Feed Selection', function (){
        var first_entry_before;

        /*
         * We load the first feed, save the first entry link,
         * then load the second feed.
         */
        beforeEach(function (done) {
            $('.feed').empty();
            loadFeed(0, function (){
                first_entry_before = $('.entry-link:first').attr('href');
                loadFeed(1, done);
            });
        });

        /*
         * A test to check that the first entry link has changed.
         */
        it('changes the first entry link', function () {
            expect($('.entry-link:first').attr('href')).not.toBe(first_entry_before);
        });
    });

}());
