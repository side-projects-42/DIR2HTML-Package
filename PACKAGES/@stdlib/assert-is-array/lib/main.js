/**
 * @license Apache-2.0
 *
 * Copyright (c) 2018 The Stdlib Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

// MODULES //

var nativeClass = require("@stdlib/utils-native-class");

// VARIABLES //

var f;

// FUNCTIONS //

/**
 * Tests if a value is an array.
 *
 * @param {*} value - value to test
 * @returns {boolean} boolean indicating whether value is an array
 *
 * @example
 * var bool = isArray( [] );
 * // returns true
 *
 * @example
 * var bool = isArray( {} );
 * // returns false
 */
function isArray(value) {
  return nativeClass(value) === "[object Array]";
}

// MAIN //

if (Array.isArray) {
  f = Array.isArray;
} else {
  f = isArray;
}

// EXPORTS //

module.exports = f;
