var test = (function (exports) {
	'use strict';

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var name = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.validateIcon = exports.stringToIcon = void 0;
	/**
	 * Expression to test part of icon name.
	 */
	var match = /^[a-z0-9]+(-[a-z0-9]+)*$/;
	/**
	 * Convert string to Icon object.
	 */
	exports.stringToIcon = function (value) {
	    var provider = '';
	    var colonSeparated = value.split(':');
	    // Check for provider with correct '@' at start
	    if (value.slice(0, 1) === '@') {
	        // First part is provider
	        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
	            // "@provider:prefix:name" or "@provider:prefix-name"
	            return null;
	        }
	        provider = colonSeparated.shift().slice(1);
	    }
	    // Check split by colon: "prefix:name", "provider:prefix:name"
	    if (colonSeparated.length > 3 || !colonSeparated.length) {
	        return null;
	    }
	    if (colonSeparated.length > 1) {
	        // "prefix:name"
	        var name = colonSeparated.pop();
	        var prefix = colonSeparated.pop();
	        return {
	            // Allow provider without '@': "provider:prefix:name"
	            provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
	            prefix: prefix,
	            name: name,
	        };
	    }
	    // Attempt to split by dash: "prefix-name"
	    var dashSeparated = colonSeparated[0].split('-');
	    if (dashSeparated.length > 1) {
	        return {
	            provider: provider,
	            prefix: dashSeparated.shift(),
	            name: dashSeparated.join('-'),
	        };
	    }
	    return null;
	};
	/**
	 * Check if icon is valid.
	 *
	 * This function is not part of stringToIcon because validation is not needed for most code.
	 */
	exports.validateIcon = function (icon) {
	    if (!icon) {
	        return false;
	    }
	    return !!((icon.provider === '' || icon.provider.match(match)) &&
	        icon.prefix.match(match) &&
	        icon.name.match(match));
	};

	});

	function cleanIconName(name) {
		if (typeof name === 'string') {
			name = name.stringToIcon(name);
		}
		return name === null || !name.validateIcon(name) ? null : name;
	}

	function testIcon(name) {
		var cleaned = cleanIconName(name);
		console.log('Testing:', cleaned);
		return cleaned;
	}

	module.exports = {
		testIcon: testIcon,
	};

	exports.cleanIconName = cleanIconName;

	return exports;

}({}));
