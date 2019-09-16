import { LightningElement, api, track } from 'lwc';
import { getArc, getOuterClass } from './progressRingCalc';

export default class progress_ring extends LightningElement {
    @api value = 0;
    @api variant;
    @api direction = 'fill';
    @api size;

    @track d;
    @track computedOuterClass = 'slds-progress-ring';
    @track computedIconName;
    @track computedAltText;

    connectedCallback() {
        this.initialized = true;
        this.recalc();
    }

    renderedCallback() {
        this.recalc();
    }

    recalc() {
        const result = getOuterClass({
            variant: this.variant,
            current: Number(this.value),
            size: this.size
        });

        Object.keys(result).forEach(key => {
            this[key] = result[key];
        });

        this.d = getArc(this.value, this.direction);
    }
}
