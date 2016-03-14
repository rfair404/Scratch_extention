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
        // Make an AJAX call to the WordPress REST API
        // site = $.ajax({
        //       url: 'http://rest-api-demo.q21.co/wp-json/',
        //       // dataType: 'jsonp',
        //       success: function( response ) {
        //         console.log( response );
        //         // Got the data - parse it and return the temperature
        //       }
        // });
        // console.log(site);
        // return site;
    };

 ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/',
              dataType: 'json',
             jsonp:false, // make it to false, to use your function on JSON RESPONSE
              jsonpCallback: 'response',
              success: function(ret){
                console.log(ret);
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
            ['h', 'Enable WordPress REST API', 'start'],
            ['R', 'Get Site Title', 'get_temp', 'Atlanta, GA']
        ],
        url: 'http://rfair404.github.io/WP-REST-API-FOR-SCRATCHX' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('WORDPRESS-REST-API', descriptor, ext);
})({});
