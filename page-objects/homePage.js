var homePageCommands = {
	fillInSearchField: function(query) {
		return this.setValue('@searchField', query);
	},
	clickSearchButton: function() {
		return this.click('@searchButton');
	}
};

module.exports = {
	commands: [homePageCommands],
	url: function() {
		return 'https://www.redfin.com'
	},
	elements: {
		searchField: {
			selector: '#search-box-input'
		},
		searchButton: {
			selector: 'button[data-rf-test-name="searchButton"]'
		}
	}
};