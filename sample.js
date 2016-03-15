(function(ext) {

    var post_start = 1;
    var post_next = 1;
    var post_previous = 1;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
    };

    // Status reporting code
    // Return any message to be displayed as a tooltip.
    // Status values: 0 = error (red), 1 = warning (yellow), 2 = ready (green)
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.callback = function( value ){
        return value;
    };

   ext.get_title = function(callback) {
          // Make an AJAX call to the WordPress REST API for the site title
          $.ajax({
                url: 'http://rest-api-demo.q21.co/wp-json/',
                dataType: 'json',
               // jsonp:false, // make it to false, to use your function on JSON RESPONSE
               //  jsonpCallback: 'response',
                success: function(ret){
                  callback(ret.name);
                }


          });
      };

     ext.get_description = function(callback) {
        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             //  jsonpCallback: 'response',
              success: function(ret){
                callback(ret.description);
              }


        });
    };

         ext.get_next_post_id = function(callback) {
          console.log('next posts please');
            // Make an AJAX call to the WordPress REST API to get site description
            $.ajax({
                  url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts?per_page=1&page='+post_start+'',
                  dataType: 'json',
                 // jsonp:false, // make it to false, to use your function on JSON RESPONSE
                 //  jsonpCallback: 'response',
                  success: function(ret){
                    console.log(ret);
                    callback(ret[0]['id']);
                  }
            });
            post_start++;
        };

         ext.get_post_ids = function(callback) {
          //handle pagination somehow???

        // Make an AJAX call to the WordPress REST API to get a collection of post ids
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             // jsonpCallback: 'response',

              success: function(ret){
                var post_ids = [];

                for (var i = ret.length - 1; i >= 0; i--) {
                  post_ids.push(ret[i]['id']);
                };
              callback(post_ids);
              }
        });
        // postcounter_scratchx = postcounter_scratchx + 1;
    };
    ext.get_post_by_id = function(callback) {
          //handle pagination somehow???
          console.log(post_id);
        // Make an AJAX call to the WordPress REST API to get a collection of post ids
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/'+post_id+'',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             // jsonpCallback: 'response',

              success: function(ret){
                console.log(ret);
                callback('yepp');
              }
        });
        // postcounter_scratchx = postcounter_scratchx + 1;
    };


    ext.set_post = function(post, value) {
      // console.log(post);
      // console.log(value);
      post_now = value;
      console.log('new post value is '+post_now);
    }

         ext.get_user = function(callback) {

        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/user/1',
              dataType: 'json',
             // jsonp:false, // make it to false, to use your function on JSON RESPONSE
             //  jsonpCallback: 'response',
              success: function(ret){
                callback(ret.description);
              }


        });
    };

     ext.access_scratch_dataset = function(data, callback) {
        // console.log(data);
        // console.log(callback);
        // console.log(getVar(foo));

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
            ['R', 'Site Title', 'get_title'],
            ['R', 'Site Description', 'get_description'],
            ['R', '!ALL POST', 'get_posts'],
            ['R', 'Get Post IDs', 'get_post_ids', 1],
            ['R', 'Get Post by ID', 'get_post_by_id', 'post_now'],
            ['R', 'Next Post', 'get_next_post_id', 'post_now'],
            [' ', 'Set %m.post_pagination to %n', 'set_post', 'post_now', '1'],
            // [' ', 'Access', 'access_scratch_dataset'],

        ],
        menus : {
          post_pagination: ['post_next', 'post_previous'],
        },
        url: 'http://rfair404.github.io/WP-REST-API-FOR-SCRATCHX' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('WORDPRESS-REST-API', descriptor, ext);
})({});
