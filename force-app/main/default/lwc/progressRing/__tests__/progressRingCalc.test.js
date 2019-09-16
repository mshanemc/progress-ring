import { getArc, getOuterClass } from '../progressRingCalc';

const parseTerms = d => {
    const dArray = d.split(' ');
    expect(dArray).toHaveLength(14);
    expect(dArray[0]).toBe('M');
    expect(dArray[1]).toBe('1');
    expect(dArray[2]).toBe('0');
    expect(dArray[3]).toBe('A');
    expect(dArray[4]).toBe('1');
    expect(dArray[5]).toBe('1');
    expect(dArray[6]).toBe('0');
    expect(dArray[11]).toBe('L');
    expect(dArray[12]).toBe('0');
    expect(dArray[13]).toBe('0');
    return dArray;
};

describe('test progress ring calc', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('empty drain', () => {
        const dArray = parseTerms(getArc(0, 'drain'));

        expect(dArray[7]).toBe('0');
        expect(dArray[8]).toBe('1');
        expect(dArray[9]).toBe('1');
        expect(dArray[10]).toBe('0');
    });

    it('half drain', () => {
        const dArray = parseTerms(getArc(51, 'drain'));
        expect(dArray[7]).toBe('1');
        expect(dArray[8]).toBe('1');
        expect(Number(dArray[9])).toBeCloseTo(-1);
        expect(Number(dArray[10])).toBeCloseTo(-0.062);
    });

    it('full drain', () => {
        const dArray = parseTerms(getArc(100, 'drain'));
        expect(dArray[7]).toBe('1');
        expect(dArray[8]).toBe('1');
        expect(dArray[9]).toBe('1');
        expect(Number(dArray[10])).toBeCloseTo(0);
    });

    it('empty fill', () => {
        const dArray = parseTerms(getArc(0, 'fill'));
        expect(dArray[7]).toBe('0');
        expect(dArray[8]).toBe('0');
        expect(dArray[9]).toBe('1');
        expect(dArray[10]).toBe('0');
    });

    it('half fill', () => {
        const dArray = parseTerms(getArc(49, 'fill'));
        expect(dArray[7]).toBe('0');
        expect(dArray[8]).toBe('0');
        expect(Number(dArray[9])).toBeCloseTo(-1);
        expect(Number(dArray[10])).toBeCloseTo(-0.062);
    });

    it('full fill', () => {
        const dArray = parseTerms(getArc(100, 'fill'));
        expect(dArray[7]).toBe('1');
        expect(dArray[8]).toBe('0');
        expect(Number(dArray[9])).toBeCloseTo(1);
        expect(Number(dArray[10])).toBeCloseTo(0);
    });

    it('does basic', () => {
        const result = getOuterClass({ current: 50 });
        expect(result.computedOuterClass).toBe('slds-progress-ring');
    });

    it('does large', () => {
        const result = getOuterClass({ current: 50, size: 'large' });
        expect(result.computedOuterClass).toBe(
            'slds-progress-ring slds-progress-ring_large'
        );
    });

    it('does autocomplete partial', () => {
        const result = getOuterClass({
            current: 50,
            variant: 'autocomplete'
        });
        expect(result.computedOuterClass).toBe('slds-progress-ring');
    });

    it('does autocomplete full', () => {
        const result = getOuterClass({
            current: 100,
            variant: 'autocomplete'
        });
        expect(result.computedOuterClass).toBe(
            'slds-progress-ring slds-progress-ring_complete'
        );
    });

    it('theme warning', () => {
        const result = getOuterClass({
            current: 100,
            variant: 'warning'
        });
        expect(result.computedOuterClass).toBe(
            'slds-progress-ring slds-progress-ring_warning'
        );
    });
});
