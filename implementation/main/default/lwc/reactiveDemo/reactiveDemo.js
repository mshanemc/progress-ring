import { LightningElement, track } from 'lwc';

export default class reactive_demo extends LightningElement {
  @track sliderValue = 50;

  slid(event) {
    this.sliderValue = event.target.value;
  }
}