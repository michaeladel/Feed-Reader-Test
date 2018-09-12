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


        /* loops through each feed in the allFeeds array 
            to ensures that it has a URL defined and that the URL is not empty.
         */
        it('has a URL defined and not empty', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* loops through each feed in the allFeeds array 
            to ensures that it has a name defined and that the name is not empty.
         */
        it('has a name defined and not empty', function() {
            for (var i = allFeeds.length - 1; i >= 0; i--) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    /* test suite  "The menu" 
    * This suite is all about the RSS eeds Menu */
    describe('The menu', function() {
        /* test the menu element to ensure that it is hidden by default.*/
        it('hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* test the menu element to ensures that it changes visibility when the menu icon is clicked. */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* test suite  "Initial Entries" 
    * This suite is all about the Entries in the container when loaded asynchronous*/
    describe('Initial Entries', function() {
        /* test that ensures when the loadFeed function is called, there is at least
         * a single .entry element within the .feed container
         */
         beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });
        it('there is at least a single entry element within the feed container', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* test suite  "New Feed Selection" 
    * This suite is all about changing Entries in the container every time loaded asynchronous*/
    describe('New Feed Selection', function() {
        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstEntry, secondEntry;
        beforeEach(function(done) {
            loadFeed(0, function(){
                firstEntry = $('.entry')[0].innerText;
                loadFeed(1, function(){
                    secondEntry = $('.entry')[0].innerText;
                    done();
                });
            });
        });
        it('when a new feed is loaded by the loadFeed function that the content actually changes', function(done) {
            expect(firstEntry===secondEntry).toBe(false);
            done();
        });
    });    

}());
