import { Element, track } from 'engine';

export default class reactive_demo extends Element {
  @track sliderValue = 50;

  slid(event) {
    this.sliderValue = event.target.value;
  }
}