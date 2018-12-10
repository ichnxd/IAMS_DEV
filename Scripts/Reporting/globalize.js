/*!
 * Globalize
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( window, undefined ) {

var Globalize,
	// private variables
	regexHex,
	regexInfinity,
	regexParseFloat,
	regexTrim,
	// private JavaScript utility functions
	arrayIndexOf,
	endsWith,
	extend,
	isArray,
	isFunction,
	isObject,
	startsWith,
	trim,
	truncate,
	zeroPad,
	// private Globalization utility functions
	appendPreOrPostMatch,
	expandFormat,
	formatDate,
	formatNumber,
	getTokenRegExp,
	getEra,
	getEraYear,
	parseExact,
	parseNegativePattern;

// Global variable (Globalize) or CommonJS module (globalize)
Globalize = function( cultureSelector ) {
	return new Globalize.prototype.init( cultureSelector );
};

if ( typeof require !== "undefined" &&
	typeof exports !== "undefined" &&
	typeof module !== "undefined" ) {
	// Assume CommonJS
	module.exports = Globalize;
} else {
	// Export as global variable
	window.Globalize = Globalize;
}

Globalize.cultures = {};

Globalize.prototype = {
	constructor: Globalize,
	init: function( cultureSelector ) {
		this.cultures = Globalize.cultures;
		this.cultureSelector = cultureSelector;

		return this;
	}
};
Globalize.prototype.init.prototype = Globalize.prototype;

// 1. When defining a culture, all fields are required except the ones stated as optional.
// 2. Each culture should have a ".calendars" object with at least one calendar named "standard"
//    which serves as the default calendar in use by that culture.
// 3. Each culture should have a ".calendar" object which is the current calendar being used,
//    it may be dynamically changed at any time to one of the calendars in ".calendars".
Globalize.cultures[ "default" ] = {
	// A unique name for the culture in the form <language code>-<country/region code>
	name: "en",
	// the name of the culture in the english language
	englishName: "English",
	// the name of the culture in its own language
	nativeName: "English",
	// whether the culture uses right-to-left text
	isRTL: false,
	// "language" is used for so-called "specific" cultures.
	// For example, the culture "es-CL" means "Spanish, in Chili".
	// It represents the Spanish-speaking culture as it is in Chili,
	// which might have different formatting rules or even translations
	// than Spanish in Spain. A "neutral" culture is one that is not
	// specific to a region. For example, the culture "es" is the generic
	// Spanish culture, which may be a more generalized version of the language
	// that may or may not be what a specific culture expects.
	// For a specific culture like "es-CL", the "language" field refers to the
	// neutral, generic culture information for the language it is using.
	// This is not always a simple matter of the string before the dash.
	// For example, the "zh-Hans" culture is netural (Simplified Chinese).
	// And the "zh-SG" culture is Simplified Chinese in Singapore, whose lanugage
	// field is "zh-CHS", not "zh".
	// This field should be used to navigate from a specific culture to it's
	// more general, neutral culture. If a culture is already as general as it
	// can get, the language may refer to itself.
	language: "en",
	// numberFormat defines general number formatting rules, like the digits in
	// each grouping, the group separator, and how negative numbers are displayed.
	numberFormat: {
		// [negativePattern]
		// Note, numberFormat.pattern has no "positivePattern" unlike percent and currency,
		// but is still defined as an array for consistency with them.
		//   negativePattern: one of "(n)|-n|- n|n-|n -"
		pattern: [ "-n" ],
		// number of decimal places normally shown
		decimals: 2,
		// string that separates number groups, as in 1,000,000
		",": ",",
		// string that separates a number from the fractional portion, as in 1.99
		".": ".",
		// array of numbers indicating the size of each number group.
		// TODO: more detailed description and example
		groupSizes: [ 3 ],
		// symbol used for positive numbers
		"+": "+",
		// symbol used for negative numbers
		"-": "-",
		// symbol used for NaN (Not-A-Number)
		"NaN": "NaN",
		// symbol used for Negative Infinity
		negativeInfinity: "-Infinity",
		// symbol used for Positive Infinity
		positiveInfinity: "Infinity",
		percent: {
			// [negativePattern, positivePattern]
			//   negativePattern: one of "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %"
			//   positivePattern: one of "n %|n%|%n|% n"
			pattern: [ "-n %", "n %" ],
			// number of decimal places normally shown
			decimals: 2,
			// array of numbers indicating the size of each number group.
			// TODO: more detailed description and example
			groupSizes: [ 3 ],
			// string that separates number groups, as in 1,000,000
			",": ",",
			// string that separates a number from the fractional portion, as in 1.99
			".": ".",
			// symbol used to represent a percentage
			symbol: "%"
		},
		currency: {
			// [negativePattern, positivePattern]
			//   negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
			//   positivePattern: one of "$n|n$|$ n|n $"
			pattern: [ "($n)", "$n" ],
			// number of decimal places normally shown
			decimals: 2,
			// array of numbers indicating the size of each number group.
			// TODO: more detailed description and example
			groupSizes: [ 3 ],
			// string that separates number groups, as in 1,000,000
			",": ",",
			// string that separates a number from the fractional portion, as in 1.99
			".": ".",
			// symbol used to represent currency
			symbol: "$"
		}
	},
	// calendars defines all the possible calendars used by this culture.
	// There should be at least one defined with name "standard", and is the default
	// calendar used by the culture.
	// A calendar contains information about how dates are formatted, information about
	// the calendar's eras, a standard set of the date formats,
	// translations for day and month names, and if the calendar is not based on the Gregorian
	// calendar, conversion functions to and from the Gregorian calendar.
	calendars: {
		standard: {
			// name that identifies the type of calendar this is
			name: "Gregorian_USEnglish",
			// separator of parts of a date (e.g. "/" in 11/05/1955)
			"/": "/",
			// separator of parts of a time (e.g. ":" in 05:44 PM)
			":": ":",
			// the first day of the week (0 = Sunday, 1 = Monday, etc)
			firstDay: 0,
			days: {
				// full day names
				names: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
				// abbreviated day names
				namesAbbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
				// shortest day names
				namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
			},
			months: {
				// full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
				names: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "" ],
				// abbreviated month names
				namesAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "" ]
			},
			// AM and PM designators in one of these forms:
			// The usual view, and the upper and lower case versions
			//   [ standard, lowercase, uppercase ]
			// The culture does not use AM or PM (likely all standard date formats use 24 hour time)
			//   null
			AM: [ "AM", "am", "AM" ],
			PM: [ "PM", "pm", "PM" ],
			eras: [
				// eras in reverse chronological order.
				// name: the name of the era in this culture (e.g. A.D., C.E.)
				// start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
				// offset: offset in years from gregorian calendar
				{
					"name": "A.D.",
					"start": null,
					"offset": 0
				}
			],
			// when a two digit year is given, it will never be parsed as a four digit
			// year greater than this year (in the appropriate era for the culture)
			// Set it as a full year (e.g. 2029) or use an offset format starting from
			// the current year: "+19" would correspond to 2029 if the current year 2010.
			twoDigitYearMax: 2029,
			// set of predefined date and time patterns used by the culture
			// these represent the format someone in this culture would expect
			// to see given the portions of the date that are shown.
			patterns: {
				// short date pattern
				d: "M/d/yyyy",
				// long date pattern
				D: "dddd, MMMM dd, yyyy",
				// short time pattern
				t: "h:mm tt",
				// long time pattern
				T: "h:mm:ss tt",
				// long date, short time pattern
				f: "dddd, MMMM dd, yyyy h:mm tt",
				// long date, long time pattern
				F: "dddd, MMMM dd, yyyy h:mm:ss tt",
				// month/day pattern
				M: "MMMM dd",
				// month/year pattern
				Y: "yyyy MMMM",
				// S is a sortable format that does not vary by culture
				S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
			}
			// optional fields for each calendar:
			/*
			monthsGenitive:
				Same as months but used when the day preceeds the month.
				Omit if the culture has no genitive distinction in month names.
				For an explaination of genitive months, see http://blogs.msdn.com/michkap/archive/2004/12/25/332259.aspx
			convert:
				Allows for the support of non-gregorian based calendars. This convert object is used to
				to convert a date to and from a gregorian calendar date to handle parsing and formatting.
				The two functions:
					fromGregorian( date )
						Given the date as a parameter, return an array with parts [ year, month, day ]
						corresponding to the non-gregorian based year, month, and day for the calendar.
					toGregorian( year, month, day )
						Given the non-gregorian year, month, and day, return a new Date() object
						set to the corresponding date in the gregorian calendar.
			*/
		}
	},
	// For localized strings
	messages: {}
};

Globalize.cultures[ "default" ].calendar = Globalize.cultures[ "default" ].calendars.standard;

Globalize.cultures.en = Globalize.cultures[ "default" ];

Globalize.cultureSelector = "en";

//
// private variables
//

regexHex = /^0x[a-f0-9]+$/i;
regexInfinity = /^[+\-]?infinity$/i;
regexParseFloat = /^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/;
regexTrim = /^\s+|\s+$/g;

//
// private JavaScript utility functions
//

arrayIndexOf = function( array, item ) {
	if ( array.indexOf ) {
		return array.indexOf( item );
	}
	for ( var i = 0, length = array.length; i < length; i++ ) {
		if ( array[i] === item ) {
			return i;
		}
	}
	return -1;
};

endsWith = function( value, pattern ) {
	return value.substr( value.length - pattern.length ) === pattern;
};

extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction(target) ) {
		target = {};
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isObject(copy) || (copyIsArray = isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];

					} else {
						clone = src && isObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

isArray = Array.isArray || function( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Array]";
};

isFunction = function( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Function]";
};

isObject = function( obj ) {
	return Object.prototype.toString.call( obj ) === "[object Object]";
};

startsWith = function( value, pattern ) {
	return value.indexOf( pattern ) === 0;
};

trim = function( value ) {
	return ( value + "" ).replace( regexTrim, "" );
};

truncate = function( value ) {
	if ( isNaN( value ) ) {
		return NaN;
	}
	return Math[ value < 0 ? "ceil" : "floor" ]( value );
};

zeroPad = function( str, count, left ) {
	var l;
	for ( l = str.length; l < count; l += 1 ) {
		str = ( left ? ("0" + str) : (str + "0") );
	}
	return str;
};

//
// private Globalization utility functions
//

appendPreOrPostMatch = function( preMatch, strings ) {
	// appends pre- and post- token match strings while removing escaped characters.
	// Returns a single quote count which is used to determine if the token occurs
	// in a string literal.
	var quoteCount = 0,
		escaped = false;
	for ( var i = 0, il = preMatch.length; i < il; i++ ) {
		var c = preMatch.charAt( i );
		switch ( c ) {
			case "\'":
				if ( escaped ) {
					strings.push( "\'" );
				}
				else {
					quoteCount++;
				}
				escaped = false;
				break;
			case "\\":
				if ( escaped ) {
					strings.push( "\\" );
				}
				escaped = !escaped;
				break;
			default:
				strings.push( c );
				escaped = false;
				break;
		}
	}
	return quoteCount;
};

expandFormat = function( cal, format ) {
	// expands unspecified or single character date formats into the full pattern.
	format = format || "F";
	var pattern,
		patterns = cal.patterns,
		len = format.length;
	if ( len === 1 ) {
		pattern = patterns[ format ];
		if ( !pattern ) {
			throw "Invalid date format string \'" + format + "\'.";
		}
		format = pattern;
	}
	else if ( len === 2 && format.charAt(0) === "%" ) {
		// %X escape format -- intended as a custom format string that is only one character, not a built-in format.
		format = format.charAt( 1 );
	}
	return format;
};

formatDate = function( value, format, culture ) {
	var cal = culture.calendar,
		convert = cal.convert,
		ret;

	if ( !format || !format.length || format === "i" ) {
		if ( culture && culture.name.length ) {
			if ( convert ) {
				// non-gregorian calendar, so we cannot use built-in toLocaleString()
				ret = formatDate( value, cal.patterns.F, culture );
			}
			else {
				var eraDate = new Date( value.getTime() ),
					era = getEra( value, cal.eras );
				eraDate.setFullYear( getEraYear(value, cal, era) );
				ret = eraDate.toLocaleString();
			}
		}
		else {
			ret = value.toString();
		}
		return ret;
	}

	var eras = cal.eras,
		sortable = format === "s";
	format = expandFormat( cal, format );

	// Start with an empty string
	ret = [];
	var hour,
		zeros = [ "0", "00", "000" ],
		foundDay,
		checkedDay,
		dayPartRegExp = /([^d]|^)(d|dd)([^d]|$)/g,
		quoteCount = 0,
		tokenRegExp = getTokenRegExp(),
		converted;

	function padZeros( num, c ) {
		var r, s = num + "";
		if ( c > 1 && s.length < c ) {
			r = ( zeros[c - 2] + s);
			return r.substr( r.length - c, c );
		}
		else {
			r = s;
		}
		return r;
	}

	function hasDay() {
		if ( foundDay || checkedDay ) {
			return foundDay;
		}
		foundDay = dayPartRegExp.test( format );
		checkedDay = true;
		return foundDay;
	}

	function getPart( date, part ) {
		if ( converted ) {
			return converted[ part ];
		}
		switch ( part ) {
			case 0:
				return date.getFullYear();
			case 1:
				return date.getMonth();
			case 2:
				return date.getDate();
			default:
				throw "Invalid part value " + part;
		}
	}

	if ( !sortable && convert ) {
		converted = convert.fromGregorian( value );
	}

	for ( ; ; ) {
		// Save the current index
		var index = tokenRegExp.lastIndex,
			// Look for the next pattern
			ar = tokenRegExp.exec( format );

		// Append the text before the pattern (or the end of the string if not found)
		var preMatch = format.slice( index, ar ? ar.index : format.length );
		quoteCount += appendPreOrPostMatch( preMatch, ret );

		if ( !ar ) {
			break;
		}

		// do not replace any matches that occur inside a string literal.
		if ( quoteCount % 2 ) {
			ret.push( ar[0] );
			continue;
		}

		var current = ar[ 0 ],
			clength = current.length;

		switch ( current ) {
			case "ddd":
				//Day of the week, as a three-letter abbreviation
			case "dddd":
				// Day of the week, using the full name
				var names = ( clength === 3 ) ? cal.days.namesAbbr : cal.days.names;
				ret.push( names[value.getDay()] );
				break;
			case "d":
				// Day of month, without leading zero for single-digit days
			case "dd":
				// Day of month, with leading zero for single-digit days
				foundDay = true;
				ret.push(
					padZeros( getPart(value, 2), clength )
				);
				break;
			case "MMM":
				// Month, as a three-letter abbreviation
			case "MMMM":
				// Month, using the full name
				var part = getPart( value, 1 );
				ret.push(
					( cal.monthsGenitive && hasDay() ) ?
					( cal.monthsGenitive[ clength === 3 ? "namesAbbr" : "names" ][ part ] ) :
					( cal.months[ clength === 3 ? "namesAbbr" : "names" ][ part ] )
				);
				break;
			case "M":
				// Month, as digits, with no leading zero for single-digit months
			case "MM":
				// Month, as digits, with leading zero for single-digit months
				ret.push(
					padZeros( getPart(value, 1) + 1, clength )
				);
				break;
			case "y":
				// Year, as two digits, but with no leading zero for years less than 10
			case "yy":
				// Year, as two digits, with leading zero for years less than 10
			case "yyyy":
				// Year represented by four full digits
				part = converted ? converted[ 0 ] : getEraYear( value, cal, getEra(value, eras), sortable );
				if ( clength < 4 ) {
					part = part % 100;
				}
				ret.push(
					padZeros( part, clength )
				);
				break;
			case "h":
				// Hours with no leading zero for single-digit hours, using 12-hour clock
			case "hh":
				// Hours with leading zero for single-digit hours, using 12-hour clock
				hour = value.getHours() % 12;
				if ( hour === 0 ) hour = 12;
				ret.push(
					padZeros( hour, clength )
				);
				break;
			case "H":
				// Hours with no leading zero for single-digit hours, using 24-hour clock
			case "HH":
				// Hours with leading zero for single-digit hours, using 24-hour clock
				ret.push(
					padZeros( value.getHours(), clength )
				);
				break;
			case "m":
				// Minutes with no leading zero for single-digit minutes
			case "mm":
				// Minutes with leading zero for single-digit minutes
				ret.push(
					padZeros( value.getMinutes(), clength )
				);
				break;
			case "s":
				// Seconds with no leading zero for single-digit seconds
			case "ss":
				// Seconds with leading zero for single-digit seconds
				ret.push(
					padZeros( value.getSeconds(), clength )
				);
				break;
			case "t":
				// One character am/pm indicator ("a" or "p")
			case "tt":
				// Multicharacter am/pm indicator
				part = value.getHours() < 12 ? ( cal.AM ? cal.AM[0] : " " ) : ( cal.PM ? cal.PM[0] : " " );
				ret.push( clength === 1 ? part.charAt(0) : part );
				break;
			case "f":
				// Deciseconds
			case "ff":
				// Centiseconds
			case "fff":
				// Milliseconds
				ret.push(
					padZeros( value.getMilliseconds(), 3 ).substr( 0, clength )
				);
				break;
			case "z":
				// Time zone offset, no leading zero
			case "zz":
				// Time zone offset with leading zero
				hour = value.getTimezoneOffset() / 60;
				ret.push(
					( hour <= 0 ? "+" : "-" ) + padZeros( Math.floor(Math.abs(hour)), clength )
				);
				break;
			case "zzz":
				// Time zone offset with leading zero
				hour = value.getTimezoneOffset() / 60;
				ret.push(
					( hour <= 0 ? "+" : "-" ) + padZeros( Math.floor(Math.abs(hour)), 2 ) +
					// Hard coded ":" separator, rather than using cal.TimeSeparator
					// Repeated here for consistency, plus ":" was already assumed in date parsing.
					":" + padZeros( Math.abs(value.getTimezoneOffset() % 60), 2 )
				);
				break;
			case "g":
			case "gg":
				if ( cal.eras ) {
					ret.push(
						cal.eras[ getEra(value, eras) ].name
					);
				}
				break;
		case "/":
			ret.push( cal["/"] );
			break;
		default:
			throw "Invalid date format pattern \'" + current + "\'.";
		}
	}
	return ret.join( "" );
};

// formatNumber
(function() {
	var expandNumber;

	expandNumber = function( number, precision, formatInfo ) {
		var groupSizes = formatInfo.groupSizes,
			curSize = groupSizes[ 0 ],
			curGroupIndex = 1,
			factor = Math.pow( 10, precision ),
			rounded = Math.round( number * factor ) / factor;

		if ( !isFinite(rounded) ) {
			rounded = number;
		}
		number = rounded;

		var numberString = number+"",
			right = "",
			split = numberString.split( /e/i ),
			exponent = split.length > 1 ? parseInt( split[1], 10 ) : 0;
		numberString = split[ 0 ];
		split = numberString.split( "." );
		numberString = split[ 0 ];
		right = split.length > 1 ? split[ 1 ] : "";

		var l;
		if ( exponent > 0 ) {
			right = zeroPad( right, exponent, false );
			numberString += right.slice( 0, exponent );
			right = right.substr( exponent );
		}
		else if ( exponent < 0 ) {
			exponent = -exponent;
			numberString = zeroPad( numberString, exponent + 1, true );
			right = numberString.slice( -exponent, numberString.length ) + right;
			numberString = numberString.slice( 0, -exponent );
		}

		if ( precision > 0 ) {
			right = formatInfo[ "." ] +
				( (right.length > precision) ? right.slice(0, precision) : zeroPad(right, precision) );
		}
		else {
			right = "";
		}

		var stringIndex = numberString.length - 1,
			sep = formatInfo[ "," ],
			ret = "";

		while ( stringIndex >= 0 ) {
			if ( curSize === 0 || curSize > stringIndex ) {
				return numberString.slice( 0, stringIndex + 1 ) + ( ret.length ? (sep + ret + right) : right );
			}
			ret = numberString.slice( stringIndex - curSize + 1, stringIndex + 1 ) + ( ret.length ? (sep + ret) : "" );

			stringIndex -= curSize;

			if ( curGroupIndex < groupSizes.length ) {
				curSize = groupSizes[ curGroupIndex ];
				curGroupIndex++;
			}
		}

		return numberString.slice( 0, stringIndex + 1 ) + sep + ret + right;
	};

	formatNumber = function( value, format, culture ) {
		if ( !isFinite(value) ) {
			if ( value === Infinity ) {
				return culture.numberFormat.positiveInfinity;
			}
			if ( value === -Infinity ) {
				return culture.numberFormat.negativeInfinity;
			}
			return culture.numberFormat[ "NaN" ];
		}
		if ( !format || format === "i" ) {
			return culture.name.length ? value.toLocaleString() : value.toString();
		}
		format = format || "D";

		var nf = culture.numberFormat,
			number = Math.abs( value ),
			precision = -1,
			pattern;
		if ( format.length > 1 ) precision = parseInt( format.slice(1), 10 );

		var current = format.charAt( 0 ).toUpperCase(),
			formatInfo;

		switch ( current ) {
			case "D":
				pattern = "n";
				number = truncate( number );
				if ( precision !== -1 ) {
					number = zeroPad( "" + number, precision, true );
				}
				if ( value < 0 ) number = "-" + number;
				break;
			case "N":
				formatInfo = nf;
				/* falls through */
			case "C":
				formatInfo = formatInfo || nf.currency;
				/* falls through */
			case "P":
				formatInfo = formatInfo || nf.percent;
				pattern = value < 0 ? formatInfo.pattern[ 0 ] : ( formatInfo.pattern[1] || "n" );
				if ( precision === -1 ) precision = formatInfo.decimals;
				number = expandNumber( number * (current === "P" ? 100 : 1), precision, formatInfo );
				break;
			default:
				throw "Bad number format specifier: " + current;
		}

		var patternParts = /n|\$|-|%/g,
			ret = "";
		for ( ; ; ) {
			var index = patternParts.lastIndex,
				ar = patternParts.exec( pattern );

			ret += pattern.slice( index, ar ? ar.index : pattern.length );

			if ( !ar ) {
				break;
			}

			switch ( ar[0] ) {
				case "n":
					ret += number;
					break;
				case "$":
					ret += nf.currency.symbol;
					break;
				case "-":
					// don't make 0 negative
					if ( /[1-9]/.test(number) ) {
						ret += nf[ "-" ];
					}
					break;
				case "%":
					ret += nf.percent.symbol;
					break;
			}
		}

		return ret;
	};

}());

getTokenRegExp = function() {
	// regular expression for matching date and time tokens in format strings.
	return (/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g);
};

getEra = function( date, eras ) {
	if ( !eras ) return 0;
	var start, ticks = date.getTime();
	for ( var i = 0, l = eras.length; i < l; i++ ) {
		start = eras[ i ].start;
		if ( start === null || ticks >= start ) {
			return i;
		}
	}
	return 0;
};

getEraYear = function( date, cal, era, sortable ) {
	var year = date.getFullYear();
	if ( !sortable && cal.eras ) {
		// convert normal gregorian year to era-shifted gregorian
		// year by subtracting the era offset
		year -= cal.eras[ era ].offset;
	}
	return year;
};

