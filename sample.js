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

    // For information on writing Scratch extensions, see the ScratchX wiki:
    // https://github.com/LLK/scratchx/wiki#writing-extensions-for-scratchx
    ext.calendarSchedule = function() {
        // code to do something goes here
    };
	
	
    ext.whenSensorConnected = function(which) {
        return true;;
    };	
	
	ext.say = function() {
	
	};

	

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['h', 'when %m.booleanSensor', 'whenSensorConnected', 'button pressed'],
            [' ', 'Canendar Schedule', 'canendarSchedule'],
			['', 'Toby Say %n ', 'say', 'Hello, I am Toby ha ha ha ']

        ],
		menus: {
            booleanSensor: ['button pressed', 'A connected', 'B connected', 'C connected', 'D connected'],		
		},
        url: 'http://' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('TobyCode', descriptor, ext);
})({});