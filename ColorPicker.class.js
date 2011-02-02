// ColorPicker

// By:          http://www.colourlovers.com/
// Author:      Chris Williams - http://www.colourlovers.com/about#chris-williams
// Version:     1.0.1
// Requires:    Prototype 1.6+ [http://www.prototypejs.org/] and script.aculo.us 1.8+ [http://script.aculo.us/] -- only the "effects", "builder" and "dragdrop" modules are needed
// License:     http://creativecommons.org/licenses/by-sa/3.0/us/
// Tested:      Firefox 3.5 - 3.6, Safari 4.0, Opera 10, Chrome 3.0 - 4.0, Internet Explorer 8

/*  FEEL FREE TO REMOVE THIS...

    // NOTES //
    - All colors expressed in the script [except for Hex values] are in decimal form, from 0 to 1.
      So, the hex value "ffee00" would be expressed like so:
      RGB: 1,0.9333,0
      HSV: 0.1555,1,1

    - The Hex, RGB and HSV text inputs can be adjusted with the up down arrows on the keyboard. Hold the Shift key to make it go faster.

    // USAGE //
    _ColorPicker = new CL.ColorPicker({
        _uiImageURL:             "http://static.yoursite.com/images/colorpicker/1.0/ui.png", // REQUIRED
        _mode:                   "floating",                                                 // OPTIONAL: "embedded" or "floating", default is "floating"
        _draggable:              true,                                                       // OPTIONAL: true or false, default is true
        _initDisplay:            "none",                                                     // OPTIONAL: "block" or "none", default is "none"
        _position:               "none",                                                     // OPTIONAL: "absolute" or "relative", default is "absolute"
        _embeddedContainerID:    "color-picker-container",                                   // OPTIONAL: a valid DOM element ID, for embedded use. This is the element where ColorPicker will appear, default "color-picker-container" when _mode === "embedded"
        _appName:                "whatever-you-want",                                        // OPTIONAL: [a-zA-Z_][a-zA-Z0-9_]* ... should be a valid DOM id
        _hideOnOutsideMouseDown: true,                                                       // OPTIONAL: true or false, default is true. When true, the ColorPicker will hide when the user clicks on an element outside of the picker or elements defined using registerRelatedElement()
        onReady:                 function (_event) {}                                        // OPTIONAL: a callback event which is fired once the picker becomes ready
    });

    - Setting _mode to "floating" assumes these default settings:
      _draggable              = true;
      _initDisplay            = "none";
      _embeddedContainerID    = "";
      _position               = "absolute";
      _hideOnOutsideMouseDown = true;

    - Setting _mode to "embedded" assumes these default settings:
      _draggable              = false;
      _initDisplay            = "block";
      _embeddedContainerID    = "color-picker-container";
      _position               = "relative";
      _hideOnOutsideMouseDown = false;

    // METHODS //

    // Set Color:
    _ColorPicker.setColor("rgb",[1,0.9333,0]); // RGB, each value from 0 to 1
    _ColorPicker.setColor("hsv",[0.1555,1,1]); // HSV, each value from 0 to 1
    _ColorPicker.setColor("hex","ffee00");     // HEX

    // Show picker:
    _ColorPicker.show();                           // Shows at the last position it was in before hidden, or [0,0] if never shown.
    _ColorPicker.show(200,300);                    // Shows at [200,300]
    _ColorPicker.showAtClickEvent(_event);         // Shows where the _event took place *
    _ColorPicker.showAtClickEvent(_event,200,100); // Shows where the _event took place * and bias the coordinates by [200,100]

    // Hide picker:
    _ColorPicker.hide();

    // PROPERTIES //
    _ColorPicker._status: (initializing|hidden|appearing|visible) // "initializing": initial status, picker not ready. "hidden": picker ready, not visible. "appearing": picker is fading in. "visible": picker ready, shown on screen

    // CALLBACKS //
    There are callbacks set up for the following events:
    - change:       called each time the value of the picker is changed
    - change-start: called when the user starts to change the value of the picker [the very first "change" to the picker] -- For drag events only!
    - change-end:   called when the user is done changing the value of the picker [the very last "change" to the picker] -- For drag events only!
    - move:         called when the picker has been moved on the screen
    - move-start:   called when the user starts to change the position of the picker [they've begun dragging the picker]
    - move-end:     called when the user is done changing the position of the picker [they're done dragging the picker]
    - show:         called when the picker has been shown
    - hide:         called when the picker has been hidden

    These callbacks return these values as the first parameter:
    - change:       {_hex: "ffee00",_rgb: [1,0.9333,0],_hsv: [0.1555,1,1]}
    - change-start: {_hex: "ffee00",_rgb: [1,0.9333,0],_hsv: [0.1555,1,1]}
    - change-end:   {_hex: "ffee00",_rgb: [1,0.9333,0],_hsv: [0.1555,1,1]}
    - move:         {_x: 0,_y: 0}
    - move-start:   {_x: 0,_y: 0}
    - move-end:     {_x: 0,_y: 0}
    - show:         {_x: 0,_y: 0}
    - hide:         {_x: 0,_y: 0}

    Registering Callbacks:
    <code>
        MyClass = Class.create({
            initialize: function() {
                _ColorPicker = new CL.ColorPicker();
                var _callbackIndex = _ColorPicker.registerCallback("change",this.onChange.bind(this));
                _ColorPicker.show(200,300);
            },

            onChange: function(_colorPickerData) {
                alert("Hex value: " + _colorPickerData._hex);
                alert("RGB value: " + Math.round(_colorPickerData._rgb[0] * 255) + "," + Math.round(_colorPickerData._rgb[1] * 255) + "," + Math.round(_colorPickerData._rgb[2] * 255));
                alert("HSV value: " + Math.round(_colorPickerData._hsv[0] * 360) + "," + Math.round(_colorPickerData._hsv[1] * 100) + "," + Math.round(_colorPickerData._hsv[2] * 100));

                $("some-element").style.backgroundColor  = ("#" + _colorPickerData._hex);
                $("some-other-element").value            = ("#" + _colorPickerData._hex);
            }
        });
    </code>

    Removing Callbacks:
    <code>
        _ColorPicker = new CL.ColorPicker();
        var _callbackIndex = _ColorPicker.registerCallback("change",this.onChange.bind(this));
        _ColorPicker.removeCallback("change",_callbackIndex); // To remove just _callbackIndex
        _ColorPicker.removeCallback("change"); // To remove all "change" callbacks
    </code>

    * The event passed should be the same event captured by the event listener you had set up to call _ColorPicker.showAtClickEvent(), i.e.
    <code>
        Event.observe($("my-cool-div"),"click",function(_event) {
            alert("You clicked on my cool div! Here's the color picker!");
            _ColorPicker.showAtClickEvent(_event,10,-5); // show color picker relative to the click event and move it 10px to the right, and up 5px.
        }.bind(this));
    </code>
*/

