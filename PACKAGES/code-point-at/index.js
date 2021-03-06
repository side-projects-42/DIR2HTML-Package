/* eslint-disable babel/new-cap, xo/throw-new-error */
"use strict";
module.exports = function (str, pos) {
  if (str === null || str === undefined) {
    throw TypeError();
  }

  str = String(str);

  var size = str.length;
  var i = pos ? Number(pos) : 0;

  if (Number.isNaN(i)) {
    i = 0;
  }

  if (i < 0 || i >= size) {
    return undefined;
  }

  var first = str.charCodeAt(i);

  if (first >= 0xd800 && first <= 0xdbff && size > i + 1) {
    var second = str.charCodeAt(i + 1);

    if (second >= 0xdc00 && second <= 0xdfff) {
      return (first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000;
    }
  }

  return first;
};
