"use strict";
var app = require("application");
var image_source_1 = require("image-source");
var image_1 = require("ui/image");
var utils_1 = require("utils/utils");
var proxy_1 = require("ui/core/proxy");
var dependency_observable_1 = require("ui/core/dependency-observable");
var GyroscopeObserver = com.gjiazhe.panoramaimageview.GyroscopeObserver;
var scrollbarProperty = new dependency_observable_1.Property("scrollbar", "PanoramaImageView", new proxy_1.PropertyMetadata(undefined, dependency_observable_1.PropertyMetadataSettings.None));
var PanoramaImageView = (function (_super) {
    __extends(PanoramaImageView, _super);
    function PanoramaImageView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PanoramaImageView.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanoramaImageView.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanoramaImageView.prototype, "scrollbar", {
        get: function () {
            return this._getValue(scrollbarProperty);
        },
        set: function (value) {
            this._setValue(scrollbarProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    PanoramaImageView.prototype._createUI = function () {
        var _this = this;
        if (!this.src) {
            console.log("Image must have src defined.");
            return;
        }
        this._android = new com.gjiazhe.panoramaimageview.PanoramaImageView(this._context);
        var gyroscopeObserver = new GyroscopeObserver();
        gyroscopeObserver.setMaxRotateRadian(java.lang.Math.PI / 9);
        this._android.setGyroscopeObserver(gyroscopeObserver);
        var isFileOrResource = utils_1.isFileOrResourcePath(this.src);
        if (isFileOrResource) {
            var imgSrc = image_source_1.fromFileOrResource(this.src);
            this.setupPanaromicImageView(imgSrc.android, this.scrollbar);
            gyroscopeObserver.register(app.android.foregroundActivity);
        }
        else {
            image_source_1.fromUrl(this.src).then(function (result) {
                var imgSrc = result;
                _this.setupPanaromicImageView(imgSrc.android, _this.scrollbar);
                gyroscopeObserver.register(app.android.foregroundActivity);
            });
        }
        app.android.on("activityResumed", function () {
            gyroscopeObserver.register(app.android.foregroundActivity);
        });
        app.android.on("activityPaused", function () {
            gyroscopeObserver.unregister();
        });
    };
    PanoramaImageView.prototype.setupPanaromicImageView = function (bitMap, xScrollbar) {
        if (xScrollbar === void 0) { xScrollbar = false; }
        this._android.setImageBitmap(bitMap);
        this._android.setEnablePanoramaMode(true);
        this._android.setInvertScrollDirection(false);
        this._android.setEnableScrollbar(xScrollbar);
    };
    return PanoramaImageView;
}(image_1.Image));
exports.PanoramaImageView = PanoramaImageView;
