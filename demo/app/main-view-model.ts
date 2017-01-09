import { Observable } from 'data/observable';
import { topmost } from 'ui/frame';

declare var android: any;

export class HelloWorldModel extends Observable {

    constructor() {
        super();
    }

    public onTap() {
        let piv: any = topmost().getViewById("piv");
        console.log(piv);
        console.log(`piv.android: ${piv.android}`);
    }

}