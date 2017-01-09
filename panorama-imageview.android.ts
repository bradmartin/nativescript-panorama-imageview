/**********************************************************************************
* (c) 2017, Brad Martin.
* Licensed under the MIT license.
*
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/
"use strict";
import * as app from "application";
import { ImageSource, fromFileOrResource, fromUrl } from "image-source";
import { Image } from "ui/image";
import { isFileOrResourcePath } from "utils/utils";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyMetadataSettings } from "ui/core/dependency-observable";


declare var com, java, android: any;
const GyroscopeObserver = com.gjiazhe.panoramaimageview.GyroscopeObserver;

let scrollbarProperty = new Property(
  "scrollbar",
  "PanoramaImageView",
  new PropertyMetadata(undefined, PropertyMetadataSettings.None)
);

export class PanoramaImageView extends Image {

  constructor() {
    super();
  }

  private _android: any;

  get android() {
    return this._android;
  }

  get _nativeView() {
    return this._android;
  }

  get scrollbar(): boolean {
    return this._getValue(scrollbarProperty);
  }
  set scrollbar(value: boolean) {
    this._setValue(scrollbarProperty, value);
  }


  public _createUI() {

    if (!this.src) {
      console.log("Image must have src defined.");
      return;
    }

    this._android = new com.gjiazhe.panoramaimageview.PanoramaImageView(this._context);

    let gyroscopeObserver = new GyroscopeObserver();
    gyroscopeObserver.setMaxRotateRadian(java.lang.Math.PI / 9);
    this._android.setGyroscopeObserver(gyroscopeObserver);

    /// check if src is file or resource
    let isFileOrResource: boolean = isFileOrResourcePath(this.src);

    if (isFileOrResource) {

      let imgSrc: ImageSource = fromFileOrResource(this.src);
      this.setupPanaromicImageView(imgSrc.android, this.scrollbar);
      gyroscopeObserver.register(app.android.foregroundActivity);

    } else {

      fromUrl(this.src).then((result) => {
        let imgSrc: ImageSource = result;
        this.setupPanaromicImageView(imgSrc.android, this.scrollbar);
        gyroscopeObserver.register(app.android.foregroundActivity);
      })

    }

    /// register the gyroscope on app resume
    app.android.on("activityResumed", () => {
      gyroscopeObserver.register(app.android.foregroundActivity);
    })

    /// unregister when app is paused
    app.android.on("activityPaused", () => {
      gyroscopeObserver.unregister();
    })

  }


  private setupPanaromicImageView(bitMap, xScrollbar: boolean = false) {
    this._android.setImageBitmap(bitMap);
    this._android.setEnablePanoramaMode(true);
    this._android.setInvertScrollDirection(false);
    this._android.setEnableScrollbar(xScrollbar);
  }

}
