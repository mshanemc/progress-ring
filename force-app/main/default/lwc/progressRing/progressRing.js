import { LightningElement, api, track } from 'lwc';
import { getArc, getOuterClass } from './progressRingCalc';

export default class progress_ring extends LightningElement {
    @api max = 100;
    @api min = 0;
    @api theme;
    @api size;
    @api autocomplete;
    @api direction = 'fill';
    @api current;

    @track d;
    @track initialized = false;
    @track computedOuterClass = 'slds-progress-ring';
    @track isWarning = false;
    @track isExpired = false;
    @track isComplete = false;

    connectedCallback() {
        // validation
        if (!['fill', 'drain'].includes(this.direction)) {
            throw new Error(`direction must be either 'fill' or 'drain'`);
        }
        this.recalc();
        this.initialized = true;
    }

    renderedCallback() {
        this.recalc();
    }

    recalc() {
        const result = getOuterClass({
            theme: this.theme,
            autocomplete: this.autocomplete,
            current: Number(this.current),
            max: Number(this.max),
            size: this.size
        });

        Object.keys(result).forEach(key => {
            this[key] = result[key];
        });

        this.d = getArc(this.current, this.max, this.direction);
    }
}