// parseExact
(function() {
	var expandYear,
		getDayIndex,
		getMonthIndex,
		getParseRegExp,
		outOfRange,
		toUpper,
		toUpperArray;

	expandYear = function( cal, year ) {
		// expands 2-digit year into 4 digits.
		if ( year < 100 ) {
			var now = new Date(),
				era = getEra( now ),
				curr = getEraYear( now, cal, era ),
				twoDigitYearMax = cal.twoDigitYearMax;
			twoDigitYearMax = typeof twoDigitYearMax === "string" ? new Date().getFullYear() % 100 + parseInt( twoDigitYearMax, 10 ) : twoDigitYearMax;
			year += curr - ( curr % 100 );
			if ( year > twoDigitYearMax ) {
				year -= 100;
			}
		}
		return year;
	};

	getDayIndex = function	( cal, value, abbr ) {
		var ret,
			days = cal.days,
			upperDays = cal._upperDays;
		if ( !upperDays ) {
			cal._upperDays = upperDays = [
				toUpperArray( days.names ),
				toUpperArray( days.namesAbbr ),
				toUpperArray( days.namesShort )
			];
		}
		value = toUpper( value );
		if ( abbr ) {
			ret = arrayIndexOf( upperDays[1], value );
			if ( ret === -1 ) {
				ret = arrayIndexOf( upperDays[2], value );
			}
		}
		else {
			ret = arrayIndexOf( upperDays[0], value );
		}
		return ret;
	};

	getMonthIndex = function( cal, value, abbr ) {
		var months = cal.months,
			monthsGen = cal.monthsGenitive || cal.months,
			upperMonths = cal._upperMonths,
			upperMonthsGen = cal._upperMonthsGen;
		if ( !upperMonths ) {
			cal._upperMonths = upperMonths = [
				toUpperArray( months.names ),
				toUpperArray( months.namesAbbr )
			];
			cal._upperMonthsGen = upperMonthsGen = [
				toUpperArray( monthsGen.names ),
				toUpperArray( monthsGen.namesAbbr )
			];
		}
		value = toUpper( value );
		var i = arrayIndexOf( abbr ? upperMonths[1] : upperMonths[0], value );
		if ( i < 0 ) {
			i = arrayIndexOf( abbr ? upperMonthsGen[1] : upperMonthsGen[0], value );
		}
		return i;
	};

	getParseRegExp = function( cal, format ) {
		// converts a format string into a regular expression with groups that
		// can be used to extract date fields from a date string.
		// check for a cached parse regex.
		var re = cal._parseRegExp;
		if ( !re ) {
			cal._parseRegExp = re = {};
		}
		else {
			var reFormat = re[ format ];
			if ( reFormat ) {
				return reFormat;
			}
		}

		// expand single digit formats, then escape regular expression characters.
		var expFormat = expandFormat( cal, format ).replace( /([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1" ),
			regexp = [ "^" ],
			groups = [],
			index = 0,
			quoteCount = 0,
			tokenRegExp = getTokenRegExp(),
			match;

		// iterate through each date token found.
		while ( (match = tokenRegExp.exec(expFormat)) !== null ) {
			var preMatch = expFormat.slice( index, match.index );
			index = tokenRegExp.lastIndex;

			// don't replace any matches that occur inside a string literal.
			quoteCount += appendPreOrPostMatch( preMatch, regexp );
			if ( quoteCount % 2 ) {
				regexp.push( match[0] );
				continue;
			}

			// add a regex group for the token.
			var m = match[ 0 ],
				len = m.length,
				add;
			switch ( m ) {
				case "dddd": case "ddd":
				case "MMMM": case "MMM":
				case "gg": case "g":
					add = "(\\D+)";
					break;
				case "tt": case "t":
					add = "(\\D*)";
					break;
				case "yyyy":
				case "fff":
				case "ff":
				case "f":
					add = "(\\d{" + len + "})";
					break;
				case "dd": case "d":
				case "MM": case "M":
				case "yy": case "y":
				case "HH": case "H":
				case "hh": case "h":
				case "mm": case "m":
				case "ss": case "s":
					add = "(\\d\\d?)";
					break;
				case "zzz":
					add = "([+-]?\\d\\d?:\\d{2})";
					break;
				case "zz": case "z":
					add = "([+-]?\\d\\d?)";
					break;
				case "/":
					add = "(\\/)";
					break;
				default:
					throw "Invalid date format pattern \'" + m + "\'.";
			}
			if ( add ) {
				regexp.push( add );
			}
			groups.push( match[0] );
		}
		appendPreOrPostMatch( expFormat.slice(index), regexp );
		regexp.push( "$" );

		// allow whitespace to differ when matching formats.
		var regexpStr = regexp.join( "" ).replace( /\s+/g, "\\s+" ),
			parseRegExp = { "regExp": regexpStr, "groups": groups };

		// cache the regex for this format.
		return re[ format ] = parseRegExp;
	};

	outOfRange = function( value, low, high ) {
		return value < low || value > high;
	};

	toUpper = function( value ) {
		// "he-IL" has non-breaking space in weekday names.
		return value.split( "\u00A0" ).join( " " ).toUpperCase();
	};

	toUpperArray = function( arr ) {
		var results = [];
		for ( var i = 0, l = arr.length; i < l; i++ ) {
			results[ i ] = toUpper( arr[i] );
		}
		return results;
	};

	parseExact = function( value, format, culture ) {
		// try to parse the date string by matching against the format string
		// while using the specified culture for date field names.
		value = trim( value );
		var cal = culture.calendar,
			// convert date formats into regular expressions with groupings.
			// use the regexp to determine the input format and extract the date fields.
			parseInfo = getParseRegExp( cal, format ),
			match = new RegExp( parseInfo.regExp ).exec( value );
		if ( match === null ) {
			return null;
		}
		// found a date format that matches the input.
		var groups = parseInfo.groups,
			era = null, year = null, month = null, date = null, weekDay = null,
			hour = 0, hourOffset, min = 0, sec = 0, msec = 0, tzMinOffset = null,
			pmHour = false;
		// iterate the format groups to extract and set the date fields.
		for ( var j = 0, jl = groups.length; j < jl; j++ ) {
			var matchGroup = match[ j + 1 ];
			if ( matchGroup ) {
				var current = groups[ j ],
					clength = current.length,
					matchInt = parseInt( matchGroup, 10 );
				switch ( current ) {
					case "dd": case "d":
						// Day of month.
						date = matchInt;
						// check that date is generally in valid range, also checking overflow below.
						if ( outOfRange(date, 1, 31) ) return null;
						break;
					case "MMM": case "MMMM":
						month = getMonthIndex( cal, matchGroup, clength === 3 );
						if ( outOfRange(month, 0, 11) ) return null;
						break;
					case "M": case "MM":
						// Month.
						month = matchInt - 1;
						if ( outOfRange(month, 0, 11) ) return null;
						break;
					case "y": case "yy":
					case "yyyy":
						year = clength < 4 ? expandYear( cal, matchInt ) : matchInt;
						if ( outOfRange(year, 0, 9999) ) return null;
						break;
					case "h": case "hh":
						// Hours (12-hour clock).
						hour = matchInt;
						if ( hour === 12 ) hour = 0;
						if ( outOfRange(hour, 0, 11) ) return null;
						break;
					case "H": case "HH":
						// Hours (24-hour clock).
						hour = matchInt;
						if ( outOfRange(hour, 0, 23) ) return null;
						break;
					case "m": case "mm":
						// Minutes.
						min = matchInt;
						if ( outOfRange(min, 0, 59) ) return null;
						break;
					case "s": case "ss":
						// Seconds.
						sec = matchInt;
						if ( outOfRange(sec, 0, 59) ) return null;
						break;
					case "tt": case "t":
						// AM/PM designator.
						// see if it is standard, upper, or lower case PM. If not, ensure it is at least one of
						// the AM tokens. If not, fail the parse for this format.
						pmHour = cal.PM && ( matchGroup === cal.PM[0] || matchGroup === cal.PM[1] || matchGroup === cal.PM[2] );
						if (
							!pmHour && (
								!cal.AM || ( matchGroup !== cal.AM[0] && matchGroup !== cal.AM[1] && matchGroup !== cal.AM[2] )
							)
						) return null;
						break;
					case "f":
						// Deciseconds.
					case "ff":
						// Centiseconds.
					case "fff":
						// Milliseconds.
						msec = matchInt * Math.pow( 10, 3 - clength );
						if ( outOfRange(msec, 0, 999) ) return null;
						break;
					case "ddd":
						// Day of week.
					case "dddd":
						// Day of week.
						weekDay = getDayIndex( cal, matchGroup, clength === 3 );
						if ( outOfRange(weekDay, 0, 6) ) return null;
						break;
					case "zzz":
						// Time zone offset in +/- hours:min.
						var offsets = matchGroup.split( /:/ );
						if ( offsets.length !== 2 ) return null;
						hourOffset = parseInt( offsets[0], 10 );
						if ( outOfRange(hourOffset, -12, 13) ) return null;
						var minOffset = parseInt( offsets[1], 10 );
						if ( outOfRange(minOffset, 0, 59) ) return null;
						tzMinOffset = ( hourOffset * 60 ) + ( startsWith(matchGroup, "-") ? -minOffset : minOffset );
						break;
					case "z": case "zz":
						// Time zone offset in +/- hours.
						hourOffset = matchInt;
						if ( outOfRange(hourOffset, -12, 13) ) return null;
						tzMinOffset = hourOffset * 60;
						break;
					case "g": case "gg":
						var eraName = matchGroup;
						if ( !eraName || !cal.eras ) return null;
						eraName = trim( eraName.toLowerCase() );
						for ( var i = 0, l = cal.eras.length; i < l; i++ ) {
							if ( eraName === cal.eras[i].name.toLowerCase() ) {
								era = i;
								break;
							}
						}
						// could not find an era with that name
						if ( era === null ) return null;
						break;
				}
			}
		}
		var result = new Date(), defaultYear, convert = cal.convert;
		defaultYear = convert ? convert.fromGregorian( result )[ 0 ] : result.getFullYear();
		if ( year === null ) {
			year = defaultYear;
		}
		else if ( cal.eras ) {
			// year must be shifted to normal gregorian year
			// but not if year was not specified, its already normal gregorian
			// per the main if clause above.
			year += cal.eras[( era || 0 )].offset;
		}
		// set default day and month to 1 and January, so if unspecified, these are the defaults
		// instead of the current day/month.
		if ( month === null ) {
			month = 0;
		}
		if ( date === null ) {
			date = 1;
		}
		// now have year, month, and date, but in the culture's calendar.
		// convert to gregorian if necessary
		if ( convert ) {
			result = convert.toGregorian( year, month, date );
			// conversion failed, must be an invalid match
			if ( result === null ) return null;
		}
		else {
			// have to set year, month and date together to avoid overflow based on current date.
			result.setFullYear( year, month, date );
			// check to see if date overflowed for specified month (only checked 1-31 above).
			if ( result.getDate() !== date ) return null;
			// invalid day of week.
			if ( weekDay !== null && result.getDay() !== weekDay ) {
				return null;
			}
		}
		// if pm designator token was found make sure the hours fit the 24-hour clock.
		if ( pmHour && hour < 12 ) {
			hour += 12;
		}
		result.setHours( hour, min, sec, msec );
		if ( tzMinOffset !== null ) {
			// adjust timezone to utc before applying local offset.
			var adjustedMin = result.getMinutes() - ( tzMinOffset + result.getTimezoneOffset() );
			// Safari limits hours and minutes to the range of -127 to 127.  We need to use setHours
			// to ensure both these fields will not exceed this range.	adjustedMin will range
			// somewhere between -1440 and 1500, so we only need to split this into hours.
			result.setHours( result.getHours() + parseInt(adjustedMin / 60, 10), adjustedMin % 60 );
		}
		return result;
	};
}());

parseNegativePattern = function( value, nf, negativePattern ) {
	var neg = nf[ "-" ],
		pos = nf[ "+" ],
		ret;
	switch ( negativePattern ) {
		case "n -":
			neg = " " + neg;
			pos = " " + pos;
			/* falls through */
		case "n-":
			if ( endsWith(value, neg) ) {
				ret = [ "-", value.substr(0, value.length - neg.length) ];
			}
			else if ( endsWith(value, pos) ) {
				ret = [ "+", value.substr(0, value.length - pos.length) ];
			}
			break;
		case "- n":
			neg += " ";
			pos += " ";
			/* falls through */
		case "-n":
			if ( startsWith(value, neg) ) {
				ret = [ "-", value.substr(neg.length) ];
			}
			else if ( startsWith(value, pos) ) {
				ret = [ "+", value.substr(pos.length) ];
			}
			break;
		case "(n)":
			if ( startsWith(value, "(") && endsWith(value, ")") ) {
				ret = [ "-", value.substr(1, value.length - 2) ];
			}
			break;
	}
	return ret || [ "", value ];
};

//
// public instance functions
//

Globalize.prototype.findClosestCulture = function( cultureSelector ) {
	return Globalize.findClosestCulture.call( this, cultureSelector );
};

Globalize.prototype.format = function( value, format, cultureSelector ) {
	return Globalize.format.call( this, value, format, cultureSelector );
};

Globalize.prototype.localize = function( key, cultureSelector ) {
	return Globalize.localize.call( this, key, cultureSelector );
};

Globalize.prototype.parseInt = function( value, radix, cultureSelector ) {
	return Globalize.parseInt.call( this, value, radix, cultureSelector );
};

Globalize.prototype.parseFloat = function( value, radix, cultureSelector ) {
	return Globalize.parseFloat.call( this, value, radix, cultureSelector );
};

Globalize.prototype.culture = function( cultureSelector ) {
	return Globalize.culture.call( this, cultureSelector );
};

//
// public singleton functions
//

Globalize.addCultureInfo = function( cultureName, baseCultureName, info ) {

	var base = {},
		isNew = false;

	if ( typeof cultureName !== "string" ) {
		// cultureName argument is optional string. If not specified, assume info is first
		// and only argument. Specified info deep-extends current culture.
		info = cultureName;
		cultureName = this.culture().name;
		base = this.cultures[ cultureName ];
	} else if ( typeof baseCultureName !== "string" ) {
		// baseCultureName argument is optional string. If not specified, assume info is second
		// argument. Specified info deep-extends specified culture.
		// If specified culture does not exist, create by deep-extending default
		info = baseCultureName;
		isNew = ( this.cultures[ cultureName ] == null );
		base = this.cultures[ cultureName ] || this.cultures[ "default" ];
	} else {
		// cultureName and baseCultureName specified. Assume a new culture is being created
		// by deep-extending an specified base culture
		isNew = true;
		base = this.cultures[ baseCultureName ];
	}

	this.cultures[ cultureName ] = extend(true, {},
		base,
		info
	);
	// Make the standard calendar the current culture if it's a new culture
	if ( isNew ) {
		this.cultures[ cultureName ].calendar = this.cultures[ cultureName ].calendars.standard;
	}
};

Globalize.findClosestCulture = function( name ) {
	var match;
	if ( !name ) {
		return this.findClosestCulture( this.cultureSelector ) || this.cultures[ "default" ];
	}
	if ( typeof name === "string" ) {
		name = name.split( "," );
	}
	if ( isArray(name) ) {
		var lang,
			cultures = this.cultures,
			list = name,
			i, l = list.length,
			prioritized = [];
		for ( i = 0; i < l; i++ ) {
			name = trim( list[i] );
			var pri, parts = name.split( ";" );
			lang = trim( parts[0] );
			if ( parts.length === 1 ) {
				pri = 1;
			}
			else {
				name = trim( parts[1] );
				if ( name.indexOf("q=") === 0 ) {
					name = name.substr( 2 );
					pri = parseFloat( name );
					pri = isNaN( pri ) ? 0 : pri;
				}
				else {
					pri = 1;
				}
			}
			prioritized.push({ lang: lang, pri: pri });
		}
		prioritized.sort(function( a, b ) {
			if ( a.pri < b.pri ) {
				return 1;
			} else if ( a.pri > b.pri ) {
				return -1;
			}
			return 0;
		});
		// exact match
		for ( i = 0; i < l; i++ ) {
			lang = prioritized[ i ].lang;
			match = cultures[ lang ];
			if ( match ) {
				return match;
			}
		}

		// neutral language match
		for ( i = 0; i < l; i++ ) {
			lang = prioritized[ i ].lang;
			do {
				var index = lang.lastIndexOf( "-" );
				if ( index === -1 ) {
					break;
				}
				// strip off the last part. e.g. en-US => en
				lang = lang.substr( 0, index );
				match = cultures[ lang ];
				if ( match ) {
					return match;
				}
			}
			while ( 1 );
		}

		// last resort: match first culture using that language
		for ( i = 0; i < l; i++ ) {
			lang = prioritized[ i ].lang;
			for ( var cultureKey in cultures ) {
				var culture = cultures[ cultureKey ];
				if ( culture.language == lang ) {
					return culture;
				}
			}
		}
	}
	else if ( typeof name === "object" ) {
		return name;
	}
	return match || null;
};

Globalize.format = function( value, format, cultureSelector ) {
	var culture = this.findClosestCulture( cultureSelector );
	if ( value instanceof Date ) {
		value = formatDate( value, format, culture );
	}
	else if ( typeof value === "number" ) {
		value = formatNumber( value, format, culture );
	}
	return value;
};

Globalize.localize = function( key, cultureSelector ) {
	return this.findClosestCulture( cultureSelector ).messages[ key ] ||
		this.cultures[ "default" ].messages[ key ];
};

Globalize.parseDate = function( value, formats, culture ) {
	culture = this.findClosestCulture( culture );

	var date, prop, patterns;
	if ( formats ) {
		if ( typeof formats === "string" ) {
			formats = [ formats ];
		}
		if ( formats.length ) {
			for ( var i = 0, l = formats.length; i < l; i++ ) {
				var format = formats[ i ];
				if ( format ) {
					date = parseExact( value, format, culture );
					if ( date ) {
						break;
					}
				}
			}
		}
	} else {
		patterns = culture.calendar.patterns;
		for ( prop in patterns ) {
			date = parseExact( value, patterns[prop], culture );
			if ( date ) {
				break;
			}
		}
	}

	return date || null;
};

Globalize.parseInt = function( value, radix, cultureSelector ) {
	return truncate( Globalize.parseFloat(value, radix, cultureSelector) );
};

Globalize.parseFloat = function( value, radix, cultureSelector ) {
	// radix argument is optional
	if ( typeof radix !== "number" ) {
		cultureSelector = radix;
		radix = 10;
	}

	var culture = this.findClosestCulture( cultureSelector );
	var ret = NaN,
		nf = culture.numberFormat;

	if ( value.indexOf(culture.numberFormat.currency.symbol) > -1 ) {
		// remove currency symbol
		value = value.replace( culture.numberFormat.currency.symbol, "" );
		// replace decimal seperator
		value = value.replace( culture.numberFormat.currency["."], culture.numberFormat["."] );
	}

	// trim leading and trailing whitespace
	value = trim( value );

	// allow infinity or hexidecimal
	if ( regexInfinity.test(value) ) {
		ret = parseFloat( value );
	}
	else if ( !radix && regexHex.test(value) ) {
		ret = parseInt( value, 16 );
	}
	else {

		// determine sign and number
		var signInfo = parseNegativePattern( value, nf, nf.pattern[0] ),
			sign = signInfo[ 0 ],
			num = signInfo[ 1 ];

		// #44 - try parsing as "(n)"
		if ( sign === "" && nf.pattern[0] !== "(n)" ) {
			signInfo = parseNegativePattern( value, nf, "(n)" );
			sign = signInfo[ 0 ];
			num = signInfo[ 1 ];
		}

		// try parsing as "-n"
		if ( sign === "" && nf.pattern[0] !== "-n" ) {
			signInfo = parseNegativePattern( value, nf, "-n" );
			sign = signInfo[ 0 ];
			num = signInfo[ 1 ];
		}

		sign = sign || "+";

		// determine exponent and number
		var exponent,
			intAndFraction,
			exponentPos = num.indexOf( "e" );
		if ( exponentPos < 0 ) exponentPos = num.indexOf( "E" );
		if ( exponentPos < 0 ) {
			intAndFraction = num;
			exponent = null;
		}
		else {
			intAndFraction = num.substr( 0, exponentPos );
			exponent = num.substr( exponentPos + 1 );
		}
		// determine decimal position
		var integer,
			fraction,
			decSep = nf[ "." ],
			decimalPos = intAndFraction.indexOf( decSep );
		if ( decimalPos < 0 ) {
			integer = intAndFraction;
			fraction = null;
		}
		else {
			integer = intAndFraction.substr( 0, decimalPos );
			fraction = intAndFraction.substr( decimalPos + decSep.length );
		}
		// handle groups (e.g. 1,000,000)
		var groupSep = nf[ "," ];
		integer = integer.split( groupSep ).join( "" );
		var altGroupSep = groupSep.replace( /\u00A0/g, " " );
		if ( groupSep !== altGroupSep ) {
			integer = integer.split( altGroupSep ).join( "" );
		}
		// build a natively parsable number string
		var p = sign + integer;
		if ( fraction !== null ) {
			p += "." + fraction;
		}
		if ( exponent !== null ) {
			// exponent itself may have a number patternd
			var expSignInfo = parseNegativePattern( exponent, nf, "-n" );
			p += "e" + ( expSignInfo[0] || "+" ) + expSignInfo[ 1 ];
		}
		if ( regexParseFloat.test(p) ) {
			ret = parseFloat( p );
		}
	}
	return ret;
};

Globalize.culture = function( cultureSelector ) {
	// setter
	if ( typeof cultureSelector !== "undefined" ) {
		this.cultureSelector = cultureSelector;
	}
	// getter
	return this.findClosestCulture( cultureSelector ) || this.cultures[ "default" ];
};

}( this ));

/*
 * Globalize Cultures
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {

var Globalize;

if ( typeof require !== "undefined" &&
	typeof exports !== "undefined" &&
	typeof module !== "undefined" ) {
	// Assume CommonJS
	Globalize = require( "globalize" );
} else {
	// Global variable
	Globalize = window.Globalize;
}

Globalize.addCultureInfo( "ar", "default", {
	name: "ar",
	englishName: "Arabic",
	nativeName: "العربية",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ر.س.\u200f"
		}
	},
	calendars: {
		standard: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "bg", "default", {
	name: "bg",
	englishName: "Bulgarian",
	nativeName: "български",
	language: "bg",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "- безкрайност",
		positiveInfinity: "+ безкрайност",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "лв."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"],
				namesAbbr: ["нед","пон","вт","ср","четв","пет","съб"],
				namesShort: ["н","п","в","с","ч","п","с"]
			},
			months: {
				names: ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември",""],
				namesAbbr: ["ян","февр","март","апр","май","юни","юли","авг","септ","окт","ноември","дек",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"след новата ера","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy 'г.'",
				D: "dd MMMM yyyy 'г.'",
				t: "HH:mm 'ч.'",
				T: "HH:mm:ss 'ч.'",
				f: "dd MMMM yyyy 'г.' HH:mm 'ч.'",
				F: "dd MMMM yyyy 'г.' HH:mm:ss 'ч.'",
				M: "dd MMMM",
				Y: "MMMM yyyy 'г.'"
			}
		}
	}
});

Globalize.addCultureInfo( "ca", "default", {
	name: "ca",
	englishName: "Catalan",
	nativeName: "català",
	language: "ca",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinit",
		positiveInfinity: "Infinit",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],
				namesAbbr: ["dg.","dl.","dt.","dc.","dj.","dv.","ds."],
				namesShort: ["dg","dl","dt","dc","dj","dv","ds"]
			},
			months: {
				names: ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre",""],
				namesAbbr: ["gen","feb","març","abr","maig","juny","jul","ag","set","oct","nov","des",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' / 'MMMM' / 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' / 'MMMM' / 'yyyy HH:mm",
				F: "dddd, d' / 'MMMM' / 'yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' / 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-Hans", "default", {
	name: "zh-Hans",
	englishName: "Chinese (Simplified)",
	nativeName: "中文(简体)",
	language: "zh-Hans",
	numberFormat: {
		"NaN": "非数字",
		negativeInfinity: "负无穷大",
		positiveInfinity: "正无穷大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "cs", "default", {
	name: "cs",
	englishName: "Czech",
	nativeName: "čeština",
	language: "cs",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Není číslo",
		negativeInfinity: "-nekonečno",
		positiveInfinity: "+nekonečno",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Kč"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"],
				namesAbbr: ["ne","po","út","st","čt","pá","so"],
				namesShort: ["ne","po","út","st","čt","pá","so"]
			},
			months: {
				names: ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			monthsGenitive: {
				names: ["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["dop.","dop.","DOP."],
			PM: ["odp.","odp.","ODP."],
			eras: [{"name":"n. l.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "da", "default", {
	name: "da",
	englishName: "Danish",
	nativeName: "dansk",
	language: "da",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
				namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
				namesShort: ["sø","ma","ti","on","to","fr","lø"]
			},
			months: {
				names: ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "de", "default", {
	name: "de",
	englishName: "German",
	nativeName: "Deutsch",
	language: "de",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "el", "default", {
	name: "el",
	englishName: "Greek",
	nativeName: "Ελληνικά",
	language: "el",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "μη αριθμός",
		negativeInfinity: "-Άπειρο",
		positiveInfinity: "Άπειρο",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"],
				namesAbbr: ["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],
				namesShort: ["Κυ","Δε","Τρ","Τε","Πε","Πα","Σά"]
			},
			months: {
				names: ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος",""],
				namesAbbr: ["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ",""]
			},
			monthsGenitive: {
				names: ["Ιανουαρίου","Φεβρουαρίου","Μαρτίου","Απριλίου","Μαΐου","Ιουνίου","Ιουλίου","Αυγούστου","Σεπτεμβρίου","Οκτωβρίου","Νοεμβρίου","Δεκεμβρίου",""],
				namesAbbr: ["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ",""]
			},
			AM: ["πμ","πμ","ΠΜ"],
			PM: ["μμ","μμ","ΜΜ"],
			eras: [{"name":"μ.Χ.","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "dddd, d MMMM yyyy",
				f: "dddd, d MMMM yyyy h:mm tt",
				F: "dddd, d MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es", "default", {
	name: "es",
	englishName: "Spanish",
	nativeName: "español",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fi", "default", {
	name: "fi",
	englishName: "Finnish",
	nativeName: "suomi",
	language: "fi",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],
				namesAbbr: ["su","ma","ti","ke","to","pe","la"],
				namesShort: ["su","ma","ti","ke","to","pe","la"]
			},
			months: {
				names: ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu",""],
				namesAbbr: ["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM'ta 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM'ta 'yyyy H:mm",
				F: "d. MMMM'ta 'yyyy H:mm:ss",
				M: "d. MMMM'ta'",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr", "default", {
	name: "fr",
	englishName: "French",
	nativeName: "français",
	language: "fr",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "he", "default", {
	name: "he",
	englishName: "Hebrew",
	nativeName: "עברית",
	language: "he",
	isRTL: true,
	numberFormat: {
		"NaN": "לא מספר",
		negativeInfinity: "אינסוף שלילי",
		positiveInfinity: "אינסוף חיובי",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "₪"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
				namesAbbr: ["יום א","יום ב","יום ג","יום ד","יום ה","יום ו","שבת"],
				namesShort: ["א","ב","ג","ד","ה","ו","ש"]
			},
			months: {
				names: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר",""],
				namesAbbr: ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ",""]
			},
			eras: [{"name":"לספירה","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd dd MMMM yyyy HH:mm",
				F: "dddd dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		},
		Hebrew: {
			name: "Hebrew",
			"/": " ",
			days: {
				names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
				namesAbbr: ["א","ב","ג","ד","ה","ו","ש"],
				namesShort: ["א","ב","ג","ד","ה","ו","ש"]
			},
			months: {
				names: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"],
				namesAbbr: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"]
			},
			eras: [{"name":"C.E.","start":null,"offset":0}],
			twoDigitYearMax: 5790,
			patterns: {
				d: "dd MMMM yyyy",
				D: "dddd dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd dd MMMM yyyy HH:mm",
				F: "dddd dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hu", "default", {
	name: "hu",
	englishName: "Hungarian",
	nativeName: "magyar",
	language: "hu",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "nem szám",
		negativeInfinity: "negatív végtelen",
		positiveInfinity: "végtelen",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Ft"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],
				namesAbbr: ["V","H","K","Sze","Cs","P","Szo"],
				namesShort: ["V","H","K","Sze","Cs","P","Szo"]
			},
			months: {
				names: ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december",""],
				namesAbbr: ["jan.","febr.","márc.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec.",""]
			},
			AM: ["de.","de.","DE."],
			PM: ["du.","du.","DU."],
			eras: [{"name":"i.sz.","start":null,"offset":0}],
			patterns: {
				d: "yyyy.MM.dd.",
				D: "yyyy. MMMM d.",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy. MMMM d. H:mm",
				F: "yyyy. MMMM d. H:mm:ss",
				M: "MMMM d.",
				Y: "yyyy. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "is", "default", {
	name: "is",
	englishName: "Icelandic",
	nativeName: "íslenska",
	language: "is",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			decimals: 0,
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"],
				namesAbbr: ["sun.","mán.","þri.","mið.","fim.","fös.","lau."],
				namesShort: ["su","má","þr","mi","fi","fö","la"]
			},
			months: {
				names: ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember",""],
				namesAbbr: ["jan.","feb.","mar.","apr.","maí","jún.","júl.","ágú.","sep.","okt.","nóv.","des.",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "it", "default", {
	name: "it",
	englishName: "Italian",
	nativeName: "italiano",
	language: "it",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "Non un numero reale",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
				namesAbbr: ["dom","lun","mar","mer","gio","ven","sab"],
				namesShort: ["do","lu","ma","me","gi","ve","sa"]
			},
			months: {
				names: ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],
				namesAbbr: ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ja", "default", {
	name: "ja",
	englishName: "Japanese",
	nativeName: "日本語",
	language: "ja",
	numberFormat: {
		"NaN": "NaN (非数値)",
		negativeInfinity: "-∞",
		positiveInfinity: "+∞",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["-$n","$n"],
			decimals: 0,
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
				namesAbbr: ["日","月","火","水","木","金","土"],
				namesShort: ["日","月","火","水","木","金","土"]
			},
			months: {
				names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["午前","午前","午前"],
			PM: ["午後","午後","午後"],
			eras: [{"name":"西暦","start":null,"offset":0}],
			patterns: {
				d: "yyyy/MM/dd",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		},
		Japanese: {
			name: "Japanese",
			days: {
				names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
				namesAbbr: ["日","月","火","水","木","金","土"],
				namesShort: ["日","月","火","水","木","金","土"]
			},
			months: {
				names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["午前","午前","午前"],
			PM: ["午後","午後","午後"],
			eras: [{"name":"平成","start":null,"offset":1867},{"name":"昭和","start":-1812153600000,"offset":1911},{"name":"大正","start":-1357603200000,"offset":1925},{"name":"明治","start":60022080000,"offset":1988}],
			twoDigitYearMax: 99,
			patterns: {
				d: "gg y/M/d",
				D: "gg y'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "gg y'年'M'月'd'日' H:mm",
				F: "gg y'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "gg y'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "ko", "default", {
	name: "ko",
	englishName: "Korean",
	nativeName: "한국어",
	language: "ko",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			decimals: 0,
			symbol: "₩"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
				namesAbbr: ["일","월","화","수","목","금","토"],
				namesShort: ["일","월","화","수","목","금","토"]
			},
			months: {
				names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["오전","오전","오전"],
			PM: ["오후","오후","오후"],
			eras: [{"name":"서기","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy'년' M'월' d'일' dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "yyyy'년' M'월' d'일' dddd tt h:mm",
				F: "yyyy'년' M'월' d'일' dddd tt h:mm:ss",
				M: "M'월' d'일'",
				Y: "yyyy'년' M'월'"
			}
		},
		Korean: {
			name: "Korean",
			"/": "-",
			days: {
				names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
				namesAbbr: ["일","월","화","수","목","금","토"],
				namesShort: ["일","월","화","수","목","금","토"]
			},
			months: {
				names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["오전","오전","오전"],
			PM: ["오후","오후","오후"],
			eras: [{"name":"단기","start":null,"offset":-2333}],
			twoDigitYearMax: 4362,
			patterns: {
				d: "gg yyyy-MM-dd",
				D: "gg yyyy'년' M'월' d'일' dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "gg yyyy'년' M'월' d'일' dddd tt h:mm",
				F: "gg yyyy'년' M'월' d'일' dddd tt h:mm:ss",
				M: "M'월' d'일'",
				Y: "gg yyyy'년' M'월'"
			}
		}
	}
});

Globalize.addCultureInfo( "nl", "default", {
	name: "nl",
	englishName: "Dutch",
	nativeName: "Nederlands",
	language: "nl",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],
				namesAbbr: ["zo","ma","di","wo","do","vr","za"],
				namesShort: ["zo","ma","di","wo","do","vr","za"]
			},
			months: {
				names: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d-M-yyyy",
				D: "dddd d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd d MMMM yyyy H:mm",
				F: "dddd d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "no", "default", {
	name: "no",
	englishName: "Norwegian",
	nativeName: "norsk",
	language: "no",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
				namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
				namesShort: ["sø","ma","ti","on","to","fr","lø"]
			},
			months: {
				names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "pl", "default", {
	name: "pl",
	englishName: "Polish",
	nativeName: "polski",
	language: "pl",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "nie jest liczbą",
		negativeInfinity: "-nieskończoność",
		positiveInfinity: "+nieskończoność",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "zł"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
				namesAbbr: ["N","Pn","Wt","Śr","Cz","Pt","So"],
				namesShort: ["N","Pn","Wt","Śr","Cz","Pt","So"]
			},
			months: {
				names: ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień",""],
				namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
			},
			monthsGenitive: {
				names: ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia",""],
				namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "pt", "default", {
	name: "pt",
	englishName: "Portuguese",
	nativeName: "Português",
	language: "pt",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NaN (Não é um número)",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ",",
			symbol: "R$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
				namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
				namesShort: ["D","S","T","Q","Q","S","S"]
			},
			months: {
				names: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro",""],
				namesAbbr: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' de 'MMMM' de 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
				F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
				M: "dd' de 'MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "rm", "default", {
	name: "rm",
	englishName: "Romansh",
	nativeName: "Rumantsch",
	language: "rm",
	numberFormat: {
		",": "'",
		"NaN": "betg def.",
		negativeInfinity: "-infinit",
		positiveInfinity: "+infinit",
		percent: {
			pattern: ["-n%","n%"],
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "fr."
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
				namesAbbr: ["du","gli","ma","me","gie","ve","so"],
				namesShort: ["du","gli","ma","me","gie","ve","so"]
			},
			months: {
				names: ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december",""],
				namesAbbr: ["schan","favr","mars","avr","matg","zercl","fan","avust","sett","oct","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"s. Cr.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d MMMM yyyy HH:mm",
				F: "dddd, d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ro", "default", {
	name: "ro",
	englishName: "Romanian",
	nativeName: "română",
	language: "ro",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "lei"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["duminică","luni","marţi","miercuri","joi","vineri","sâmbătă"],
				namesAbbr: ["D","L","Ma","Mi","J","V","S"],
				namesShort: ["D","L","Ma","Mi","J","V","S"]
			},
			months: {
				names: ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie",""],
				namesAbbr: ["ian.","feb.","mar.","apr.","mai.","iun.","iul.","aug.","sep.","oct.","nov.","dec.",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ru", "default", {
	name: "ru",
	englishName: "Russian",
	nativeName: "русский",
	language: "ru",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
				namesAbbr: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
				namesShort: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]
			},
			months: {
				names: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			monthsGenitive: {
				names: ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",""],
				namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy 'г.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'г.' H:mm",
				F: "d MMMM yyyy 'г.' H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hr", "default", {
	name: "hr",
	englishName: "Croatian",
	nativeName: "hrvatski",
	language: "hr",
	numberFormat: {
		pattern: ["- n"],
		",": ".",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kn"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			monthsGenitive: {
				names: ["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy.",
				D: "d. MMMM yyyy.",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy. H:mm",
				F: "d. MMMM yyyy. H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sk", "default", {
	name: "sk",
	englishName: "Slovak",
	nativeName: "slovenčina",
	language: "sk",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Nie je číslo",
		negativeInfinity: "-nekonečno",
		positiveInfinity: "+nekonečno",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],
				namesAbbr: ["ne","po","ut","st","št","pi","so"],
				namesShort: ["ne","po","ut","st","št","pi","so"]
			},
			months: {
				names: ["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			monthsGenitive: {
				names: ["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. l.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sq", "default", {
	name: "sq",
	englishName: "Albanian",
	nativeName: "shqipe",
	language: "sq",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-infinit",
		positiveInfinity: "infinit",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": ".",
			".": ",",
			symbol: "Lek"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],
				namesAbbr: ["Die","Hën","Mar","Mër","Enj","Pre","Sht"],
				namesShort: ["Di","Hë","Ma","Më","En","Pr","Sh"]
			},
			months: {
				names: ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor",""],
				namesAbbr: ["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gsh","Sht","Tet","Nën","Dhj",""]
			},
			AM: ["PD","pd","PD"],
			PM: ["MD","md","MD"],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy-MM-dd",
				t: "h:mm.tt",
				T: "h:mm:ss.tt",
				f: "yyyy-MM-dd h:mm.tt",
				F: "yyyy-MM-dd h:mm:ss.tt",
				Y: "yyyy-MM"
			}
		}
	}
});

Globalize.addCultureInfo( "sv", "default", {
	name: "sv",
	englishName: "Swedish",
	nativeName: "svenska",
	language: "sv",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
				namesAbbr: ["sö","må","ti","on","to","fr","lö"],
				namesShort: ["sö","må","ti","on","to","fr","lö"]
			},
			months: {
				names: ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "'den 'd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "'den 'd MMMM yyyy HH:mm",
				F: "'den 'd MMMM yyyy HH:mm:ss",
				M: "'den 'd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "th", "default", {
	name: "th",
	englishName: "Thai",
	nativeName: "ไทย",
	language: "th",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "฿"
		}
	},
	calendars: {
		standard: {
			name: "ThaiBuddhist",
			firstDay: 1,
			days: {
				names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
				namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
				namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			eras: [{"name":"พ.ศ.","start":null,"offset":-543}],
			twoDigitYearMax: 2572,
			patterns: {
				d: "d/M/yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		},
		Gregorian_Localized: {
			firstDay: 1,
			days: {
				names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
				namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
				namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "'วัน'dddd'ที่' d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "'วัน'dddd'ที่' d MMMM yyyy H:mm",
				F: "'วัน'dddd'ที่' d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tr", "default", {
	name: "tr",
	englishName: "Turkish",
	nativeName: "Türkçe",
	language: "tr",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "TL"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
				namesAbbr: ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
				namesShort: ["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]
			},
			months: {
				names: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",""],
				namesAbbr: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "dd MMMM yyyy dddd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy dddd HH:mm",
				F: "dd MMMM yyyy dddd HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ur", "default", {
	name: "ur",
	englishName: "Urdu",
	nativeName: "اُردو",
	language: "ur",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["$n-","$n"],
			symbol: "Rs"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["اتوار","پير","منگل","بدھ","جمعرات","جمعه","هفته"],
				namesAbbr: ["اتوار","پير","منگل","بدھ","جمعرات","جمعه","هفته"],
				namesShort: ["ا","پ","م","ب","ج","ج","ه"]
			},
			months: {
				names: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
				namesAbbr: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""]
			},
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				f: "dd MMMM, yyyy h:mm tt",
				F: "dd MMMM, yyyy h:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		}
	}
});

Globalize.addCultureInfo( "id", "default", {
	name: "id",
	englishName: "Indonesian",
	nativeName: "Bahasa Indonesia",
	language: "id",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			decimals: 0,
			",": ".",
			".": ",",
			symbol: "Rp"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
				namesAbbr: ["Minggu","Sen","Sel","Rabu","Kamis","Jumat","Sabtu"],
				namesShort: ["M","S","S","R","K","J","S"]
			},
			months: {
				names: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember",""],
				namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agust","Sep","Okt","Nop","Des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM yyyy H:mm",
				F: "dd MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "uk", "default", {
	name: "uk",
	englishName: "Ukrainian",
	nativeName: "українська",
	language: "uk",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-безмежність",
		positiveInfinity: "безмежність",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "₴"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["неділя","понеділок","вівторок","середа","четвер","п'ятниця","субота"],
				namesAbbr: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],
				namesShort: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]
			},
			months: {
				names: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",""],
				namesAbbr: ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру",""]
			},
			monthsGenitive: {
				names: ["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня",""],
				namesAbbr: ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy' р.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy' р.' H:mm",
				F: "d MMMM yyyy' р.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy' р.'"
			}
		}
	}
});

Globalize.addCultureInfo( "be", "default", {
	name: "be",
	englishName: "Belarusian",
	nativeName: "Беларускі",
	language: "be",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"],
				namesAbbr: ["нд","пн","аў","ср","чц","пт","сб"],
				namesShort: ["нд","пн","аў","ср","чц","пт","сб"]
			},
			months: {
				names: ["Студзень","Люты","Сакавік","Красавік","Май","Чэрвень","Ліпень","Жнівень","Верасень","Кастрычнік","Лістапад","Снежань",""],
				namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
			},
			monthsGenitive: {
				names: ["студзеня","лютага","сакавіка","красавіка","мая","чэрвеня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня",""],
				namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sl", "default", {
	name: "sl",
	englishName: "Slovenian",
	nativeName: "slovenski",
	language: "sl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-neskončnost",
		positiveInfinity: "neskončnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],
				namesAbbr: ["ned","pon","tor","sre","čet","pet","sob"],
				namesShort: ["ne","po","to","sr","če","pe","so"]
			},
			months: {
				names: ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "et", "default", {
	name: "et",
	englishName: "Estonian",
	nativeName: "eesti",
	language: "et",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "avaldamatu",
		negativeInfinity: "miinuslõpmatus",
		positiveInfinity: "plusslõpmatus",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],
				namesAbbr: ["P","E","T","K","N","R","L"],
				namesShort: ["P","E","T","K","N","R","L"]
			},
			months: {
				names: ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember",""],
				namesAbbr: ["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets",""]
			},
			AM: ["EL","el","EL"],
			PM: ["PL","pl","PL"],
			patterns: {
				d: "d.MM.yyyy",
				D: "d. MMMM yyyy'. a.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy'. a.' H:mm",
				F: "d. MMMM yyyy'. a.' H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy'. a.'"
			}
		}
	}
});

Globalize.addCultureInfo( "lv", "default", {
	name: "lv",
	englishName: "Latvian",
	nativeName: "latviešu",
	language: "lv",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-bezgalība",
		positiveInfinity: "bezgalība",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": " ",
			".": ",",
			symbol: "Ls"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
				namesAbbr: ["sv","pr","ot","tr","ce","pk","se"],
				namesShort: ["sv","pr","ot","tr","ce","pk","se"]
			},
			months: {
				names: ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
			},
			monthsGenitive: {
				names: ["janvārī","februārī","martā","aprīlī","maijā","jūnijā","jūlijā","augustā","septembrī","oktobrī","novembrī","decembrī",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy.MM.dd.",
				D: "dddd, yyyy'. gada 'd. MMMM",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, yyyy'. gada 'd. MMMM H:mm",
				F: "dddd, yyyy'. gada 'd. MMMM H:mm:ss",
				M: "d. MMMM",
				Y: "yyyy. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "lt", "default", {
	name: "lt",
	englishName: "Lithuanian",
	nativeName: "lietuvių",
	language: "lt",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-begalybė",
		positiveInfinity: "begalybė",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Lt"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
				namesAbbr: ["Sk","Pr","An","Tr","Kt","Pn","Št"],
				namesShort: ["S","P","A","T","K","Pn","Š"]
			},
			months: {
				names: ["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis",""],
				namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
			},
			monthsGenitive: {
				names: ["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio",""],
				namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy.MM.dd",
				D: "yyyy 'm.' MMMM d 'd.'",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'm.' MMMM d 'd.' HH:mm",
				F: "yyyy 'm.' MMMM d 'd.' HH:mm:ss",
				M: "MMMM d 'd.'",
				Y: "yyyy 'm.' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "tg", "default", {
	name: "tg",
	englishName: "Tajik",
	nativeName: "Тоҷикӣ",
	language: "tg",
	numberFormat: {
		",": " ",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			groupSizes: [3,0],
			",": " ",
			".": ";",
			symbol: "т.р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			days: {
				names: ["Яш","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
				namesAbbr: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"],
				namesShort: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"]
			},
			months: {
				names: ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["январи","феврали","марти","апрели","маи","июни","июли","августи","сентябри","октябри","ноябри","декабри",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fa", "default", {
	name: "fa",
	englishName: "Persian",
	nativeName: "فارسى",
	language: "fa",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		currency: {
			pattern: ["$n-","$ n"],
			".": "/",
			symbol: "ريال"
		}
	},
	calendars: {
		standard: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["ژانويه","فوريه","مارس","آوريل","مى","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر",""],
				namesAbbr: ["ژانويه","فوريه","مارس","آوريل","مى","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			patterns: {
				d: "yyyy/MM/dd",
				D: "yyyy/MM/dd",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "yyyy/MM/dd hh:mm tt",
				F: "yyyy/MM/dd hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "vi", "default", {
	name: "vi",
	englishName: "Vietnamese",
	nativeName: "Tiếng Việt",
	language: "vi",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "₫"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"],
				namesAbbr: ["CN","Hai","Ba","Tư","Năm","Sáu","Bảy"],
				namesShort: ["C","H","B","T","N","S","B"]
			},
			months: {
				names: ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai",""],
				namesAbbr: ["Thg1","Thg2","Thg3","Thg4","Thg5","Thg6","Thg7","Thg8","Thg9","Thg10","Thg11","Thg12",""]
			},
			AM: ["SA","sa","SA"],
			PM: ["CH","ch","CH"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				f: "dd MMMM yyyy h:mm tt",
				F: "dd MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hy", "default", {
	name: "hy",
	englishName: "Armenian",
	nativeName: "Հայերեն",
	language: "hy",
	numberFormat: {
		currency: {
			pattern: ["-n $","n $"],
			symbol: "դր."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","ՈՒրբաթ","Շաբաթ"],
				namesAbbr: ["Կիր","Երկ","Երք","Չրք","Հնգ","ՈՒր","Շբթ"],
				namesShort: ["Կ","Ե","Ե","Չ","Հ","Ո","Շ"]
			},
			months: {
				names: ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր",""],
				namesAbbr: ["ՀՆՎ","ՓՏՎ","ՄՐՏ","ԱՊՐ","ՄՅՍ","ՀՆՍ","ՀԼՍ","ՕԳՍ","ՍԵՊ","ՀՈԿ","ՆՈՅ","ԴԵԿ",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM, yyyy H:mm",
				F: "d MMMM, yyyy H:mm:ss",
				M: "d MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "az", "default", {
	name: "az",
	englishName: "Azeri",
	nativeName: "Azərbaycan\xadılı",
	language: "az",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "man."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],
				namesAbbr: ["B","Be","Ça","Ç","Ca","C","Ş"],
				namesShort: ["B","Be","Ça","Ç","Ca","C","Ş"]
			},
			months: {
				names: ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			monthsGenitive: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "eu", "default", {
	name: "eu",
	englishName: "Basque",
	nativeName: "euskara",
	language: "eu",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "EdZ",
		negativeInfinity: "-Infinitu",
		positiveInfinity: "Infinitu",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
				namesAbbr: ["ig.","al.","as.","az.","og.","or.","lr."],
				namesShort: ["ig","al","as","az","og","or","lr"]
			},
			months: {
				names: ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua",""],
				namesAbbr: ["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "yyyy/MM/dd",
				D: "dddd, yyyy.'eko' MMMM'k 'd",
				t: "HH:mm",
				T: "H:mm:ss",
				f: "dddd, yyyy.'eko' MMMM'k 'd HH:mm",
				F: "dddd, yyyy.'eko' MMMM'k 'd H:mm:ss",
				Y: "yyyy.'eko' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "hsb", "default", {
	name: "hsb",
	englishName: "Upper Sorbian",
	nativeName: "hornjoserbšćina",
	language: "hsb",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "njedefinowane",
		negativeInfinity: "-njekónčne",
		positiveInfinity: "+njekónčne",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["njedźela","póndźela","wutora","srjeda","štwórtk","pjatk","sobota"],
				namesAbbr: ["nje","pón","wut","srj","štw","pja","sob"],
				namesShort: ["n","p","w","s","š","p","s"]
			},
			months: {
				names: ["januar","februar","měrc","apryl","meja","junij","julij","awgust","september","oktober","nowember","december",""],
				namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
			},
			monthsGenitive: {
				names: ["januara","februara","měrca","apryla","meje","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],
				namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"po Chr.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "dddd, 'dnja' d. MMMM yyyy",
				t: "H.mm 'hodź.'",
				T: "H:mm:ss",
				f: "dddd, 'dnja' d. MMMM yyyy H.mm 'hodź.'",
				F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "mk", "default", {
	name: "mk",
	englishName: "Macedonian (FYROM)",
	nativeName: "македонски јазик",
	language: "mk",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "ден."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
				namesAbbr: ["нед","пон","втр","срд","чет","пет","саб"],
				namesShort: ["не","по","вт","ср","че","пе","са"]
			},
			months: {
				names: ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември",""],
				namesAbbr: ["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, dd MMMM yyyy HH:mm",
				F: "dddd, dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tn", "default", {
	name: "tn",
	englishName: "Setswana",
	nativeName: "Setswana",
	language: "tn",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Latshipi","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Lamatlhatso"],
				namesAbbr: ["Ltp.","Mos.","Lbd.","Lbr.","Lbn.","Lbt.","Lmt."],
				namesShort: ["Lp","Ms","Lb","Lr","Ln","Lt","Lm"]
			},
			months: {
				names: ["Ferikgong","Tlhakole","Mopitloe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole",""],
				namesAbbr: ["Fer.","Tlhak.","Mop.","Mor.","Motsh.","Seet.","Phukw.","Phatw.","Lwets.","Diph.","Ngwan.","Sed.",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "xh", "default", {
	name: "xh",
	englishName: "isiXhosa",
	nativeName: "isiXhosa",
	language: "xh",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["iCawa","uMvulo","uLwesibini","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
				namesShort: ["Ca","Mv","Lb","Lt","Ln","Lh","Mg"]
			},
			months: {
				names: ["Mqungu","Mdumba","Kwindla","Tshazimpuzi","Canzibe","Silimela","Khala","Thupha","Msintsi","Dwarha","Nkanga","Mnga",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zu", "default", {
	name: "zu",
	englishName: "isiZulu",
	nativeName: "isiZulu",
	language: "zu",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["iSonto","uMsombuluko","uLwesibili","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
				namesAbbr: ["Son.","Mso.","Bi.","Tha.","Ne.","Hla.","Mgq."]
			},
			months: {
				names: ["uMasingana","uNhlolanja","uNdasa","uMbaso","uNhlaba","uNhlangulana","uNtulikazi","uNcwaba","uMandulo","uMfumfu","uLwezi","uZibandlela",""],
				namesAbbr: ["Mas.","Nhlo.","Nda.","Mba.","Nhla.","Nhlang.","Ntu.","Ncwa.","Man.","Mfu.","Lwe.","Zib.",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "af", "default", {
	name: "af",
	englishName: "Afrikaans",
	nativeName: "Afrikaans",
	language: "af",
	numberFormat: {
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
				namesAbbr: ["Son","Maan","Dins","Woen","Dond","Vry","Sat"],
				namesShort: ["So","Ma","Di","Wo","Do","Vr","Sa"]
			},
			months: {
				names: ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember",""],
				namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ka", "default", {
	name: "ka",
	englishName: "Georgian",
	nativeName: "ქართული",
	language: "ka",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Lari"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
				namesAbbr: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
				namesShort: ["კ","ო","ს","ო","ხ","პ","შ"]
			},
			months: {
				names: ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი",""],
				namesAbbr: ["იან","თებ","მარ","აპრ","მაის","ივნ","ივლ","აგვ","სექ","ოქტ","ნოემ","დეკ",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "yyyy 'წლის' dd MM, dddd",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'წლის' dd MM, dddd H:mm",
				F: "yyyy 'წლის' dd MM, dddd H:mm:ss",
				M: "dd MM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fo", "default", {
	name: "fo",
	englishName: "Faroese",
	nativeName: "føroyskt",
	language: "fo",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["sunnudagur","mánadagur","týsdagur","mikudagur","hósdagur","fríggjadagur","leygardagur"],
				namesAbbr: ["sun","mán","týs","mik","hós","frí","leyg"],
				namesShort: ["su","má","tý","mi","hó","fr","ley"]
			},
			months: {
				names: ["januar","februar","mars","apríl","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hi", "default", {
	name: "hi",
	englishName: "Hindi",
	nativeName: "हिंदी",
	language: "hi",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
				namesAbbr: ["रवि.","सोम.","मंगल.","बुध.","गुरु.","शुक्र.","शनि."],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""],
				namesAbbr: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""]
			},
			AM: ["पूर्वाह्न","पूर्वाह्न","पूर्वाह्न"],
			PM: ["अपराह्न","अपराह्न","अपराह्न"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mt", "default", {
	name: "mt",
	englishName: "Maltese",
	nativeName: "Malti",
	language: "mt",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],
				namesAbbr: ["Ħad","Tne","Tli","Erb","Ħam","Ġim","Sib"],
				namesShort: ["I","I","I","L","I","I","I"]
			},
			months: {
				names: ["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awissu","Settembru","Ottubru","Novembru","Diċembru",""],
				namesAbbr: ["Jan","Fra","Mar","Apr","Mej","Ġun","Lul","Awi","Set","Ott","Nov","Diċ",""]
			},
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' ta\\' 'MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' ta\\' 'MMMM yyyy HH:mm",
				F: "dddd, d' ta\\' 'MMMM yyyy HH:mm:ss",
				M: "d' ta\\' 'MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "se", "default", {
	name: "se",
	englishName: "Sami (Northern)",
	nativeName: "davvisámegiella",
	language: "se",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorastat","bearjadat","lávvardat"],
				namesAbbr: ["sotn","vuos","maŋ","gask","duor","bear","láv"],
				namesShort: ["s","m","d","g","d","b","l"]
			},
			months: {
				names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			monthsGenitive: {
				names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ga", "default", {
	name: "ga",
	englishName: "Irish",
	nativeName: "Gaeilge",
	language: "ga",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Dé Domhnaigh","Dé Luain","Dé Máirt","Dé Céadaoin","Déardaoin","Dé hAoine","Dé Sathairn"],
				namesAbbr: ["Domh","Luan","Máir","Céad","Déar","Aoi","Sath"],
				namesShort: ["Do","Lu","Má","Cé","De","Ao","Sa"]
			},
			months: {
				names: ["Eanáir","Feabhra","Márta","Aibreán","Bealtaine","Meitheamh","Iúil","Lúnasa","Meán Fómhair","Deireadh Fómhair","Samhain","Nollaig",""],
				namesAbbr: ["Ean","Feabh","Már","Aib","Bealt","Meith","Iúil","Lún","M.Fómh","D.Fómh","Samh","Noll",""]
			},
			AM: ["r.n.","r.n.","R.N."],
			PM: ["i.n.","i.n.","I.N."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ms", "default", {
	name: "ms",
	englishName: "Malay",
	nativeName: "Bahasa Melayu",
	language: "ms",
	numberFormat: {
		currency: {
			decimals: 0,
			symbol: "RM"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
				namesAbbr: ["Ahad","Isnin","Sel","Rabu","Khamis","Jumaat","Sabtu"],
				namesShort: ["A","I","S","R","K","J","S"]
			},
			months: {
				names: ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember",""],
				namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sept","Okt","Nov","Dis",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM yyyy H:mm",
				F: "dd MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kk", "default", {
	name: "kk",
	englishName: "Kazakh",
	nativeName: "Қазақ",
	language: "kk",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-$n","$n"],
			",": " ",
			".": "-",
			symbol: "Т"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Жексенбі","Дүйсенбі","Сейсенбі","Сәрсенбі","Бейсенбі","Жұма","Сенбі"],
				namesAbbr: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"],
				namesShort: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"]
			},
			months: {
				names: ["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан",""],
				namesAbbr: ["Қаң","Ақп","Нау","Сәу","Мам","Мау","Шіл","Там","Қыр","Қаз","Қар","Жел",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy 'ж.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'ж.' H:mm",
				F: "d MMMM yyyy 'ж.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ky", "default", {
	name: "ky",
	englishName: "Kyrgyz",
	nativeName: "Кыргыз",
	language: "ky",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": "-",
			symbol: "сом"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Жекшемби","Дүйшөмбү","Шейшемби","Шаршемби","Бейшемби","Жума","Ишемби"],
				namesAbbr: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"],
				namesShort: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"]
			},
			months: {
				names: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d'-'MMMM yyyy'-ж.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d'-'MMMM yyyy'-ж.' H:mm",
				F: "d'-'MMMM yyyy'-ж.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy'-ж.'"
			}
		}
	}
});

Globalize.addCultureInfo( "sw", "default", {
	name: "sw",
	englishName: "Kiswahili",
	nativeName: "Kiswahili",
	language: "sw",
	numberFormat: {
		currency: {
			symbol: "S"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],
				namesAbbr: ["Jumap.","Jumat.","Juman.","Jumat.","Alh.","Iju.","Jumam."],
				namesShort: ["P","T","N","T","A","I","M"]
			},
			months: {
				names: ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Decemba",""],
				namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Dec",""]
			}
		}
	}
});

Globalize.addCultureInfo( "tk", "default", {
	name: "tk",
	englishName: "Turkmen",
	nativeName: "türkmençe",
	language: "tk",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-üznüksizlik",
		positiveInfinity: "üznüksizlik",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "m."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe","Ýekşenbe"],
				namesAbbr: ["Db","Sb","Çb","Pb","An","Şb","Ýb"],
				namesShort: ["D","S","Ç","P","A","Ş","Ý"]
			},
			months: {
				names: ["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr",""],
				namesAbbr: ["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Not","Dek",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "yyyy 'ý.' MMMM d",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'ý.' MMMM d H:mm",
				F: "yyyy 'ý.' MMMM d H:mm:ss",
				Y: "yyyy 'ý.' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "uz", "default", {
	name: "uz",
	englishName: "Uzbek",
	nativeName: "U'zbek",
	language: "uz",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			decimals: 0,
			",": " ",
			".": ",",
			symbol: "so'm"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],
				namesAbbr: ["yak.","dsh.","sesh.","chr.","psh.","jm.","sh."],
				namesShort: ["ya","d","s","ch","p","j","sh"]
			},
			months: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM yyyy",
				D: "yyyy 'yil' d-MMMM",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'yil' d-MMMM HH:mm",
				F: "yyyy 'yil' d-MMMM HH:mm:ss",
				M: "d-MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tt", "default", {
	name: "tt",
	englishName: "Tatar",
	nativeName: "Татар",
	language: "tt",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Якшәмбе","Дүшәмбе","Сишәмбе","Чәршәмбе","Пәнҗешәмбе","Җомга","Шимбә"],
				namesAbbr: ["Якш","Дүш","Сиш","Чәрш","Пәнҗ","Җом","Шим"],
				namesShort: ["Я","Д","С","Ч","П","Җ","Ш"]
			},
			months: {
				names: ["Гыйнвар","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["Гыйн.","Фев.","Мар.","Апр.","Май","Июнь","Июль","Авг.","Сен.","Окт.","Нояб.","Дек.",""]
			},
			monthsGenitive: {
				names: ["Гыйнварның","Февральнең","Мартның","Апрельнең","Майның","Июньнең","Июльнең","Августның","Сентябрьның","Октябрьның","Ноябрьның","Декабрьның",""],
				namesAbbr: ["Гыйн.-ның","Фев.-нең","Мар.-ның","Апр.-нең","Майның","Июньнең","Июльнең","Авг.-ның","Сен.-ның","Окт.-ның","Нояб.-ның","Дек.-ның",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bn", "default", {
	name: "bn",
	englishName: "Bengali",
	nativeName: "বাংলা",
	language: "bn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			pattern: ["-%n","%n"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "টা"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			":": ".",
			firstDay: 1,
			days: {
				names: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
				namesAbbr: ["রবি.","সোম.","মঙ্গল.","বুধ.","বৃহস্পতি.","শুক্র.","শনি."],
				namesShort: ["র","স","ম","ব","ব","শ","শ"]
			},
			months: {
				names: ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",""],
				namesAbbr: ["জানু.","ফেব্রু.","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ.","সেপ্টে.","অক্টো.","নভে.","ডিসে.",""]
			},
			AM: ["পুর্বাহ্ন","পুর্বাহ্ন","পুর্বাহ্ন"],
			PM: ["অপরাহ্ন","অপরাহ্ন","অপরাহ্ন"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH.mm",
				T: "HH.mm.ss",
				f: "dd MMMM yyyy HH.mm",
				F: "dd MMMM yyyy HH.mm.ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "pa", "default", {
	name: "pa",
	englishName: "Punjabi",
	nativeName: "ਪੰਜਾਬੀ",
	language: "pa",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ਰੁ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁੱਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨਿੱਚਰਵਾਰ"],
				namesAbbr: ["ਐਤ.","ਸੋਮ.","ਮੰਗਲ.","ਬੁੱਧ.","ਵੀਰ.","ਸ਼ੁਕਰ.","ਸ਼ਨਿੱਚਰ."],
				namesShort: ["ਐ","ਸ","ਮ","ਬ","ਵ","ਸ਼","ਸ਼"]
			},
			months: {
				names: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""],
				namesAbbr: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""]
			},
			AM: ["ਸਵੇਰ","ਸਵੇਰ","ਸਵੇਰ"],
			PM: ["ਸ਼ਾਮ","ਸ਼ਾਮ","ਸ਼ਾਮ"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy dddd",
				t: "tt hh:mm",
				T: "tt hh:mm:ss",
				f: "dd MMMM yyyy dddd tt hh:mm",
				F: "dd MMMM yyyy dddd tt hh:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "gu", "default", {
	name: "gu",
	englishName: "Gujarati",
	nativeName: "ગુજરાતી",
	language: "gu",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "રૂ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],
				namesAbbr: ["રવિ","સોમ","મંગળ","બુધ","ગુરુ","શુક્ર","શનિ"],
				namesShort: ["ર","સ","મ","બ","ગ","શ","શ"]
			},
			months: {
				names: ["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર",""],
				namesAbbr: ["જાન્યુ","ફેબ્રુ","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટે","ઑક્ટો","નવે","ડિસે",""]
			},
			AM: ["પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન"],
			PM: ["ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "or", "default", {
	name: "or",
	englishName: "Oriya",
	nativeName: "ଓଡ଼ିଆ",
	language: "or",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ଟ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["ରବିବାର","ସୋମବାର","ମଙ୍ଗଳବାର","ବୁଧବାର","ଗୁରୁବାର","ଶୁକ୍ରବାର","ଶନିବାର"],
				namesAbbr: ["ରବି.","ସୋମ.","ମଙ୍ଗଳ.","ବୁଧ.","ଗୁରୁ.","ଶୁକ୍ର.","ଶନି."],
				namesShort: ["ର","ସୋ","ମ","ବୁ","ଗୁ","ଶୁ","ଶ"]
			},
			months: {
				names: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍\u200c","ମେ","ଜୁନ୍\u200c","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""],
				namesAbbr: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍\u200c","ମେ","ଜୁନ୍\u200c","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""]
			},
			eras: [{"name":"ଖ୍ରୀଷ୍ଟାବ୍ଦ","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ta", "default", {
	name: "ta",
	englishName: "Tamil",
	nativeName: "தமிழ்",
	language: "ta",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ரூ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ஞாயிற்றுக்கிழமை","திங்கள்கிழமை","செவ்வாய்கிழமை","புதன்கிழமை","வியாழக்கிழமை","வெள்ளிக்கிழமை","சனிக்கிழமை"],
				namesAbbr: ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
				namesShort: ["ஞா","தி","செ","பு","வி","வெ","ச"]
			},
			months: {
				names: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்",""],
				namesAbbr: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்",""]
			},
			AM: ["காலை","காலை","காலை"],
			PM: ["மாலை","மாலை","மாலை"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "te", "default", {
	name: "te",
	englishName: "Telugu",
	nativeName: "తెలుగు",
	language: "te",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "రూ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"],
				namesAbbr: ["ఆది.","సోమ.","మంగళ.","బుధ.","గురు.","శుక్ర.","శని."],
				namesShort: ["ఆ","సో","మం","బు","గు","శు","శ"]
			},
			months: {
				names: ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్",""],
				namesAbbr: ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్",""]
			},
			AM: ["పూర్వాహ్న","పూర్వాహ్న","పూర్వాహ్న"],
			PM: ["అపరాహ్న","అపరాహ్న","అపరాహ్న"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "kn", "default", {
	name: "kn",
	englishName: "Kannada",
	nativeName: "ಕನ್ನಡ",
	language: "kn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ರೂ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
				namesAbbr: ["ಭಾನು.","ಸೋಮ.","ಮಂಗಳ.","ಬುಧ.","ಗುರು.","ಶುಕ್ರ.","ಶನಿ."],
				namesShort: ["ರ","ಸ","ಮ","ಬ","ಗ","ಶ","ಶ"]
			},
			months: {
				names: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""],
				namesAbbr: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""]
			},
			AM: ["ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ"],
			PM: ["ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ml", "default", {
	name: "ml",
	englishName: "Malayalam",
	nativeName: "മലയാളം",
	language: "ml",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			pattern: ["-%n","%n"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ക"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			":": ".",
			firstDay: 1,
			days: {
				names: ["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],
				namesAbbr: ["ഞായർ.","തിങ്കൾ.","ചൊവ്വ.","ബുധൻ.","വ്യാഴം.","വെള്ളി.","ശനി."],
				namesShort: ["ഞ","ത","ച","ബ","വ","വെ","ശ"]
			},
			months: {
				names: ["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""],
				namesAbbr: ["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""]
			},
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH.mm",
				T: "HH.mm.ss",
				f: "dd MMMM yyyy HH.mm",
				F: "dd MMMM yyyy HH.mm.ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "as", "default", {
	name: "as",
	englishName: "Assamese",
	nativeName: "অসমীয়া",
	language: "as",
	numberFormat: {
		groupSizes: [3,2],
		"NaN": "nan",
		negativeInfinity: "-infinity",
		positiveInfinity: "infinity",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","n$"],
			groupSizes: [3,2],
			symbol: "ট"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহস্পতিবাৰ","শুক্রবাৰ","শনিবাৰ","ৰবিবাৰ"],
				namesAbbr: ["সোম.","মঙ্গল.","বুধ.","বৃহ.","শুক্র.","শনি.","ৰবি."],
				namesShort: ["সো","ম","বু","বৃ","শু","শ","র"]
			},
			months: {
				names: ["জানুৱাৰী","ফেব্রুৱাৰী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টেম্বর","অক্টোবর","নবেম্বর","ডিচেম্বর",""],
				namesAbbr: ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টে","অক্টো","নবে","ডিচে",""]
			},
			AM: ["ৰাতিপু","ৰাতিপু","ৰাতিপু"],
			PM: ["আবেলি","আবেলি","আবেলি"],
			eras: [{"name":"খ্রীষ্টাব্দ","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "yyyy,MMMM dd, dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "yyyy,MMMM dd, dddd tt h:mm",
				F: "yyyy,MMMM dd, dddd tt h:mm:ss",
				M: "dd MMMM",
				Y: "MMMM,yy"
			}
		}
	}
});

Globalize.addCultureInfo( "mr", "default", {
	name: "mr",
	englishName: "Marathi",
	nativeName: "मराठी",
	language: "mr",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
				namesAbbr: ["रवि.","सोम.","मंगळ.","बुध.","गुरु.","शुक्र.","शनि."],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर",""],
				namesAbbr: ["जाने.","फेब्रु.","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टें.","ऑक्टो.","नोव्हें.","डिसें.",""]
			},
			AM: ["म.पू.","म.पू.","म.पू."],
			PM: ["म.नं.","म.नं.","म.नं."],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sa", "default", {
	name: "sa",
	englishName: "Sanskrit",
	nativeName: "संस्कृत",
	language: "sa",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
				namesAbbr: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""],
				namesAbbr: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""]
			},
			AM: ["पूर्वाह्न","पूर्वाह्न","पूर्वाह्न"],
			PM: ["अपराह्न","अपराह्न","अपराह्न"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy dddd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy dddd HH:mm",
				F: "dd MMMM yyyy dddd HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mn", "default", {
	name: "mn",
	englishName: "Mongolian",
	nativeName: "Монгол хэл",
	language: "mn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "₮"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"],
				namesAbbr: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"],
				namesShort: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"]
			},
			months: {
				names: ["1 дүгээр сар","2 дугаар сар","3 дугаар сар","4 дүгээр сар","5 дугаар сар","6 дугаар сар","7 дугаар сар","8 дугаар сар","9 дүгээр сар","10 дугаар сар","11 дүгээр сар","12 дугаар сар",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			monthsGenitive: {
				names: ["1 дүгээр сарын","2 дугаар сарын","3 дугаар сарын","4 дүгээр сарын","5 дугаар сарын","6 дугаар сарын","7 дугаар сарын","8 дугаар сарын","9 дүгээр сарын","10 дугаар сарын","11 дүгээр сарын","12 дугаар сарын",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yy.MM.dd",
				D: "yyyy 'оны' MMMM d",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'оны' MMMM d H:mm",
				F: "yyyy 'оны' MMMM d H:mm:ss",
				M: "d MMMM",
				Y: "yyyy 'он' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "bo", "default", {
	name: "bo",
	englishName: "Tibetan",
	nativeName: "བོད་ཡིག",
	language: "bo",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ཨང་ཀི་མིན་པ།",
		negativeInfinity: "མོ་གྲངས་ཚད་མེད་ཆུང་བ།",
		positiveInfinity: "ཕོ་གྲངས་ཚད་མེད་ཆེ་བ།",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			groupSizes: [3,0],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["གཟའ་ཉི་མ།","གཟའ་ཟླ་བ།","གཟའ་མིག་དམར།","གཟའ་ལྷག་པ།","གཟའ་ཕུར་བུ།","གཟའ་པ་སངས།","གཟའ་སྤེན་པ།"],
				namesAbbr: ["ཉི་མ།","ཟླ་བ།","མིག་དམར།","ལྷག་པ།","ཕུར་བུ།","པ་སངས།","སྤེན་པ།"],
				namesShort: ["༧","༡","༢","༣","༤","༥","༦"]
			},
			months: {
				names: ["སྤྱི་ཟླ་དང་པོ།","སྤྱི་ཟླ་གཉིས་པ།","སྤྱི་ཟླ་གསུམ་པ།","སྤྱི་ཟླ་བཞི་པ།","སྤྱི་ཟླ་ལྔ་པ།","སྤྱི་ཟླ་དྲུག་པ།","སྤྱི་ཟླ་བདུན་པ།","སྤྱི་ཟླ་བརྒྱད་པ།","སྤྱི་ཟླ་དགུ་པ།","སྤྱི་ཟླ་བཅུ་པོ།","སྤྱི་ཟླ་བཅུ་གཅིག་པ།","སྤྱི་ཟླ་བཅུ་གཉིས་པ།",""],
				namesAbbr: ["ཟླ་ ༡","ཟླ་ ༢","ཟླ་ ༣","ཟླ་ ༤","ཟླ་ ༥","ཟླ་ ༦","ཟླ་ ༧","ཟླ་ ༨","ཟླ་ ༩","ཟླ་ ༡༠","ཟླ་ ༡༡","ཟླ་ ༡༢",""]
			},
			AM: ["སྔ་དྲོ","སྔ་དྲོ","སྔ་དྲོ"],
			PM: ["ཕྱི་དྲོ","ཕྱི་དྲོ","ཕྱི་དྲོ"],
			eras: [{"name":"སྤྱི་ལོ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ལོའི་ཟླ' M'ཚེས' d",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm",
				F: "yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm:ss",
				M: "'ཟླ་' M'ཚེས'd",
				Y: "yyyy.M"
			}
		}
	}
});

Globalize.addCultureInfo( "cy", "default", {
	name: "cy",
	englishName: "Welsh",
	nativeName: "Cymraeg",
	language: "cy",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "£"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],
				namesAbbr: ["Sul","Llun","Maw","Mer","Iau","Gwe","Sad"],
				namesShort: ["Su","Ll","Ma","Me","Ia","Gw","Sa"]
			},
			months: {
				names: ["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr",""],
				namesAbbr: ["Ion","Chwe","Maw","Ebr","Mai","Meh","Gor","Aws","Med","Hyd","Tach","Rhag",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "km", "default", {
	name: "km",
	englishName: "Khmer",
	nativeName: "ខ្មែរ",
	language: "km",
	numberFormat: {
		pattern: ["- n"],
		groupSizes: [3,0],
		"NaN": "NAN",
		negativeInfinity: "-- អនន្ត",
		positiveInfinity: "អនន្ត",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["-n$","n$"],
			symbol: "៛"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["ថ្ងៃអាទិត្យ","ថ្ងៃច័ន្ទ","ថ្ងៃអង្គារ","ថ្ងៃពុធ","ថ្ងៃព្រហស្បតិ៍","ថ្ងៃសុក្រ","ថ្ងៃសៅរ៍"],
				namesAbbr: ["អាទិ.","ច.","អ.","ពុ","ព្រហ.","សុ.","ស."],
				namesShort: ["អា","ច","អ","ពុ","ព្","សុ","ស"]
			},
			months: {
				names: ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ",""],
				namesAbbr: ["១","២","៣","៤","៥","៦","៧","៨","៩","១០","១១","១២",""]
			},
			AM: ["ព្រឹក","ព្រឹក","ព្រឹក"],
			PM: ["ល្ងាច","ល្ងាច","ល្ងាច"],
			eras: [{"name":"មុនគ.ស.","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "d MMMM yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "d MMMM yyyy H:mm tt",
				F: "d MMMM yyyy HH:mm:ss",
				M: "'ថ្ងៃទី' dd 'ខែ' MM",
				Y: "'ខែ' MM 'ឆ្នាំ' yyyy"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ព្រឹក","ព្រឹក","ព្រឹក"],
			PM: ["ល្ងាច","ល្ងាច","ល្ងាច"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm tt",
				F: "dddd, MMMM dd, yyyy HH:mm:ss"
			}
		}
	}
});

Globalize.addCultureInfo( "lo", "default", {
	name: "lo",
	englishName: "Lao",
	nativeName: "ລາວ",
	language: "lo",
	numberFormat: {
		pattern: ["(n)"],
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["(n$)","n$"],
			groupSizes: [3,0],
			symbol: "₭"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["ວັນອາທິດ","ວັນຈັນ","ວັນອັງຄານ","ວັນພຸດ","ວັນພະຫັດ","ວັນສຸກ","ວັນເສົາ"],
				namesAbbr: ["ອາທິດ","ຈັນ","ອັງຄານ","ພຸດ","ພະຫັດ","ສຸກ","ເສົາ"],
				namesShort: ["ອ","ຈ","ອ","ພ","ພ","ສ","ເ"]
			},
			months: {
				names: ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ",""],
				namesAbbr: ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ",""]
			},
			AM: ["ເຊົ້າ","ເຊົ້າ","ເຊົ້າ"],
			PM: ["ແລງ","ແລງ","ແລງ"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy H:mm tt",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gl", "default", {
	name: "gl",
	englishName: "Galician",
	nativeName: "galego",
	language: "gl",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","luns","martes","mércores","xoves","venres","sábado"],
				namesAbbr: ["dom","luns","mar","mér","xov","ven","sáb"],
				namesShort: ["do","lu","ma","mé","xo","ve","sá"]
			},
			months: {
				names: ["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro",""],
				namesAbbr: ["xan","feb","mar","abr","maio","xuñ","xull","ago","set","out","nov","dec",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kok", "default", {
	name: "kok",
	englishName: "Konkani",
	nativeName: "कोंकणी",
	language: "kok",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["आयतार","सोमार","मंगळार","बुधवार","बिरेस्तार","सुक्रार","शेनवार"],
				namesAbbr: ["आय.","सोम.","मंगळ.","बुध.","बिरे.","सुक्र.","शेन."],
				namesShort: ["आ","स","म","ब","ब","स","श"]
			},
			months: {
				names: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""],
				namesAbbr: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""]
			},
			AM: ["म.पू.","म.पू.","म.पू."],
			PM: ["म.नं.","म.नं.","म.नं."],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "syr", "default", {
	name: "syr",
	englishName: "Syriac",
	nativeName: "ܣܘܪܝܝܐ",
	language: "syr",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ل.س.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["ܚܕ ܒܫܒܐ","ܬܪܝܢ ܒܫܒܐ","ܬܠܬܐ ܒܫܒܐ","ܐܪܒܥܐ ܒܫܒܐ","ܚܡܫܐ ܒܫܒܐ","ܥܪܘܒܬܐ","ܫܒܬܐ"],
				namesAbbr: ["\u070fܐ \u070fܒܫ","\u070fܒ \u070fܒܫ","\u070fܓ \u070fܒܫ","\u070fܕ \u070fܒܫ","\u070fܗ \u070fܒܫ","\u070fܥܪܘܒ","\u070fܫܒ"],
				namesShort: ["ܐ","ܒ","ܓ","ܕ","ܗ","ܥ","ܫ"]
			},
			months: {
				names: ["ܟܢܘܢ ܐܚܪܝ","ܫܒܛ","ܐܕܪ","ܢܝܣܢ","ܐܝܪ","ܚܙܝܪܢ","ܬܡܘܙ","ܐܒ","ܐܝܠܘܠ","ܬܫܪܝ ܩܕܝܡ","ܬܫܪܝ ܐܚܪܝ","ܟܢܘܢ ܩܕܝܡ",""],
				namesAbbr: ["\u070fܟܢ \u070fܒ","ܫܒܛ","ܐܕܪ","ܢܝܣܢ","ܐܝܪ","ܚܙܝܪܢ","ܬܡܘܙ","ܐܒ","ܐܝܠܘܠ","\u070fܬܫ \u070fܐ","\u070fܬܫ \u070fܒ","\u070fܟܢ \u070fܐ",""]
			},
			AM: ["ܩ.ܛ","ܩ.ܛ","ܩ.ܛ"],
			PM: ["ܒ.ܛ","ܒ.ܛ","ܒ.ܛ"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "si", "default", {
	name: "si",
	englishName: "Sinhala",
	nativeName: "සිංහල",
	language: "si",
	numberFormat: {
		groupSizes: [3,2],
		negativeInfinity: "-අනන්තය",
		positiveInfinity: "අනන්තය",
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["($ n)","$ n"],
			symbol: "රු."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්\u200dරහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
				namesAbbr: ["ඉරිදා","සඳුදා","කුජදා","බුදදා","ගුරුදා","කිවිදා","ශනිදා"],
				namesShort: ["ඉ","ස","අ","බ","බ්\u200dර","සි","සෙ"]
			},
			months: {
				names: ["ජනවාරි","පෙබරවාරි","මාර්තු","අ\u200cප්\u200dරේල්","මැයි","ජූනි","ජූලි","අ\u200cගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්",""],
				namesAbbr: ["ජන.","පෙබ.","මාර්තු.","අප්\u200dරේල්.","මැයි.","ජූනි.","ජූලි.","අගෝ.","සැප්.","ඔක්.","නොවැ.","දෙසැ.",""]
			},
			AM: ["පෙ.ව.","පෙ.ව.","පෙ.ව."],
			PM: ["ප.ව.","ප.ව.","ප.ව."],
			eras: [{"name":"ක්\u200dරි.ව.","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy MMMM' මස 'dd' වැනිදා 'dddd",
				f: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm tt",
				F: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm:ss tt",
				Y: "yyyy MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "iu", "default", {
	name: "iu",
	englishName: "Inuktitut",
	nativeName: "Inuktitut",
	language: "iu",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Naattiinguja","Naggajjau","Aippiq","Pingatsiq","Sitammiq","Tallirmiq","Sivataarvik"],
				namesAbbr: ["Nat","Nag","Aip","Pi","Sit","Tal","Siv"],
				namesShort: ["N","N","A","P","S","T","S"]
			},
			months: {
				names: ["Jaannuari","Viivvuari","Maatsi","Iipuri","Mai","Juuni","Julai","Aaggiisi","Sitipiri","Utupiri","Nuvipiri","Tisipiri",""],
				namesAbbr: ["Jan","Viv","Mas","Ipu","Mai","Jun","Jul","Agi","Sii","Uut","Nuv","Tis",""]
			},
			patterns: {
				d: "d/MM/yyyy",
				D: "ddd, MMMM dd,yyyy",
				f: "ddd, MMMM dd,yyyy h:mm tt",
				F: "ddd, MMMM dd,yyyy h:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "am", "default", {
	name: "am",
	englishName: "Amharic",
	nativeName: "አማርኛ",
	language: "am",
	numberFormat: {
		decimals: 1,
		groupSizes: [3,0],
		"NaN": "NAN",
		percent: {
			pattern: ["-n%","n%"],
			decimals: 1,
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["-$n","$n"],
			groupSizes: [3,0],
			symbol: "ETB"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
				namesAbbr: ["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
				namesShort: ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"]
			},
			months: {
				names: ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር",""],
				namesAbbr: ["ጃንዩ","ፌብሩ","ማርች","ኤፕረ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክተ","ኖቬም","ዲሴም",""]
			},
			AM: ["ጡዋት","ጡዋት","ጡዋት"],
			PM: ["ከሰዓት","ከሰዓት","ከሰዓት"],
			eras: [{"name":"ዓመተ  ምሕረት","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "dddd '፣' MMMM d 'ቀን' yyyy",
				f: "dddd '፣' MMMM d 'ቀን' yyyy h:mm tt",
				F: "dddd '፣' MMMM d 'ቀን' yyyy h:mm:ss tt",
				M: "MMMM d ቀን",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tzm", "default", {
	name: "tzm",
	englishName: "Tamazight",
	nativeName: "Tamazight",
	language: "tzm",
	numberFormat: {
		pattern: ["n-"],
		",": ".",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			symbol: "DZD"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 6,
			days: {
				names: ["Acer","Arime","Aram","Ahad","Amhadh","Sem","Sedh"],
				namesAbbr: ["Ace","Ari","Ara","Aha","Amh","Sem","Sed"],
				namesShort: ["Ac","Ar","Ar","Ah","Am","Se","Se"]
			},
			months: {
				names: ["Yenayer","Furar","Maghres","Yebrir","Mayu","Yunyu","Yulyu","Ghuct","Cutenber","Ktuber","Wambir","Dujanbir",""],
				namesAbbr: ["Yen","Fur","Mag","Yeb","May","Yun","Yul","Ghu","Cut","Ktu","Wam","Duj",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ne", "default", {
	name: "ne",
	englishName: "Nepali",
	nativeName: "नेपाली",
	language: "ne",
	numberFormat: {
		groupSizes: [3,2],
		"NaN": "nan",
		negativeInfinity: "-infinity",
		positiveInfinity: "infinity",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["आइतवार","सोमवार","मङ्गलवार","बुधवार","बिहीवार","शुक्रवार","शनिवार"],
				namesAbbr: ["आइत","सोम","मङ्गल","बुध","बिही","शुक्र","शनि"],
				namesShort: ["आ","सो","म","बु","बि","शु","श"]
			},
			months: {
				names: ["जनवरी","फेब्रुअरी","मार्च","अप्रिल","मे","जून","जुलाई","अगस्त","सेप्टेम्बर","अक्टोबर","नोभेम्बर","डिसेम्बर",""],
				namesAbbr: ["जन","फेब","मार्च","अप्रिल","मे","जून","जुलाई","अग","सेप्ट","अक्ट","नोभ","डिस",""]
			},
			AM: ["विहानी","विहानी","विहानी"],
			PM: ["बेलुकी","बेलुकी","बेलुकी"],
			eras: [{"name":"a.d.","start":null,"offset":0}],
			patterns: {
				Y: "MMMM,yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fy", "default", {
	name: "fy",
	englishName: "Frisian",
	nativeName: "Frysk",
	language: "fy",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["Snein","Moandei","Tiisdei","Woansdei","Tongersdei","Freed","Sneon"],
				namesAbbr: ["Sn","Mo","Ti","Wo","To","Fr","Sn"],
				namesShort: ["S","M","T","W","T","F","S"]
			},
			months: {
				names: ["jannewaris","febrewaris","maart","april","maaie","juny","july","augustus","septimber","oktober","novimber","desimber",""],
				namesAbbr: ["jann","febr","mrt","apr","maaie","jun","jul","aug","sept","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d-M-yyyy",
				D: "dddd d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd d MMMM yyyy H:mm",
				F: "dddd d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ps", "default", {
	name: "ps",
	englishName: "Pashto",
	nativeName: "پښتو",
	language: "ps",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		",": "،",
		".": ",",
		"NaN": "غ ع",
		negativeInfinity: "-∞",
		positiveInfinity: "∞",
		percent: {
			pattern: ["%n-","%n"],
			",": "،",
			".": ","
		},
		currency: {
			pattern: ["$n-","$n"],
			",": "٬",
			".": "٫",
			symbol: "؋"
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["یکشنبه","دوشنبه","سه\u200cشنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["یکشنبه","دوشنبه","سه\u200cشنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګا ښزمرى","زمرى","وږى","تله","لړم","لنڈ ۍ","مرغومى",""],
				namesAbbr: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګا ښ","زمرى","وږى","تله","لړم","لنڈ ۍ","مرغومى",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"ل.ه","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy, dd, MMMM, dddd",
				f: "yyyy, dd, MMMM, dddd h:mm tt",
				F: "yyyy, dd, MMMM, dddd h:mm:ss tt",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fil", "default", {
	name: "fil",
	englishName: "Filipino",
	nativeName: "Filipino",
	language: "fil",
	numberFormat: {
		currency: {
			symbol: "PhP"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Linggo","Lunes","Martes","Mierkoles","Huebes","Biernes","Sabado"],
				namesAbbr: ["Lin","Lun","Mar","Mier","Hueb","Bier","Saba"],
				namesShort: ["L","L","M","M","H","B","S"]
			},
			months: {
				names: ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Septyembre","Oktubre","Nobyembre","Disyembre",""],
				namesAbbr: ["En","Peb","Mar","Abr","Mayo","Hun","Hul","Agos","Sept","Okt","Nob","Dis",""]
			},
			eras: [{"name":"Anno Domini","start":null,"offset":0}]
		}
	}
});

Globalize.addCultureInfo( "dv", "default", {
	name: "dv",
	englishName: "Divehi",
	nativeName: "ދިވެހިބަސް",
	language: "dv",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["n $-","n $"],
			symbol: "ރ."
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			days: {
				names: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesAbbr: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesShort: ["އާ","ހޯ","އަ","ބު","ބު","ހު","ހޮ"]
			},
			months: {
				names: ["މުޙައްރަމް","ޞަފަރު","ރަބީޢުލްއައްވަލް","ރަބީޢުލްއާޚިރު","ޖުމާދަލްއޫލާ","ޖުމާދަލްއާޚިރާ","ރަޖަބް","ޝަޢްބާން","ރަމަޟާން","ޝައްވާލް","ޛުލްޤަޢިދާ","ޛުލްޙިއްޖާ",""],
				namesAbbr: ["މުޙައްރަމް","ޞަފަރު","ރަބީޢުލްއައްވަލް","ރަބީޢުލްއާޚިރު","ޖުމާދަލްއޫލާ","ޖުމާދަލްއާޚިރާ","ރަޖަބް","ޝަޢްބާން","ރަމަޟާން","ޝައްވާލް","ޛުލްޤަޢިދާ","ޛުލްޙިއްޖާ",""]
			},
			AM: ["މކ","މކ","މކ"],
			PM: ["މފ","މފ","މފ"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd/MM/yyyy HH:mm",
				F: "dd/MM/yyyy HH:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			days: {
				names: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesAbbr: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesShort: ["އާ","ހޯ","އަ","ބު","ބު","ހު","ހޮ"]
			},
			months: {
				names: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޯގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ",""],
				namesAbbr: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޯގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ",""]
			},
			AM: ["މކ","މކ","މކ"],
			PM: ["މފ","މފ","މފ"],
			eras: [{"name":"މީލާދީ","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yy",
				D: "ddd, yyyy MMMM dd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "ddd, yyyy MMMM dd HH:mm",
				F: "ddd, yyyy MMMM dd HH:mm:ss",
				Y: "yyyy, MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ha", "default", {
	name: "ha",
	englishName: "Hausa",
	nativeName: "Hausa",
	language: "ha",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
				namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
				namesShort: ["L","L","T","L","A","J","A"]
			},
			months: {
				names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
				namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
			},
			AM: ["Safe","safe","SAFE"],
			PM: ["Yamma","yamma","YAMMA"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "yo", "default", {
	name: "yo",
	englishName: "Yoruba",
	nativeName: "Yoruba",
	language: "yo",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
				namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
				namesShort: ["A","A","I","O","O","E","A"]
			},
			months: {
				names: ["Osu kinni","Osu keji","Osu keta","Osu kerin","Osu karun","Osu kefa","Osu keje","Osu kejo","Osu kesan","Osu kewa","Osu kokanla","Osu keresi",""],
				namesAbbr: ["kin.","kej.","ket.","ker.","kar.","kef.","kej.","kej.","kes.","kew.","kok.","ker.",""]
			},
			AM: ["Owuro","owuro","OWURO"],
			PM: ["Ale","ale","ALE"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "quz", "default", {
	name: "quz",
	englishName: "Quechua",
	nativeName: "runasimi",
	language: "quz",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ",",
			symbol: "$b"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["intichaw","killachaw","atipachaw","quyllurchaw","Ch' askachaw","Illapachaw","k'uychichaw"],
				namesAbbr: ["int","kil","ati","quy","Ch'","Ill","k'u"],
				namesShort: ["d","k","a","m","h","b","k"]
			},
			months: {
				names: ["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi",""],
				namesAbbr: ["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "nso", "default", {
	name: "nso",
	englishName: "Sesotho sa Leboa",
	nativeName: "Sesotho sa Leboa",
	language: "nso",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lamorena","Mošupologo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],
				namesAbbr: ["Lam","Moš","Lbb","Lbr","Lbn","Lbh","Mok"],
				namesShort: ["L","M","L","L","L","L","M"]
			},
			months: {
				names: ["Pherekgong","Hlakola","Mopitlo","Moranang","Mosegamanye","Ngoatobošego","Phuphu","Phato","Lewedi","Diphalana","Dibatsela","Manthole",""],
				namesAbbr: ["Pher","Hlak","Mop","Mor","Mos","Ngwat","Phup","Phat","Lew","Dip","Dib","Man",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ba", "default", {
	name: "ba",
	englishName: "Bashkir",
	nativeName: "Башҡорт",
	language: "ba",
	numberFormat: {
		",": " ",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			groupSizes: [3,0],
			",": " ",
			".": ",",
			symbol: "һ."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Йәкшәмбе","Дүшәмбе","Шишәмбе","Шаршамбы","Кесаҙна","Йома","Шәмбе"],
				namesAbbr: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],
				namesShort: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"]
			},
			months: {
				names: ["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
				namesAbbr: ["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d MMMM yyyy 'й'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'й' H:mm",
				F: "d MMMM yyyy 'й' H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "lb", "default", {
	name: "lb",
	englishName: "Luxembourgish",
	nativeName: "Lëtzebuergesch",
	language: "lb",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "n. num.",
		negativeInfinity: "-onendlech",
		positiveInfinity: "+onendlech",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sonndeg","Méindeg","Dënschdeg","Mëttwoch","Donneschdeg","Freideg","Samschdeg"],
				namesAbbr: ["Son","Méi","Dën","Mët","Don","Fre","Sam"],
				namesShort: ["So","Mé","Dë","Më","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","Mäerz","Abrëll","Mee","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mäe","Abr","Mee","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kl", "default", {
	name: "kl",
	englishName: "Greenlandic",
	nativeName: "kalaallisut",
	language: "kl",
	numberFormat: {
		",": ".",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			groupSizes: [3,0],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,0],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["sapaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],
				namesAbbr: ["sap","ata","mar","ping","sis","tal","arf"],
				namesShort: ["sa","at","ma","pi","si","ta","ar"]
			},
			months: {
				names: ["januari","februari","martsi","apriili","maaji","juni","juli","aggusti","septembari","oktobari","novembari","decembari",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ig", "default", {
	name: "ig",
	englishName: "Igbo",
	nativeName: "Igbo",
	language: "ig",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
				namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
				namesShort: ["A","A","I","O","O","E","A"]
			},
			months: {
				names: ["Onwa mbu","Onwa ibua","Onwa ato","Onwa ano","Onwa ise","Onwa isi","Onwa asa","Onwa asato","Onwa itolu","Onwa iri","Onwa iri n'ofu","Onwa iri n'ibua",""],
				namesAbbr: ["mbu.","ibu.","ato.","ano.","ise","isi","asa","asa.","ito.","iri.","n'of.","n'ib.",""]
			},
			AM: ["Ututu","ututu","UTUTU"],
			PM: ["Efifie","efifie","EFIFIE"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ii", "default", {
	name: "ii",
	englishName: "Yi",
	nativeName: "ꆈꌠꁱꂷ",
	language: "ii",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ꌗꂷꀋꉬ",
		negativeInfinity: "ꀄꊭꌐꀋꉆ",
		positiveInfinity: "ꈤꇁꑖꀋꉬ",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["ꑭꆏꑍ","ꆏꊂ꒔","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"],
				namesAbbr: ["ꑭꆏ","ꆏ꒔","ꆏꑍ","ꆏꌕ","ꆏꇖ","ꆏꉬ","ꆏꃘ"],
				namesShort: ["ꆏ","꒔","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"]
			},
			months: {
				names: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""],
				namesAbbr: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""]
			},
			AM: ["ꂵꆪꈌꈐ","ꂵꆪꈌꈐ","ꂵꆪꈌꈐ"],
			PM: ["ꂵꆪꈌꉈ","ꂵꆪꈌꉈ","ꂵꆪꈌꉈ"],
			eras: [{"name":"ꇬꑼ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ꈎ' M'ꆪ' d'ꑍ'",
				t: "tt h:mm",
				T: "H:mm:ss",
				f: "yyyy'ꈎ' M'ꆪ' d'ꑍ' tt h:mm",
				F: "yyyy'ꈎ' M'ꆪ' d'ꑍ' H:mm:ss",
				M: "M'ꆪ' d'ꑍ'",
				Y: "yyyy'ꈎ' M'ꆪ'"
			}
		}
	}
});

Globalize.addCultureInfo( "arn", "default", {
	name: "arn",
	englishName: "Mapudungun",
	nativeName: "Mapudungun",
	language: "arn",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "moh", "default", {
	name: "moh",
	englishName: "Mohawk",
	nativeName: "Kanien'kéha",
	language: "moh",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Awentatokentì:ke","Awentataón'ke","Ratironhia'kehronòn:ke","Soséhne","Okaristiiáhne","Ronwaia'tanentaktonhne","Entákta"],
				namesShort: ["S","M","T","W","T","F","S"]
			},
			months: {
				names: ["Tsothohrkó:Wa","Enniska","Enniskó:Wa","Onerahtókha","Onerahtohkó:Wa","Ohiari:Ha","Ohiarihkó:Wa","Seskéha","Seskehkó:Wa","Kenténha","Kentenhkó:Wa","Tsothóhrha",""]
			}
		}
	}
});

Globalize.addCultureInfo( "br", "default", {
	name: "br",
	englishName: "Breton",
	nativeName: "brezhoneg",
	language: "br",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "NkN",
		negativeInfinity: "-Anfin",
		positiveInfinity: "+Anfin",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sul","Lun","Meurzh","Merc'her","Yaou","Gwener","Sadorn"],
				namesAbbr: ["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."],
				namesShort: ["Su","Lu","Mz","Mc","Ya","Gw","Sa"]
			},
			months: {
				names: ["Genver","C'hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu",""],
				namesAbbr: ["Gen.","C'hwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Kzu",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"g. J.-K.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ug", "default", {
	name: "ug",
	englishName: "Uyghur",
	nativeName: "ئۇيغۇرچە",
	language: "ug",
	isRTL: true,
	numberFormat: {
		"NaN": "سان ئەمەس",
		negativeInfinity: "مەنپىي چەكسىزلىك",
		positiveInfinity: "مۇسبەت چەكسىزلىك",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["يەكشەنبە","دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"],
				namesAbbr: ["يە","دۈ","سە","چا","پە","جۈ","شە"],
				namesShort: ["ي","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""],
				namesAbbr: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""]
			},
			AM: ["چۈشتىن بۇرۇن","چۈشتىن بۇرۇن","چۈشتىن بۇرۇن"],
			PM: ["چۈشتىن كېيىن","چۈشتىن كېيىن","چۈشتىن كېيىن"],
			eras: [{"name":"مىلادى","start":null,"offset":0}],
			patterns: {
				d: "yyyy-M-d",
				D: "yyyy-'يىلى' MMMM d-'كۈنى،'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm",
				F: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm:ss",
				M: "MMMM d'-كۈنى'",
				Y: "yyyy-'يىلى' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mi", "default", {
	name: "mi",
	englishName: "Maori",
	nativeName: "Reo Māori",
	language: "mi",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Rātapu","Rāhina","Rātū","Rāapa","Rāpare","Rāmere","Rāhoroi"],
				namesAbbr: ["Ta","Hi","Tū","Apa","Pa","Me","Ho"],
				namesShort: ["Ta","Hi","Tū","Aa","Pa","Me","Ho"]
			},
			months: {
				names: ["Kohi-tātea","Hui-tanguru","Poutū-te-rangi","Paenga-whāwhā","Haratua","Pipiri","Hōngongoi","Here-turi-kōkā","Mahuru","Whiringa-ā-nuku","Whiringa-ā-rangi","Hakihea",""],
				namesAbbr: ["Kohi","Hui","Pou","Pae","Hara","Pipi","Hōngo","Here","Mahu","Nuku","Rangi","Haki",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd MMMM, yyyy",
				f: "dddd, dd MMMM, yyyy h:mm tt",
				F: "dddd, dd MMMM, yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM, yy"
			}
		}
	}
});

Globalize.addCultureInfo( "oc", "default", {
	name: "oc",
	englishName: "Occitan",
	nativeName: "Occitan",
	language: "oc",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numeric",
		negativeInfinity: "-Infinit",
		positiveInfinity: "+Infinit",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimenge","diluns","dimars","dimècres","dijòus","divendres","dissabte"],
				namesAbbr: ["dim.","lun.","mar.","mèc.","jòu.","ven.","sab."],
				namesShort: ["di","lu","ma","mè","jò","ve","sa"]
			},
			months: {
				names: ["genier","febrier","març","abril","mai","junh","julh","agost","setembre","octobre","novembre","desembre",""],
				namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
			},
			monthsGenitive: {
				names: ["de genier","de febrier","de març","d'abril","de mai","de junh","de julh","d'agost","de setembre","d'octobre","de novembre","de desembre",""],
				namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"après Jèsus-Crist","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd,' lo 'd MMMM' de 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd,' lo 'd MMMM' de 'yyyy HH:mm",
				F: "dddd,' lo 'd MMMM' de 'yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "co", "default", {
	name: "co",
	englishName: "Corsican",
	nativeName: "Corsu",
	language: "co",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Mica numericu",
		negativeInfinity: "-Infinitu",
		positiveInfinity: "+Infinitu",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dumenica","luni","marti","mercuri","ghjovi","venderi","sabbatu"],
				namesAbbr: ["dum.","lun.","mar.","mer.","ghj.","ven.","sab."],
				namesShort: ["du","lu","ma","me","gh","ve","sa"]
			},
			months: {
				names: ["ghjennaghju","ferraghju","marzu","aprile","maghju","ghjunghju","lugliu","aostu","settembre","ottobre","nuvembre","dicembre",""],
				namesAbbr: ["ghje","ferr","marz","apri","magh","ghju","lugl","aost","sett","otto","nuve","dice",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"dopu J-C","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gsw", "default", {
	name: "gsw",
	englishName: "Alsatian",
	nativeName: "Elsässisch",
	language: "gsw",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Ohne Nummer",
		negativeInfinity: "-Unendlich",
		positiveInfinity: "+Unendlich",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sundàà","Mondàà","Dienschdàà","Mittwuch","Dunnerschdàà","Fridàà","Sàmschdàà"],
				namesAbbr: ["Su.","Mo.","Di.","Mi.","Du.","Fr.","Sà."],
				namesShort: ["Su","Mo","Di","Mi","Du","Fr","Sà"]
			},
			months: {
				names: ["Jänner","Feverje","März","Àpril","Mai","Jüni","Jüli","Augscht","September","Oktower","Nowember","Dezember",""],
				namesAbbr: ["Jän.","Fev.","März","Apr.","Mai","Jüni","Jüli","Aug.","Sept.","Okt.","Now.","Dez.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"Vor J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sah", "default", {
	name: "sah",
	englishName: "Yakut",
	nativeName: "саха",
	language: "sah",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "NAN",
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "с."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["баскыһыанньа","бэнидиэнньик","оптуорунньук","сэрэдэ","чэппиэр","бээтинсэ","субуота"],
				namesAbbr: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"],
				namesShort: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"]
			},
			months: {
				names: ["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйа","Бэс ыйа","От ыйа","Атырдьах ыйа","Балаҕан ыйа","Алтынньы","Сэтинньи","Ахсынньы",""],
				namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
			},
			monthsGenitive: {
				names: ["тохсунньу","олунньу","кулун тутар","муус устар","ыам ыйын","бэс ыйын","от ыйын","атырдьах ыйын","балаҕан ыйын","алтынньы","сэтинньи","ахсынньы",""],
				namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "MM.dd.yyyy",
				D: "MMMM d yyyy 'с.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d yyyy 'с.' H:mm",
				F: "MMMM d yyyy 'с.' H:mm:ss",
				Y: "MMMM yyyy 'с.'"
			}
		}
	}
});

Globalize.addCultureInfo( "qut", "default", {
	name: "qut",
	englishName: "K'iche",
	nativeName: "K'iche",
	language: "qut",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			symbol: "Q"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["juq'ij","kaq'ij","oxq'ij","kajq'ij","joq'ij","waqq'ij","wuqq'ij"],
				namesAbbr: ["juq","kaq","oxq","kajq","joq","waqq","wuqq"],
				namesShort: ["ju","ka","ox","ka","jo","wa","wu"]
			},
			months: {
				names: ["nab'e ik'","ukab' ik'","rox ik'","ukaj ik'","uro' ik'","uwaq ik'","uwuq ik'","uwajxaq ik'","ub'elej ik'","ulaj ik'","ujulaj ik'","ukab'laj ik'",""],
				namesAbbr: ["nab'e","ukab","rox","ukaj","uro","uwaq","uwuq","uwajxaq","ub'elej","ulaj","ujulaj","ukab'laj",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "rw", "default", {
	name: "rw",
	englishName: "Kinyarwanda",
	nativeName: "Kinyarwanda",
	language: "rw",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": " ",
			".": ",",
			symbol: "RWF"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Ku wa mbere","Ku wa kabiri","Ku wa gatatu","Ku wa kane","Ku wa gatanu","Ku wa gatandatu","Ku cyumweru"],
				namesAbbr: ["mbe.","kab.","gat.","kan.","gat.","gat.","cyu."],
				namesShort: ["mb","ka","ga","ka","ga","ga","cy"]
			},
			months: {
				names: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza",""],
				namesAbbr: ["Mut","Gas","Wer","Mat","Gic","Kam","Nya","Kan","Nze","Ukwa","Ugu","Uku",""]
			},
			AM: ["saa moya z.m.","saa moya z.m.","SAA MOYA Z.M."],
			PM: ["saa moya z.n.","saa moya z.n.","SAA MOYA Z.N."],
			eras: [{"name":"AD","start":null,"offset":0}]
		}
	}
});

Globalize.addCultureInfo( "wo", "default", {
	name: "wo",
	englishName: "Wolof",
	nativeName: "Wolof",
	language: "wo",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "XOF"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "prs", "default", {
	name: "prs",
	englishName: "Dari",
	nativeName: "درى",
	language: "prs",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		",": ".",
		".": ",",
		"NaN": "غ ع",
		negativeInfinity: "-∞",
		positiveInfinity: "∞",
		percent: {
			pattern: ["%n-","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$n-","$n"],
			symbol: "؋"
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			firstDay: 5,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			firstDay: 5,
			days: {
				names: ["یکشنبه","دوشنبه","سه\u200cشنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["یکشنبه","دوشنبه","سه\u200cشنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګاښ","زمرى","وږى","تله","لړم","ليندۍ","مرغومى",""],
				namesAbbr: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګاښ","زمرى","وږى","تله","لړم","ليندۍ","مرغومى",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"ل.ه","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy, dd, MMMM, dddd",
				f: "yyyy, dd, MMMM, dddd h:mm tt",
				F: "yyyy, dd, MMMM, dddd h:mm:ss tt",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gd", "default", {
	name: "gd",
	englishName: "Scottish Gaelic",
	nativeName: "Gàidhlig",
	language: "gd",
	numberFormat: {
		negativeInfinity: "-Neo-chrìochnachd",
		positiveInfinity: "Neo-chrìochnachd",
		currency: {
			pattern: ["-$n","$n"],
			symbol: "£"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],
				namesAbbr: ["Dòm","Lua","Mài","Cia","Ard","Hao","Sat"],
				namesShort: ["D","L","M","C","A","H","S"]
			},
			months: {
				names: ["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd",""],
				namesAbbr: ["Fao","Gea","Màr","Gib","Cèi","Ògm","Iuc","Lùn","Sul","Dàm","Sam","Dùb",""]
			},
			AM: ["m","m","M"],
			PM: ["f","f","F"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-SA", "default", {
	name: "ar-SA",
	englishName: "Arabic (Saudi Arabia)",
	nativeName: "العربية (المملكة العربية السعودية)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ر.س.\u200f"
		}
	},
	calendars: {
		standard: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "bg-BG", "default", {
	name: "bg-BG",
	englishName: "Bulgarian (Bulgaria)",
	nativeName: "български (България)",
	language: "bg",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "- безкрайност",
		positiveInfinity: "+ безкрайност",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "лв."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["неделя","понеделник","вторник","сряда","четвъртък","петък","събота"],
				namesAbbr: ["нед","пон","вт","ср","четв","пет","съб"],
				namesShort: ["н","п","в","с","ч","п","с"]
			},
			months: {
				names: ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември",""],
				namesAbbr: ["ян","февр","март","апр","май","юни","юли","авг","септ","окт","ноември","дек",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"след новата ера","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy 'г.'",
				D: "dd MMMM yyyy 'г.'",
				t: "HH:mm 'ч.'",
				T: "HH:mm:ss 'ч.'",
				f: "dd MMMM yyyy 'г.' HH:mm 'ч.'",
				F: "dd MMMM yyyy 'г.' HH:mm:ss 'ч.'",
				M: "dd MMMM",
				Y: "MMMM yyyy 'г.'"
			}
		}
	}
});

Globalize.addCultureInfo( "ca-ES", "default", {
	name: "ca-ES",
	englishName: "Catalan (Catalan)",
	nativeName: "català (català)",
	language: "ca",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinit",
		positiveInfinity: "Infinit",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"],
				namesAbbr: ["dg.","dl.","dt.","dc.","dj.","dv.","ds."],
				namesShort: ["dg","dl","dt","dc","dj","dv","ds"]
			},
			months: {
				names: ["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre",""],
				namesAbbr: ["gen","feb","març","abr","maig","juny","jul","ag","set","oct","nov","des",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' / 'MMMM' / 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' / 'MMMM' / 'yyyy HH:mm",
				F: "dddd, d' / 'MMMM' / 'yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' / 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-TW", "default", {
	name: "zh-TW",
	englishName: "Chinese (Traditional, Taiwan)",
	nativeName: "中文(台灣)",
	language: "zh-CHT",
	numberFormat: {
		"NaN": "不是一個數字",
		negativeInfinity: "負無窮大",
		positiveInfinity: "正無窮大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "NT$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"西元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "tt hh:mm",
				T: "tt hh:mm:ss",
				f: "yyyy'年'M'月'd'日' tt hh:mm",
				F: "yyyy'年'M'月'd'日' tt hh:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		},
		Taiwan: {
			name: "Taiwan",
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"","start":null,"offset":1911}],
			twoDigitYearMax: 99,
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "tt hh:mm",
				T: "tt hh:mm:ss",
				f: "yyyy'年'M'月'd'日' tt hh:mm",
				F: "yyyy'年'M'月'd'日' tt hh:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "cs-CZ", "default", {
	name: "cs-CZ",
	englishName: "Czech (Czech Republic)",
	nativeName: "čeština (Česká republika)",
	language: "cs",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Není číslo",
		negativeInfinity: "-nekonečno",
		positiveInfinity: "+nekonečno",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Kč"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"],
				namesAbbr: ["ne","po","út","st","čt","pá","so"],
				namesShort: ["ne","po","út","st","čt","pá","so"]
			},
			months: {
				names: ["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			monthsGenitive: {
				names: ["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["dop.","dop.","DOP."],
			PM: ["odp.","odp.","ODP."],
			eras: [{"name":"n. l.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "da-DK", "default", {
	name: "da-DK",
	englishName: "Danish (Denmark)",
	nativeName: "dansk (Danmark)",
	language: "da",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
				namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
				namesShort: ["sø","ma","ti","on","to","fr","lø"]
			},
			months: {
				names: ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "de-DE", "default", {
	name: "de-DE",
	englishName: "German (Germany)",
	nativeName: "Deutsch (Deutschland)",
	language: "de",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "el-GR", "default", {
	name: "el-GR",
	englishName: "Greek (Greece)",
	nativeName: "Ελληνικά (Ελλάδα)",
	language: "el",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "μη αριθμός",
		negativeInfinity: "-Άπειρο",
		positiveInfinity: "Άπειρο",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"],
				namesAbbr: ["Κυρ","Δευ","Τρι","Τετ","Πεμ","Παρ","Σαβ"],
				namesShort: ["Κυ","Δε","Τρ","Τε","Πε","Πα","Σά"]
			},
			months: {
				names: ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος",""],
				namesAbbr: ["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ",""]
			},
			monthsGenitive: {
				names: ["Ιανουαρίου","Φεβρουαρίου","Μαρτίου","Απριλίου","Μαΐου","Ιουνίου","Ιουλίου","Αυγούστου","Σεπτεμβρίου","Οκτωβρίου","Νοεμβρίου","Δεκεμβρίου",""],
				namesAbbr: ["Ιαν","Φεβ","Μαρ","Απρ","Μαϊ","Ιουν","Ιουλ","Αυγ","Σεπ","Οκτ","Νοε","Δεκ",""]
			},
			AM: ["πμ","πμ","ΠΜ"],
			PM: ["μμ","μμ","ΜΜ"],
			eras: [{"name":"μ.Χ.","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "dddd, d MMMM yyyy",
				f: "dddd, d MMMM yyyy h:mm tt",
				F: "dddd, d MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-US", "default", {
	name: "en-US",
	englishName: "English (United States)"
});

Globalize.addCultureInfo( "fi-FI", "default", {
	name: "fi-FI",
	englishName: "Finnish (Finland)",
	nativeName: "suomi (Suomi)",
	language: "fi",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],
				namesAbbr: ["su","ma","ti","ke","to","pe","la"],
				namesShort: ["su","ma","ti","ke","to","pe","la"]
			},
			months: {
				names: ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu",""],
				namesAbbr: ["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM'ta 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM'ta 'yyyy H:mm",
				F: "d. MMMM'ta 'yyyy H:mm:ss",
				M: "d. MMMM'ta'",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-FR", "default", {
	name: "fr-FR",
	englishName: "French (France)",
	nativeName: "français (France)",
	language: "fr",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "he-IL", "default", {
	name: "he-IL",
	englishName: "Hebrew (Israel)",
	nativeName: "עברית (ישראל)",
	language: "he",
	isRTL: true,
	numberFormat: {
		"NaN": "לא מספר",
		negativeInfinity: "אינסוף שלילי",
		positiveInfinity: "אינסוף חיובי",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "₪"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
				namesAbbr: ["יום א","יום ב","יום ג","יום ד","יום ה","יום ו","שבת"],
				namesShort: ["א","ב","ג","ד","ה","ו","ש"]
			},
			months: {
				names: ["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר",""],
				namesAbbr: ["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ",""]
			},
			eras: [{"name":"לספירה","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd dd MMMM yyyy HH:mm",
				F: "dddd dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		},
		Hebrew: {
			name: "Hebrew",
			"/": " ",
			days: {
				names: ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","שבת"],
				namesAbbr: ["א","ב","ג","ד","ה","ו","ש"],
				namesShort: ["א","ב","ג","ד","ה","ו","ש"]
			},
			months: {
				names: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"],
				namesAbbr: ["תשרי","חשון","כסלו","טבת","שבט","אדר","אדר ב","ניסן","אייר","סיון","תמוז","אב","אלול"]
			},
			eras: [{"name":"C.E.","start":null,"offset":0}],
			twoDigitYearMax: 5790,
			patterns: {
				d: "dd MMMM yyyy",
				D: "dddd dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd dd MMMM yyyy HH:mm",
				F: "dddd dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hu-HU", "default", {
	name: "hu-HU",
	englishName: "Hungarian (Hungary)",
	nativeName: "magyar (Magyarország)",
	language: "hu",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "nem szám",
		negativeInfinity: "negatív végtelen",
		positiveInfinity: "végtelen",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Ft"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],
				namesAbbr: ["V","H","K","Sze","Cs","P","Szo"],
				namesShort: ["V","H","K","Sze","Cs","P","Szo"]
			},
			months: {
				names: ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december",""],
				namesAbbr: ["jan.","febr.","márc.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec.",""]
			},
			AM: ["de.","de.","DE."],
			PM: ["du.","du.","DU."],
			eras: [{"name":"i.sz.","start":null,"offset":0}],
			patterns: {
				d: "yyyy.MM.dd.",
				D: "yyyy. MMMM d.",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy. MMMM d. H:mm",
				F: "yyyy. MMMM d. H:mm:ss",
				M: "MMMM d.",
				Y: "yyyy. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "is-IS", "default", {
	name: "is-IS",
	englishName: "Icelandic (Iceland)",
	nativeName: "íslenska (Ísland)",
	language: "is",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			decimals: 0,
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"],
				namesAbbr: ["sun.","mán.","þri.","mið.","fim.","fös.","lau."],
				namesShort: ["su","má","þr","mi","fi","fö","la"]
			},
			months: {
				names: ["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember",""],
				namesAbbr: ["jan.","feb.","mar.","apr.","maí","jún.","júl.","ágú.","sep.","okt.","nóv.","des.",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "it-IT", "default", {
	name: "it-IT",
	englishName: "Italian (Italy)",
	nativeName: "italiano (Italia)",
	language: "it",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "Non un numero reale",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
				namesAbbr: ["dom","lun","mar","mer","gio","ven","sab"],
				namesShort: ["do","lu","ma","me","gi","ve","sa"]
			},
			months: {
				names: ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],
				namesAbbr: ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ja-JP", "default", {
	name: "ja-JP",
	englishName: "Japanese (Japan)",
	nativeName: "日本語 (日本)",
	language: "ja",
	numberFormat: {
		"NaN": "NaN (非数値)",
		negativeInfinity: "-∞",
		positiveInfinity: "+∞",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["-$n","$n"],
			decimals: 0,
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
				namesAbbr: ["日","月","火","水","木","金","土"],
				namesShort: ["日","月","火","水","木","金","土"]
			},
			months: {
				names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["午前","午前","午前"],
			PM: ["午後","午後","午後"],
			eras: [{"name":"西暦","start":null,"offset":0}],
			patterns: {
				d: "yyyy/MM/dd",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		},
		Japanese: {
			name: "Japanese",
			days: {
				names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
				namesAbbr: ["日","月","火","水","木","金","土"],
				namesShort: ["日","月","火","水","木","金","土"]
			},
			months: {
				names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["午前","午前","午前"],
			PM: ["午後","午後","午後"],
			eras: [{"name":"平成","start":null,"offset":1867},{"name":"昭和","start":-1812153600000,"offset":1911},{"name":"大正","start":-1357603200000,"offset":1925},{"name":"明治","start":60022080000,"offset":1988}],
			twoDigitYearMax: 99,
			patterns: {
				d: "gg y/M/d",
				D: "gg y'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "gg y'年'M'月'd'日' H:mm",
				F: "gg y'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "gg y'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "ko-KR", "default", {
	name: "ko-KR",
	englishName: "Korean (Korea)",
	nativeName: "한국어 (대한민국)",
	language: "ko",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			decimals: 0,
			symbol: "₩"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
				namesAbbr: ["일","월","화","수","목","금","토"],
				namesShort: ["일","월","화","수","목","금","토"]
			},
			months: {
				names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["오전","오전","오전"],
			PM: ["오후","오후","오후"],
			eras: [{"name":"서기","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy'년' M'월' d'일' dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "yyyy'년' M'월' d'일' dddd tt h:mm",
				F: "yyyy'년' M'월' d'일' dddd tt h:mm:ss",
				M: "M'월' d'일'",
				Y: "yyyy'년' M'월'"
			}
		},
		Korean: {
			name: "Korean",
			"/": "-",
			days: {
				names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
				namesAbbr: ["일","월","화","수","목","금","토"],
				namesShort: ["일","월","화","수","목","금","토"]
			},
			months: {
				names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: ["오전","오전","오전"],
			PM: ["오후","오후","오후"],
			eras: [{"name":"단기","start":null,"offset":-2333}],
			twoDigitYearMax: 4362,
			patterns: {
				d: "gg yyyy-MM-dd",
				D: "gg yyyy'년' M'월' d'일' dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "gg yyyy'년' M'월' d'일' dddd tt h:mm",
				F: "gg yyyy'년' M'월' d'일' dddd tt h:mm:ss",
				M: "M'월' d'일'",
				Y: "gg yyyy'년' M'월'"
			}
		}
	}
});

Globalize.addCultureInfo( "nl-NL", "default", {
	name: "nl-NL",
	englishName: "Dutch (Netherlands)",
	nativeName: "Nederlands (Nederland)",
	language: "nl",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],
				namesAbbr: ["zo","ma","di","wo","do","vr","za"],
				namesShort: ["zo","ma","di","wo","do","vr","za"]
			},
			months: {
				names: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d-M-yyyy",
				D: "dddd d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd d MMMM yyyy H:mm",
				F: "dddd d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "nb-NO", "default", {
	name: "nb-NO",
	englishName: "Norwegian, Bokmål (Norway)",
	nativeName: "norsk, bokmål (Norge)",
	language: "nb",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
				namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
				namesShort: ["sø","ma","ti","on","to","fr","lø"]
			},
			months: {
				names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "pl-PL", "default", {
	name: "pl-PL",
	englishName: "Polish (Poland)",
	nativeName: "polski (Polska)",
	language: "pl",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "nie jest liczbą",
		negativeInfinity: "-nieskończoność",
		positiveInfinity: "+nieskończoność",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "zł"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
				namesAbbr: ["N","Pn","Wt","Śr","Cz","Pt","So"],
				namesShort: ["N","Pn","Wt","Śr","Cz","Pt","So"]
			},
			months: {
				names: ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień",""],
				namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
			},
			monthsGenitive: {
				names: ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia",""],
				namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "pt-BR", "default", {
	name: "pt-BR",
	englishName: "Portuguese (Brazil)",
	nativeName: "Português (Brasil)",
	language: "pt",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NaN (Não é um número)",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ",",
			symbol: "R$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
				namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
				namesShort: ["D","S","T","Q","Q","S","S"]
			},
			months: {
				names: ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro",""],
				namesAbbr: ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' de 'MMMM' de 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
				F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
				M: "dd' de 'MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "rm-CH", "default", {
	name: "rm-CH",
	englishName: "Romansh (Switzerland)",
	nativeName: "Rumantsch (Svizra)",
	language: "rm",
	numberFormat: {
		",": "'",
		"NaN": "betg def.",
		negativeInfinity: "-infinit",
		positiveInfinity: "+infinit",
		percent: {
			pattern: ["-n%","n%"],
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "fr."
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
				namesAbbr: ["du","gli","ma","me","gie","ve","so"],
				namesShort: ["du","gli","ma","me","gie","ve","so"]
			},
			months: {
				names: ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december",""],
				namesAbbr: ["schan","favr","mars","avr","matg","zercl","fan","avust","sett","oct","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"s. Cr.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d MMMM yyyy HH:mm",
				F: "dddd, d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ro-RO", "default", {
	name: "ro-RO",
	englishName: "Romanian (Romania)",
	nativeName: "română (România)",
	language: "ro",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "lei"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["duminică","luni","marţi","miercuri","joi","vineri","sâmbătă"],
				namesAbbr: ["D","L","Ma","Mi","J","V","S"],
				namesShort: ["D","L","Ma","Mi","J","V","S"]
			},
			months: {
				names: ["ianuarie","februarie","martie","aprilie","mai","iunie","iulie","august","septembrie","octombrie","noiembrie","decembrie",""],
				namesAbbr: ["ian.","feb.","mar.","apr.","mai.","iun.","iul.","aug.","sep.","oct.","nov.","dec.",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ru-RU", "default", {
	name: "ru-RU",
	englishName: "Russian (Russia)",
	nativeName: "русский (Россия)",
	language: "ru",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],
				namesAbbr: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
				namesShort: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]
			},
			months: {
				names: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			monthsGenitive: {
				names: ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",""],
				namesAbbr: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy 'г.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'г.' H:mm",
				F: "d MMMM yyyy 'г.' H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hr-HR", "default", {
	name: "hr-HR",
	englishName: "Croatian (Croatia)",
	nativeName: "hrvatski (Hrvatska)",
	language: "hr",
	numberFormat: {
		pattern: ["- n"],
		",": ".",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kn"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			monthsGenitive: {
				names: ["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy.",
				D: "d. MMMM yyyy.",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy. H:mm",
				F: "d. MMMM yyyy. H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sk-SK", "default", {
	name: "sk-SK",
	englishName: "Slovak (Slovakia)",
	nativeName: "slovenčina (Slovenská republika)",
	language: "sk",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Nie je číslo",
		negativeInfinity: "-nekonečno",
		positiveInfinity: "+nekonečno",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],
				namesAbbr: ["ne","po","ut","st","št","pi","so"],
				namesShort: ["ne","po","ut","st","št","pi","so"]
			},
			months: {
				names: ["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			monthsGenitive: {
				names: ["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra",""],
				namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. l.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sq-AL", "default", {
	name: "sq-AL",
	englishName: "Albanian (Albania)",
	nativeName: "shqipe (Shqipëria)",
	language: "sq",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-infinit",
		positiveInfinity: "infinit",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": ".",
			".": ",",
			symbol: "Lek"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],
				namesAbbr: ["Die","Hën","Mar","Mër","Enj","Pre","Sht"],
				namesShort: ["Di","Hë","Ma","Më","En","Pr","Sh"]
			},
			months: {
				names: ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor",""],
				namesAbbr: ["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gsh","Sht","Tet","Nën","Dhj",""]
			},
			AM: ["PD","pd","PD"],
			PM: ["MD","md","MD"],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy-MM-dd",
				t: "h:mm.tt",
				T: "h:mm:ss.tt",
				f: "yyyy-MM-dd h:mm.tt",
				F: "yyyy-MM-dd h:mm:ss.tt",
				Y: "yyyy-MM"
			}
		}
	}
});

Globalize.addCultureInfo( "sv-SE", "default", {
	name: "sv-SE",
	englishName: "Swedish (Sweden)",
	nativeName: "svenska (Sverige)",
	language: "sv",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
				namesAbbr: ["sö","må","ti","on","to","fr","lö"],
				namesShort: ["sö","må","ti","on","to","fr","lö"]
			},
			months: {
				names: ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "'den 'd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "'den 'd MMMM yyyy HH:mm",
				F: "'den 'd MMMM yyyy HH:mm:ss",
				M: "'den 'd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "th-TH", "default", {
	name: "th-TH",
	englishName: "Thai (Thailand)",
	nativeName: "ไทย (ไทย)",
	language: "th",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "฿"
		}
	},
	calendars: {
		standard: {
			name: "ThaiBuddhist",
			firstDay: 1,
			days: {
				names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
				namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
				namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			eras: [{"name":"พ.ศ.","start":null,"offset":-543}],
			twoDigitYearMax: 2572,
			patterns: {
				d: "d/M/yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		},
		Gregorian_Localized: {
			firstDay: 1,
			days: {
				names: ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"],
				namesAbbr: ["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",""],
				namesAbbr: ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "'วัน'dddd'ที่' d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "'วัน'dddd'ที่' d MMMM yyyy H:mm",
				F: "'วัน'dddd'ที่' d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tr-TR", "default", {
	name: "tr-TR",
	englishName: "Turkish (Turkey)",
	nativeName: "Türkçe (Türkiye)",
	language: "tr",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "TL"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
				namesAbbr: ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
				namesShort: ["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]
			},
			months: {
				names: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",""],
				namesAbbr: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "dd MMMM yyyy dddd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy dddd HH:mm",
				F: "dd MMMM yyyy dddd HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ur-PK", "default", {
	name: "ur-PK",
	englishName: "Urdu (Islamic Republic of Pakistan)",
	nativeName: "اُردو (پاکستان)",
	language: "ur",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["$n-","$n"],
			symbol: "Rs"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["اتوار","پير","منگل","بدھ","جمعرات","جمعه","هفته"],
				namesAbbr: ["اتوار","پير","منگل","بدھ","جمعرات","جمعه","هفته"],
				namesShort: ["ا","پ","م","ب","ج","ج","ه"]
			},
			months: {
				names: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""],
				namesAbbr: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر",""]
			},
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				f: "dd MMMM, yyyy h:mm tt",
				F: "dd MMMM, yyyy h:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		}
	}
});

Globalize.addCultureInfo( "id-ID", "default", {
	name: "id-ID",
	englishName: "Indonesian (Indonesia)",
	nativeName: "Bahasa Indonesia (Indonesia)",
	language: "id",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			decimals: 0,
			",": ".",
			".": ",",
			symbol: "Rp"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"],
				namesAbbr: ["Minggu","Sen","Sel","Rabu","Kamis","Jumat","Sabtu"],
				namesShort: ["M","S","S","R","K","J","S"]
			},
			months: {
				names: ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember",""],
				namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agust","Sep","Okt","Nop","Des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM yyyy H:mm",
				F: "dd MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "uk-UA", "default", {
	name: "uk-UA",
	englishName: "Ukrainian (Ukraine)",
	nativeName: "українська (Україна)",
	language: "uk",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-безмежність",
		positiveInfinity: "безмежність",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "₴"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["неділя","понеділок","вівторок","середа","четвер","п'ятниця","субота"],
				namesAbbr: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],
				namesShort: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]
			},
			months: {
				names: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",""],
				namesAbbr: ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру",""]
			},
			monthsGenitive: {
				names: ["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня",""],
				namesAbbr: ["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy' р.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy' р.' H:mm",
				F: "d MMMM yyyy' р.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy' р.'"
			}
		}
	}
});

Globalize.addCultureInfo( "be-BY", "default", {
	name: "be-BY",
	englishName: "Belarusian (Belarus)",
	nativeName: "Беларускі (Беларусь)",
	language: "be",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"],
				namesAbbr: ["нд","пн","аў","ср","чц","пт","сб"],
				namesShort: ["нд","пн","аў","ср","чц","пт","сб"]
			},
			months: {
				names: ["Студзень","Люты","Сакавік","Красавік","Май","Чэрвень","Ліпень","Жнівень","Верасень","Кастрычнік","Лістапад","Снежань",""],
				namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
			},
			monthsGenitive: {
				names: ["студзеня","лютага","сакавіка","красавіка","мая","чэрвеня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня",""],
				namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sl-SI", "default", {
	name: "sl-SI",
	englishName: "Slovenian (Slovenia)",
	nativeName: "slovenski (Slovenija)",
	language: "sl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-neskončnost",
		positiveInfinity: "neskončnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],
				namesAbbr: ["ned","pon","tor","sre","čet","pet","sob"],
				namesShort: ["ne","po","to","sr","če","pe","so"]
			},
			months: {
				names: ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "et-EE", "default", {
	name: "et-EE",
	englishName: "Estonian (Estonia)",
	nativeName: "eesti (Eesti)",
	language: "et",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "avaldamatu",
		negativeInfinity: "miinuslõpmatus",
		positiveInfinity: "plusslõpmatus",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],
				namesAbbr: ["P","E","T","K","N","R","L"],
				namesShort: ["P","E","T","K","N","R","L"]
			},
			months: {
				names: ["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember",""],
				namesAbbr: ["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets",""]
			},
			AM: ["EL","el","EL"],
			PM: ["PL","pl","PL"],
			patterns: {
				d: "d.MM.yyyy",
				D: "d. MMMM yyyy'. a.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy'. a.' H:mm",
				F: "d. MMMM yyyy'. a.' H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy'. a.'"
			}
		}
	}
});

Globalize.addCultureInfo( "lv-LV", "default", {
	name: "lv-LV",
	englishName: "Latvian (Latvia)",
	nativeName: "latviešu (Latvija)",
	language: "lv",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-bezgalība",
		positiveInfinity: "bezgalība",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": " ",
			".": ",",
			symbol: "Ls"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
				namesAbbr: ["sv","pr","ot","tr","ce","pk","se"],
				namesShort: ["sv","pr","ot","tr","ce","pk","se"]
			},
			months: {
				names: ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
			},
			monthsGenitive: {
				names: ["janvārī","februārī","martā","aprīlī","maijā","jūnijā","jūlijā","augustā","septembrī","oktobrī","novembrī","decembrī",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy.MM.dd.",
				D: "dddd, yyyy'. gada 'd. MMMM",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, yyyy'. gada 'd. MMMM H:mm",
				F: "dddd, yyyy'. gada 'd. MMMM H:mm:ss",
				M: "d. MMMM",
				Y: "yyyy. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "lt-LT", "default", {
	name: "lt-LT",
	englishName: "Lithuanian (Lithuania)",
	nativeName: "lietuvių (Lietuva)",
	language: "lt",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-begalybė",
		positiveInfinity: "begalybė",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Lt"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
				namesAbbr: ["Sk","Pr","An","Tr","Kt","Pn","Št"],
				namesShort: ["S","P","A","T","K","Pn","Š"]
			},
			months: {
				names: ["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis",""],
				namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
			},
			monthsGenitive: {
				names: ["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio",""],
				namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy.MM.dd",
				D: "yyyy 'm.' MMMM d 'd.'",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'm.' MMMM d 'd.' HH:mm",
				F: "yyyy 'm.' MMMM d 'd.' HH:mm:ss",
				M: "MMMM d 'd.'",
				Y: "yyyy 'm.' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "tg-Cyrl-TJ", "default", {
	name: "tg-Cyrl-TJ",
	englishName: "Tajik (Cyrillic, Tajikistan)",
	nativeName: "Тоҷикӣ (Тоҷикистон)",
	language: "tg-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			groupSizes: [3,0],
			",": " ",
			".": ";",
			symbol: "т.р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			days: {
				names: ["Яш","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
				namesAbbr: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"],
				namesShort: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"]
			},
			months: {
				names: ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["январи","феврали","марти","апрели","маи","июни","июли","августи","сентябри","октябри","ноябри","декабри",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fa-IR", "default", {
	name: "fa-IR",
	englishName: "Persian",
	nativeName: "فارسى (ایران)",
	language: "fa",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		currency: {
			pattern: ["$n-","$ n"],
			".": "/",
			symbol: "ريال"
		}
	},
	calendars: {
		standard: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["ژانويه","فوريه","مارس","آوريل","مى","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر",""],
				namesAbbr: ["ژانويه","فوريه","مارس","آوريل","مى","ژوئن","ژوئيه","اوت","سپتامبر","اُكتبر","نوامبر","دسامبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			patterns: {
				d: "yyyy/MM/dd",
				D: "yyyy/MM/dd",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "yyyy/MM/dd hh:mm tt",
				F: "yyyy/MM/dd hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ق.ظ","ق.ظ","ق.ظ"],
			PM: ["ب.ظ","ب.ظ","ب.ظ"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "vi-VN", "default", {
	name: "vi-VN",
	englishName: "Vietnamese (Vietnam)",
	nativeName: "Tiếng Việt (Việt Nam)",
	language: "vi",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "₫"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"],
				namesAbbr: ["CN","Hai","Ba","Tư","Năm","Sáu","Bảy"],
				namesShort: ["C","H","B","T","N","S","B"]
			},
			months: {
				names: ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai",""],
				namesAbbr: ["Thg1","Thg2","Thg3","Thg4","Thg5","Thg6","Thg7","Thg8","Thg9","Thg10","Thg11","Thg12",""]
			},
			AM: ["SA","sa","SA"],
			PM: ["CH","ch","CH"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				f: "dd MMMM yyyy h:mm tt",
				F: "dd MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hy-AM", "default", {
	name: "hy-AM",
	englishName: "Armenian (Armenia)",
	nativeName: "Հայերեն (Հայաստան)",
	language: "hy",
	numberFormat: {
		currency: {
			pattern: ["-n $","n $"],
			symbol: "դր."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","ՈՒրբաթ","Շաբաթ"],
				namesAbbr: ["Կիր","Երկ","Երք","Չրք","Հնգ","ՈՒր","Շբթ"],
				namesShort: ["Կ","Ե","Ե","Չ","Հ","Ո","Շ"]
			},
			months: {
				names: ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր",""],
				namesAbbr: ["ՀՆՎ","ՓՏՎ","ՄՐՏ","ԱՊՐ","ՄՅՍ","ՀՆՍ","ՀԼՍ","ՕԳՍ","ՍԵՊ","ՀՈԿ","ՆՈՅ","ԴԵԿ",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM, yyyy H:mm",
				F: "d MMMM, yyyy H:mm:ss",
				M: "d MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "az-Latn-AZ", "default", {
	name: "az-Latn-AZ",
	englishName: "Azeri (Latin, Azerbaijan)",
	nativeName: "Azərbaycan\xadılı (Azərbaycan)",
	language: "az-Latn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "man."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],
				namesAbbr: ["B","Be","Ça","Ç","Ca","C","Ş"],
				namesShort: ["B","Be","Ça","Ç","Ca","C","Ş"]
			},
			months: {
				names: ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			monthsGenitive: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "eu-ES", "default", {
	name: "eu-ES",
	englishName: "Basque (Basque)",
	nativeName: "euskara (euskara)",
	language: "eu",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "EdZ",
		negativeInfinity: "-Infinitu",
		positiveInfinity: "Infinitu",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],
				namesAbbr: ["ig.","al.","as.","az.","og.","or.","lr."],
				namesShort: ["ig","al","as","az","og","or","lr"]
			},
			months: {
				names: ["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua",""],
				namesAbbr: ["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "yyyy/MM/dd",
				D: "dddd, yyyy.'eko' MMMM'k 'd",
				t: "HH:mm",
				T: "H:mm:ss",
				f: "dddd, yyyy.'eko' MMMM'k 'd HH:mm",
				F: "dddd, yyyy.'eko' MMMM'k 'd H:mm:ss",
				Y: "yyyy.'eko' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "hsb-DE", "default", {
	name: "hsb-DE",
	englishName: "Upper Sorbian (Germany)",
	nativeName: "hornjoserbšćina (Němska)",
	language: "hsb",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "njedefinowane",
		negativeInfinity: "-njekónčne",
		positiveInfinity: "+njekónčne",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["njedźela","póndźela","wutora","srjeda","štwórtk","pjatk","sobota"],
				namesAbbr: ["nje","pón","wut","srj","štw","pja","sob"],
				namesShort: ["n","p","w","s","š","p","s"]
			},
			months: {
				names: ["januar","februar","měrc","apryl","meja","junij","julij","awgust","september","oktober","nowember","december",""],
				namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
			},
			monthsGenitive: {
				names: ["januara","februara","měrca","apryla","meje","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],
				namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"po Chr.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "dddd, 'dnja' d. MMMM yyyy",
				t: "H.mm 'hodź.'",
				T: "H:mm:ss",
				f: "dddd, 'dnja' d. MMMM yyyy H.mm 'hodź.'",
				F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "mk-MK", "default", {
	name: "mk-MK",
	englishName: "Macedonian (Former Yugoslav Republic of Macedonia)",
	nativeName: "македонски јазик (Македонија)",
	language: "mk",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "ден."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недела","понеделник","вторник","среда","четврток","петок","сабота"],
				namesAbbr: ["нед","пон","втр","срд","чет","пет","саб"],
				namesShort: ["не","по","вт","ср","че","пе","са"]
			},
			months: {
				names: ["јануари","февруари","март","април","мај","јуни","јули","август","септември","октомври","ноември","декември",""],
				namesAbbr: ["јан","фев","мар","апр","мај","јун","јул","авг","сеп","окт","ное","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, dd MMMM yyyy HH:mm",
				F: "dddd, dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tn-ZA", "default", {
	name: "tn-ZA",
	englishName: "Setswana (South Africa)",
	nativeName: "Setswana (Aforika Borwa)",
	language: "tn",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Latshipi","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Lamatlhatso"],
				namesAbbr: ["Ltp.","Mos.","Lbd.","Lbr.","Lbn.","Lbt.","Lmt."],
				namesShort: ["Lp","Ms","Lb","Lr","Ln","Lt","Lm"]
			},
			months: {
				names: ["Ferikgong","Tlhakole","Mopitloe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole",""],
				namesAbbr: ["Fer.","Tlhak.","Mop.","Mor.","Motsh.","Seet.","Phukw.","Phatw.","Lwets.","Diph.","Ngwan.","Sed.",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "xh-ZA", "default", {
	name: "xh-ZA",
	englishName: "isiXhosa (South Africa)",
	nativeName: "isiXhosa (uMzantsi Afrika)",
	language: "xh",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["iCawa","uMvulo","uLwesibini","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
				namesShort: ["Ca","Mv","Lb","Lt","Ln","Lh","Mg"]
			},
			months: {
				names: ["Mqungu","Mdumba","Kwindla","Tshazimpuzi","Canzibe","Silimela","Khala","Thupha","Msintsi","Dwarha","Nkanga","Mnga",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zu-ZA", "default", {
	name: "zu-ZA",
	englishName: "isiZulu (South Africa)",
	nativeName: "isiZulu (iNingizimu Afrika)",
	language: "zu",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["iSonto","uMsombuluko","uLwesibili","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
				namesAbbr: ["Son.","Mso.","Bi.","Tha.","Ne.","Hla.","Mgq."]
			},
			months: {
				names: ["uMasingana","uNhlolanja","uNdasa","uMbaso","uNhlaba","uNhlangulana","uNtulikazi","uNcwaba","uMandulo","uMfumfu","uLwezi","uZibandlela",""],
				namesAbbr: ["Mas.","Nhlo.","Nda.","Mba.","Nhla.","Nhlang.","Ntu.","Ncwa.","Man.","Mfu.","Lwe.","Zib.",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "af-ZA", "default", {
	name: "af-ZA",
	englishName: "Afrikaans (South Africa)",
	nativeName: "Afrikaans (Suid Afrika)",
	language: "af",
	numberFormat: {
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"],
				namesAbbr: ["Son","Maan","Dins","Woen","Dond","Vry","Sat"],
				namesShort: ["So","Ma","Di","Wo","Do","Vr","Sa"]
			},
			months: {
				names: ["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember",""],
				namesAbbr: ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ka-GE", "default", {
	name: "ka-GE",
	englishName: "Georgian (Georgia)",
	nativeName: "ქართული (საქართველო)",
	language: "ka",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "Lari"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
				namesAbbr: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
				namesShort: ["კ","ო","ს","ო","ხ","პ","შ"]
			},
			months: {
				names: ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი",""],
				namesAbbr: ["იან","თებ","მარ","აპრ","მაის","ივნ","ივლ","აგვ","სექ","ოქტ","ნოემ","დეკ",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "yyyy 'წლის' dd MM, dddd",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'წლის' dd MM, dddd H:mm",
				F: "yyyy 'წლის' dd MM, dddd H:mm:ss",
				M: "dd MM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fo-FO", "default", {
	name: "fo-FO",
	englishName: "Faroese (Faroe Islands)",
	nativeName: "føroyskt (Føroyar)",
	language: "fo",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["sunnudagur","mánadagur","týsdagur","mikudagur","hósdagur","fríggjadagur","leygardagur"],
				namesAbbr: ["sun","mán","týs","mik","hós","frí","leyg"],
				namesShort: ["su","má","tý","mi","hó","fr","ley"]
			},
			months: {
				names: ["januar","februar","mars","apríl","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hi-IN", "default", {
	name: "hi-IN",
	englishName: "Hindi (India)",
	nativeName: "हिंदी (भारत)",
	language: "hi",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
				namesAbbr: ["रवि.","सोम.","मंगल.","बुध.","गुरु.","शुक्र.","शनि."],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""],
				namesAbbr: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""]
			},
			AM: ["पूर्वाह्न","पूर्वाह्न","पूर्वाह्न"],
			PM: ["अपराह्न","अपराह्न","अपराह्न"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mt-MT", "default", {
	name: "mt-MT",
	englishName: "Maltese (Malta)",
	nativeName: "Malti (Malta)",
	language: "mt",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],
				namesAbbr: ["Ħad","Tne","Tli","Erb","Ħam","Ġim","Sib"],
				namesShort: ["I","I","I","L","I","I","I"]
			},
			months: {
				names: ["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awissu","Settembru","Ottubru","Novembru","Diċembru",""],
				namesAbbr: ["Jan","Fra","Mar","Apr","Mej","Ġun","Lul","Awi","Set","Ott","Nov","Diċ",""]
			},
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, d' ta\\' 'MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' ta\\' 'MMMM yyyy HH:mm",
				F: "dddd, d' ta\\' 'MMMM yyyy HH:mm:ss",
				M: "d' ta\\' 'MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "se-NO", "default", {
	name: "se-NO",
	englishName: "Sami, Northern (Norway)",
	nativeName: "davvisámegiella (Norga)",
	language: "se",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorastat","bearjadat","lávvardat"],
				namesAbbr: ["sotn","vuos","maŋ","gask","duor","bear","láv"],
				namesShort: ["s","m","d","g","d","b","l"]
			},
			months: {
				names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			monthsGenitive: {
				names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ms-MY", "default", {
	name: "ms-MY",
	englishName: "Malay (Malaysia)",
	nativeName: "Bahasa Melayu (Malaysia)",
	language: "ms",
	numberFormat: {
		currency: {
			decimals: 0,
			symbol: "RM"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
				namesAbbr: ["Ahad","Isnin","Sel","Rabu","Khamis","Jumaat","Sabtu"],
				namesShort: ["A","I","S","R","K","J","S"]
			},
			months: {
				names: ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember",""],
				namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sept","Okt","Nov","Dis",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM yyyy H:mm",
				F: "dd MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kk-KZ", "default", {
	name: "kk-KZ",
	englishName: "Kazakh (Kazakhstan)",
	nativeName: "Қазақ (Қазақстан)",
	language: "kk",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-$n","$n"],
			",": " ",
			".": "-",
			symbol: "Т"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Жексенбі","Дүйсенбі","Сейсенбі","Сәрсенбі","Бейсенбі","Жұма","Сенбі"],
				namesAbbr: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"],
				namesShort: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"]
			},
			months: {
				names: ["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан",""],
				namesAbbr: ["Қаң","Ақп","Нау","Сәу","Мам","Мау","Шіл","Там","Қыр","Қаз","Қар","Жел",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy 'ж.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'ж.' H:mm",
				F: "d MMMM yyyy 'ж.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ky-KG", "default", {
	name: "ky-KG",
	englishName: "Kyrgyz (Kyrgyzstan)",
	nativeName: "Кыргыз (Кыргызстан)",
	language: "ky",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": "-",
			symbol: "сом"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Жекшемби","Дүйшөмбү","Шейшемби","Шаршемби","Бейшемби","Жума","Ишемби"],
				namesAbbr: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"],
				namesShort: ["Жш","Дш","Шш","Шр","Бш","Жм","Иш"]
			},
			months: {
				names: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d'-'MMMM yyyy'-ж.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d'-'MMMM yyyy'-ж.' H:mm",
				F: "d'-'MMMM yyyy'-ж.' H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy'-ж.'"
			}
		}
	}
});

Globalize.addCultureInfo( "sw-KE", "default", {
	name: "sw-KE",
	englishName: "Kiswahili (Kenya)",
	nativeName: "Kiswahili (Kenya)",
	language: "sw",
	numberFormat: {
		currency: {
			symbol: "S"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],
				namesAbbr: ["Jumap.","Jumat.","Juman.","Jumat.","Alh.","Iju.","Jumam."],
				namesShort: ["P","T","N","T","A","I","M"]
			},
			months: {
				names: ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Decemba",""],
				namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Dec",""]
			}
		}
	}
});

Globalize.addCultureInfo( "tk-TM", "default", {
	name: "tk-TM",
	englishName: "Turkmen (Turkmenistan)",
	nativeName: "türkmençe (Türkmenistan)",
	language: "tk",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-üznüksizlik",
		positiveInfinity: "üznüksizlik",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "m."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe","Ýekşenbe"],
				namesAbbr: ["Db","Sb","Çb","Pb","An","Şb","Ýb"],
				namesShort: ["D","S","Ç","P","A","Ş","Ý"]
			},
			months: {
				names: ["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr",""],
				namesAbbr: ["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Not","Dek",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "yyyy 'ý.' MMMM d",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'ý.' MMMM d H:mm",
				F: "yyyy 'ý.' MMMM d H:mm:ss",
				Y: "yyyy 'ý.' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "uz-Latn-UZ", "default", {
	name: "uz-Latn-UZ",
	englishName: "Uzbek (Latin, Uzbekistan)",
	nativeName: "U'zbek (U'zbekiston Respublikasi)",
	language: "uz-Latn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			decimals: 0,
			",": " ",
			".": ",",
			symbol: "so'm"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],
				namesAbbr: ["yak.","dsh.","sesh.","chr.","psh.","jm.","sh."],
				namesShort: ["ya","d","s","ch","p","j","sh"]
			},
			months: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM yyyy",
				D: "yyyy 'yil' d-MMMM",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'yil' d-MMMM HH:mm",
				F: "yyyy 'yil' d-MMMM HH:mm:ss",
				M: "d-MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tt-RU", "default", {
	name: "tt-RU",
	englishName: "Tatar (Russia)",
	nativeName: "Татар (Россия)",
	language: "tt",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Якшәмбе","Дүшәмбе","Сишәмбе","Чәршәмбе","Пәнҗешәмбе","Җомга","Шимбә"],
				namesAbbr: ["Якш","Дүш","Сиш","Чәрш","Пәнҗ","Җом","Шим"],
				namesShort: ["Я","Д","С","Ч","П","Җ","Ш"]
			},
			months: {
				names: ["Гыйнвар","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
				namesAbbr: ["Гыйн.","Фев.","Мар.","Апр.","Май","Июнь","Июль","Авг.","Сен.","Окт.","Нояб.","Дек.",""]
			},
			monthsGenitive: {
				names: ["Гыйнварның","Февральнең","Мартның","Апрельнең","Майның","Июньнең","Июльнең","Августның","Сентябрьның","Октябрьның","Ноябрьның","Декабрьның",""],
				namesAbbr: ["Гыйн.-ның","Фев.-нең","Мар.-ның","Апр.-нең","Майның","Июньнең","Июльнең","Авг.-ның","Сен.-ның","Окт.-ның","Нояб.-ның","Дек.-ның",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bn-IN", "default", {
	name: "bn-IN",
	englishName: "Bengali (India)",
	nativeName: "বাংলা (ভারত)",
	language: "bn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			pattern: ["-%n","%n"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "টা"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			":": ".",
			firstDay: 1,
			days: {
				names: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
				namesAbbr: ["রবি.","সোম.","মঙ্গল.","বুধ.","বৃহস্পতি.","শুক্র.","শনি."],
				namesShort: ["র","স","ম","ব","ব","শ","শ"]
			},
			months: {
				names: ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",""],
				namesAbbr: ["জানু.","ফেব্রু.","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ.","সেপ্টে.","অক্টো.","নভে.","ডিসে.",""]
			},
			AM: ["পুর্বাহ্ন","পুর্বাহ্ন","পুর্বাহ্ন"],
			PM: ["অপরাহ্ন","অপরাহ্ন","অপরাহ্ন"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH.mm",
				T: "HH.mm.ss",
				f: "dd MMMM yyyy HH.mm",
				F: "dd MMMM yyyy HH.mm.ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "pa-IN", "default", {
	name: "pa-IN",
	englishName: "Punjabi (India)",
	nativeName: "ਪੰਜਾਬੀ (ਭਾਰਤ)",
	language: "pa",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ਰੁ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁੱਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨਿੱਚਰਵਾਰ"],
				namesAbbr: ["ਐਤ.","ਸੋਮ.","ਮੰਗਲ.","ਬੁੱਧ.","ਵੀਰ.","ਸ਼ੁਕਰ.","ਸ਼ਨਿੱਚਰ."],
				namesShort: ["ਐ","ਸ","ਮ","ਬ","ਵ","ਸ਼","ਸ਼"]
			},
			months: {
				names: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""],
				namesAbbr: ["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""]
			},
			AM: ["ਸਵੇਰ","ਸਵੇਰ","ਸਵੇਰ"],
			PM: ["ਸ਼ਾਮ","ਸ਼ਾਮ","ਸ਼ਾਮ"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy dddd",
				t: "tt hh:mm",
				T: "tt hh:mm:ss",
				f: "dd MMMM yyyy dddd tt hh:mm",
				F: "dd MMMM yyyy dddd tt hh:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "gu-IN", "default", {
	name: "gu-IN",
	englishName: "Gujarati (India)",
	nativeName: "ગુજરાતી (ભારત)",
	language: "gu",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "રૂ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["રવિવાર","સોમવાર","મંગળવાર","બુધવાર","ગુરુવાર","શુક્રવાર","શનિવાર"],
				namesAbbr: ["રવિ","સોમ","મંગળ","બુધ","ગુરુ","શુક્ર","શનિ"],
				namesShort: ["ર","સ","મ","બ","ગ","શ","શ"]
			},
			months: {
				names: ["જાન્યુઆરી","ફેબ્રુઆરી","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટેમ્બર","ઑક્ટ્બર","નવેમ્બર","ડિસેમ્બર",""],
				namesAbbr: ["જાન્યુ","ફેબ્રુ","માર્ચ","એપ્રિલ","મે","જૂન","જુલાઈ","ઑગસ્ટ","સપ્ટે","ઑક્ટો","નવે","ડિસે",""]
			},
			AM: ["પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન","પૂર્વ મધ્યાહ્ન"],
			PM: ["ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "or-IN", "default", {
	name: "or-IN",
	englishName: "Oriya (India)",
	nativeName: "ଓଡ଼ିଆ (ଭାରତ)",
	language: "or",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ଟ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["ରବିବାର","ସୋମବାର","ମଙ୍ଗଳବାର","ବୁଧବାର","ଗୁରୁବାର","ଶୁକ୍ରବାର","ଶନିବାର"],
				namesAbbr: ["ରବି.","ସୋମ.","ମଙ୍ଗଳ.","ବୁଧ.","ଗୁରୁ.","ଶୁକ୍ର.","ଶନି."],
				namesShort: ["ର","ସୋ","ମ","ବୁ","ଗୁ","ଶୁ","ଶ"]
			},
			months: {
				names: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍\u200c","ମେ","ଜୁନ୍\u200c","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""],
				namesAbbr: ["ଜାନୁୟାରୀ","ଫ୍ରେବୃୟାରୀ","ମାର୍ଚ୍ଚ","ଏପ୍ରିଲ୍\u200c","ମେ","ଜୁନ୍\u200c","ଜୁଲାଇ","ଅଗଷ୍ଟ","ସେପ୍ଟେମ୍ବର","ଅକ୍ଟୋବର","ନଭେମ୍ବର","(ଡିସେମ୍ବର",""]
			},
			eras: [{"name":"ଖ୍ରୀଷ୍ଟାବ୍ଦ","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ta-IN", "default", {
	name: "ta-IN",
	englishName: "Tamil (India)",
	nativeName: "தமிழ் (இந்தியா)",
	language: "ta",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ரூ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ஞாயிற்றுக்கிழமை","திங்கள்கிழமை","செவ்வாய்கிழமை","புதன்கிழமை","வியாழக்கிழமை","வெள்ளிக்கிழமை","சனிக்கிழமை"],
				namesAbbr: ["ஞாயிறு","திங்கள்","செவ்வாய்","புதன்","வியாழன்","வெள்ளி","சனி"],
				namesShort: ["ஞா","தி","செ","பு","வி","வெ","ச"]
			},
			months: {
				names: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்",""],
				namesAbbr: ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்",""]
			},
			AM: ["காலை","காலை","காலை"],
			PM: ["மாலை","மாலை","மாலை"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "te-IN", "default", {
	name: "te-IN",
	englishName: "Telugu (India)",
	nativeName: "తెలుగు (భారత దేశం)",
	language: "te",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "రూ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ఆదివారం","సోమవారం","మంగళవారం","బుధవారం","గురువారం","శుక్రవారం","శనివారం"],
				namesAbbr: ["ఆది.","సోమ.","మంగళ.","బుధ.","గురు.","శుక్ర.","శని."],
				namesShort: ["ఆ","సో","మం","బు","గు","శు","శ"]
			},
			months: {
				names: ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్",""],
				namesAbbr: ["జనవరి","ఫిబ్రవరి","మార్చి","ఏప్రిల్","మే","జూన్","జూలై","ఆగస్టు","సెప్టెంబర్","అక్టోబర్","నవంబర్","డిసెంబర్",""]
			},
			AM: ["పూర్వాహ్న","పూర్వాహ్న","పూర్వాహ్న"],
			PM: ["అపరాహ్న","అపరాహ్న","అపరాహ్న"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "kn-IN", "default", {
	name: "kn-IN",
	englishName: "Kannada (India)",
	nativeName: "ಕನ್ನಡ (ಭಾರತ)",
	language: "kn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ರೂ"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ಭಾನುವಾರ","ಸೋಮವಾರ","ಮಂಗಳವಾರ","ಬುಧವಾರ","ಗುರುವಾರ","ಶುಕ್ರವಾರ","ಶನಿವಾರ"],
				namesAbbr: ["ಭಾನು.","ಸೋಮ.","ಮಂಗಳ.","ಬುಧ.","ಗುರು.","ಶುಕ್ರ.","ಶನಿ."],
				namesShort: ["ರ","ಸ","ಮ","ಬ","ಗ","ಶ","ಶ"]
			},
			months: {
				names: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""],
				namesAbbr: ["ಜನವರಿ","ಫೆಬ್ರವರಿ","ಮಾರ್ಚ್","ಎಪ್ರಿಲ್","ಮೇ","ಜೂನ್","ಜುಲೈ","ಆಗಸ್ಟ್","ಸೆಪ್ಟಂಬರ್","ಅಕ್ಟೋಬರ್","ನವೆಂಬರ್","ಡಿಸೆಂಬರ್",""]
			},
			AM: ["ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ","ಪೂರ್ವಾಹ್ನ"],
			PM: ["ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ","ಅಪರಾಹ್ನ"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ml-IN", "default", {
	name: "ml-IN",
	englishName: "Malayalam (India)",
	nativeName: "മലയാളം (ഭാരതം)",
	language: "ml",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			pattern: ["-%n","%n"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "ക"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			":": ".",
			firstDay: 1,
			days: {
				names: ["ഞായറാഴ്ച","തിങ്കളാഴ്ച","ചൊവ്വാഴ്ച","ബുധനാഴ്ച","വ്യാഴാഴ്ച","വെള്ളിയാഴ്ച","ശനിയാഴ്ച"],
				namesAbbr: ["ഞായർ.","തിങ്കൾ.","ചൊവ്വ.","ബുധൻ.","വ്യാഴം.","വെള്ളി.","ശനി."],
				namesShort: ["ഞ","ത","ച","ബ","വ","വെ","ശ"]
			},
			months: {
				names: ["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""],
				namesAbbr: ["ജനുവരി","ഫെബ്റുവരി","മാറ്ച്ച്","ഏപ്റില്","മെയ്","ജൂണ്","ജൂലൈ","ഓഗസ്ററ്","സെപ്ററംബറ്","ഒക്ടോബറ്","നവംബറ്","ഡിസംബറ്",""]
			},
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH.mm",
				T: "HH.mm.ss",
				f: "dd MMMM yyyy HH.mm",
				F: "dd MMMM yyyy HH.mm.ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "as-IN", "default", {
	name: "as-IN",
	englishName: "Assamese (India)",
	nativeName: "অসমীয়া (ভাৰত)",
	language: "as",
	numberFormat: {
		groupSizes: [3,2],
		"NaN": "nan",
		negativeInfinity: "-infinity",
		positiveInfinity: "infinity",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","n$"],
			groupSizes: [3,2],
			symbol: "ট"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহস্পতিবাৰ","শুক্রবাৰ","শনিবাৰ","ৰবিবাৰ"],
				namesAbbr: ["সোম.","মঙ্গল.","বুধ.","বৃহ.","শুক্র.","শনি.","ৰবি."],
				namesShort: ["সো","ম","বু","বৃ","শু","শ","র"]
			},
			months: {
				names: ["জানুৱাৰী","ফেব্রুৱাৰী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টেম্বর","অক্টোবর","নবেম্বর","ডিচেম্বর",""],
				namesAbbr: ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টে","অক্টো","নবে","ডিচে",""]
			},
			AM: ["ৰাতিপু","ৰাতিপু","ৰাতিপু"],
			PM: ["আবেলি","আবেলি","আবেলি"],
			eras: [{"name":"খ্রীষ্টাব্দ","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "yyyy,MMMM dd, dddd",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "yyyy,MMMM dd, dddd tt h:mm",
				F: "yyyy,MMMM dd, dddd tt h:mm:ss",
				M: "dd MMMM",
				Y: "MMMM,yy"
			}
		}
	}
});

Globalize.addCultureInfo( "mr-IN", "default", {
	name: "mr-IN",
	englishName: "Marathi (India)",
	nativeName: "मराठी (भारत)",
	language: "mr",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["रविवार","सोमवार","मंगळवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"],
				namesAbbr: ["रवि.","सोम.","मंगळ.","बुध.","गुरु.","शुक्र.","शनि."],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोव्हेंबर","डिसेंबर",""],
				namesAbbr: ["जाने.","फेब्रु.","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टें.","ऑक्टो.","नोव्हें.","डिसें.",""]
			},
			AM: ["म.पू.","म.पू.","म.पू."],
			PM: ["म.नं.","म.नं.","म.नं."],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sa-IN", "default", {
	name: "sa-IN",
	englishName: "Sanskrit (India)",
	nativeName: "संस्कृत (भारतम्)",
	language: "sa",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
				namesAbbr: ["रविवासरः","सोमवासरः","मङ्गलवासरः","बुधवासरः","गुरुवासरः","शुक्रवासरः","शनिवासरः"],
				namesShort: ["र","स","म","ब","ग","श","श"]
			},
			months: {
				names: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""],
				namesAbbr: ["जनवरी","फरवरी","मार्च","अप्रैल","मई","जून","जुलाई","अगस्त","सितम्बर","अक्तूबर","नवम्बर","दिसम्बर",""]
			},
			AM: ["पूर्वाह्न","पूर्वाह्न","पूर्वाह्न"],
			PM: ["अपराह्न","अपराह्न","अपराह्न"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy dddd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy dddd HH:mm",
				F: "dd MMMM yyyy dddd HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mn-MN", "default", {
	name: "mn-MN",
	englishName: "Mongolian (Cyrillic, Mongolia)",
	nativeName: "Монгол хэл (Монгол улс)",
	language: "mn-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "₮"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"],
				namesAbbr: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"],
				namesShort: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"]
			},
			months: {
				names: ["1 дүгээр сар","2 дугаар сар","3 дугаар сар","4 дүгээр сар","5 дугаар сар","6 дугаар сар","7 дугаар сар","8 дугаар сар","9 дүгээр сар","10 дугаар сар","11 дүгээр сар","12 дугаар сар",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			monthsGenitive: {
				names: ["1 дүгээр сарын","2 дугаар сарын","3 дугаар сарын","4 дүгээр сарын","5 дугаар сарын","6 дугаар сарын","7 дугаар сарын","8 дугаар сарын","9 дүгээр сарын","10 дугаар сарын","11 дүгээр сарын","12 дугаар сарын",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yy.MM.dd",
				D: "yyyy 'оны' MMMM d",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'оны' MMMM d H:mm",
				F: "yyyy 'оны' MMMM d H:mm:ss",
				M: "d MMMM",
				Y: "yyyy 'он' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "bo-CN", "default", {
	name: "bo-CN",
	englishName: "Tibetan (PRC)",
	nativeName: "བོད་ཡིག (ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།)",
	language: "bo",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ཨང་ཀི་མིན་པ།",
		negativeInfinity: "མོ་གྲངས་ཚད་མེད་ཆུང་བ།",
		positiveInfinity: "ཕོ་གྲངས་ཚད་མེད་ཆེ་བ།",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			groupSizes: [3,0],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["གཟའ་ཉི་མ།","གཟའ་ཟླ་བ།","གཟའ་མིག་དམར།","གཟའ་ལྷག་པ།","གཟའ་ཕུར་བུ།","གཟའ་པ་སངས།","གཟའ་སྤེན་པ།"],
				namesAbbr: ["ཉི་མ།","ཟླ་བ།","མིག་དམར།","ལྷག་པ།","ཕུར་བུ།","པ་སངས།","སྤེན་པ།"],
				namesShort: ["༧","༡","༢","༣","༤","༥","༦"]
			},
			months: {
				names: ["སྤྱི་ཟླ་དང་པོ།","སྤྱི་ཟླ་གཉིས་པ།","སྤྱི་ཟླ་གསུམ་པ།","སྤྱི་ཟླ་བཞི་པ།","སྤྱི་ཟླ་ལྔ་པ།","སྤྱི་ཟླ་དྲུག་པ།","སྤྱི་ཟླ་བདུན་པ།","སྤྱི་ཟླ་བརྒྱད་པ།","སྤྱི་ཟླ་དགུ་པ།","སྤྱི་ཟླ་བཅུ་པོ།","སྤྱི་ཟླ་བཅུ་གཅིག་པ།","སྤྱི་ཟླ་བཅུ་གཉིས་པ།",""],
				namesAbbr: ["ཟླ་ ༡","ཟླ་ ༢","ཟླ་ ༣","ཟླ་ ༤","ཟླ་ ༥","ཟླ་ ༦","ཟླ་ ༧","ཟླ་ ༨","ཟླ་ ༩","ཟླ་ ༡༠","ཟླ་ ༡༡","ཟླ་ ༡༢",""]
			},
			AM: ["སྔ་དྲོ","སྔ་དྲོ","སྔ་དྲོ"],
			PM: ["ཕྱི་དྲོ","ཕྱི་དྲོ","ཕྱི་དྲོ"],
			eras: [{"name":"སྤྱི་ལོ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ལོའི་ཟླ' M'ཚེས' d",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm",
				F: "yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm:ss",
				M: "'ཟླ་' M'ཚེས'd",
				Y: "yyyy.M"
			}
		}
	}
});

Globalize.addCultureInfo( "cy-GB", "default", {
	name: "cy-GB",
	englishName: "Welsh (United Kingdom)",
	nativeName: "Cymraeg (y Deyrnas Unedig)",
	language: "cy",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "£"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Dydd Sul","Dydd Llun","Dydd Mawrth","Dydd Mercher","Dydd Iau","Dydd Gwener","Dydd Sadwrn"],
				namesAbbr: ["Sul","Llun","Maw","Mer","Iau","Gwe","Sad"],
				namesShort: ["Su","Ll","Ma","Me","Ia","Gw","Sa"]
			},
			months: {
				names: ["Ionawr","Chwefror","Mawrth","Ebrill","Mai","Mehefin","Gorffennaf","Awst","Medi","Hydref","Tachwedd","Rhagfyr",""],
				namesAbbr: ["Ion","Chwe","Maw","Ebr","Mai","Meh","Gor","Aws","Med","Hyd","Tach","Rhag",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "km-KH", "default", {
	name: "km-KH",
	englishName: "Khmer (Cambodia)",
	nativeName: "ខ្មែរ (កម្ពុជា)",
	language: "km",
	numberFormat: {
		pattern: ["- n"],
		groupSizes: [3,0],
		"NaN": "NAN",
		negativeInfinity: "-- អនន្ត",
		positiveInfinity: "អនន្ត",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["-n$","n$"],
			symbol: "៛"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["ថ្ងៃអាទិត្យ","ថ្ងៃច័ន្ទ","ថ្ងៃអង្គារ","ថ្ងៃពុធ","ថ្ងៃព្រហស្បតិ៍","ថ្ងៃសុក្រ","ថ្ងៃសៅរ៍"],
				namesAbbr: ["អាទិ.","ច.","អ.","ពុ","ព្រហ.","សុ.","ស."],
				namesShort: ["អា","ច","អ","ពុ","ព្","សុ","ស"]
			},
			months: {
				names: ["មករា","កុម្ភៈ","មិនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ",""],
				namesAbbr: ["១","២","៣","៤","៥","៦","៧","៨","៩","១០","១១","១២",""]
			},
			AM: ["ព្រឹក","ព្រឹក","ព្រឹក"],
			PM: ["ល្ងាច","ល្ងាច","ល្ងាច"],
			eras: [{"name":"មុនគ.ស.","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "d MMMM yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "d MMMM yyyy H:mm tt",
				F: "d MMMM yyyy HH:mm:ss",
				M: "'ថ្ងៃទី' dd 'ខែ' MM",
				Y: "'ខែ' MM 'ឆ្នាំ' yyyy"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ព្រឹក","ព្រឹក","ព្រឹក"],
			PM: ["ល្ងាច","ល្ងាច","ល្ងាច"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm tt",
				F: "dddd, MMMM dd, yyyy HH:mm:ss"
			}
		}
	}
});

Globalize.addCultureInfo( "lo-LA", "default", {
	name: "lo-LA",
	englishName: "Lao (Lao P.D.R.)",
	nativeName: "ລາວ (ສ.ປ.ປ. ລາວ)",
	language: "lo",
	numberFormat: {
		pattern: ["(n)"],
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["(n$)","n$"],
			groupSizes: [3,0],
			symbol: "₭"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["ວັນອາທິດ","ວັນຈັນ","ວັນອັງຄານ","ວັນພຸດ","ວັນພະຫັດ","ວັນສຸກ","ວັນເສົາ"],
				namesAbbr: ["ອາທິດ","ຈັນ","ອັງຄານ","ພຸດ","ພະຫັດ","ສຸກ","ເສົາ"],
				namesShort: ["ອ","ຈ","ອ","ພ","ພ","ສ","ເ"]
			},
			months: {
				names: ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ",""],
				namesAbbr: ["ມັງກອນ","ກຸມພາ","ມີນາ","ເມສາ","ພຶດສະພາ","ມິຖຸນາ","ກໍລະກົດ","ສິງຫາ","ກັນຍາ","ຕຸລາ","ພະຈິກ","ທັນວາ",""]
			},
			AM: ["ເຊົ້າ","ເຊົ້າ","ເຊົ້າ"],
			PM: ["ແລງ","ແລງ","ແລງ"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm tt",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy H:mm tt",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gl-ES", "default", {
	name: "gl-ES",
	englishName: "Galician (Galician)",
	nativeName: "galego (galego)",
	language: "gl",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","luns","martes","mércores","xoves","venres","sábado"],
				namesAbbr: ["dom","luns","mar","mér","xov","ven","sáb"],
				namesShort: ["do","lu","ma","mé","xo","ve","sá"]
			},
			months: {
				names: ["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro",""],
				namesAbbr: ["xan","feb","mar","abr","maio","xuñ","xull","ago","set","out","nov","dec",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kok-IN", "default", {
	name: "kok-IN",
	englishName: "Konkani (India)",
	nativeName: "कोंकणी (भारत)",
	language: "kok",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["आयतार","सोमार","मंगळार","बुधवार","बिरेस्तार","सुक्रार","शेनवार"],
				namesAbbr: ["आय.","सोम.","मंगळ.","बुध.","बिरे.","सुक्र.","शेन."],
				namesShort: ["आ","स","म","ब","ब","स","श"]
			},
			months: {
				names: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""],
				namesAbbr: ["जानेवारी","फेब्रुवारी","मार्च","एप्रिल","मे","जून","जुलै","ऑगस्ट","सप्टेंबर","ऑक्टोबर","नोवेम्बर","डिसेंबर",""]
			},
			AM: ["म.पू.","म.पू.","म.पू."],
			PM: ["म.नं.","म.नं.","म.नं."],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "syr-SY", "default", {
	name: "syr-SY",
	englishName: "Syriac (Syria)",
	nativeName: "ܣܘܪܝܝܐ (سوريا)",
	language: "syr",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ل.س.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["ܚܕ ܒܫܒܐ","ܬܪܝܢ ܒܫܒܐ","ܬܠܬܐ ܒܫܒܐ","ܐܪܒܥܐ ܒܫܒܐ","ܚܡܫܐ ܒܫܒܐ","ܥܪܘܒܬܐ","ܫܒܬܐ"],
				namesAbbr: ["\u070fܐ \u070fܒܫ","\u070fܒ \u070fܒܫ","\u070fܓ \u070fܒܫ","\u070fܕ \u070fܒܫ","\u070fܗ \u070fܒܫ","\u070fܥܪܘܒ","\u070fܫܒ"],
				namesShort: ["ܐ","ܒ","ܓ","ܕ","ܗ","ܥ","ܫ"]
			},
			months: {
				names: ["ܟܢܘܢ ܐܚܪܝ","ܫܒܛ","ܐܕܪ","ܢܝܣܢ","ܐܝܪ","ܚܙܝܪܢ","ܬܡܘܙ","ܐܒ","ܐܝܠܘܠ","ܬܫܪܝ ܩܕܝܡ","ܬܫܪܝ ܐܚܪܝ","ܟܢܘܢ ܩܕܝܡ",""],
				namesAbbr: ["\u070fܟܢ \u070fܒ","ܫܒܛ","ܐܕܪ","ܢܝܣܢ","ܐܝܪ","ܚܙܝܪܢ","ܬܡܘܙ","ܐܒ","ܐܝܠܘܠ","\u070fܬܫ \u070fܐ","\u070fܬܫ \u070fܒ","\u070fܟܢ \u070fܐ",""]
			},
			AM: ["ܩ.ܛ","ܩ.ܛ","ܩ.ܛ"],
			PM: ["ܒ.ܛ","ܒ.ܛ","ܒ.ܛ"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "si-LK", "default", {
	name: "si-LK",
	englishName: "Sinhala (Sri Lanka)",
	nativeName: "සිංහල (ශ්\u200dරී ලංකා)",
	language: "si",
	numberFormat: {
		groupSizes: [3,2],
		negativeInfinity: "-අනන්තය",
		positiveInfinity: "අනන්තය",
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["($ n)","$ n"],
			symbol: "රු."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්\u200dරහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],
				namesAbbr: ["ඉරිදා","සඳුදා","කුජදා","බුදදා","ගුරුදා","කිවිදා","ශනිදා"],
				namesShort: ["ඉ","ස","අ","බ","බ්\u200dර","සි","සෙ"]
			},
			months: {
				names: ["ජනවාරි","පෙබරවාරි","මාර්තු","අ\u200cප්\u200dරේල්","මැයි","ජූනි","ජූලි","අ\u200cගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්",""],
				namesAbbr: ["ජන.","පෙබ.","මාර්තු.","අප්\u200dරේල්.","මැයි.","ජූනි.","ජූලි.","අගෝ.","සැප්.","ඔක්.","නොවැ.","දෙසැ.",""]
			},
			AM: ["පෙ.ව.","පෙ.ව.","පෙ.ව."],
			PM: ["ප.ව.","ප.ව.","ප.ව."],
			eras: [{"name":"ක්\u200dරි.ව.","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "yyyy MMMM' මස 'dd' වැනිදා 'dddd",
				f: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm tt",
				F: "yyyy MMMM' මස 'dd' වැනිදා 'dddd h:mm:ss tt",
				Y: "yyyy MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "iu-Cans-CA", "default", {
	name: "iu-Cans-CA",
	englishName: "Inuktitut (Syllabics, Canada)",
	nativeName: "ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕᒥ)",
	language: "iu-Cans",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["ᓈᑦᑏᖑᔭ","ᓇᒡᒐᔾᔭᐅ","ᐊᐃᑉᐱᖅ","ᐱᖓᑦᓯᖅ","ᓯᑕᒻᒥᖅ","ᑕᓪᓕᕐᒥᖅ","ᓯᕙᑖᕐᕕᒃ"],
				namesAbbr: ["ᓈᑦᑏ","ᓇᒡᒐ","ᐊᐃᑉᐱ","ᐱᖓᑦᓯ","ᓯᑕ","ᑕᓪᓕ","ᓯᕙᑖᕐᕕᒃ"],
				namesShort: ["ᓈ","ᓇ","ᐊ","ᐱ","ᓯ","ᑕ","ᓯ"]
			},
			months: {
				names: ["ᔮᓐᓄᐊᕆ","ᕖᕝᕗᐊᕆ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌᓯ","ᓯᑎᐱᕆ","ᐅᑐᐱᕆ","ᓄᕕᐱᕆ","ᑎᓯᐱᕆ",""],
				namesAbbr: ["ᔮᓐᓄ","ᕖᕝᕗ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌ","ᓯᑎᐱ","ᐅᑐᐱ","ᓄᕕᐱ","ᑎᓯᐱ",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "dddd,MMMM dd,yyyy",
				f: "dddd,MMMM dd,yyyy h:mm tt",
				F: "dddd,MMMM dd,yyyy h:mm:ss tt",
				Y: "MMMM,yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "am-ET", "default", {
	name: "am-ET",
	englishName: "Amharic (Ethiopia)",
	nativeName: "አማርኛ (ኢትዮጵያ)",
	language: "am",
	numberFormat: {
		decimals: 1,
		groupSizes: [3,0],
		"NaN": "NAN",
		percent: {
			pattern: ["-n%","n%"],
			decimals: 1,
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["-$n","$n"],
			groupSizes: [3,0],
			symbol: "ETB"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
				namesAbbr: ["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
				namesShort: ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"]
			},
			months: {
				names: ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር",""],
				namesAbbr: ["ጃንዩ","ፌብሩ","ማርች","ኤፕረ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክተ","ኖቬም","ዲሴም",""]
			},
			AM: ["ጡዋት","ጡዋት","ጡዋት"],
			PM: ["ከሰዓት","ከሰዓት","ከሰዓት"],
			eras: [{"name":"ዓመተ  ምሕረት","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "dddd '፣' MMMM d 'ቀን' yyyy",
				f: "dddd '፣' MMMM d 'ቀን' yyyy h:mm tt",
				F: "dddd '፣' MMMM d 'ቀን' yyyy h:mm:ss tt",
				M: "MMMM d ቀን",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ne-NP", "default", {
	name: "ne-NP",
	englishName: "Nepali (Nepal)",
	nativeName: "नेपाली (नेपाल)",
	language: "ne",
	numberFormat: {
		groupSizes: [3,2],
		"NaN": "nan",
		negativeInfinity: "-infinity",
		positiveInfinity: "infinity",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "रु"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["आइतवार","सोमवार","मङ्गलवार","बुधवार","बिहीवार","शुक्रवार","शनिवार"],
				namesAbbr: ["आइत","सोम","मङ्गल","बुध","बिही","शुक्र","शनि"],
				namesShort: ["आ","सो","म","बु","बि","शु","श"]
			},
			months: {
				names: ["जनवरी","फेब्रुअरी","मार्च","अप्रिल","मे","जून","जुलाई","अगस्त","सेप्टेम्बर","अक्टोबर","नोभेम्बर","डिसेम्बर",""],
				namesAbbr: ["जन","फेब","मार्च","अप्रिल","मे","जून","जुलाई","अग","सेप्ट","अक्ट","नोभ","डिस",""]
			},
			AM: ["विहानी","विहानी","विहानी"],
			PM: ["बेलुकी","बेलुकी","बेलुकी"],
			eras: [{"name":"a.d.","start":null,"offset":0}],
			patterns: {
				Y: "MMMM,yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fy-NL", "default", {
	name: "fy-NL",
	englishName: "Frisian (Netherlands)",
	nativeName: "Frysk (Nederlân)",
	language: "fy",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["Snein","Moandei","Tiisdei","Woansdei","Tongersdei","Freed","Sneon"],
				namesAbbr: ["Sn","Mo","Ti","Wo","To","Fr","Sn"],
				namesShort: ["S","M","T","W","T","F","S"]
			},
			months: {
				names: ["jannewaris","febrewaris","maart","april","maaie","juny","july","augustus","septimber","oktober","novimber","desimber",""],
				namesAbbr: ["jann","febr","mrt","apr","maaie","jun","jul","aug","sept","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d-M-yyyy",
				D: "dddd d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd d MMMM yyyy H:mm",
				F: "dddd d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ps-AF", "default", {
	name: "ps-AF",
	englishName: "Pashto (Afghanistan)",
	nativeName: "پښتو (افغانستان)",
	language: "ps",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		",": "،",
		".": ",",
		"NaN": "غ ع",
		negativeInfinity: "-∞",
		positiveInfinity: "∞",
		percent: {
			pattern: ["%n-","%n"],
			",": "،",
			".": ","
		},
		currency: {
			pattern: ["$n-","$n"],
			",": "٬",
			".": "٫",
			symbol: "؋"
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			firstDay: 6,
			days: {
				names: ["یکشنبه","دوشنبه","سه\u200cشنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["یکشنبه","دوشنبه","سه\u200cشنبه","چارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګا ښزمرى","زمرى","وږى","تله","لړم","لنڈ ۍ","مرغومى",""],
				namesAbbr: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګا ښ","زمرى","وږى","تله","لړم","لنڈ ۍ","مرغومى",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"ل.ه","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy, dd, MMMM, dddd",
				f: "yyyy, dd, MMMM, dddd h:mm tt",
				F: "yyyy, dd, MMMM, dddd h:mm:ss tt",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fil-PH", "default", {
	name: "fil-PH",
	englishName: "Filipino (Philippines)",
	nativeName: "Filipino (Pilipinas)",
	language: "fil",
	numberFormat: {
		currency: {
			symbol: "PhP"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Linggo","Lunes","Martes","Mierkoles","Huebes","Biernes","Sabado"],
				namesAbbr: ["Lin","Lun","Mar","Mier","Hueb","Bier","Saba"],
				namesShort: ["L","L","M","M","H","B","S"]
			},
			months: {
				names: ["Enero","Pebrero","Marso","Abril","Mayo","Hunyo","Hulyo","Agosto","Septyembre","Oktubre","Nobyembre","Disyembre",""],
				namesAbbr: ["En","Peb","Mar","Abr","Mayo","Hun","Hul","Agos","Sept","Okt","Nob","Dis",""]
			},
			eras: [{"name":"Anno Domini","start":null,"offset":0}]
		}
	}
});

Globalize.addCultureInfo( "dv-MV", "default", {
	name: "dv-MV",
	englishName: "Divehi (Maldives)",
	nativeName: "ދިވެހިބަސް (ދިވެހި ރާއްޖެ)",
	language: "dv",
	isRTL: true,
	numberFormat: {
		currency: {
			pattern: ["n $-","n $"],
			symbol: "ރ."
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			days: {
				names: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesAbbr: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesShort: ["އާ","ހޯ","އަ","ބު","ބު","ހު","ހޮ"]
			},
			months: {
				names: ["މުޙައްރަމް","ޞަފަރު","ރަބީޢުލްއައްވަލް","ރަބީޢުލްއާޚިރު","ޖުމާދަލްއޫލާ","ޖުމާދަލްއާޚިރާ","ރަޖަބް","ޝަޢްބާން","ރަމަޟާން","ޝައްވާލް","ޛުލްޤަޢިދާ","ޛުލްޙިއްޖާ",""],
				namesAbbr: ["މުޙައްރަމް","ޞަފަރު","ރަބީޢުލްއައްވަލް","ރަބީޢުލްއާޚިރު","ޖުމާދަލްއޫލާ","ޖުމާދަލްއާޚިރާ","ރަޖަބް","ޝަޢްބާން","ރަމަޟާން","ޝައްވާލް","ޛުލްޤަޢިދާ","ޛުލްޙިއްޖާ",""]
			},
			AM: ["މކ","މކ","މކ"],
			PM: ["މފ","މފ","މފ"],
			eras: [{"name":"ހިޖްރީ","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd/MM/yyyy HH:mm",
				F: "dd/MM/yyyy HH:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			days: {
				names: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesAbbr: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
				namesShort: ["އާ","ހޯ","އަ","ބު","ބު","ހު","ހޮ"]
			},
			months: {
				names: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޯގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ",""],
				namesAbbr: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޯގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ",""]
			},
			AM: ["މކ","މކ","މކ"],
			PM: ["މފ","މފ","މފ"],
			eras: [{"name":"މީލާދީ","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yy",
				D: "ddd, yyyy MMMM dd",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "ddd, yyyy MMMM dd HH:mm",
				F: "ddd, yyyy MMMM dd HH:mm:ss",
				Y: "yyyy, MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ha-Latn-NG", "default", {
	name: "ha-Latn-NG",
	englishName: "Hausa (Latin, Nigeria)",
	nativeName: "Hausa (Nigeria)",
	language: "ha-Latn",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
				namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
				namesShort: ["L","L","T","L","A","J","A"]
			},
			months: {
				names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
				namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
			},
			AM: ["Safe","safe","SAFE"],
			PM: ["Yamma","yamma","YAMMA"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "yo-NG", "default", {
	name: "yo-NG",
	englishName: "Yoruba (Nigeria)",
	nativeName: "Yoruba (Nigeria)",
	language: "yo",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
				namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
				namesShort: ["A","A","I","O","O","E","A"]
			},
			months: {
				names: ["Osu kinni","Osu keji","Osu keta","Osu kerin","Osu karun","Osu kefa","Osu keje","Osu kejo","Osu kesan","Osu kewa","Osu kokanla","Osu keresi",""],
				namesAbbr: ["kin.","kej.","ket.","ker.","kar.","kef.","kej.","kej.","kes.","kew.","kok.","ker.",""]
			},
			AM: ["Owuro","owuro","OWURO"],
			PM: ["Ale","ale","ALE"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "quz-BO", "default", {
	name: "quz-BO",
	englishName: "Quechua (Bolivia)",
	nativeName: "runasimi (Qullasuyu)",
	language: "quz",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ",",
			symbol: "$b"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["intichaw","killachaw","atipachaw","quyllurchaw","Ch' askachaw","Illapachaw","k'uychichaw"],
				namesAbbr: ["int","kil","ati","quy","Ch'","Ill","k'u"],
				namesShort: ["d","k","a","m","h","b","k"]
			},
			months: {
				names: ["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi",""],
				namesAbbr: ["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "nso-ZA", "default", {
	name: "nso-ZA",
	englishName: "Sesotho sa Leboa (South Africa)",
	nativeName: "Sesotho sa Leboa (Afrika Borwa)",
	language: "nso",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lamorena","Mošupologo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],
				namesAbbr: ["Lam","Moš","Lbb","Lbr","Lbn","Lbh","Mok"],
				namesShort: ["L","M","L","L","L","L","M"]
			},
			months: {
				names: ["Pherekgong","Hlakola","Mopitlo","Moranang","Mosegamanye","Ngoatobošego","Phuphu","Phato","Lewedi","Diphalana","Dibatsela","Manthole",""],
				namesAbbr: ["Pher","Hlak","Mop","Mor","Mos","Ngwat","Phup","Phat","Lew","Dip","Dib","Man",""]
			},
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ba-RU", "default", {
	name: "ba-RU",
	englishName: "Bashkir (Russia)",
	nativeName: "Башҡорт (Россия)",
	language: "ba",
	numberFormat: {
		",": " ",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			groupSizes: [3,0],
			",": " ",
			".": ",",
			symbol: "һ."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Йәкшәмбе","Дүшәмбе","Шишәмбе","Шаршамбы","Кесаҙна","Йома","Шәмбе"],
				namesAbbr: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],
				namesShort: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"]
			},
			months: {
				names: ["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
				namesAbbr: ["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d MMMM yyyy 'й'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy 'й' H:mm",
				F: "d MMMM yyyy 'й' H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "lb-LU", "default", {
	name: "lb-LU",
	englishName: "Luxembourgish (Luxembourg)",
	nativeName: "Lëtzebuergesch (Luxembourg)",
	language: "lb",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "n. num.",
		negativeInfinity: "-onendlech",
		positiveInfinity: "+onendlech",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sonndeg","Méindeg","Dënschdeg","Mëttwoch","Donneschdeg","Freideg","Samschdeg"],
				namesAbbr: ["Son","Méi","Dën","Mët","Don","Fre","Sam"],
				namesShort: ["So","Mé","Dë","Më","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","Mäerz","Abrëll","Mee","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mäe","Abr","Mee","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "kl-GL", "default", {
	name: "kl-GL",
	englishName: "Greenlandic (Greenland)",
	nativeName: "kalaallisut (Kalaallit Nunaat)",
	language: "kl",
	numberFormat: {
		",": ".",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			groupSizes: [3,0],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,0],
			",": ".",
			".": ",",
			symbol: "kr."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["sapaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],
				namesAbbr: ["sap","ata","mar","ping","sis","tal","arf"],
				namesShort: ["sa","at","ma","pi","si","ta","ar"]
			},
			months: {
				names: ["januari","februari","martsi","apriili","maaji","juni","juli","aggusti","septembari","oktobari","novembari","decembari",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ig-NG", "default", {
	name: "ig-NG",
	englishName: "Igbo (Nigeria)",
	nativeName: "Igbo (Nigeria)",
	language: "ig",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
				namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
				namesShort: ["A","A","I","O","O","E","A"]
			},
			months: {
				names: ["Onwa mbu","Onwa ibua","Onwa ato","Onwa ano","Onwa ise","Onwa isi","Onwa asa","Onwa asato","Onwa itolu","Onwa iri","Onwa iri n'ofu","Onwa iri n'ibua",""],
				namesAbbr: ["mbu.","ibu.","ato.","ano.","ise","isi","asa","asa.","ito.","iri.","n'of.","n'ib.",""]
			},
			AM: ["Ututu","ututu","UTUTU"],
			PM: ["Efifie","efifie","EFIFIE"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ii-CN", "default", {
	name: "ii-CN",
	englishName: "Yi (PRC)",
	nativeName: "ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)",
	language: "ii",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ꌗꂷꀋꉬ",
		negativeInfinity: "ꀄꊭꌐꀋꉆ",
		positiveInfinity: "ꈤꇁꑖꀋꉬ",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["ꑭꆏꑍ","ꆏꊂ꒔","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"],
				namesAbbr: ["ꑭꆏ","ꆏ꒔","ꆏꑍ","ꆏꌕ","ꆏꇖ","ꆏꉬ","ꆏꃘ"],
				namesShort: ["ꆏ","꒔","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"]
			},
			months: {
				names: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""],
				namesAbbr: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""]
			},
			AM: ["ꂵꆪꈌꈐ","ꂵꆪꈌꈐ","ꂵꆪꈌꈐ"],
			PM: ["ꂵꆪꈌꉈ","ꂵꆪꈌꉈ","ꂵꆪꈌꉈ"],
			eras: [{"name":"ꇬꑼ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ꈎ' M'ꆪ' d'ꑍ'",
				t: "tt h:mm",
				T: "H:mm:ss",
				f: "yyyy'ꈎ' M'ꆪ' d'ꑍ' tt h:mm",
				F: "yyyy'ꈎ' M'ꆪ' d'ꑍ' H:mm:ss",
				M: "M'ꆪ' d'ꑍ'",
				Y: "yyyy'ꈎ' M'ꆪ'"
			}
		}
	}
});

Globalize.addCultureInfo( "arn-CL", "default", {
	name: "arn-CL",
	englishName: "Mapudungun (Chile)",
	nativeName: "Mapudungun (Chile)",
	language: "arn",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "moh-CA", "default", {
	name: "moh-CA",
	englishName: "Mohawk (Mohawk)",
	nativeName: "Kanien'kéha",
	language: "moh",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Awentatokentì:ke","Awentataón'ke","Ratironhia'kehronòn:ke","Soséhne","Okaristiiáhne","Ronwaia'tanentaktonhne","Entákta"],
				namesShort: ["S","M","T","W","T","F","S"]
			},
			months: {
				names: ["Tsothohrkó:Wa","Enniska","Enniskó:Wa","Onerahtókha","Onerahtohkó:Wa","Ohiari:Ha","Ohiarihkó:Wa","Seskéha","Seskehkó:Wa","Kenténha","Kentenhkó:Wa","Tsothóhrha",""]
			}
		}
	}
});

Globalize.addCultureInfo( "br-FR", "default", {
	name: "br-FR",
	englishName: "Breton (France)",
	nativeName: "brezhoneg (Frañs)",
	language: "br",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "NkN",
		negativeInfinity: "-Anfin",
		positiveInfinity: "+Anfin",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sul","Lun","Meurzh","Merc'her","Yaou","Gwener","Sadorn"],
				namesAbbr: ["Sul","Lun","Meu.","Mer.","Yaou","Gwe.","Sad."],
				namesShort: ["Su","Lu","Mz","Mc","Ya","Gw","Sa"]
			},
			months: {
				names: ["Genver","C'hwevrer","Meurzh","Ebrel","Mae","Mezheven","Gouere","Eost","Gwengolo","Here","Du","Kerzu",""],
				namesAbbr: ["Gen.","C'hwe.","Meur.","Ebr.","Mae","Mezh.","Goue.","Eost","Gwen.","Here","Du","Kzu",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"g. J.-K.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ug-CN", "default", {
	name: "ug-CN",
	englishName: "Uyghur (PRC)",
	nativeName: "ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)",
	language: "ug",
	isRTL: true,
	numberFormat: {
		"NaN": "سان ئەمەس",
		negativeInfinity: "مەنپىي چەكسىزلىك",
		positiveInfinity: "مۇسبەت چەكسىزلىك",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["يەكشەنبە","دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"],
				namesAbbr: ["يە","دۈ","سە","چا","پە","جۈ","شە"],
				namesShort: ["ي","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""],
				namesAbbr: ["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""]
			},
			AM: ["چۈشتىن بۇرۇن","چۈشتىن بۇرۇن","چۈشتىن بۇرۇن"],
			PM: ["چۈشتىن كېيىن","چۈشتىن كېيىن","چۈشتىن كېيىن"],
			eras: [{"name":"مىلادى","start":null,"offset":0}],
			patterns: {
				d: "yyyy-M-d",
				D: "yyyy-'يىلى' MMMM d-'كۈنى،'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm",
				F: "yyyy-'يىلى' MMMM d-'كۈنى،' H:mm:ss",
				M: "MMMM d'-كۈنى'",
				Y: "yyyy-'يىلى' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mi-NZ", "default", {
	name: "mi-NZ",
	englishName: "Maori (New Zealand)",
	nativeName: "Reo Māori (Aotearoa)",
	language: "mi",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Rātapu","Rāhina","Rātū","Rāapa","Rāpare","Rāmere","Rāhoroi"],
				namesAbbr: ["Ta","Hi","Tū","Apa","Pa","Me","Ho"],
				namesShort: ["Ta","Hi","Tū","Aa","Pa","Me","Ho"]
			},
			months: {
				names: ["Kohi-tātea","Hui-tanguru","Poutū-te-rangi","Paenga-whāwhā","Haratua","Pipiri","Hōngongoi","Here-turi-kōkā","Mahuru","Whiringa-ā-nuku","Whiringa-ā-rangi","Hakihea",""],
				namesAbbr: ["Kohi","Hui","Pou","Pae","Hara","Pipi","Hōngo","Here","Mahu","Nuku","Rangi","Haki",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd MMMM, yyyy",
				f: "dddd, dd MMMM, yyyy h:mm tt",
				F: "dddd, dd MMMM, yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM, yy"
			}
		}
	}
});

Globalize.addCultureInfo( "oc-FR", "default", {
	name: "oc-FR",
	englishName: "Occitan (France)",
	nativeName: "Occitan (França)",
	language: "oc",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numeric",
		negativeInfinity: "-Infinit",
		positiveInfinity: "+Infinit",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimenge","diluns","dimars","dimècres","dijòus","divendres","dissabte"],
				namesAbbr: ["dim.","lun.","mar.","mèc.","jòu.","ven.","sab."],
				namesShort: ["di","lu","ma","mè","jò","ve","sa"]
			},
			months: {
				names: ["genier","febrier","març","abril","mai","junh","julh","agost","setembre","octobre","novembre","desembre",""],
				namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
			},
			monthsGenitive: {
				names: ["de genier","de febrier","de març","d'abril","de mai","de junh","de julh","d'agost","de setembre","d'octobre","de novembre","de desembre",""],
				namesAbbr: ["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"après Jèsus-Crist","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd,' lo 'd MMMM' de 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd,' lo 'd MMMM' de 'yyyy HH:mm",
				F: "dddd,' lo 'd MMMM' de 'yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "co-FR", "default", {
	name: "co-FR",
	englishName: "Corsican (France)",
	nativeName: "Corsu (France)",
	language: "co",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Mica numericu",
		negativeInfinity: "-Infinitu",
		positiveInfinity: "+Infinitu",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dumenica","luni","marti","mercuri","ghjovi","venderi","sabbatu"],
				namesAbbr: ["dum.","lun.","mar.","mer.","ghj.","ven.","sab."],
				namesShort: ["du","lu","ma","me","gh","ve","sa"]
			},
			months: {
				names: ["ghjennaghju","ferraghju","marzu","aprile","maghju","ghjunghju","lugliu","aostu","settembre","ottobre","nuvembre","dicembre",""],
				namesAbbr: ["ghje","ferr","marz","apri","magh","ghju","lugl","aost","sett","otto","nuve","dice",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"dopu J-C","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gsw-FR", "default", {
	name: "gsw-FR",
	englishName: "Alsatian (France)",
	nativeName: "Elsässisch (Frànkrisch)",
	language: "gsw",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Ohne Nummer",
		negativeInfinity: "-Unendlich",
		positiveInfinity: "+Unendlich",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Sundàà","Mondàà","Dienschdàà","Mittwuch","Dunnerschdàà","Fridàà","Sàmschdàà"],
				namesAbbr: ["Su.","Mo.","Di.","Mi.","Du.","Fr.","Sà."],
				namesShort: ["Su","Mo","Di","Mi","Du","Fr","Sà"]
			},
			months: {
				names: ["Jänner","Feverje","März","Àpril","Mai","Jüni","Jüli","Augscht","September","Oktower","Nowember","Dezember",""],
				namesAbbr: ["Jän.","Fev.","März","Apr.","Mai","Jüni","Jüli","Aug.","Sept.","Okt.","Now.","Dez.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"Vor J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sah-RU", "default", {
	name: "sah-RU",
	englishName: "Yakut (Russia)",
	nativeName: "саха (Россия)",
	language: "sah",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "NAN",
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "с."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["баскыһыанньа","бэнидиэнньик","оптуорунньук","сэрэдэ","чэппиэр","бээтинсэ","субуота"],
				namesAbbr: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"],
				namesShort: ["Бс","Бн","Оп","Ср","Чп","Бт","Сб"]
			},
			months: {
				names: ["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйа","Бэс ыйа","От ыйа","Атырдьах ыйа","Балаҕан ыйа","Алтынньы","Сэтинньи","Ахсынньы",""],
				namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
			},
			monthsGenitive: {
				names: ["тохсунньу","олунньу","кулун тутар","муус устар","ыам ыйын","бэс ыйын","от ыйын","атырдьах ыйын","балаҕан ыйын","алтынньы","сэтинньи","ахсынньы",""],
				namesAbbr: ["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "MM.dd.yyyy",
				D: "MMMM d yyyy 'с.'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d yyyy 'с.' H:mm",
				F: "MMMM d yyyy 'с.' H:mm:ss",
				Y: "MMMM yyyy 'с.'"
			}
		}
	}
});

Globalize.addCultureInfo( "qut-GT", "default", {
	name: "qut-GT",
	englishName: "K'iche (Guatemala)",
	nativeName: "K'iche (Guatemala)",
	language: "qut",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			symbol: "Q"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["juq'ij","kaq'ij","oxq'ij","kajq'ij","joq'ij","waqq'ij","wuqq'ij"],
				namesAbbr: ["juq","kaq","oxq","kajq","joq","waqq","wuqq"],
				namesShort: ["ju","ka","ox","ka","jo","wa","wu"]
			},
			months: {
				names: ["nab'e ik'","ukab' ik'","rox ik'","ukaj ik'","uro' ik'","uwaq ik'","uwuq ik'","uwajxaq ik'","ub'elej ik'","ulaj ik'","ujulaj ik'","ukab'laj ik'",""],
				namesAbbr: ["nab'e","ukab","rox","ukaj","uro","uwaq","uwuq","uwajxaq","ub'elej","ulaj","ujulaj","ukab'laj",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "rw-RW", "default", {
	name: "rw-RW",
	englishName: "Kinyarwanda (Rwanda)",
	nativeName: "Kinyarwanda (Rwanda)",
	language: "rw",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": " ",
			".": ",",
			symbol: "RWF"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Ku wa mbere","Ku wa kabiri","Ku wa gatatu","Ku wa kane","Ku wa gatanu","Ku wa gatandatu","Ku cyumweru"],
				namesAbbr: ["mbe.","kab.","gat.","kan.","gat.","gat.","cyu."],
				namesShort: ["mb","ka","ga","ka","ga","ga","cy"]
			},
			months: {
				names: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza",""],
				namesAbbr: ["Mut","Gas","Wer","Mat","Gic","Kam","Nya","Kan","Nze","Ukwa","Ugu","Uku",""]
			},
			AM: ["saa moya z.m.","saa moya z.m.","SAA MOYA Z.M."],
			PM: ["saa moya z.n.","saa moya z.n.","SAA MOYA Z.N."],
			eras: [{"name":"AD","start":null,"offset":0}]
		}
	}
});

Globalize.addCultureInfo( "wo-SN", "default", {
	name: "wo-SN",
	englishName: "Wolof (Senegal)",
	nativeName: "Wolof (Sénégal)",
	language: "wo",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "XOF"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "prs-AF", "default", {
	name: "prs-AF",
	englishName: "Dari (Afghanistan)",
	nativeName: "درى (افغانستان)",
	language: "prs",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		",": ".",
		".": ",",
		"NaN": "غ ع",
		negativeInfinity: "-∞",
		positiveInfinity: "∞",
		percent: {
			pattern: ["%n-","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$n-","$n"],
			symbol: "؋"
		}
	},
	calendars: {
		standard: {
			name: "Hijri",
			firstDay: 5,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				f: "dd/MM/yyyy h:mm tt",
				F: "dd/MM/yyyy h:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_Localized: {
			firstDay: 5,
			days: {
				names: ["یکشنبه","دوشنبه","سه\u200cشنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesAbbr: ["یکشنبه","دوشنبه","سه\u200cشنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
				namesShort: ["ی","د","س","چ","پ","ج","ش"]
			},
			months: {
				names: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګاښ","زمرى","وږى","تله","لړم","ليندۍ","مرغومى",""],
				namesAbbr: ["سلواغه","كب","ورى","غويى","غبرګولى","چنګاښ","زمرى","وږى","تله","لړم","ليندۍ","مرغومى",""]
			},
			AM: ["غ.م","غ.م","غ.م"],
			PM: ["غ.و","غ.و","غ.و"],
			eras: [{"name":"ل.ه","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy, dd, MMMM, dddd",
				f: "yyyy, dd, MMMM, dddd h:mm tt",
				F: "yyyy, dd, MMMM, dddd h:mm:ss tt",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "gd-GB", "default", {
	name: "gd-GB",
	englishName: "Scottish Gaelic (United Kingdom)",
	nativeName: "Gàidhlig (An Rìoghachd Aonaichte)",
	language: "gd",
	numberFormat: {
		negativeInfinity: "-Neo-chrìochnachd",
		positiveInfinity: "Neo-chrìochnachd",
		currency: {
			pattern: ["-$n","$n"],
			symbol: "£"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Didòmhnaich","Diluain","Dimàirt","Diciadain","Diardaoin","Dihaoine","Disathairne"],
				namesAbbr: ["Dòm","Lua","Mài","Cia","Ard","Hao","Sat"],
				namesShort: ["D","L","M","C","A","H","S"]
			},
			months: {
				names: ["Am Faoilleach","An Gearran","Am Màrt","An Giblean","An Cèitean","An t-Ògmhios","An t-Iuchar","An Lùnastal","An t-Sultain","An Dàmhair","An t-Samhain","An Dùbhlachd",""],
				namesAbbr: ["Fao","Gea","Màr","Gib","Cèi","Ògm","Iuc","Lùn","Sul","Dàm","Sam","Dùb",""]
			},
			AM: ["m","m","M"],
			PM: ["f","f","F"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-IQ", "default", {
	name: "ar-IQ",
	englishName: "Arabic (Iraq)",
	nativeName: "العربية (العراق)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "د.ع.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-CN", "default", {
	name: "zh-CN",
	englishName: "Chinese (Simplified, PRC)",
	nativeName: "中文(中华人民共和国)",
	language: "zh-CHS",
	numberFormat: {
		"NaN": "非数字",
		negativeInfinity: "负无穷大",
		positiveInfinity: "正无穷大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "de-CH", "default", {
	name: "de-CH",
	englishName: "German (Switzerland)",
	nativeName: "Deutsch (Schweiz)",
	language: "de",
	numberFormat: {
		",": "'",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "Fr."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-GB", "default", {
	name: "en-GB",
	englishName: "English (United Kingdom)",
	nativeName: "English (United Kingdom)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "£"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-MX", "default", {
	name: "es-MX",
	englishName: "Spanish (Mexico)",
	nativeName: "Español (México)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-BE", "default", {
	name: "fr-BE",
	englishName: "French (Belgium)",
	nativeName: "français (Belgique)",
	language: "fr",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "d/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "it-CH", "default", {
	name: "it-CH",
	englishName: "Italian (Switzerland)",
	nativeName: "italiano (Svizzera)",
	language: "it",
	numberFormat: {
		",": "'",
		"NaN": "Non un numero reale",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "fr."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
				namesAbbr: ["dom","lun","mar","mer","gio","ven","sab"],
				namesShort: ["do","lu","ma","me","gi","ve","sa"]
			},
			months: {
				names: ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],
				namesAbbr: ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "nl-BE", "default", {
	name: "nl-BE",
	englishName: "Dutch (Belgium)",
	nativeName: "Nederlands (België)",
	language: "nl",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NaN (Niet-een-getal)",
		negativeInfinity: "-oneindig",
		positiveInfinity: "oneindig",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"],
				namesAbbr: ["zo","ma","di","wo","do","vr","za"],
				namesShort: ["zo","ma","di","wo","do","vr","za"]
			},
			months: {
				names: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd d MMMM yyyy H:mm",
				F: "dddd d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "nn-NO", "default", {
	name: "nn-NO",
	englishName: "Norwegian, Nynorsk (Norway)",
	nativeName: "norsk, nynorsk (Noreg)",
	language: "nn",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["søndag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"],
				namesAbbr: ["sø","må","ty","on","to","fr","la"],
				namesShort: ["sø","må","ty","on","to","fr","la"]
			},
			months: {
				names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "pt-PT", "default", {
	name: "pt-PT",
	englishName: "Portuguese (Portugal)",
	nativeName: "português (Portugal)",
	language: "pt",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NaN (Não é um número)",
		negativeInfinity: "-Infinito",
		positiveInfinity: "+Infinito",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"],
				namesAbbr: ["dom","seg","ter","qua","qui","sex","sáb"],
				namesShort: ["D","S","T","Q","Q","S","S"]
			},
			months: {
				names: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",""],
				namesAbbr: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dddd, d' de 'MMMM' de 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d' de 'MMMM' de 'yyyy HH:mm",
				F: "dddd, d' de 'MMMM' de 'yyyy HH:mm:ss",
				M: "d/M",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Latn-CS", "default", {
	name: "sr-Latn-CS",
	englishName: "Serbian (Latin, Serbia and Montenegro (Former))",
	nativeName: "srpski (Srbija i Crna Gora (Prethodno))",
	language: "sr-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Din."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sv-FI", "default", {
	name: "sv-FI",
	englishName: "Swedish (Finland)",
	nativeName: "svenska (Finland)",
	language: "sv",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
				namesAbbr: ["sö","må","ti","on","to","fr","lö"],
				namesShort: ["sö","må","ti","on","to","fr","lö"]
			},
			months: {
				names: ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "'den 'd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "'den 'd MMMM yyyy HH:mm",
				F: "'den 'd MMMM yyyy HH:mm:ss",
				M: "'den 'd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "az-Cyrl-AZ", "default", {
	name: "az-Cyrl-AZ",
	englishName: "Azeri (Cyrillic, Azerbaijan)",
	nativeName: "Азәрбајҹан (Азәрбајҹан)",
	language: "az-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "ман."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Базар","Базар ертәси","Чәршәнбә ахшамы","Чәршәнбә","Ҹүмә ахшамы","Ҹүмә","Шәнбә"],
				namesAbbr: ["Б","Бе","Ча","Ч","Ҹа","Ҹ","Ш"],
				namesShort: ["Б","Бе","Ча","Ч","Ҹа","Ҹ","Ш"]
			},
			months: {
				names: ["Јанвар","Феврал","Март","Апрел","Мај","Ијун","Ијул","Август","Сентјабр","Октјабр","Нојабр","Декабр",""],
				namesAbbr: ["Јан","Фев","Мар","Апр","Мај","Ијун","Ијул","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["јанвар","феврал","март","апрел","мај","ијун","ијул","август","сентјабр","октјабр","нојабр","декабр",""],
				namesAbbr: ["Јан","Фев","Мар","Апр","мая","ијун","ијул","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "dsb-DE", "default", {
	name: "dsb-DE",
	englishName: "Lower Sorbian (Germany)",
	nativeName: "dolnoserbšćina (Nimska)",
	language: "dsb",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "njedefinowane",
		negativeInfinity: "-njekońcne",
		positiveInfinity: "+njekońcne",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["njeźela","ponjeźele","wałtora","srjoda","stwortk","pětk","sobota"],
				namesAbbr: ["nje","pon","wał","srj","stw","pět","sob"],
				namesShort: ["n","p","w","s","s","p","s"]
			},
			months: {
				names: ["januar","februar","měrc","apryl","maj","junij","julij","awgust","september","oktober","nowember","december",""],
				namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]
			},
			monthsGenitive: {
				names: ["januara","februara","měrca","apryla","maja","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],
				namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"po Chr.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "dddd, 'dnja' d. MMMM yyyy",
				t: "H.mm 'goź.'",
				T: "H:mm:ss",
				f: "dddd, 'dnja' d. MMMM yyyy H.mm 'goź.'",
				F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "se-SE", "default", {
	name: "se-SE",
	englishName: "Sami, Northern (Sweden)",
	nativeName: "davvisámegiella (Ruoŧŧa)",
	language: "se",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["sotnabeaivi","mánnodat","disdat","gaskavahkku","duorastat","bearjadat","lávvardat"],
				namesAbbr: ["sotn","mán","dis","gask","duor","bear","láv"],
				namesShort: ["s","m","d","g","d","b","l"]
			},
			months: {
				names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			monthsGenitive: {
				names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ga-IE", "default", {
	name: "ga-IE",
	englishName: "Irish (Ireland)",
	nativeName: "Gaeilge (Éire)",
	language: "ga",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Dé Domhnaigh","Dé Luain","Dé Máirt","Dé Céadaoin","Déardaoin","Dé hAoine","Dé Sathairn"],
				namesAbbr: ["Domh","Luan","Máir","Céad","Déar","Aoi","Sath"],
				namesShort: ["Do","Lu","Má","Cé","De","Ao","Sa"]
			},
			months: {
				names: ["Eanáir","Feabhra","Márta","Aibreán","Bealtaine","Meitheamh","Iúil","Lúnasa","Meán Fómhair","Deireadh Fómhair","Samhain","Nollaig",""],
				namesAbbr: ["Ean","Feabh","Már","Aib","Bealt","Meith","Iúil","Lún","M.Fómh","D.Fómh","Samh","Noll",""]
			},
			AM: ["r.n.","r.n.","R.N."],
			PM: ["i.n.","i.n.","I.N."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ms-BN", "default", {
	name: "ms-BN",
	englishName: "Malay (Brunei Darussalam)",
	nativeName: "Bahasa Melayu (Brunei Darussalam)",
	language: "ms",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			decimals: 0,
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
				namesAbbr: ["Ahad","Isnin","Sel","Rabu","Khamis","Jumaat","Sabtu"],
				namesShort: ["A","I","S","R","K","J","S"]
			},
			months: {
				names: ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember",""],
				namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sept","Okt","Nov","Dis",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM yyyy H:mm",
				F: "dd MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "uz-Cyrl-UZ", "default", {
	name: "uz-Cyrl-UZ",
	englishName: "Uzbek (Cyrillic, Uzbekistan)",
	nativeName: "Ўзбек (Ўзбекистон)",
	language: "uz-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "сўм"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],
				namesAbbr: ["якш","дш","сш","чш","пш","ж","ш"],
				namesShort: ["я","д","с","ч","п","ж","ш"]
			},
			months: {
				names: ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["январ","феврал","март","апрел","май","июн","июл","август","сентябр","октябр","ноябр","декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","мая","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "yyyy 'йил' d-MMMM",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'йил' d-MMMM HH:mm",
				F: "yyyy 'йил' d-MMMM HH:mm:ss",
				M: "d-MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bn-BD", "default", {
	name: "bn-BD",
	englishName: "Bengali (Bangladesh)",
	nativeName: "বাংলা (বাংলাদেশ)",
	language: "bn",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			pattern: ["-%n","%n"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "৳"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			":": ".",
			firstDay: 1,
			days: {
				names: ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"],
				namesAbbr: ["রবি.","সোম.","মঙ্গল.","বুধ.","বৃহস্পতি.","শুক্র.","শনি."],
				namesShort: ["র","স","ম","ব","ব","শ","শ"]
			},
			months: {
				names: ["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর",""],
				namesAbbr: ["জানু.","ফেব্রু.","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগ.","সেপ্টে.","অক্টো.","নভে.","ডিসে.",""]
			},
			AM: ["পুর্বাহ্ন","পুর্বাহ্ন","পুর্বাহ্ন"],
			PM: ["অপরাহ্ন","অপরাহ্ন","অপরাহ্ন"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy",
				t: "HH.mm",
				T: "HH.mm.ss",
				f: "dd MMMM yyyy HH.mm",
				F: "dd MMMM yyyy HH.mm.ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "mn-Mong-CN", "default", {
	name: "mn-Mong-CN",
	englishName: "Mongolian (Traditional Mongolian, PRC)",
	nativeName: "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)",
	language: "mn-Mong",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ᠲᠤᠭᠠᠠ ᠪᠤᠰᠤ",
		negativeInfinity: "ᠰᠦᠬᠡᠷᠬᠦ ᠬᠢᠵᠠᠭᠠᠷᠭᠦᠢ ᠶᠡᠬᠡ",
		positiveInfinity: "ᠡᠶ᠋ᠡᠷᠬᠦ ᠬᠢᠵᠠᠭᠠᠷᠭᠦᠢ ᠶᠠᠬᠡ",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			groupSizes: [3,0],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],
				namesAbbr: ["ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],
				namesShort: ["ᠡ\u200d","ᠨᠢ\u200d","ᠬᠣ\u200d","ᠭᠤ\u200d","ᠳᠥ\u200d","ᠲᠠ\u200d","ᠵᠢ\u200d"]
			},
			months: {
				names: ["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""],
				namesAbbr: ["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ᠣᠨ ᠲᠣᠭᠠᠯᠠᠯ ᠤᠨ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ' H:mm",
				F: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ' H:mm:ss",
				M: "M'ᠰᠠᠷ᠎ᠠ' d'ᠡᠳᠦᠷ'",
				Y: "yyyy'ᠣᠨ' M'ᠰᠠᠷ᠎ᠠ'"
			}
		}
	}
});

Globalize.addCultureInfo( "iu-Latn-CA", "default", {
	name: "iu-Latn-CA",
	englishName: "Inuktitut (Latin, Canada)",
	nativeName: "Inuktitut (Kanatami)",
	language: "iu-Latn",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Naattiinguja","Naggajjau","Aippiq","Pingatsiq","Sitammiq","Tallirmiq","Sivataarvik"],
				namesAbbr: ["Nat","Nag","Aip","Pi","Sit","Tal","Siv"],
				namesShort: ["N","N","A","P","S","T","S"]
			},
			months: {
				names: ["Jaannuari","Viivvuari","Maatsi","Iipuri","Mai","Juuni","Julai","Aaggiisi","Sitipiri","Utupiri","Nuvipiri","Tisipiri",""],
				namesAbbr: ["Jan","Viv","Mas","Ipu","Mai","Jun","Jul","Agi","Sii","Uut","Nuv","Tis",""]
			},
			patterns: {
				d: "d/MM/yyyy",
				D: "ddd, MMMM dd,yyyy",
				f: "ddd, MMMM dd,yyyy h:mm tt",
				F: "ddd, MMMM dd,yyyy h:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "tzm-Latn-DZ", "default", {
	name: "tzm-Latn-DZ",
	englishName: "Tamazight (Latin, Algeria)",
	nativeName: "Tamazight (Djazaïr)",
	language: "tzm-Latn",
	numberFormat: {
		pattern: ["n-"],
		",": ".",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			symbol: "DZD"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 6,
			days: {
				names: ["Acer","Arime","Aram","Ahad","Amhadh","Sem","Sedh"],
				namesAbbr: ["Ace","Ari","Ara","Aha","Amh","Sem","Sed"],
				namesShort: ["Ac","Ar","Ar","Ah","Am","Se","Se"]
			},
			months: {
				names: ["Yenayer","Furar","Maghres","Yebrir","Mayu","Yunyu","Yulyu","Ghuct","Cutenber","Ktuber","Wambir","Dujanbir",""],
				namesAbbr: ["Yen","Fur","Mag","Yeb","May","Yun","Yul","Ghu","Cut","Ktu","Wam","Duj",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "quz-EC", "default", {
	name: "quz-EC",
	englishName: "Quechua (Ecuador)",
	nativeName: "runasimi (Ecuador)",
	language: "quz",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["intichaw","killachaw","atipachaw","quyllurchaw","Ch' askachaw","Illapachaw","k'uychichaw"],
				namesAbbr: ["int","kil","ati","quy","Ch'","Ill","k'u"],
				namesShort: ["d","k","a","m","h","b","k"]
			},
			months: {
				names: ["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi",""],
				namesAbbr: ["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-EG", "default", {
	name: "ar-EG",
	englishName: "Arabic (Egypt)",
	nativeName: "العربية (مصر)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ج.م.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-HK", "default", {
	name: "zh-HK",
	englishName: "Chinese (Traditional, Hong Kong S.A.R.)",
	nativeName: "中文(香港特別行政區)",
	language: "zh-CHT",
	numberFormat: {
		"NaN": "非數字",
		negativeInfinity: "負無窮大",
		positiveInfinity: "正無窮大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			symbol: "HK$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "de-AT", "default", {
	name: "de-AT",
	englishName: "German (Austria)",
	nativeName: "Deutsch (Österreich)",
	language: "de",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jän","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, dd. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, dd. MMMM yyyy HH:mm",
				F: "dddd, dd. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-AU", "default", {
	name: "en-AU",
	englishName: "English (Australia)",
	nativeName: "English (Australia)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			patterns: {
				d: "d/MM/yyyy",
				D: "dddd, d MMMM yyyy",
				f: "dddd, d MMMM yyyy h:mm tt",
				F: "dddd, d MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-ES", "default", {
	name: "es-ES",
	englishName: "Spanish (Spain, International Sort)",
	nativeName: "Español (España, alfabetización internacional)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-CA", "default", {
	name: "fr-CA",
	englishName: "French (Canada)",
	nativeName: "français (Canada)",
	language: "fr",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["(n $)","n $"],
			",": " ",
			".": ","
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "yyyy-MM-dd",
				D: "d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d MMMM yyyy HH:mm",
				F: "d MMMM yyyy HH:mm:ss",
				M: "d MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Cyrl-CS", "default", {
	name: "sr-Cyrl-CS",
	englishName: "Serbian (Cyrillic, Serbia and Montenegro (Former))",
	nativeName: "српски (Србија и Црна Гора (Претходно))",
	language: "sr-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Дин."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["не","по","ут","ср","че","пе","су"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "se-FI", "default", {
	name: "se-FI",
	englishName: "Sami, Northern (Finland)",
	nativeName: "davvisámegiella (Suopma)",
	language: "se",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorastat","bearjadat","lávvardat"],
				namesAbbr: ["sotn","vuos","maŋ","gask","duor","bear","láv"],
				namesShort: ["s","m","d","g","d","b","l"]
			},
			months: {
				names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			monthsGenitive: {
				names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
				namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "MMMM d'. b. 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d'. b. 'yyyy H:mm",
				F: "MMMM d'. b. 'yyyy H:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "quz-PE", "default", {
	name: "quz-PE",
	englishName: "Quechua (Peru)",
	nativeName: "runasimi (Piruw)",
	language: "quz",
	numberFormat: {
		percent: {
			pattern: ["-%n","%n"]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			symbol: "S/."
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["intichaw","killachaw","atipachaw","quyllurchaw","Ch' askachaw","Illapachaw","k'uychichaw"],
				namesAbbr: ["int","kil","ati","quy","Ch'","Ill","k'u"],
				namesShort: ["d","k","a","m","h","b","k"]
			},
			months: {
				names: ["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi",""],
				namesAbbr: ["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-LY", "default", {
	name: "ar-LY",
	englishName: "Arabic (Libya)",
	nativeName: "العربية (ليبيا)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$n"],
			decimals: 3,
			symbol: "د.ل.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-SG", "default", {
	name: "zh-SG",
	englishName: "Chinese (Simplified, Singapore)",
	nativeName: "中文(新加坡)",
	language: "zh-CHS",
	numberFormat: {
		percent: {
			pattern: ["-n%","n%"]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "yyyy'年'M'月'd'日'",
				t: "tt h:mm",
				T: "tt h:mm:ss",
				f: "yyyy'年'M'月'd'日' tt h:mm",
				F: "yyyy'年'M'月'd'日' tt h:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "de-LU", "default", {
	name: "de-LU",
	englishName: "German (Luxembourg)",
	nativeName: "Deutsch (Luxemburg)",
	language: "de",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-CA", "default", {
	name: "en-CA",
	englishName: "English (Canada)",
	nativeName: "English (Canada)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			patterns: {
				d: "dd/MM/yyyy",
				D: "MMMM-dd-yy",
				f: "MMMM-dd-yy h:mm tt",
				F: "MMMM-dd-yy h:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "es-GT", "default", {
	name: "es-GT",
	englishName: "Spanish (Guatemala)",
	nativeName: "Español (Guatemala)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			symbol: "Q"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-CH", "default", {
	name: "fr-CH",
	englishName: "French (Switzerland)",
	nativeName: "français (Suisse)",
	language: "fr",
	numberFormat: {
		",": "'",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "fr."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "hr-BA", "default", {
	name: "hr-BA",
	englishName: "Croatian (Latin, Bosnia and Herzegovina)",
	nativeName: "hrvatski (Bosna i Hercegovina)",
	language: "hr",
	numberFormat: {
		pattern: ["- n"],
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "KM"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			monthsGenitive: {
				names: ["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],
				namesAbbr: ["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy.",
				D: "d. MMMM yyyy.",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy. H:mm",
				F: "d. MMMM yyyy. H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "smj-NO", "default", {
	name: "smj-NO",
	englishName: "Sami, Lule (Norway)",
	nativeName: "julevusámegiella (Vuodna)",
	language: "smj",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["sådnåbiejvve","mánnodahka","dijstahka","gasskavahkko","duorastahka","bierjjedahka","lávvodahka"],
				namesAbbr: ["såd","mán","dis","gas","duor","bier","láv"],
				namesShort: ["s","m","d","g","d","b","l"]
			},
			months: {
				names: ["ådåjakmánno","guovvamánno","sjnjuktjamánno","vuoratjismánno","moarmesmánno","biehtsemánno","sjnjilltjamánno","bårggemánno","ragátmánno","gålgådismánno","basádismánno","javllamánno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			monthsGenitive: {
				names: ["ådåjakmáno","guovvamáno","sjnjuktjamáno","vuoratjismáno","moarmesmáno","biehtsemáno","sjnjilltjamáno","bårggemáno","ragátmáno","gålgådismáno","basádismáno","javllamáno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-DZ", "default", {
	name: "ar-DZ",
	englishName: "Arabic (Algeria)",
	nativeName: "العربية (الجزائر)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "د.ج.\u200f"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MM/yyyy H:mm",
				F: "dd/MM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MMMM/yyyy H:mm",
				F: "dd/MMMM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-MO", "default", {
	name: "zh-MO",
	englishName: "Chinese (Traditional, Macao S.A.R.)",
	nativeName: "中文(澳門特別行政區)",
	language: "zh-CHT",
	numberFormat: {
		"NaN": "非數字",
		negativeInfinity: "負無窮大",
		positiveInfinity: "正無窮大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			symbol: "MOP"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "de-LI", "default", {
	name: "de-LI",
	englishName: "German (Liechtenstein)",
	nativeName: "Deutsch (Liechtenstein)",
	language: "de",
	numberFormat: {
		",": "'",
		"NaN": "n. def.",
		negativeInfinity: "-unendlich",
		positiveInfinity: "+unendlich",
		percent: {
			pattern: ["-n%","n%"],
			",": "'"
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": "'",
			symbol: "CHF"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
				namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
				namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
			},
			months: {
				names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
				namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n. Chr.","start":null,"offset":0}],
			patterns: {
				d: "dd.MM.yyyy",
				D: "dddd, d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd, d. MMMM yyyy HH:mm",
				F: "dddd, d. MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-NZ", "default", {
	name: "en-NZ",
	englishName: "English (New Zealand)",
	nativeName: "English (New Zealand)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			patterns: {
				d: "d/MM/yyyy",
				D: "dddd, d MMMM yyyy",
				f: "dddd, d MMMM yyyy h:mm tt",
				F: "dddd, d MMMM yyyy h:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-CR", "default", {
	name: "es-CR",
	englishName: "Spanish (Costa Rica)",
	nativeName: "Español (Costa Rica)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			",": ".",
			".": ",",
			symbol: "₡"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-LU", "default", {
	name: "fr-LU",
	englishName: "French (Luxembourg)",
	nativeName: "français (Luxembourg)",
	language: "fr",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bs-Latn-BA", "default", {
	name: "bs-Latn-BA",
	englishName: "Bosnian (Latin, Bosnia and Herzegovina)",
	nativeName: "bosanski (Bosna i Hercegovina)",
	language: "bs-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "KM"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","juni","juli","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "smj-SE", "default", {
	name: "smj-SE",
	englishName: "Sami, Lule (Sweden)",
	nativeName: "julevusámegiella (Svierik)",
	language: "smj",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ájllek","mánnodahka","dijstahka","gasskavahkko","duorastahka","bierjjedahka","lávvodahka"],
				namesAbbr: ["ájl","mán","dis","gas","duor","bier","láv"],
				namesShort: ["á","m","d","g","d","b","l"]
			},
			months: {
				names: ["ådåjakmánno","guovvamánno","sjnjuktjamánno","vuoratjismánno","moarmesmánno","biehtsemánno","sjnjilltjamánno","bårggemánno","ragátmánno","gålgådismánno","basádismánno","javllamánno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			monthsGenitive: {
				names: ["ådåjakmáno","guovvamáno","sjnjuktjamáno","vuoratjismáno","moarmesmáno","biehtsemáno","sjnjilltjamáno","bårggemáno","ragátmáno","gålgådismáno","basádismáno","javllamáno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-MA", "default", {
	name: "ar-MA",
	englishName: "Arabic (Morocco)",
	nativeName: "العربية (المملكة المغربية)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "د.م.\u200f"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليوز","غشت","شتنبر","أكتوبر","نونبر","دجنبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","ماي","يونيو","يوليوز","غشت","شتنبر","أكتوبر","نونبر","دجنبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MM/yyyy H:mm",
				F: "dd/MM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MMMM/yyyy H:mm",
				F: "dd/MMMM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		}
	}
});

Globalize.addCultureInfo( "en-IE", "default", {
	name: "en-IE",
	englishName: "English (Ireland)",
	nativeName: "English (Ireland)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-PA", "default", {
	name: "es-PA",
	englishName: "Spanish (Panama)",
	nativeName: "Español (Panamá)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["($ n)","$ n"],
			symbol: "B/."
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "fr-MC", "default", {
	name: "fr-MC",
	englishName: "French (Monaco)",
	nativeName: "français (Principauté de Monaco)",
	language: "fr",
	numberFormat: {
		",": " ",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd d MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dddd d MMMM yyyy HH:mm",
				F: "dddd d MMMM yyyy HH:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Latn-BA", "default", {
	name: "sr-Latn-BA",
	englishName: "Serbian (Latin, Bosnia and Herzegovina)",
	nativeName: "srpski (Bosna i Hercegovina)",
	language: "sr-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "KM"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sma-NO", "default", {
	name: "sma-NO",
	englishName: "Sami, Southern (Norway)",
	nativeName: "åarjelsaemiengiele (Nöörje)",
	language: "sma",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-%n","%n"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["aejlege","måanta","dæjsta","gaskevåhkoe","duarsta","bearjadahke","laavvardahke"],
				namesAbbr: ["aej","måa","dæj","gask","duar","bearj","laav"],
				namesShort: ["a","m","d","g","d","b","l"]
			},
			months: {
				names: ["tsïengele","goevte","njoktje","voerhtje","suehpede","ruffie","snjaltje","mïetske","skïerede","golke","rahka","goeve",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			monthsGenitive: {
				names: ["tsïengelen","goevten","njoktjen","voerhtjen","suehpeden","ruffien","snjaltjen","mïetsken","skïereden","golken","rahkan","goeven",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-TN", "default", {
	name: "ar-TN",
	englishName: "Arabic (Tunisia)",
	nativeName: "العربية (تونس)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$ n"],
			decimals: 3,
			symbol: "د.ت.\u200f"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MM/yyyy H:mm",
				F: "dd/MM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd/MMMM/yyyy H:mm",
				F: "dd/MMMM/yyyy H:mm:ss",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, MMMM dd, yyyy H:mm",
				F: "dddd, MMMM dd, yyyy H:mm:ss"
			}
		}
	}
});

Globalize.addCultureInfo( "en-ZA", "default", {
	name: "en-ZA",
	englishName: "English (South Africa)",
	nativeName: "English (South Africa)",
	numberFormat: {
		",": " ",
		percent: {
			pattern: ["-n%","n%"],
			",": " "
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": " ",
			".": ",",
			symbol: "R"
		}
	},
	calendars: {
		standard: {
			patterns: {
				d: "yyyy/MM/dd",
				D: "dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM yyyy hh:mm tt",
				F: "dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-DO", "default", {
	name: "es-DO",
	englishName: "Spanish (Dominican Republic)",
	nativeName: "Español (República Dominicana)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			symbol: "RD$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Cyrl-BA", "default", {
	name: "sr-Cyrl-BA",
	englishName: "Serbian (Cyrillic, Bosnia and Herzegovina)",
	nativeName: "српски (Босна и Херцеговина)",
	language: "sr-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "КМ"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["н","п","у","с","ч","п","с"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sma-SE", "default", {
	name: "sma-SE",
	englishName: "Sami, Southern (Sweden)",
	nativeName: "åarjelsaemiengiele (Sveerje)",
	language: "sma",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["aejlege","måanta","dæjsta","gaskevåhkoe","duarsta","bearjadahke","laavvardahke"],
				namesAbbr: ["aej","måa","dæj","gask","duar","bearj","laav"],
				namesShort: ["a","m","d","g","d","b","l"]
			},
			months: {
				names: ["tsïengele","goevte","njoktje","voerhtje","suehpede","ruffie","snjaltje","mïetske","skïerede","golke","rahka","goeve",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			monthsGenitive: {
				names: ["tsïengelen","goevten","njoktjen","voerhtjen","suehpeden","ruffien","snjaltjen","mïetsken","skïereden","golken","rahkan","goeven",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-OM", "default", {
	name: "ar-OM",
	englishName: "Arabic (Oman)",
	nativeName: "العربية (عمان)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			decimals: 3,
			symbol: "ر.ع.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-JM", "default", {
	name: "en-JM",
	englishName: "English (Jamaica)",
	nativeName: "English (Jamaica)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "J$"
		}
	},
	calendars: {
		standard: {
			patterns: {
				d: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "es-VE", "default", {
	name: "es-VE",
	englishName: "Spanish (Bolivarian Republic of Venezuela)",
	nativeName: "Español (Republica Bolivariana de Venezuela)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": ".",
			".": ",",
			symbol: "Bs. F."
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bs-Cyrl-BA", "default", {
	name: "bs-Cyrl-BA",
	englishName: "Bosnian (Cyrillic, Bosnia and Herzegovina)",
	nativeName: "босански (Босна и Херцеговина)",
	language: "bs-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "КМ"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недјеља","понедјељак","уторак","сриједа","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["н","п","у","с","ч","п","с"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "sms-FI", "default", {
	name: "sms-FI",
	englishName: "Sami, Skolt (Finland)",
	nativeName: "sääm´ǩiõll (Lää´ddjânnam)",
	language: "sms",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pâ´sspei´vv","vuõssargg","mââibargg","seärad","nelljdpei´vv","piâtnâc","sue´vet"],
				namesAbbr: ["pâ","vu","mâ","se","ne","pi","su"],
				namesShort: ["p","v","m","s","n","p","s"]
			},
			months: {
				names: ["ođđee´jjmään","tä´lvvmään","pâ´zzlâšttammään","njuhččmään","vue´ssmään","ǩie´ssmään","suei´nnmään","på´rǧǧmään","čõhččmään","kålggmään","skamm´mään","rosttovmään",""],
				namesAbbr: ["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]
			},
			monthsGenitive: {
				names: ["ođđee´jjmannu","tä´lvvmannu","pâ´zzlâšttammannu","njuhččmannu","vue´ssmannu","ǩie´ssmannu","suei´nnmannu","på´rǧǧmannu","čõhččmannu","kålggmannu","skamm´mannu","rosttovmannu",""],
				namesAbbr: ["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "MMMM d'. p. 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d'. p. 'yyyy H:mm",
				F: "MMMM d'. p. 'yyyy H:mm:ss",
				M: "MMMM d'. p. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-YE", "default", {
	name: "ar-YE",
	englishName: "Arabic (Yemen)",
	nativeName: "العربية (اليمن)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ر.ي.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-029", "default", {
	name: "en-029",
	englishName: "English (Caribbean)",
	nativeName: "English (Caribbean)",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"]
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			patterns: {
				d: "MM/dd/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-CO", "default", {
	name: "es-CO",
	englishName: "Spanish (Colombia)",
	nativeName: "Español (Colombia)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Latn-RS", "default", {
	name: "sr-Latn-RS",
	englishName: "Serbian (Latin, Serbia)",
	nativeName: "srpski (Srbija)",
	language: "sr-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Din."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "smn-FI", "default", {
	name: "smn-FI",
	englishName: "Sami, Inari (Finland)",
	nativeName: "sämikielâ (Suomâ)",
	language: "smn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pasepeivi","vuossargâ","majebargâ","koskokko","tuorâstâh","vástuppeivi","lávárdâh"],
				namesAbbr: ["pa","vu","ma","ko","tu","vá","lá"],
				namesShort: ["p","v","m","k","t","v","l"]
			},
			months: {
				names: ["uđđâivemáánu","kuovâmáánu","njuhčâmáánu","cuáŋuimáánu","vyesimáánu","kesimáánu","syeinimáánu","porgemáánu","čohčâmáánu","roovvâdmáánu","skammâmáánu","juovlâmáánu",""],
				namesAbbr: ["uđiv","kuov","njuh","cuoŋ","vyes","kesi","syei","porg","čoh","roov","ska","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "MMMM d'. p. 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d'. p. 'yyyy H:mm",
				F: "MMMM d'. p. 'yyyy H:mm:ss",
				M: "MMMM d'. p. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-SY", "default", {
	name: "ar-SY",
	englishName: "Arabic (Syria)",
	nativeName: "العربية (سوريا)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ل.س.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-BZ", "default", {
	name: "en-BZ",
	englishName: "English (Belize)",
	nativeName: "English (Belize)",
	numberFormat: {
		currency: {
			groupSizes: [3,0],
			symbol: "BZ$"
		}
	},
	calendars: {
		standard: {
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd MMMM yyyy hh:mm tt",
				F: "dddd, dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-PE", "default", {
	name: "es-PE",
	englishName: "Spanish (Peru)",
	nativeName: "Español (Perú)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["$ -n","$ n"],
			symbol: "S/."
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Cyrl-RS", "default", {
	name: "sr-Cyrl-RS",
	englishName: "Serbian (Cyrillic, Serbia)",
	nativeName: "српски (Србија)",
	language: "sr-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Дин."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["не","по","ут","ср","че","пе","су"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-JO", "default", {
	name: "ar-JO",
	englishName: "Arabic (Jordan)",
	nativeName: "العربية (الأردن)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$ n"],
			decimals: 3,
			symbol: "د.ا.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-TT", "default", {
	name: "en-TT",
	englishName: "English (Trinidad and Tobago)",
	nativeName: "English (Trinidad y Tobago)",
	numberFormat: {
		currency: {
			groupSizes: [3,0],
			symbol: "TT$"
		}
	},
	calendars: {
		standard: {
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd MMMM yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd MMMM yyyy hh:mm tt",
				F: "dddd, dd MMMM yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-AR", "default", {
	name: "es-AR",
	englishName: "Spanish (Argentina)",
	nativeName: "Español (Argentina)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["$-n","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Latn-ME", "default", {
	name: "sr-Latn-ME",
	englishName: "Serbian (Latin, Montenegro)",
	nativeName: "srpski (Crna Gora)",
	language: "sr-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-LB", "default", {
	name: "ar-LB",
	englishName: "Arabic (Lebanon)",
	nativeName: "العربية (لبنان)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ل.ل.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 1,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_TransliteratedEnglish: {
			name: "Gregorian_TransliteratedEnglish",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["أ","ا","ث","أ","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 1,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-ZW", "default", {
	name: "en-ZW",
	englishName: "English (Zimbabwe)",
	nativeName: "English (Zimbabwe)",
	numberFormat: {
		currency: {
			symbol: "Z$"
		}
	}
});

Globalize.addCultureInfo( "es-EC", "default", {
	name: "es-EC",
	englishName: "Spanish (Ecuador)",
	nativeName: "Español (Ecuador)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Cyrl-ME", "default", {
	name: "sr-Cyrl-ME",
	englishName: "Serbian (Cyrillic, Montenegro)",
	nativeName: "српски (Црна Гора)",
	language: "sr-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["не","по","ут","ср","че","пе","су"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-KW", "default", {
	name: "ar-KW",
	englishName: "Arabic (Kuwait)",
	nativeName: "العربية (الكويت)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$ n"],
			decimals: 3,
			symbol: "د.ك.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-PH", "default", {
	name: "en-PH",
	englishName: "English (Republic of the Philippines)",
	nativeName: "English (Philippines)",
	numberFormat: {
		currency: {
			symbol: "Php"
		}
	}
});

Globalize.addCultureInfo( "es-CL", "default", {
	name: "es-CL",
	englishName: "Spanish (Chile)",
	nativeName: "Español (Chile)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-$ n","$ n"],
			",": ".",
			".": ","
		}
	},
	calendars: {
		standard: {
			"/": "-",
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
				F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-AE", "default", {
	name: "ar-AE",
	englishName: "Arabic (U.A.E.)",
	nativeName: "العربية (الإمارات العربية المتحدة)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "د.إ.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "es-UY", "default", {
	name: "es-UY",
	englishName: "Spanish (Uruguay)",
	nativeName: "Español (Uruguay)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ",",
			symbol: "$U"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-BH", "default", {
	name: "ar-BH",
	englishName: "Arabic (Bahrain)",
	nativeName: "العربية (البحرين)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		decimals: 3,
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		percent: {
			decimals: 3
		},
		currency: {
			pattern: ["$n-","$ n"],
			decimals: 3,
			symbol: "د.ب.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "es-PY", "default", {
	name: "es-PY",
	englishName: "Spanish (Paraguay)",
	nativeName: "Español (Paraguay)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ",",
			symbol: "Gs"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "ar-QA", "default", {
	name: "ar-QA",
	englishName: "Arabic (Qatar)",
	nativeName: "العربية (قطر)",
	language: "ar",
	isRTL: true,
	numberFormat: {
		pattern: ["n-"],
		"NaN": "ليس برقم",
		negativeInfinity: "-لا نهاية",
		positiveInfinity: "+لا نهاية",
		currency: {
			pattern: ["$n-","$ n"],
			symbol: "ر.ق.\u200f"
		}
	},
	calendars: {
		standard: {
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dd MMMM, yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd MMMM, yyyy hh:mm tt",
				F: "dd MMMM, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		UmAlQura: {
			name: "UmAlQura",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MMMM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MMMM/yyyy hh:mm tt",
				F: "dd/MMMM/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }
			}
		},
		Hijri: {
			name: "Hijri",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""],
				namesAbbr: ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الثانية","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"بعد الهجرة","start":null,"offset":0}],
			twoDigitYearMax: 1451,
			patterns: {
				d: "dd/MM/yy",
				D: "dd/MM/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dd/MM/yyyy hh:mm tt",
				F: "MM/dd/yyyy hh:mm:ss tt",
				M: "dd MMMM"
			},
			convert: {
                    // Adapted to Script from System.Globalization.HijriCalendar
                    ticks1970: 62135596800000,
                    // number of days leading up to each month
                    monthDays: [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355],
                    minDate: -42521673600000,
                    maxDate: 253402300799999,
                    // The number of days to add or subtract from the calendar to accommodate the variances
                    // in the start and the end of Ramadan and to accommodate the date difference between
                    // countries/regions. May be dynamically adjusted based on user preference, but should
                    // remain in the range of -2 to 2, inclusive.
                    hijriAdjustment: 0,
                    toGregorian: function(hyear, hmonth, hday) {
                        var daysSinceJan0101 = this.daysToYear(hyear) + this.monthDays[hmonth] + hday - 1 - this.hijriAdjustment;
                        // 86400000 = ticks per day
                        var gdate = new Date(daysSinceJan0101 * 86400000 - this.ticks1970);
                        // adjust for timezone, because we are interested in the gregorian date for the same timezone
                        // but ticks in javascript is always from GMT, unlike the server were ticks counts from the base
                        // date in the current timezone.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        if ((gdate < this.minDate) || (gdate > this.maxDate)) return null;
                        var ticks = this.ticks1970 + (gdate-0) - gdate.getTimezoneOffset() * 60000,
                            daysSinceJan0101 = Math.floor(ticks / 86400000) + 1 + this.hijriAdjustment;
                        // very particular formula determined by someone smart, adapted from the server-side implementation.
                        // it approximates the hijri year.
                        var hday, hmonth, hyear = Math.floor(((daysSinceJan0101 - 227013) * 30) / 10631) + 1,
                            absDays = this.daysToYear(hyear),
                            daysInYear = this.isLeapYear(hyear) ? 355 : 354;
                        // hyear is just approximate, it may need adjustment up or down by 1.
                        if (daysSinceJan0101 < absDays) {
                            hyear--;
                            absDays -= daysInYear;
                        }
                        else if (daysSinceJan0101 === absDays) {
                            hyear--;
                            absDays = this.daysToYear(hyear);
                        }
                        else {
                            if (daysSinceJan0101 > (absDays + daysInYear)) {
                                absDays += daysInYear;
                                hyear++;
                            }
                        }
                        // determine month by looking at how many days into the hyear we are
                        // monthDays contains the number of days up to each month.
                        hmonth = 0;
                        var daysIntoYear = daysSinceJan0101 - absDays;
                        while (hmonth <= 11 && daysIntoYear > this.monthDays[hmonth]) {
                            hmonth++;
                        }
                        hmonth--;
                        hday = daysIntoYear - this.monthDays[hmonth];
                        return [hyear, hmonth, hday];
                    },
                    daysToYear: function(year) {
                        // calculates how many days since Jan 1, 0001
                        var yearsToYear30 = Math.floor((year - 1) / 30) * 30,
                            yearsInto30 = year - yearsToYear30 - 1,
                            days = Math.floor((yearsToYear30 * 10631) / 30) + 227013;
                        while (yearsInto30 > 0) {
                            days += (this.isLeapYear(yearsInto30) ? 355 : 354);
                            yearsInto30--;
                        }
                        return days;
                    },
                    isLeapYear: function(year) {
                        return ((((year * 11) + 14) % 30) < 11);
                    }
			}
		},
		Gregorian_MiddleEastFrench: {
			name: "Gregorian_MiddleEastFrench",
			firstDay: 6,
			days: {
				names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
				namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
				namesShort: ["di","lu","ma","me","je","ve","sa"]
			},
			months: {
				names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
				namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
				M: "dd MMMM"
			}
		},
		Gregorian_Arabic: {
			name: "Gregorian_Arabic",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""],
				namesAbbr: ["كانون الثاني","شباط","آذار","نيسان","أيار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		},
		Gregorian_TransliteratedFrench: {
			name: "Gregorian_TransliteratedFrench",
			firstDay: 6,
			days: {
				names: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesAbbr: ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],
				namesShort: ["ح","ن","ث","ر","خ","ج","س"]
			},
			months: {
				names: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""],
				namesAbbr: ["جانفييه","فيفرييه","مارس","أفريل","مي","جوان","جوييه","أوت","سبتمبر","اكتوبر","نوفمبر","ديسمبر",""]
			},
			AM: ["ص","ص","ص"],
			PM: ["م","م","م"],
			eras: [{"name":"م","start":null,"offset":0}],
			patterns: {
				d: "MM/dd/yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, MMMM dd, yyyy hh:mm tt",
				F: "dddd, MMMM dd, yyyy hh:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "en-IN", "default", {
	name: "en-IN",
	englishName: "English (India)",
	nativeName: "English (India)",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "Rs."
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "es-BO", "default", {
	name: "es-BO",
	englishName: "Spanish (Bolivia)",
	nativeName: "Español (Bolivia)",
	language: "es",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["($ n)","$ n"],
			",": ".",
			".": ",",
			symbol: "$b"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-MY", "default", {
	name: "en-MY",
	englishName: "English (Malaysia)",
	nativeName: "English (Malaysia)",
	numberFormat: {
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			symbol: "RM"
		}
	},
	calendars: {
		standard: {
			days: {
				namesShort: ["S","M","T","W","T","F","S"]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "dddd, d MMMM, yyyy",
				f: "dddd, d MMMM, yyyy h:mm tt",
				F: "dddd, d MMMM, yyyy h:mm:ss tt",
				M: "d MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "es-SV", "default", {
	name: "es-SV",
	englishName: "Spanish (El Salvador)",
	nativeName: "Español (El Salvador)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "en-SG", "default", {
	name: "en-SG",
	englishName: "English (Singapore)",
	nativeName: "English (Singapore)",
	numberFormat: {
		percent: {
			pattern: ["-n%","n%"]
		}
	},
	calendars: {
		standard: {
			days: {
				namesShort: ["S","M","T","W","T","F","S"]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "dddd, d MMMM, yyyy",
				f: "dddd, d MMMM, yyyy h:mm tt",
				F: "dddd, d MMMM, yyyy h:mm:ss tt",
				M: "d MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "es-HN", "default", {
	name: "es-HN",
	englishName: "Spanish (Honduras)",
	nativeName: "Español (Honduras)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,0],
			symbol: "L."
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-NI", "default", {
	name: "es-NI",
	englishName: "Spanish (Nicaragua)",
	nativeName: "Español (Nicaragua)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["($ n)","$ n"],
			groupSizes: [3,0],
			symbol: "C$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-PR", "default", {
	name: "es-PR",
	englishName: "Spanish (Puerto Rico)",
	nativeName: "Español (Puerto Rico)",
	language: "es",
	numberFormat: {
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		currency: {
			pattern: ["($ n)","$ n"],
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sá"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			AM: ["a.m.","a.m.","A.M."],
			PM: ["p.m.","p.m.","P.M."],
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				d: "dd/MM/yyyy",
				D: "dddd, dd' de 'MMMM' de 'yyyy",
				t: "hh:mm tt",
				T: "hh:mm:ss tt",
				f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
				F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
				M: "dd MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "es-US", "default", {
	name: "es-US",
	englishName: "Spanish (United States)",
	nativeName: "Español (Estados Unidos)",
	language: "es",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "NeuN",
		negativeInfinity: "-Infinito",
		positiveInfinity: "Infinito",
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
				namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
				namesShort: ["do","lu","ma","mi","ju","vi","sa"]
			},
			months: {
				names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
				namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
			},
			eras: [{"name":"d.C.","start":null,"offset":0}],
			patterns: {
				M: "dd' de 'MMMM",
				Y: "MMMM' de 'yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bs-Cyrl", "default", {
	name: "bs-Cyrl",
	englishName: "Bosnian (Cyrillic)",
	nativeName: "босански",
	language: "bs-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "КМ"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недјеља","понедјељак","уторак","сриједа","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["н","п","у","с","ч","п","с"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "bs-Latn", "default", {
	name: "bs-Latn",
	englishName: "Bosnian (Latin)",
	nativeName: "bosanski",
	language: "bs-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "KM"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","juni","juli","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Cyrl", "default", {
	name: "sr-Cyrl",
	englishName: "Serbian (Cyrillic)",
	nativeName: "српски",
	language: "sr-Cyrl",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-бесконачност",
		positiveInfinity: "+бесконачност",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Дин."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
				namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
				namesShort: ["не","по","ут","ср","че","пе","су"]
			},
			months: {
				names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
				namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"н.е.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr-Latn", "default", {
	name: "sr-Latn",
	englishName: "Serbian (Latin)",
	nativeName: "srpski",
	language: "sr-Latn",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Din."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "smn", "default", {
	name: "smn",
	englishName: "Sami (Inari)",
	nativeName: "sämikielâ",
	language: "smn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pasepeivi","vuossargâ","majebargâ","koskokko","tuorâstâh","vástuppeivi","lávárdâh"],
				namesAbbr: ["pa","vu","ma","ko","tu","vá","lá"],
				namesShort: ["p","v","m","k","t","v","l"]
			},
			months: {
				names: ["uđđâivemáánu","kuovâmáánu","njuhčâmáánu","cuáŋuimáánu","vyesimáánu","kesimáánu","syeinimáánu","porgemáánu","čohčâmáánu","roovvâdmáánu","skammâmáánu","juovlâmáánu",""],
				namesAbbr: ["uđiv","kuov","njuh","cuoŋ","vyes","kesi","syei","porg","čoh","roov","ska","juov",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "MMMM d'. p. 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d'. p. 'yyyy H:mm",
				F: "MMMM d'. p. 'yyyy H:mm:ss",
				M: "MMMM d'. p. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "az-Cyrl", "default", {
	name: "az-Cyrl",
	englishName: "Azeri (Cyrillic)",
	nativeName: "Азәрбајҹан дили",
	language: "az-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "ман."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Базар","Базар ертәси","Чәршәнбә ахшамы","Чәршәнбә","Ҹүмә ахшамы","Ҹүмә","Шәнбә"],
				namesAbbr: ["Б","Бе","Ча","Ч","Ҹа","Ҹ","Ш"],
				namesShort: ["Б","Бе","Ча","Ч","Ҹа","Ҹ","Ш"]
			},
			months: {
				names: ["Јанвар","Феврал","Март","Апрел","Мај","Ијун","Ијул","Август","Сентјабр","Октјабр","Нојабр","Декабр",""],
				namesAbbr: ["Јан","Фев","Мар","Апр","Мај","Ијун","Ијул","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["јанвар","феврал","март","апрел","мај","ијун","ијул","август","сентјабр","октјабр","нојабр","декабр",""],
				namesAbbr: ["Јан","Фев","Мар","Апр","мая","ијун","ијул","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sms", "default", {
	name: "sms",
	englishName: "Sami (Skolt)",
	nativeName: "sääm´ǩiõll",
	language: "sms",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["pâ´sspei´vv","vuõssargg","mââibargg","seärad","nelljdpei´vv","piâtnâc","sue´vet"],
				namesAbbr: ["pâ","vu","mâ","se","ne","pi","su"],
				namesShort: ["p","v","m","s","n","p","s"]
			},
			months: {
				names: ["ođđee´jjmään","tä´lvvmään","pâ´zzlâšttammään","njuhččmään","vue´ssmään","ǩie´ssmään","suei´nnmään","på´rǧǧmään","čõhččmään","kålggmään","skamm´mään","rosttovmään",""],
				namesAbbr: ["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]
			},
			monthsGenitive: {
				names: ["ođđee´jjmannu","tä´lvvmannu","pâ´zzlâšttammannu","njuhččmannu","vue´ssmannu","ǩie´ssmannu","suei´nnmannu","på´rǧǧmannu","čõhččmannu","kålggmannu","skamm´mannu","rosttovmannu",""],
				namesAbbr: ["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "MMMM d'. p. 'yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "MMMM d'. p. 'yyyy H:mm",
				F: "MMMM d'. p. 'yyyy H:mm:ss",
				M: "MMMM d'. p. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zh", "default", {
	name: "zh",
	englishName: "Chinese",
	nativeName: "中文",
	language: "zh",
	numberFormat: {
		"NaN": "非数字",
		negativeInfinity: "负无穷大",
		positiveInfinity: "正无穷大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "nn", "default", {
	name: "nn",
	englishName: "Norwegian (Nynorsk)",
	nativeName: "norsk (nynorsk)",
	language: "nn",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["søndag","måndag","tysdag","onsdag","torsdag","fredag","laurdag"],
				namesAbbr: ["sø","må","ty","on","to","fr","la"],
				namesShort: ["sø","må","ty","on","to","fr","la"]
			},
			months: {
				names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "bs", "default", {
	name: "bs",
	englishName: "Bosnian",
	nativeName: "bosanski",
	language: "bs",
	numberFormat: {
		",": ".",
		".": ",",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "KM"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sri","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","juni","juli","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "az-Latn", "default", {
	name: "az-Latn",
	englishName: "Azeri (Latin)",
	nativeName: "Azərbaycan\xadılı",
	language: "az-Latn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "man."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],
				namesAbbr: ["B","Be","Ça","Ç","Ca","C","Ş"],
				namesShort: ["B","Be","Ça","Ç","Ca","C","Ş"]
			},
			months: {
				names: ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			monthsGenitive: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "d MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sma", "default", {
	name: "sma",
	englishName: "Sami (Southern)",
	nativeName: "åarjelsaemiengiele",
	language: "sma",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["aejlege","måanta","dæjsta","gaskevåhkoe","duarsta","bearjadahke","laavvardahke"],
				namesAbbr: ["aej","måa","dæj","gask","duar","bearj","laav"],
				namesShort: ["a","m","d","g","d","b","l"]
			},
			months: {
				names: ["tsïengele","goevte","njoktje","voerhtje","suehpede","ruffie","snjaltje","mïetske","skïerede","golke","rahka","goeve",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			monthsGenitive: {
				names: ["tsïengelen","goevten","njoktjen","voerhtjen","suehpeden","ruffien","snjaltjen","mïetsken","skïereden","golken","rahkan","goeven",""],
				namesAbbr: ["tsïen","goevt","njok","voer","sueh","ruff","snja","mïet","skïer","golk","rahk","goev",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "uz-Cyrl", "default", {
	name: "uz-Cyrl",
	englishName: "Uzbek (Cyrillic)",
	nativeName: "Ўзбек",
	language: "uz-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": " ",
			".": ",",
			symbol: "сўм"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],
				namesAbbr: ["якш","дш","сш","чш","пш","ж","ш"],
				namesShort: ["я","д","с","ч","п","ж","ш"]
			},
			months: {
				names: ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["январ","феврал","март","апрел","май","июн","июл","август","сентябр","октябр","ноябр","декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","мая","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "yyyy 'йил' d-MMMM",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'йил' d-MMMM HH:mm",
				F: "yyyy 'йил' d-MMMM HH:mm:ss",
				M: "d-MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "mn-Cyrl", "default", {
	name: "mn-Cyrl",
	englishName: "Mongolian (Cyrillic)",
	nativeName: "Монгол хэл",
	language: "mn-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n$","n$"],
			",": " ",
			".": ",",
			symbol: "₮"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"],
				namesAbbr: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"],
				namesShort: ["Ня","Да","Мя","Лх","Пү","Ба","Бя"]
			},
			months: {
				names: ["1 дүгээр сар","2 дугаар сар","3 дугаар сар","4 дүгээр сар","5 дугаар сар","6 дугаар сар","7 дугаар сар","8 дугаар сар","9 дүгээр сар","10 дугаар сар","11 дүгээр сар","12 дугаар сар",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			monthsGenitive: {
				names: ["1 дүгээр сарын","2 дугаар сарын","3 дугаар сарын","4 дүгээр сарын","5 дугаар сарын","6 дугаар сарын","7 дугаар сарын","8 дугаар сарын","9 дүгээр сарын","10 дугаар сарын","11 дүгээр сарын","12 дугаар сарын",""],
				namesAbbr: ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yy.MM.dd",
				D: "yyyy 'оны' MMMM d",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy 'оны' MMMM d H:mm",
				F: "yyyy 'оны' MMMM d H:mm:ss",
				M: "d MMMM",
				Y: "yyyy 'он' MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "iu-Cans", "default", {
	name: "iu-Cans",
	englishName: "Inuktitut (Syllabics)",
	nativeName: "ᐃᓄᒃᑎᑐᑦ",
	language: "iu-Cans",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["ᓈᑦᑏᖑᔭ","ᓇᒡᒐᔾᔭᐅ","ᐊᐃᑉᐱᖅ","ᐱᖓᑦᓯᖅ","ᓯᑕᒻᒥᖅ","ᑕᓪᓕᕐᒥᖅ","ᓯᕙᑖᕐᕕᒃ"],
				namesAbbr: ["ᓈᑦᑏ","ᓇᒡᒐ","ᐊᐃᑉᐱ","ᐱᖓᑦᓯ","ᓯᑕ","ᑕᓪᓕ","ᓯᕙᑖᕐᕕᒃ"],
				namesShort: ["ᓈ","ᓇ","ᐊ","ᐱ","ᓯ","ᑕ","ᓯ"]
			},
			months: {
				names: ["ᔮᓐᓄᐊᕆ","ᕖᕝᕗᐊᕆ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌᓯ","ᓯᑎᐱᕆ","ᐅᑐᐱᕆ","ᓄᕕᐱᕆ","ᑎᓯᐱᕆ",""],
				namesAbbr: ["ᔮᓐᓄ","ᕖᕝᕗ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌ","ᓯᑎᐱ","ᐅᑐᐱ","ᓄᕕᐱ","ᑎᓯᐱ",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "dddd,MMMM dd,yyyy",
				f: "dddd,MMMM dd,yyyy h:mm tt",
				F: "dddd,MMMM dd,yyyy h:mm:ss tt",
				Y: "MMMM,yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-Hant", "default", {
	name: "zh-Hant",
	englishName: "Chinese (Traditional)",
	nativeName: "中文(繁體)",
	language: "zh-Hant",
	numberFormat: {
		"NaN": "非數字",
		negativeInfinity: "負無窮大",
		positiveInfinity: "正無窮大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			symbol: "HK$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "nb", "default", {
	name: "nb",
	englishName: "Norwegian (Bokmål)",
	nativeName: "norsk (bokmål)",
	language: "nb",
	numberFormat: {
		",": " ",
		".": ",",
		negativeInfinity: "-INF",
		positiveInfinity: "INF",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["$ -n","$ n"],
			",": " ",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
				namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
				namesShort: ["sø","ma","ti","on","to","fr","lø"]
			},
			months: {
				names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
				namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yyyy",
				D: "d. MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "d. MMMM yyyy HH:mm",
				F: "d. MMMM yyyy HH:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "sr", "default", {
	name: "sr",
	englishName: "Serbian",
	nativeName: "srpski",
	language: "sr",
	numberFormat: {
		",": ".",
		".": ",",
		negativeInfinity: "-beskonačnost",
		positiveInfinity: "+beskonačnost",
		percent: {
			pattern: ["-n%","n%"],
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "Din."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			firstDay: 1,
			days: {
				names: ["nedelja","ponedeljak","utorak","sreda","četvrtak","petak","subota"],
				namesAbbr: ["ned","pon","uto","sre","čet","pet","sub"],
				namesShort: ["ne","po","ut","sr","če","pe","su"]
			},
			months: {
				names: ["januar","februar","mart","april","maj","jun","jul","avgust","septembar","oktobar","novembar","decembar",""],
				namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"n.e.","start":null,"offset":0}],
			patterns: {
				d: "d.M.yyyy",
				D: "d. MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d. MMMM yyyy H:mm",
				F: "d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "tg-Cyrl", "default", {
	name: "tg-Cyrl",
	englishName: "Tajik (Cyrillic)",
	nativeName: "Тоҷикӣ",
	language: "tg-Cyrl",
	numberFormat: {
		",": " ",
		".": ",",
		groupSizes: [3,0],
		negativeInfinity: "-бесконечность",
		positiveInfinity: "бесконечность",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			groupSizes: [3,0],
			",": " ",
			".": ";",
			symbol: "т.р."
		}
	},
	calendars: {
		standard: {
			"/": ".",
			days: {
				names: ["Яш","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],
				namesAbbr: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"],
				namesShort: ["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"]
			},
			months: {
				names: ["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			monthsGenitive: {
				names: ["январи","феврали","марти","апрели","маи","июни","июли","августи","сентябри","октябри","ноябри","декабри",""],
				namesAbbr: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd.MM.yy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "dsb", "default", {
	name: "dsb",
	englishName: "Lower Sorbian",
	nativeName: "dolnoserbšćina",
	language: "dsb",
	numberFormat: {
		",": ".",
		".": ",",
		"NaN": "njedefinowane",
		negativeInfinity: "-njekońcne",
		positiveInfinity: "+njekońcne",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "€"
		}
	},
	calendars: {
		standard: {
			"/": ". ",
			firstDay: 1,
			days: {
				names: ["njeźela","ponjeźele","wałtora","srjoda","stwortk","pětk","sobota"],
				namesAbbr: ["nje","pon","wał","srj","stw","pět","sob"],
				namesShort: ["n","p","w","s","s","p","s"]
			},
			months: {
				names: ["januar","februar","měrc","apryl","maj","junij","julij","awgust","september","oktober","nowember","december",""],
				namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]
			},
			monthsGenitive: {
				names: ["januara","februara","měrca","apryla","maja","junija","julija","awgusta","septembra","oktobra","nowembra","decembra",""],
				namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"po Chr.","start":null,"offset":0}],
			patterns: {
				d: "d. M. yyyy",
				D: "dddd, 'dnja' d. MMMM yyyy",
				t: "H.mm 'goź.'",
				T: "H:mm:ss",
				f: "dddd, 'dnja' d. MMMM yyyy H.mm 'goź.'",
				F: "dddd, 'dnja' d. MMMM yyyy H:mm:ss",
				M: "d. MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "smj", "default", {
	name: "smj",
	englishName: "Sami (Lule)",
	nativeName: "julevusámegiella",
	language: "smj",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			",": ".",
			".": ",",
			symbol: "kr"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["ájllek","mánnodahka","dijstahka","gasskavahkko","duorastahka","bierjjedahka","lávvodahka"],
				namesAbbr: ["ájl","mán","dis","gas","duor","bier","láv"],
				namesShort: ["á","m","d","g","d","b","l"]
			},
			months: {
				names: ["ådåjakmánno","guovvamánno","sjnjuktjamánno","vuoratjismánno","moarmesmánno","biehtsemánno","sjnjilltjamánno","bårggemánno","ragátmánno","gålgådismánno","basádismánno","javllamánno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			monthsGenitive: {
				names: ["ådåjakmáno","guovvamáno","sjnjuktjamáno","vuoratjismáno","moarmesmáno","biehtsemáno","sjnjilltjamáno","bårggemáno","ragátmáno","gålgådismáno","basádismáno","javllamáno",""],
				namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "yyyy-MM-dd",
				D: "MMMM d'. b. 'yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "MMMM d'. b. 'yyyy HH:mm",
				F: "MMMM d'. b. 'yyyy HH:mm:ss",
				M: "MMMM d'. b. '",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "uz-Latn", "default", {
	name: "uz-Latn",
	englishName: "Uzbek (Latin)",
	nativeName: "U'zbek",
	language: "uz-Latn",
	numberFormat: {
		",": " ",
		".": ",",
		percent: {
			pattern: ["-n%","n%"],
			",": " ",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			decimals: 0,
			",": " ",
			".": ",",
			symbol: "so'm"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],
				namesAbbr: ["yak.","dsh.","sesh.","chr.","psh.","jm.","sh."],
				namesShort: ["ya","d","s","ch","p","j","sh"]
			},
			months: {
				names: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],
				namesAbbr: ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd/MM yyyy",
				D: "yyyy 'yil' d-MMMM",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "yyyy 'yil' d-MMMM HH:mm",
				F: "yyyy 'yil' d-MMMM HH:mm:ss",
				M: "d-MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "mn-Mong", "default", {
	name: "mn-Mong",
	englishName: "Mongolian (Traditional Mongolian)",
	nativeName: "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ",
	language: "mn-Mong",
	numberFormat: {
		groupSizes: [3,0],
		"NaN": "ᠲᠤᠭᠠᠠ ᠪᠤᠰᠤ",
		negativeInfinity: "ᠰᠦᠬᠡᠷᠬᠦ ᠬᠢᠵᠠᠭᠠᠷᠭᠦᠢ ᠶᠡᠬᠡ",
		positiveInfinity: "ᠡᠶ᠋ᠡᠷᠬᠦ ᠬᠢᠵᠠᠭᠠᠷᠭᠦᠢ ᠶᠠᠬᠡ",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,0]
		},
		currency: {
			pattern: ["$-n","$n"],
			groupSizes: [3,0],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			firstDay: 1,
			days: {
				names: ["ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],
				namesAbbr: ["ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ\u202fᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],
				namesShort: ["ᠡ\u200d","ᠨᠢ\u200d","ᠬᠣ\u200d","ᠭᠤ\u200d","ᠳᠥ\u200d","ᠲᠠ\u200d","ᠵᠢ\u200d"]
			},
			months: {
				names: ["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""],
				namesAbbr: ["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""]
			},
			AM: null,
			PM: null,
			eras: [{"name":"ᠣᠨ ᠲᠣᠭᠠᠯᠠᠯ ᠤᠨ","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ' H:mm",
				F: "yyyy'ᠣᠨ ᠤ᠋' M'ᠰᠠᠷ᠎ᠠ \u202fᠢᠢᠨ 'd' ᠤ᠋ ᠡᠳᠦᠷ' H:mm:ss",
				M: "M'ᠰᠠᠷ᠎ᠠ' d'ᠡᠳᠦᠷ'",
				Y: "yyyy'ᠣᠨ' M'ᠰᠠᠷ᠎ᠠ'"
			}
		}
	}
});

Globalize.addCultureInfo( "iu-Latn", "default", {
	name: "iu-Latn",
	englishName: "Inuktitut (Latin)",
	nativeName: "Inuktitut",
	language: "iu-Latn",
	numberFormat: {
		groupSizes: [3,0],
		percent: {
			groupSizes: [3,0]
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Naattiinguja","Naggajjau","Aippiq","Pingatsiq","Sitammiq","Tallirmiq","Sivataarvik"],
				namesAbbr: ["Nat","Nag","Aip","Pi","Sit","Tal","Siv"],
				namesShort: ["N","N","A","P","S","T","S"]
			},
			months: {
				names: ["Jaannuari","Viivvuari","Maatsi","Iipuri","Mai","Juuni","Julai","Aaggiisi","Sitipiri","Utupiri","Nuvipiri","Tisipiri",""],
				namesAbbr: ["Jan","Viv","Mas","Ipu","Mai","Jun","Jul","Agi","Sii","Uut","Nuv","Tis",""]
			},
			patterns: {
				d: "d/MM/yyyy",
				D: "ddd, MMMM dd,yyyy",
				f: "ddd, MMMM dd,yyyy h:mm tt",
				F: "ddd, MMMM dd,yyyy h:mm:ss tt"
			}
		}
	}
});

Globalize.addCultureInfo( "tzm-Latn", "default", {
	name: "tzm-Latn",
	englishName: "Tamazight (Latin)",
	nativeName: "Tamazight",
	language: "tzm-Latn",
	numberFormat: {
		pattern: ["n-"],
		",": ".",
		".": ",",
		"NaN": "Non Numérique",
		negativeInfinity: "-Infini",
		positiveInfinity: "+Infini",
		percent: {
			",": ".",
			".": ","
		},
		currency: {
			pattern: ["-n $","n $"],
			symbol: "DZD"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 6,
			days: {
				names: ["Acer","Arime","Aram","Ahad","Amhadh","Sem","Sedh"],
				namesAbbr: ["Ace","Ari","Ara","Aha","Amh","Sem","Sed"],
				namesShort: ["Ac","Ar","Ar","Ah","Am","Se","Se"]
			},
			months: {
				names: ["Yenayer","Furar","Maghres","Yebrir","Mayu","Yunyu","Yulyu","Ghuct","Cutenber","Ktuber","Wambir","Dujanbir",""],
				namesAbbr: ["Yen","Fur","Mag","Yeb","May","Yun","Yul","Ghu","Cut","Ktu","Wam","Duj",""]
			},
			AM: null,
			PM: null,
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM, yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "dd MMMM, yyyy H:mm",
				F: "dd MMMM, yyyy H:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

Globalize.addCultureInfo( "ha-Latn", "default", {
	name: "ha-Latn",
	englishName: "Hausa (Latin)",
	nativeName: "Hausa",
	language: "ha-Latn",
	numberFormat: {
		currency: {
			pattern: ["$-n","$ n"],
			symbol: "N"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
				namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
				namesShort: ["L","L","T","L","A","J","A"]
			},
			months: {
				names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
				namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
			},
			AM: ["Safe","safe","SAFE"],
			PM: ["Yamma","yamma","YAMMA"],
			eras: [{"name":"AD","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-CHS", "default", {
	name: "zh-CHS",
	englishName: "Chinese (Simplified) Legacy",
	nativeName: "中文(简体) 旧版",
	language: "zh-CHS",
	numberFormat: {
		"NaN": "非数字",
		negativeInfinity: "负无穷大",
		positiveInfinity: "正无穷大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

Globalize.addCultureInfo( "zh-CHT", "default", {
	name: "zh-CHT",
	englishName: "Chinese (Traditional) Legacy",
	nativeName: "中文(繁體) 舊版",
	language: "zh-CHT",
	numberFormat: {
		"NaN": "非數字",
		negativeInfinity: "負無窮大",
		positiveInfinity: "正無窮大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			symbol: "HK$"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "d/M/yyyy",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	}
});

}( this ));