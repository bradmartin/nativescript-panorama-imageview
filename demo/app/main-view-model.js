"use strict";
var observable_1 = require("data/observable");
var frame_1 = require("ui/frame");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        return _super.call(this) || this;
    }
    HelloWorldModel.prototype.onTap = function () {
        var piv = frame_1.topmost().getViewById("piv");
        console.log(piv);
        console.log("piv.android: " + piv.android);
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map