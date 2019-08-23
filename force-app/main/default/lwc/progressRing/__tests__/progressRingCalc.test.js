import { getArc, getOuterClass } from '../progressRingCalc';

describe('test progress ring calc', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('no-test of arc', () => {
        expect(getArc(50, 100, 'fill')).toBeTruthy();
    });

    it('does basic', () => {
        const result = getOuterClass({ current: 50, max: 100 });
        expect(result.computedOuterClass).toBe('slds-progress-ring');
    });

    it('does large', () => {
        const result = getOuterClass({ current: 50, max: 100, size: 'large' });
        expect(result.computedOuterClass).toBe(
            'slds-progress-ring slds-progress-ring_large'
        );
    });

    it('does autocomplete partial', () => {
        const result = getOuterClass({
            current: 50,
            max: 100,
            autocomplete: true
        });
        expect(result.computedOuterClass).toBe('slds-progress-ring');
    });

    it('does autocomplete full', () => {
        const result = getOuterClass({
            current: 100,
            max: 100,
            autocomplete: true
        });
        expect(result.computedOuterClass).toBe(
            'slds-progress-ring slds-progress-ring_complete'
        );
    });
});
