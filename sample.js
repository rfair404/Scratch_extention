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
    ext.doSomething = function() {
        // code to do something goes here
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'do something', 'doSomething']
			['h', 'when device is connected', 'whenConnected'],
			[' ', 'connect %m.hwOut to pin %n', 'connectHW', 'led A', 3],
			[' ', 'connect %m.hwIn to analog %n', 'connectHW', 'rotation knob', 0],
			['-'],
			[' ', 'set %m.leds %m.outputs', 'digitalLED', 'led A', 'on'],
			[' ', 'set %m.leds brightness to %n%', 'setLED', 'led A', 100],
			[' ', 'change %m.leds brightness by %n%', 'changeLED', 'led A', 20],
			['-'],
			[' ', 'rotate %m.servos to %n degrees', 'rotateServo', 'servo A', 180],
			[' ', 'rotate %m.servos by %n degrees', 'changeServo', 'servo A', 20],
        ],
        url: 'http://' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);
})({});