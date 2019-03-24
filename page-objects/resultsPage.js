var resultsCommands = {
	clickTableViewButton: function() {
		return this.click('@tableViewButton');
	},
	clickFiltersButton: function() {
		return this.click('@filtersButton');
	},
	setMaxPrice: function(maxPrice) {
		return this.setValue('@maxPriceField', maxPrice);
	},
	setMinBeds: function(minBeds) {
		return this.setValue('@minBedsField', minBeds);
	},
	setBaths: function(baths) {
		return this.setValue('@bathsField', baths);
	},
	clickApplyFiltersButton: function() {
		return this.click('@applyFiltersButton');
	},
	getResultAddresses: function(callback) {
		// grab all of the rows' prices entry and pass to callback to process in test file
		this.api.elements('css selector', 'tr.tableRow > td.col_address', function(addresses) {
			callback(addresses.value);
		});
	},
	getResultPrices: function(callback) {
		// grab all of the rows' prices entry and pass to callback to process in test file
		this.api.elements('css selector', 'tr.tableRow > td.col_price', function(prices) {
			callback(prices.value);
		});
	},
	getResultBeds: function(callback) {
		this.api.elements('css selector', 'tr.tableRow > td.col_beds', function(beds) {
			callback(beds.value);
		});
	},
	getResultBaths: function(callback) {
		this.api.elements('css selector', 'tr.tableRow > td.col_baths', function(baths) {
			callback(baths.value);
		});
	}
};

module.exports = {
	commands: [resultsCommands],
	url: function() {
		// typical way of selecting from dropdowns not functioning, get around it by supplying values via URL params
		return 'https://www.redfin.com/neighborhood/30331/NY/New-York/Astoria/filter/max-price=1M,min-beds=2,min-baths=2';
	},
	elements: {
		tableViewButton: {
			selector: 'span.modeOptionInnard.table'
		},
		filtersButton: {
			selector: '#wideSidepaneFilterButtonContainer > button'
		},
		maxPriceField: {
			selector: 'span.maxPrice'
		},
		maxPriceOption: {
			selector: 'select[name="maxPrice"]'
		},
		minBedsField: {
			selector: 'select[name="minBeds"]'
		},
		bathsField: {
			selector: 'select[name="baths"]'
		},
		applyFiltersButton: {
			selector: 'button[data-rf-test-id="apply-search-options"]'
		},
		resultsList: {
			selector: 'tbody.tableList'
		}
	}
};