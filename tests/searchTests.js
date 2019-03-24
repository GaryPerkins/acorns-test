/**
Test to verify that a search result has the expected values provided to the search request

Had issues with getting dropdowns to work via nightwatch, tried a lot of different hacky ways
and even those weren't working. The way the dropdown select element is used is out of the ordinary, I would
typically collaborate with a developer who worked on this for clarity, but since this wasn't possible
I supplied the search terms via URL parameters. Not ideal, but using that was able to
successfully demonstrate verification of the returned data. The commented code is what should have worked
but did not given the strange setup of the dropdown elements, just wanted to show you my process
 */
var assert = require('assert');

module.exports = {
	'Search From Home Page': function(browser) {
		// init the two different pages used in this test
		var homePage = browser.page.homePage();
		var resultsPage = browser.page.resultsPage();

		// wait until we have all the relevant elements loaded
		homePage.navigate().waitForElementVisible('body', 1000);
		homePage.expect.element('@searchField').to.be.visible;
		homePage.expect.element('@searchButton').to.be.visible;

		// search for homes in Astoria
		var searchTerm = 'Astoria, New York';
		homePage
			.fillInSearchField(searchTerm)
			.clickSearchButton();

		// should now be on results page
		resultsPage.expect.element('@tableViewButton').to.be.visible;
		resultsPage.expect.element('@filtersButton').to.be.visible;
	},
	'Verify Search Results' : function(browser) {
		// define what we're looking for in a house
		var maxPrice = 1000000;
		var minBeds = 2;
		var minBaths = 2;

		var resultsPage = browser.page.resultsPage();

		// 	// set and apply our filters according to the above criteria
		// 	resultsPage
		// 		.clickFiltersButton()
		// 		.setMaxPrice(maxPrice)
		// 		.setMinBeds(minBeds)
		// 		.setBaths(minBaths);
		// 		.clickApplyFiltersButton()
		// 		.waitForElementVisible('@resultsList', 1000);

		// hardcoded URL params because selecting programatically is failing
		resultsPage.navigate().waitForElementVisible('body', 1000);
		resultsPage.expect.element('@tableViewButton').to.be.visible;

		// switch table view for simpler processing
		resultsPage.clickTableViewButton();

		resultsPage.waitForElementVisible('@resultsList', 1000);

		// now that we have our results list, grab the relevant data to verify
		var addressesResult, pricesResult, bedsResult, bathsResult;

		resultsPage.getResultAddresses(function(addresses) {
			addressesResult = addresses;
		});
		resultsPage.getResultPrices(function(prices) {
			pricesResult = prices;
		});
		resultsPage.getResultBeds(function(beds) {
			bedsResult = beds;
		});
		resultsPage.getResultBaths(function(baths) {
			bathsResult = baths;
		});

		// iterate through each of our relevant results and compare to expected value
		resultsPage
			.perform(function() {
				for(let i = 0; i < pricesResult.length; i++) {
					this.elementIdAttribute(addressesResult[i].ELEMENT, 'innerText', function(res) {
						console.log('------Verifying data for ' + res.value + '------')
					});
					this.elementIdAttribute(pricesResult[i].ELEMENT, 'innerText', function(res) {
						// get rid of currency sign and commas, leaving only the number for comparison
						var price = parseInt(res.value.replace(/[^0-9]+/g, ''));
						this.assert.ok(price <= maxPrice, 'Displayed price is ' + price + ' and was expected to be below ' + maxPrice);
					});
					this.elementIdAttribute(bedsResult[i].ELEMENT, 'innerText', function(res) {
						var beds = parseInt(res.value);
						this.assert.ok(beds >= minBeds, 'Number of beds is ' + beds + ' and was expected to be over ' + minBeds);

					});
					this.elementIdAttribute(bathsResult[i].ELEMENT, 'innerText', function(res) {
						var baths = parseInt(res.value);
						this.assert.ok(baths >= minBaths, 'Number of baths is ' + baths + ' and was expected to be over ' + minBaths);
					});
				}
			});
		browser.end();
	}
}