if (typeof CL === "undefined") {
	var CL = {};
}

CL.ColorPicker = Class.create({
	initialize: function(_args) {
		this._colorPickerVersion			= "1.0";
		this._instanceID					= 0;
		this._status						= "initializing";
		this._squarePickerHandle			= {};
		this._huePickerHandle				= {};
		this._satPickerHandle				= {};
		this._valPickerHandle				= {};
		this._colorValue					= {_hsv: [0.0,0.0,0.0],_rgb: [0.0,0.0,0.0],_hex: ""};
		this._limits						= {_hex: [0,16777215],_r: [0,255],_g: [0,255],_b: [0,255],_h: [0,360],_s: [0,100],_v: [0,100]};
		this._lastMouseDownTime				= 0;
		this._lastKeyDownTime				= 0;
		this._lastKeyDownEventCheckTime		= 0;
		this._lastMouseEventCheckTime		= 0;
		this._lastKeyboardEventCheckTime	= 0;
		this._zIndex						= 2147483600;
		this._callbacks						= {"change": [],"change-start": [],"change-end": [],"move": [],"move-start": [],"move-end": [],"show": [],"hide": []};
		this._relatedElements				= [];
		this._lastHsvValue					= [];
		this._ui							= {_pickerCumulativeOffset: {left: 0,top: 0}};
		this._instanceID					= (new Date()).getTime().toString() + Math.floor(Math.random() * 1000000).toString();
		this._position						= "absolute";
		this._hideOnOutsideMouseDown		= true;

		_args		= _args || {};
		this._mode	= _args._mode || "floating";
		if (this._mode === "floating") {
			this._isDraggable				= true;
			this._initDisplay				= "none";
			this._embeddedContainerID		= "";
			this._position					= "absolute";
			this._hideOnOutsideMouseDown	= true;
		} else if (this._mode === "embedded") {
			this._isDraggable				= false;
			this._initDisplay				= "block";
			this._embeddedContainerID		= "color-picker-container";
			this._position					= "relative";
			this._hideOnOutsideMouseDown	= false;
		}
		this._isDraggable				= ((_args._draggable === undefined) ? this._isDraggable : !!_args._draggable);
		this._initDisplay				= _args._initDisplay || this._initDisplay;
		this._uiImageURL				= _args._uiImageURL || "";
		this._appName					= _args._appName || "COLOURlovers_ColorPicker";
		this._embeddedContainerID		= _args._embeddedContainerID || this._embeddedContainerID;
		this._position					= _args._position || this._position;
		this._hideOnOutsideMouseDown	= (_args._hideOnOutsideMouseDown !== undefined) ? _args._hideOnOutsideMouseDown : this._hideOnOutsideMouseDown;
		this.onReady					= _args.onReady || Prototype.emptyFunction;
		this._containerID				= (this._appName + "_instance_" + this._instanceID.toString());
		(new Image()).src				= this._uiImageURL; // Pre-load, please

		document.observe("mousedown",this.mouseDown.bind(this));

		document.observe("mouseup",function(_event) {
			if (this._status === "visible") {
				if (this._lastMouseEventCheckTime > 0) {
					this._lastMouseEventCheckTime = 0;
					this.changeEndEventHandler();
				}
			}
		}.bind(this));

		// This syncs _lastMouseEventCheckTime for events triggered by an ondblclick event
		document.observe("dblclick",function(_event) {
			if (this._status === "visible") {
				if (this._lastMouseEventCheckTime > 0) {
					this._lastMouseEventCheckTime = 0;
					this.changeEndEventHandler();
				}
			}
		}.bind(this));

		document.observe("keyup",function(_event) {
			if ((this._status === "visible") && ([38,40].indexOf(_event.keyCode) !== -1)) {
				if (this._lastKeyboardEventCheckTime > 0) {
					this.keyboardChangeEndHandler();
				}
			}
		}.bind(this));

		document.observe("dom:loaded",function(_event) {
			var _uiZIndex			= ++this._zIndex;
			var _pickerZIndex		= ++this._zIndex;

			var _defaultStyles		= "clear:none;border:0 none;overflow:hidden;outline:0;top:0;left:0;right:0;bottom:0;visibility:visible;max-width:none;min-width:none;max-height:none;min-height:none;";

			var _inputTextStyles	= _defaultStyles + "font: normal normal normal 11px/11px sans-serif;text-align:center;color:#000000;cursor:text;background:transparent;display:block;float:left;";
			_inputTextStyles		+= "letter-spacing:normal;padding:0;position:static;text-transform:uppercase;text-decoration:none;text-indent:0;text-justify:auto;text-shadow:none;white-space:normal;word-spacing:normal;";

			if (document.all) { // I love you *SO MUCH*, IE
				_inputTextStyles += "padding-top: 2px;";
			}

			var _ui = Builder.node("div",{id: this._containerID,style: (_defaultStyles + "z-index:" + _uiZIndex.toString() + ";display:none;width:382px;height:349px;margin:0;padding:0;background:transparent url(" + this._uiImageURL + ") no-repeat scroll 0 0;")},[
				Builder.node("div",{className: (this._containerID + "_close-btn"),style: (_defaultStyles + "display:none;width:22px;height:22px;margin:0 361px 20px 0;padding:0;cursor:pointer;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -383px -275px;")}),
				Builder.node("div",{className: (this._containerID + "_close-btn-shim"),style: (_defaultStyles + "display:none;width:22px;height:22px;margin:0 361px 20px 0;padding:0;")}),
				Builder.node("a",{href: "http://www.colourlovers.com/",target: "_blank",title: "COLOURlovers",style: (_defaultStyles + "display: block;float:left;width:100px;height:22px;margin: 0 0 0 14px;")}),
				Builder.node("input",{id: (this._containerID + "hex-field"),maxlength: 6,style: (_inputTextStyles + "width:53px;height:15px;margin: 0 0 0 12px;")}),

				Builder.node("input",{id: (this._containerID + "rgb-r-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 16px;")}),
				Builder.node("input",{id: (this._containerID + "rgb-g-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 4px;")}),
				Builder.node("input",{id: (this._containerID + "rgb-b-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 4px;")}),

				Builder.node("input",{id: (this._containerID + "hsv-h-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 18px;")}),
				Builder.node("input",{id: (this._containerID + "hsv-s-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 4px;")}),
				Builder.node("input",{id: (this._containerID + "hsv-v-field"),maxlength: 3,style: (_inputTextStyles + "width:22px;height:15px;margin: 0 0 0 4px;")}),

				Builder.node("div",{style: (_defaultStyles + "clear: both;")}),

				// Sat Val Square
				Builder.node("div",{id: (this._containerID + "picker-square"),style: (_defaultStyles + "position:absolute;margin:71px 0 0 14px;width:15px;height:15px;z-index:" + _pickerZIndex + ";cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -383px -257px;")}),
				Builder.node("div",{id: (this._containerID + "square-bg"),style: (_defaultStyles + "position:absolute;margin:78px 0 0 21px;width:256px;height:256px;cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -383px 0;")}),

				// Hue Slider
				Builder.node("div",{id: (this._containerID + "picker-hue"),style: (_defaultStyles + "position:absolute;margin:69px 0 0 280px;width:18px;height:18px;z-index:" + _pickerZIndex + ";cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -399px -257px;")}),
				Builder.node("div",{id: (this._containerID + "hue-bg"),style: (_defaultStyles + "position:absolute;margin:78px 0 0 288px;width:20px;height:256px;cursor:crosshair;background:url(" + this._uiImageURL + ") no-repeat scroll -639px 0;")}),

				// Sat Slider
				Builder.node("div",{id: (this._containerID + "picker-sat"),style: (_defaultStyles + "position:absolute;margin:69px 0 0 310px;width:18px;height:18px;z-index:" + _pickerZIndex + ";cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -399px -257px;")}),
				Builder.node("div",{id: (this._containerID + "sat-bg"),style: (_defaultStyles + "position:absolute;margin:78px 0 0 318px;width:20px;height:256px;cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -660px 0;")}),

				// Val Slider
				Builder.node("div",{id: (this._containerID + "picker-val"),style: (_defaultStyles + "position:absolute;margin:69px 0 0 340px;width:18px;height:18px;z-index:" + _pickerZIndex + ";cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -399px -257px;")}),
				Builder.node("div",{id: (this._containerID + "val-bg"),style: (_defaultStyles + "position:absolute;margin:78px 0 0 348px;width:20px;height:256px;cursor:crosshair;background:transparent url(" + this._uiImageURL + ") no-repeat scroll -681px 0;")})
			]);

			if ((this._embeddedContainerID !== "") && ($(this._embeddedContainerID) !== null)) {
				$(this._embeddedContainerID).update(); // Clear the container of anything which could be inside
				$(this._embeddedContainerID).insert(_ui);
			} else {
				document.getElementsByTagName("body")[0].appendChild(_ui);
			}

			// Picker
			if (this._isDraggable) {
				new Draggable(this._containerID,{zindex: _uiZIndex,starteffect: null,reverteffect: null,endeffect: null,onEnd: this.pickerOnEnd.bind(this),onDrag: function(_draggableElement,_event) {
					// update callbacks "move"
					var _x = parseInt($(this._containerID).style.left,10);
					var _y = parseInt($(this._containerID).style.top,10);
					for (var _i=0,_length=this._callbacks["move"].length;_i<_length;_i++) {
						this._callbacks["move"][_i]({_x: _x,_y: _y});
					}
				}.bind(this),onStart: function(_draggableElement,_event) {
					// update callbacks "move-start"
					var _x = parseInt($(this._containerID).style.left,10);
					var _y = parseInt($(this._containerID).style.top,10);
					for (var _i=0,_length=this._callbacks["move-start"].length;_i<_length;_i++) {
						this._callbacks["move-start"][_i]({_x: _x,_y: _y});
					}
				}.bind(this)});

				$(this._containerID).style.cursor = "move";

				// Close btn
				var _closeBtn = $$("#" + this._containerID + " div." + this._containerID + "_close-btn")[0];
				_closeBtn.show();
				Event.observe(_closeBtn,"click",function(_event) {
					this.hide();
				}.bind(this));
			} else {
				$$("#" + this._containerID + " div." + this._containerID + "_close-btn-shim")[0].show();
			}

			// Square picker
			this._squarePickerHandle = new Draggable(this._containerID + "picker-square",{zindex: _pickerZIndex,starteffect: null,reverteffect: null,endeffect: null,onDrag: this.pickerOnDragChange.bind(this),snap: function(_x,_y,_draggable) { return [Math.min(Math.max(_x,0),256),Math.min(Math.max(_y,0),256)]; }});
			Event.observe(this._containerID + "square-bg","mousedown",function(_event) {
				this._lastMouseDownTime = (new Date()).getTime();

				// First get the abs pos of the mousedown event:
				var _x = Event.pointerX(_event);
				var _y = Event.pointerY(_event);

				// Get the abs position of the parent div:
				var _offset = $(this._containerID + "square-bg").cumulativeOffset();

				// Update picker position:
				$(this._containerID + "picker-square").style.left	= (_x - _offset.left).toString() + "px";
				$(this._containerID + "picker-square").style.top	= (_y - _offset.top).toString() + "px";

				// Pass the event off to Draggable:
				this._squarePickerHandle.initDrag(_event);

				// Set the color:
				this.pickerOnDragChange();
			}.bind(this));

			// Hue picker
			this._huePickerHandle = new Draggable(this._containerID + "picker-hue",{zindex: _pickerZIndex,starteffect: null,reverteffect: null,endeffect: null,onDrag: this.huePickerOnDragChange.bind(this),snap: function(_x,_y,_draggable) { return [0,Math.min(Math.max(_y,0),256)]; }});
			Event.observe(this._containerID + "hue-bg","mousedown",function(_event) {
				this._lastMouseDownTime = (new Date()).getTime();

				// First get the abs pos of the mousedown event:
				var _y = Event.pointerY(_event);

				// Get the abs position of the parent div:
				var _offset = $(this._containerID + "hue-bg").cumulativeOffset();

				// Update picker position:
				$(this._containerID + "picker-hue").style.top = (_y - _offset.top).toString() + "px";

				// Pass the event off to Draggable:
				this._huePickerHandle.initDrag(_event);

				// Set the color:
				this.huePickerOnDragChange();
			}.bind(this));

			// Sat picker
			this._satPickerHandle = new Draggable(this._containerID + "picker-sat",{zindex: _pickerZIndex,starteffect: null,reverteffect: null,endeffect: null,onDrag: this.satPickerOnDragChange.bind(this),snap: function(_x,_y,_draggable) { return [0,Math.min(Math.max(_y,0),256)]; }});
			Event.observe(this._containerID + "sat-bg","mousedown",function(_event) {
				this._lastMouseDownTime = (new Date()).getTime();

				// First get the abs pos of the mousedown event:
				var _y = Event.pointerY(_event);

				// Get the abs position of the parent div:
				var _offset = $(this._containerID + "sat-bg").cumulativeOffset();

				// Update picker position:
				$(this._containerID + "picker-sat").style.top = (_y - _offset.top).toString() + "px";

				// Pass the event off to Draggable:
				this._satPickerHandle.initDrag(_event);

				// Set the color:
				this.satPickerOnDragChange();
			}.bind(this));

			// Val picker
			this._valPickerHandle = new Draggable(this._containerID + "picker-val",{zindex: _pickerZIndex,starteffect: null,reverteffect: null,endeffect: null,onDrag: this.valPickerOnDragChange.bind(this),snap: function(_x,_y,_draggable) { return [0,Math.min(Math.max(_y,0),256)]; }});
			Event.observe(this._containerID + "val-bg","mousedown",function(_event) {
				this._lastMouseDownTime = (new Date()).getTime();

				// First get the abs pos of the mousedown event:
				var _y = Event.pointerY(_event);

				// Get the abs position of the parent div:
				var _offset = $(this._containerID + "val-bg").cumulativeOffset();

				// Update picker position:
				$(this._containerID + "picker-val").style.top = (_y - _offset.top).toString() + "px";

				// Pass the event off to Draggable:
				this._valPickerHandle.initDrag(_event);

				// Set the color:
				this.valPickerOnDragChange();
			}.bind(this));

			// Hex field
			Event.observe(this._containerID + "hex-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hex-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hex-field","blur",this.fieldEvent.bind(this));

			// RGB R field
			Event.observe(this._containerID + "rgb-r-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-r-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-r-field","blur",this.fieldEvent.bind(this));

			// RGB G field
			Event.observe(this._containerID + "rgb-g-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-g-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-g-field","blur",this.fieldEvent.bind(this));

			// RGB B field
			Event.observe(this._containerID + "rgb-b-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-b-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "rgb-b-field","blur",this.fieldEvent.bind(this));

			// HSV H field
			Event.observe(this._containerID + "hsv-h-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-h-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-h-field","blur",this.fieldEvent.bind(this));

			// HSV S field
			Event.observe(this._containerID + "hsv-s-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-s-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-s-field","blur",this.fieldEvent.bind(this));

			// HSV V field
			Event.observe(this._containerID + "hsv-v-field","keydown",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-v-field","keyup",this.fieldEvent.bind(this));
			Event.observe(this._containerID + "hsv-v-field","blur",this.fieldEvent.bind(this));

			$(this._containerID).style.position	= this._position;
			this._status						= "hidden";
			if (this._initDisplay === "block") {
				this.show();
			}

			this.onReady(_event);
		}.bind(this));
	},

	keyboardChangeEndHandler: function() {
		this._lastKeyboardEventCheckTime	= 0;
		this._lastKeyDownEventCheckTime		= 0;

		this.changeEndEventHandler();
	},

	changeEndEventHandler: function(_event) {
		// Update change-start callbacks
		for (var _i=0,_length=this._callbacks["change-end"].length;_i<_length;_i++) {
			this._callbacks["change-end"][_i]({_hex: this._colorValue._hex,_rgb: this._colorValue._rgb,_hsv: this._colorValue._hsv});
		}
	},

	fieldEvent: function(_event) {
		var _elementID	= Event.element(_event).id;
		var _value		= $(_elementID).value;
		var _type		= _event.type;
		var _keyCode	= _event.keyCode;
		var _matches	= /(hex|rgb|hsv)-?(r|g|b|h|s|v)?-field$/.exec(_elementID);
		var _field		= _matches[1];
		var _part		= _matches[2];
		var _hsv		= [];
		var _key		= "";

		if (_type === "keydown") {
			if ([38,40].indexOf(_keyCode) !== -1) {
				if (_field === "hex") {
					_value	= this.hex2dec(_value);
					_key	= ("_" + _field);
				} else {
					_value	= parseInt(_value,10);
					_key	= ("_" + _part);
				}

				var _amount = _event.shiftKey ? 5 : 1;

				if (_keyCode === 38) {
					// Up arrow
					_value += _amount;
				} else if (_keyCode === 40) {
					// Down arrow
					_value -= _amount;
				}

				if (_value < this._limits[_key][0]) {
					_value = this._limits[_key][0];
				} else if (_value > this._limits[_key][1]) {
					_value = this._limits[_key][1];
				}

				_value = (_field === "hex") ? this.dec2hex(_value) : _value;

				// DRY:
				_type = "blur";
			}

			// Event times
			if (this._lastKeyDownEventCheckTime === 0) {
				this._lastKeyDownEventCheckTime = this._lastKeyDownTime = (new Date()).getTime();
			}
		}
		if (["keyup","blur"].indexOf(_type) !== -1) {
			if (_field === "hex") {
				if (this.isValidHex(_value)) {
					_hsv = this.hex2hsv(_value);
				}
			} else if (_field === "rgb") {
				_value = parseInt(_value,10);
				if (_part === "r") {
					if (this.isInRange(_value,this._limits._r[0],this._limits._r[1] + 1)) {
						_hsv = this.rgb2hsv([(_value / 255),this._colorValue._rgb[1],this._colorValue._rgb[2]]);
					}
				} else if (_part === "g") {
					if (this.isInRange(_value,this._limits._g[0],this._limits._g[1] + 1)) {
						_hsv = this.rgb2hsv([this._colorValue._rgb[0],(_value / 255),this._colorValue._rgb[2]]);
					}
				} else if (_part === "b") {
					if (this.isInRange(_value,this._limits._b[0],this._limits._b[1] + 1)) {
						_hsv = this.rgb2hsv([this._colorValue._rgb[0],this._colorValue._rgb[1],(_value / 255)]);
					}
				}
			} else if (_field === "hsv") {
				_value = parseInt(_value,10);
				if (_part === "h") {
					if (this.isInRange(_value,this._limits._h[0],this._limits._h[1] + 1)) {
						_hsv = [(_value / 360),this._colorValue._hsv[1],this._colorValue._hsv[2]];
					}
				} else if (_part === "s") {
					if (this.isInRange(_value,this._limits._s[0],this._limits._s[1] + 1)) {
						_hsv = [this._colorValue._hsv[0],(_value / 100),this._colorValue._hsv[2]];
					}
				} else if (_part === "v") {
					if (this.isInRange(_value,this._limits._v[0],this._limits._v[1] + 1)) {
						_hsv = [this._colorValue._hsv[0],this._colorValue._hsv[1],(_value / 100)];
					}
				}
			}
		}

		if (_hsv.length !== 0) {
			this.setColor("hsv",_hsv,undefined,_event);
		}
	},

	registerCallback: function(_action,_callback) {
		if ((typeof _callback === "function") && (this._callbacks[_action] !== undefined)) {
			var _index							= this._callbacks[_action].length;
			this._callbacks[_action][_index]	= _callback;

			return _index;
		}
	},

	removeCallback: function(_action,_callback) {
		delete this._callbacks[_action][_index];
	},

	registerRelatedElement: function(_elementID) {
		if ((typeof _elementID === "string") && (this._relatedElements[_elementID] === undefined)) {
			this._relatedElements.push(_elementID);
		}
	},

	removeRelatedElement: function(_elementID) {
		this._relatedElements = this._relatedElements.clone().without(_elementID);
	},

	pickerOnDragChange: function(_draggableElement,_event) {
		this._ui._pickerCumulativeOffset	= $(this._containerID).cumulativeOffset();
		var _pickerCumulativeOffset			= $(this._containerID + "picker-square").cumulativeOffset();
		var _sat							= (_pickerCumulativeOffset.left - this._ui._pickerCumulativeOffset.left - parseInt($(this._containerID + "picker-square").style.marginLeft,10));
		var _val							= (_pickerCumulativeOffset.top - this._ui._pickerCumulativeOffset.top - parseInt($(this._containerID + "picker-square").style.marginTop,10));
		_sat								= (_sat / 256);
		_val								= Math.abs((_val / 256) - 1);

		this.setColor("hsv",[this._colorValue._hsv[0],_sat,_val],"square");
	},

	huePickerOnDragChange: function(_draggableElement,_event) {
		this._ui._pickerCumulativeOffset	= $(this._containerID).cumulativeOffset();
		var _pickerCumulativeOffset			= $(this._containerID + "picker-hue").cumulativeOffset();
		var _hue							= (_pickerCumulativeOffset.top - this._ui._pickerCumulativeOffset.top - parseInt($(this._containerID + "picker-hue").style.marginTop,10));
		_hue								= (_hue / 256);

		this.setColor("hsv",[_hue,this._colorValue._hsv[1],this._colorValue._hsv[2]],"hue");
	},

	satPickerOnDragChange: function(_draggableElement,_event) {
		this._ui._pickerCumulativeOffset	= $(this._containerID).cumulativeOffset();
		var _pickerCumulativeOffset			= $(this._containerID + "picker-sat").cumulativeOffset();
		var _sat							= (_pickerCumulativeOffset.top - this._ui._pickerCumulativeOffset.top - parseInt($(this._containerID + "picker-sat").style.marginTop,10));
		_sat								= Math.abs((_sat / 256) - 1);

		this.setColor("hsv",[this._colorValue._hsv[0],_sat,this._colorValue._hsv[2]],"sat");
	},

	valPickerOnDragChange: function(_draggableElement,_event) {
		this._ui._pickerCumulativeOffset	= $(this._containerID).cumulativeOffset();
		var _pickerCumulativeOffset			= $(this._containerID + "picker-val").cumulativeOffset();
		var _val							= (_pickerCumulativeOffset.top - this._ui._pickerCumulativeOffset.top - parseInt($(this._containerID + "picker-val").style.marginTop,10));
		_val								= Math.abs((_val / 256) - 1);

		this.setColor("hsv",[this._colorValue._hsv[0],this._colorValue._hsv[1],_val],"val");
	},

	pickerOnEnd: function(_draggableElement,_mouseCoordinates) {
		// update callbacks "move-end"
		var _x = parseInt($(this._containerID).style.left,10);
		var _y = parseInt($(this._containerID).style.top,10);
		for (var _i=0,_length=this._callbacks["move-end"].length;_i<_length;_i++) {
			this._callbacks["move-end"][_i]({_x: _x,_y: _y});
		}
	},

	setColor: function(_format,_value,_slider,_event) {
		var _hsv = [], _hex = "";

		_slider	= (_slider === undefined)	? false : _slider;
		_event	= (_event === undefined)	? false : _event;

		if (_format === "rgb") {
			_hsv = this.rgb2hsv(_value);
		} else if (_format === "hsv") {
			_hsv = _value;
		} else if (_format === "hex") {
			if (this.isValidHex(_value)) {
				_hsv = this.hex2hsv(_value);
			}
		}

		if (this._lastHsvValue.toString() !== _hsv.toString()) {
			this._lastHsvValue = _hsv.clone();

			if (_hsv.length !== 0) {
				this._colorValue._hsv	= _hsv;
				this._colorValue._rgb	= this.hsv2rgb(this._colorValue._hsv);
				this._colorValue._hex	= this.rgb2hex(this._colorValue._rgb);
				_hex					= this.hsv2hex([this._colorValue._hsv[0],1,1]);

				// Update backgrounds
				$(this._containerID + "square-bg").style.backgroundColor	= ("#" + _hex);
				$(this._containerID + "sat-bg").style.backgroundColor		= ("#" + _hex);
				$(this._containerID + "val-bg").style.backgroundColor		= ("#" + _hex);

				// Update text fields
				$(this._containerID + "hex-field").value	= this._colorValue._hex;

				$(this._containerID + "rgb-r-field").value	= Math.round(this._colorValue._rgb[0] * 255);
				$(this._containerID + "rgb-g-field").value	= Math.round(this._colorValue._rgb[1] * 255);
				$(this._containerID + "rgb-b-field").value	= Math.round(this._colorValue._rgb[2] * 255);

				$(this._containerID + "hsv-h-field").value	= Math.round(this._colorValue._hsv[0] * 360);
				$(this._containerID + "hsv-s-field").value	= Math.round(this._colorValue._hsv[1] * 100);
				$(this._containerID + "hsv-v-field").value	= Math.round(this._colorValue._hsv[2] * 100);

				// Update sliders
				if (_slider !== "square") {
					$(this._containerID + "picker-square").style.left	= ((this._colorValue._hsv[1] * 256) + "px");
					$(this._containerID + "picker-square").style.top	= (Math.abs((this._colorValue._hsv[2] * 256) - 256) + "px");
				}
				if (_slider !== "hue") {
					$(this._containerID + "picker-hue").style.top = ((this._colorValue._hsv[0] * 256) + "px");
				}
				if (_slider !== "sat") {
					$(this._containerID + "picker-sat").style.top = (Math.abs((this._colorValue._hsv[1] * 256) - 256) + "px");
				}
				if (_slider !== "val") {
					$(this._containerID + "picker-val").style.top = (Math.abs((this._colorValue._hsv[2] * 256) - 256) + "px");
				}

				var _fireKeyboardChangeEndHandler	= false;
				var _fireChangeStartEvents			= false;
				var _fireChangeEndEvents			= false;

				if ((_slider !== false) || (_event !== false)) {
					if (this._lastMouseDownTime > this._lastKeyDownTime) {
						// Event Initializer: mouse

						if (this._lastMouseDownTime > this._lastMouseEventCheckTime) {
							this._lastMouseEventCheckTime = this._lastMouseDownTime;
							// start event!

							_fireChangeStartEvents = true;
						}
					} else if (this._lastKeyDownTime !== 0) {
						// Event Initializer: keyboard

						if (this._lastKeyDownTime > this._lastKeyboardEventCheckTime) {
							this._lastKeyboardEventCheckTime = this._lastKeyDownTime;
							// start event!

							_fireChangeStartEvents = true;
							if ((_event !== false) && ([38,40].indexOf(_event.keyCode) === -1)) {
								// Only arrow up and arrow down events can fire this...

								_fireKeyboardChangeEndHandler = true; // Since this need to fire AFTER "change"
							}
						}
					}
				} else {
					_fireChangeStartEvents	= true;
					_fireChangeEndEvents	= true;
				}

				if (_fireChangeStartEvents) {
					// Update change-start callbacks
					for (var _i=0,_length=this._callbacks["change-start"].length;_i<_length;_i++) {
						this._callbacks["change-start"][_i]({_hex: this._colorValue._hex,_rgb: this._colorValue._rgb,_hsv: this._colorValue._hsv});
					}
				}

				// Update change callbacks
				for (var _i=0,_length=this._callbacks["change"].length;_i<_length;_i++) {
					this._callbacks["change"][_i]({_hex: this._colorValue._hex,_rgb: this._colorValue._rgb,_hsv: this._colorValue._hsv});
				}

				if (_fireKeyboardChangeEndHandler) {
					this.keyboardChangeEndHandler();
				}

				if (_fireChangeEndEvents) {
					this.changeEndEventHandler();
				}
			}
		}
	},

	showAtClickEvent: function(_event,_x,_y) {
		var _xPosition = Event.pointerX(_event);
		var _yPosition = Event.pointerY(_event);

		if ((_x !== undefined) && (_x !== null)) {
			_xPosition += parseInt(_x,10);
		}
		if ((_y !== undefined) && (_y !== null)) {
			_yPosition += parseInt(_y,10);
		}

		this.show(_xPosition,_yPosition);
	},

	show: function(_x,_y) {
		if ((_x !== undefined) && (_y !== undefined)) {
			_x = parseInt(_x,10);
			_y = parseInt(_y,10);

			$(this._containerID).style.top	= (_y.toString() + "px");
			$(this._containerID).style.left	= (_x.toString() + "px");
		}

		if ($(this._containerID).style.display === "none") {
			this._status = "appearing";

			$(this._containerID).appear({duration: 0.2,afterFinish: function() {
				this.show(); // send the call back through, will execute the else part of this condition
			}.bind(this)});
		} else {
			this.pickerOnEnd(); // init picker position
			this._status = "visible";

			// update callbacks "show"
			_x = parseInt($(this._containerID).style.left,10);
			_y = parseInt($(this._containerID).style.top,10);
			for (var _i=0,_length=this._callbacks["show"].length;_i<_length;_i++) {
				this._callbacks["show"][_i]({_x: _x,_y: _y});
			}
		}
	},

	hide: function() {
		if ($(this._containerID).style.display !== "none") {
			$(this._containerID).fade({duration: 0.2,afterFinish: function() {
				this._status = "hidden";

				// update callbacks "hide"
				var _x = parseInt($(this._containerID).style.left,10);
				var _y = parseInt($(this._containerID).style.top,10);
				for (var _i=0,_length=this._callbacks["hide"].length;_i<_length;_i++) {
					this._callbacks["hide"][_i]({_x: _x,_y: _y});
				}
			}.bind(this)});
		}
	},

	mouseDown: function(_event) {
		if (this._hideOnOutsideMouseDown) {
			var _element				= Event.element(_event);
			var _numRelatedElements		= this._relatedElements.length;
			var _isRelatedElementEvent	= false;

			for (var _i=0;_i<_numRelatedElements;_i++) {
				if (_element.descendantOf(this._relatedElements[_i]) || (_element.id === this._relatedElements[_i])) {
					_isRelatedElementEvent = true;
					break;
				}
			}

			if ((_element.descendantOf(this._containerID) === false) && (_element.id !== this._containerID) && (_isRelatedElementEvent === false)) {
				this.hide();
			}
		}
	},

	isInRange: function(_val,_low,_high) {
		return ((_val >= _low) && (_val <= _high));
	},

	isValidHex: function(_hex) {
		return (/^[a-fA-F0-9]{6}$/).test(_hex);
	},

	// Decimal
	hex2dec: function(_hex) {
		return parseInt(_hex,16);
	},

	// RGB
	hex2rgb: function(_hex) {
		return [(parseInt(_hex.substr(0,2),16) / 255),(parseInt(_hex.substr(2,2),16) / 255),(parseInt(_hex.substr(4,2),16) / 255)];
	},
	hsv2rgb: function(_hsv) {
		// http://easyrgb.com/index.php?X=MATH&H=21#text21
		var _h = _hsv[0], _s = _hsv[1], _v = _hsv[2], _r = 0, _g = 0, _b = 0, _hFloor = 0, _value1 = 0, _value2 = 0, _value3 = 0;

		if (_s == 0) {
			return [_v,_v,_v];
		} else {
			_h = _h * 6;
			if (_h == 6) {
				_h = 0;
			}
			_hFloor = Math.floor(_h);
			_value1 = (_v * (1 - _s));
			_value2 = (_v * (1 - _s * (_h - _hFloor)));
			_value3 = (_v * (1 - _s * (1 - (_h - _hFloor))));

			if (_hFloor == 0) {
				_r = _v;
				_g = _value3;
				_b = _value1;
			} else if (_hFloor == 1) {
				_r = _value2;
				_g = _v;
				_b = _value1;
			} else if (_hFloor == 2) {
				_r = _value1;
				_g = _v;
				_b = _value3;
			} else if (_hFloor == 3) {
				_r = _value1;
				_g = _value2;
				_b = _v;
			} else if (_hFloor == 4) {
				_r = _value3;
				_g = _value1;
				_b = _v;
			} else {
				_r = _v;
				_g = _value1;
				_b = _value2;
			}

			return [_r,_g,_b];
		}
	},

	// HEX
	rgb2hex: function(_rgb) {
		var _hex = [Math.round(_rgb[0] * 255).toString(16),Math.round(_rgb[1] * 255).toString(16),Math.round(_rgb[2] * 255).toString(16)];

		for (var _i=0;_i<3;_i++) {
			if (_hex[_i].length === 1) {
				_hex[_i] = ("0" + _hex[_i]);
			}
		}
		return _hex.join("").toUpperCase();
	},
	hsv2hex: function(_hsv) {
		return this.rgb2hex(this.hsv2rgb(_hsv));
	},
	dec2hex: function(_dec) {
		var _hex = _dec.toString(16).toUpperCase();
		while (_hex.length < 6) {
			_hex = ("0" + _hex);
		}
		return _hex;
	},

	// HSV
	hex2hsv: function(_hex) {
		return this.rgb2hsv(this.hex2rgb(_hex));
	},
	rgb2hsv: function(_rgb) {
		// http://easyrgb.com/index.php?X=MATH&H=20#text20
		var _r = _rgb[0], _g = _rgb[1], _b = _rgb[2], _h = 0, _s = 0, _v = 0, _deltaR = 0, _deltaG = 0, _deltaB = 0;
		var _min		= Math.min(_r,_g,_b);
		var _max		= Math.max(_r,_g,_b);
		var _deltaMax	= (_max - _min);

		_v = _max;

		if (_deltaMax == 0) {
			// This is a gray, no chroma...
			_h = _s = 0;
		} else {
			// Chromatic data...
			_s = (_deltaMax / _max);
			_s = isNaN(_s) ? 0 : _s;
		}

		_deltaR = ((((_max - _r) / 6) + (_deltaMax / 2)) / _deltaMax);
		_deltaG = ((((_max - _g) / 6) + (_deltaMax / 2)) / _deltaMax);
		_deltaB = ((((_max - _b) / 6) + (_deltaMax / 2)) / _deltaMax);

		_deltaR = isNaN(_deltaR) ? 0 : _deltaR;
		_deltaG = isNaN(_deltaG) ? 0 : _deltaG;
		_deltaB = isNaN(_deltaB) ? 0 : _deltaB;

		if (_r == _max) {
			_h = (_deltaB - _deltaG);
		} else if (_g == _max) {
			_h = ((1 / 3) + _deltaR - _deltaB);
		} else if (_b == _max) {
			_h = ((2 / 3) + _deltaG - _deltaR);
		}

		if (_h < 0) {
			_h += 1;
		}
		if (_h > 1){
			_h -= 1;
		}

		return [_h,_s,_v];
	}
});