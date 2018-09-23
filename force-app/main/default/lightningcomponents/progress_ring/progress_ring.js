import { Element, api, track } from 'engine';

export default class progress_ring extends Element {

  min = 0;
  max = 100;
  themeclass = '';
  _current = 0;
  _direction;
  inverter;
  filldrain;

  @api theme;
  @api size;
  @api autocomplete;

  @api
  set direction(value) {
    if (value === 'drain') {
        this.inverter = 1;
        this.filldrain = 1;
      } else if (value === 'fill') {
        this.inverter = -1;
        this.filldrain = 0;
      }
  }

  @api
  get direction() {
    return this._direction;
  }

  @api
  set current(value){
    this._current = value;
    // don't do until after connectedCallback()
    if (this.show) {
      this.recaclc();
    }
  }

  @api
  get current() {
    return this._current;
  }

  @track d;
  @track show = false;
  @track computedOuterClass = 'slds-progress-ring';
  @track isWarning = false;
  @track isExpired = false;
  @track isComplete = false;

  constructor() {
    super();
    this.direction = 'fill';
  }

  connectedCallback() {
    this.init();
    this.recaclc();
    this.show = true;
  }

  init() {
    if (!this.theme){
      this.themeclass = '';
    } else if (this.theme === 'warning') {
      this.themeclass = 'slds-progress-ring_warning';
    } else if (this.theme === 'expired') {
      this.themeclass = 'slds-progress-ring_expired';
    } else if (this.theme === 'complete') {
      this.themeclass = 'slds-progress-ring_complete';
    } else if (this.theme === 'active-step') {
      this.themeclass = 'slds-progress-ring_active-step';
    }

    this.isWarning = this.theme === 'warning';
    this.isExpired = this.theme === 'expired';
    this.isComplete = this.theme === 'complete';

    this.computeClass();
  }

  computeClass() {
    let tempclass = 'slds-progress-ring';

    if (this.themeclass) {
      tempclass = `${tempclass} ${this.themeclass}`;
    }

    if (this.size === 'large') {
      tempclass = `${tempclass} slds-progress-ring_large`;
    }

    this.computedOuterClass = tempclass;
  }

  recaclc() {

    const fillPercent = this._current / this.max;

    const arcx = Math.cos(2 * Math.PI * fillPercent);
    const arcy = Math.sin(2 * Math.PI * fillPercent) * this.inverter;
    const islong = fillPercent > 0.5 ? 1 : 0;

    this.d = `M 1 0 A 1 1 0 ${islong} ${this.filldrain} ${arcx} ${arcy} L 0 0`;

    // handling for autocomplete
    if (this.autocomplete){
        if (fillPercent === 1) {
        this.themeclass = 'slds-progress-ring_complete';
        this.isComplete = true;
        this.computeClass();
      } else {
        this.init();
      }
    }
  }

}