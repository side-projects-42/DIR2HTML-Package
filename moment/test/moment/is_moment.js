var moment = require("../../moment");

exports.is_moment = {
  "is moment object": function (test) {
    test.expect(13);

    var MyObj = function () {},
      extend = function (a, b) {
        var i;
        for (i in b) {
          a[i] = b[i];
        }
        return a;
      };
    MyObj.prototype.toDate = function () {
      return new Date();
    };

    test.ok(moment.isMoment(moment()), "simple moment object");
    test.ok(moment.isMoment(moment("invalid date")), "invalid moment object");
    test.ok(
      moment.isMoment(extend({}, moment())),
      "externally cloned moments are moments"
    );
    test.ok(
      moment.isMoment(extend({}, moment.utc())),
      "externally cloned utc moments are moments"
    );

    test.ok(!moment.isMoment(new MyObj()), "myObj is not moment object");
    test.ok(!moment.isMoment(moment), "moment function is not moment object");
    test.ok(!moment.isMoment(new Date()), "date object is not moment object");
    test.ok(!moment.isMoment(Object), "Object is not moment object");
    test.ok(!moment.isMoment("foo"), "string is not moment object");
    test.ok(!moment.isMoment(1), "number is not moment object");
    test.ok(!moment.isMoment(NaN), "NaN is not moment object");
    test.ok(!moment.isMoment(null), "null is not moment object");
    test.ok(!moment.isMoment(undefined), "undefined is not moment object");

    test.done();
  },
};
