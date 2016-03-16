(function(ext) {
    var current_user = 1;
    var current_post_id = 1;
    var api_base = '';
    var api_namespace = '';
    var api_endpoint = '';

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

    ext.start = function() {
      return true;
    };

    ext.say = function() {
        //idk what this do
    };

    ext.get_api_base = function() {
      return this.api_base;
    }
    
    ext.set_api_base = function(api_base, value) {
      this.api_base = value;
      //console.log('API base is: '+value);
    }

    ext.get_api_namespace = function() {
      return this.api_namespace;
    }

    ext.set_api_namespace = function(api_namespace, value) {
      this.api_namespace = value;
      //console.log('namespace is: '+value);
    }

    ext.get_site_title = function(callback) {
          // Make an AJAX call to the WordPress REST API for the site title
          //console.log('Getting site title');
          $.ajax({
                url: this.get_api_base(),
                dataType: 'json',
                success: function(ret){
                  callback(ret.name);
                }
          });
      };

     ext.get_site_description = function(callback) {
        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: this.get_api_base(),
              dataType: 'json',
              success: function(ret){
                callback(ret.description);
              }
        });
    };

    ext.get_wp_v2_data = function(callback){
       $.ajax({
              url: this.get_api_base() + this.get_api_namespace(),
              dataType: 'json',
              success: function(ret){
                console.log(ret);
                callback(ret);
              }
        });
    };

    ext.set_current_user = function(current_user, value){
      // this is a bit of a misnomer as "current user" is a wp term 
      // and implies authentication which is not yet built

      console.log('current user set to '+ value);
      this.current_user = value;
    }

    ext.get_current_user = function() {
      // console.log(this.current_user);
      return this.current_user;
    }

    ext.get_user = function(user_data, callback) {
      // console.log(user_data);
        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: this.get_api_base() + this.get_api_namespace() + '/users/' + this.get_current_user(),
              dataType: 'json',
              success: function(ret){
                // console.log(ret);
                callback(ret[user_data]);
              }
        });
    };

    ext.set_current_post_id = function(value) {
      console.log('current post set to '+ value);
      this.current_post_id = value;
    }

    ext.get_current_post_id = function() {
      // console.log(this.current_post);
      return this.current_post_id;
    }

    ext.get_post = function(post_data, callback) {
      // console.log(post_data);
        // Make an AJAX call to the WordPress REST API to get site description
        $.ajax({
              url: this.get_api_base() + this.get_api_namespace() + '/posts/' + this.get_current_post_id(),
              dataType: 'json',
              success: function(ret){
                // console.log(ret);
                switch (post_data) {
                  case "title": 
                  case "content":
                    callback(ret[post_data]['rendered']);
                  break;
                  default:
                    callback(ret[post_data]);
                  break;
                }
              }
        });
    };
    //im here

    // ext.get_next_post_id = function(callback) {
    //     // Make an AJAX call to the WordPress REST API to get site description
    //     $.ajax({
    //       url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts?per_page=1&page='+post_start+'',
    //       dataType: 'json',
    //       success: function(ret){
    //         console.log(ret);
    //         callback(ret[0]['id']);
    //       }
    //     });
    //   post_start++;
    // };

    // ext.get_post_ids = function(callback) {
    //   //handle pagination somehow???

    //   // Make an AJAX call to the WordPress REST API to get a collection of post ids
    //   $.ajax({
    //      url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/',
    //     dataType: 'json',
    //           success: function(ret){
    //             var post_ids = [];
    //             for (var i = ret.length - 1; i >= 0; i--) {
    //               post_ids.push(ret[i]['id']);
    //             };
    //             callback(post_ids);
    //           }
    //     });
    // };

    // ext.get_post_by_id = function(callback) {
    //       // @TODO handle pagination somehow???
    //       console.log(post_id);
    //     // Make an AJAX call to the WordPress REST API to get a collection of post ids
    //     $.ajax({
    //           url: 'http://rest-api-demo.q21.co/wp-json/wp/v2/posts/'+post_id+'',
    //           dataType: 'json',
    //           success: function(ret){
    //             console.log(ret);
    //             callback('yepp');
    //           }
    //     });
    // };


    // ext.set_post = function(post, value) {
    //   post_start = value;
    //   console.log('New "next post" is '+post_start);
    // }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['h', 'Enable WordPress REST API', 'start'],
            [' ', 'Set %m.api_base to %s', 'set_api_base', 'api_base', 'http://rest-api-demo.q21.co/wp-json/'],
            [' ', 'Set %m.api_base to %s', 'set_api_namespace', 'api_namespace', 'wp/v2'],
            [' ', 'Set %m.user_id to %n', 'set_current_user', 'current_user', '1'],
            [' ', 'Set current_post to %n', 'set_current_post_id', '1'],

            ['R', 'Site Title', 'get_site_title'],//new
            ['R', 'Site Description', 'get_site_description'],//new
            ['R', 'Log API Endpoint Data', 'get_wp_v2_data'],//new
            ['R', 'Get User %m.user_id', 'get_user', 'id'],//new
            ['R', 'Get Post %m.post_id', 'get_post', 'id'],

            // ['R', 'Get Post IDs', 'get_post_ids', 1],
            // ['R', 'Get Post by ID', 'get_post_by_id', 'post_now'],
            // ['R', 'Get Post', 'get_next_post_id', 'post_now'],
            // [' ', 'Set %m.post_pagination to %n', 'set_post', 'post_start', '1'],
            // [' ', 'Access', 'access_scratch_dataset'],

        ],
        menus : {
          post_pagination: ['post_next', 'post_previous'],
          api_base: ['api_base', 'api_namespace', 'api_endpoint'],
          user_id: ['id', 'name', 'description', 'avatar_urls'],
          post_id: ['id', 'date', 'title', 'content'],

        },
        url: 'http://rfair404.github.io/WP-REST-API-FOR-SCRATCHX' 
        // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('WORDPRESS-REST-API', descriptor, ext);
})({});
