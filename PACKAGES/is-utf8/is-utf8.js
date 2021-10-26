exports = module.exports = function (bytes) {
  var i = 0;
  while (i < bytes.length) {
    if (
      // ASCII
      bytes[i] == 0x09 ||
      bytes[i] == 0x0a ||
      bytes[i] == 0x0d ||
      (0x20 <= bytes[i] && bytes[i] <= 0x7e)
    ) {
      i += 1;
      continue;
    }

    if (
      // non-overlong 2-byte
      0xc2 <= bytes[i] &&
      bytes[i] <= 0xdf &&
      0x80 <= bytes[i + 1] &&
      bytes[i + 1] <= 0xbf
    ) {
      i += 2;
      continue;
    }

    if (
      // excluding overlongs
      (bytes[i] == 0xe0 &&
        0xa0 <= bytes[i + 1] &&
        bytes[i + 1] <= 0xbf &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf) || // straight 3-byte
      (((0xe1 <= bytes[i] && bytes[i] <= 0xec) ||
        bytes[i] == 0xee ||
        bytes[i] == 0xef) &&
        0x80 <= bytes[i + 1] &&
        bytes[i + 1] <= 0xbf &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf) || // excluding surrogates
      (bytes[i] == 0xed &&
        0x80 <= bytes[i + 1] &&
        bytes[i + 1] <= 0x9f &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf)
    ) {
      i += 3;
      continue;
    }

    if (
      // planes 1-3
      (bytes[i] == 0xf0 &&
        0x90 <= bytes[i + 1] &&
        bytes[i + 1] <= 0xbf &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf &&
        0x80 <= bytes[i + 3] &&
        bytes[i + 3] <= 0xbf) || // planes 4-15
      (0xf1 <= bytes[i] &&
        bytes[i] <= 0xf3 &&
        0x80 <= bytes[i + 1] &&
        bytes[i + 1] <= 0xbf &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf &&
        0x80 <= bytes[i + 3] &&
        bytes[i + 3] <= 0xbf) || // plane 16
      (bytes[i] == 0xf4 &&
        0x80 <= bytes[i + 1] &&
        bytes[i + 1] <= 0x8f &&
        0x80 <= bytes[i + 2] &&
        bytes[i + 2] <= 0xbf &&
        0x80 <= bytes[i + 3] &&
        bytes[i + 3] <= 0xbf)
    ) {
      i += 4;
      continue;
    }

    return false;
  }

  return true;
};
