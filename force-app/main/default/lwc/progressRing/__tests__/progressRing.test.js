import { createElement } from 'lwc';
import progressRing from 'c/progressRing';

describe('c-progress-ring', () => {
    // first child div, has computed class on it.
    const getOuterDiv = element => element.shadowRoot.querySelector('div');

    // themed icons
    const getIcon = element =>
        element.shadowRoot.querySelector(
            `div.slds-progress-ring__content lightning-icon`
        );

    // boilerplate element creation + api properties
    const instantiator = (options = {}) => {
        let element = createElement('c-progress-ring', {
            is: progressRing
        });

        element = Object.assign(element, options);
        document.body.appendChild(element);
        return element;
    };

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('no inputs at all', () => {
        const element = instantiator();

        expect(getOuterDiv(element).className).toBe('slds-progress-ring');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(1)').className
        ).toBe('slds-progress-ring__progress');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(2)').className
        ).toBe('slds-progress-ring__content');

        expect(
            element.shadowRoot
                .querySelector('path.slds-progress-ring__path')
                .getAttribute('d')
        ).toBeTruthy();
    });

    it('does fill', () => {
        const element = instantiator({
            direction: 'fill',
            value: 50
        });

        expect(getOuterDiv(element).className).toBe('slds-progress-ring');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(1)').className
        ).toBe('slds-progress-ring__progress');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(2)').className
        ).toBe('slds-progress-ring__content');

        expect(
            element.shadowRoot
                .querySelector('path.slds-progress-ring__path')
                .getAttribute('d')
        ).toBeTruthy();
    });

    it('does drain', () => {
        const element = instantiator({
            direction: 'drain',
            value: 50
        });

        expect(getOuterDiv(element).className).toBe('slds-progress-ring');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(1)').className
        ).toBe('slds-progress-ring__progress');

        expect(
            element.shadowRoot.querySelector('div div:nth-child(2)').className
        ).toBe('slds-progress-ring__content');

        expect(
            element.shadowRoot
                .querySelector('path.slds-progress-ring__path')
                .getAttribute('d')
        ).toBeTruthy();
    });

    it('gets min/max/value passthrough', () => {
        const element = instantiator({
            value: 50
        });

        expect(getOuterDiv(element).className).toBe('slds-progress-ring');

        const ring = element.shadowRoot.querySelector('div div:nth-child(1)');
        expect(ring.className).toBe('slds-progress-ring__progress');
        expect(ring.getAttribute('aria-valuemin')).toBe('0');
        expect(ring.getAttribute('aria-valuemax')).toBe('100');
        expect(ring.getAttribute('aria-valuenow')).toBe('50');
    });

    it('handles large format', () => {
        const element = instantiator({
            size: 'large'
        });

        expect(getOuterDiv(element).className).toContain(
            'slds-progress-ring_large'
        );
    });

    it('autocomplete not complete', () => {
        const element = instantiator({
            value: 50,
            autocomplete: true
        });

        expect(getOuterDiv(element).className).toBe('slds-progress-ring');
    });

    it('autocomplete is complete', () => {
        const element = instantiator({
            value: 100,
            variant: 'autocomplete'
        });

        expect(getOuterDiv(element).className).toBe(
            'slds-progress-ring slds-progress-ring_complete'
        );

        expect(getIcon(element).iconName).toBe('utility:check');
    });

    it('variant: warning', () => {
        const element = instantiator({
            variant: 'warning'
        });

        expect(getIcon(element).iconName).toBe('utility:warning');

        expect(getOuterDiv(element).className).toBe(
            'slds-progress-ring slds-progress-ring_warning'
        );
    });

    it('variant: error', () => {
        const element = instantiator({
            variant: 'expired'
        });

        expect(getIcon(element).iconName).toBe('utility:error');

        expect(getOuterDiv(element).className).toBe(
            'slds-progress-ring slds-progress-ring_expired'
        );
    });

    it('variant: active step', () => {
        const element = instantiator({
            variant: 'active-step'
        });

        expect(getIcon(element)).toBe(null);

        expect(getOuterDiv(element).className).toBe(
            'slds-progress-ring slds-progress-ring_active-step'
        );
    });
});
