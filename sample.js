(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
    };

    // Status reporting code
    // Return any message to be displayed as a tooltip.
    // Status values: 0 = error (red), 1 = warning (yellow), 2 = ready (green)
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // site info callback
    ext.getSiteInfo = function() {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };


	ext.start = function() {
		return true;
	};

	ext.say = function() {

	};

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // ['h', 'WordPress REST API Site ', 'start'],
            ['R', 'Connect to demo site via REST API', 'getSiteInfo'],
            // ['', 'Russell Say %n ', 'say', 'Hello, I am Toby']
            // ['', 'Russell Say %n ', 'say', 'Hello, I am Toby']
        ],
        url: 'http://' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('WORDPRESS-REST-API', descriptor, ext);
})({});
