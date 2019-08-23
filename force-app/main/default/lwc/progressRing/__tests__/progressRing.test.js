import { createElement } from 'lwc';
import progressRing from 'c/progressRing';

describe('c-progress-ring', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('no inputs at all', () => {
        // Create element
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        document.body.appendChild(element);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe('slds-progress-ring');

        const ring = element.shadowRoot.querySelector('div div:nth-child(1)');
        expect(ring.className).toBe('slds-progress-ring__progress');

        const content = element.shadowRoot.querySelector(
            'div div:nth-child(2)'
        );
        expect(content.className).toBe('slds-progress-ring__content');
    });

    it('gets min/max/current passthrough', () => {
        // Create element
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.current = 50;
        document.body.appendChild(element);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe('slds-progress-ring');

        const ring = element.shadowRoot.querySelector('div div:nth-child(1)');
        expect(ring.className).toBe('slds-progress-ring__progress');
        expect(ring.getAttribute('aria-valuemin')).toBe('0');
        expect(ring.getAttribute('aria-valuemax')).toBe('100');
        expect(ring.getAttribute('aria-valuenow')).toBe('50');
    });

    it('handles large format', () => {
        // Create element
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.size = 'large';
        document.body.appendChild(element);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toContain('slds-progress-ring_large');
    });

    it('autocomplete not complete', () => {
        // Create element
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.current = 50;
        element.autocomplete = true;
        document.body.appendChild(element);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe('slds-progress-ring');
    });

    it('autocomplete is complete', () => {
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.current = 100;
        element.autocomplete = true;
        document.body.appendChild(element);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe(
            'slds-progress-ring slds-progress-ring_complete'
        );

        const completeIcon = element.shadowRoot.querySelector(
            `div.slds-progress-ring__content lightning-icon`
        );
        expect(completeIcon.iconName).toBe('utility:check');
    });

    it('theme: warning', () => {
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.theme = 'warning';
        document.body.appendChild(element);

        const themeIcon = element.shadowRoot.querySelector(
            `div.slds-progress-ring__content lightning-icon`
        );
        expect(themeIcon.iconName).toBe('utility:warning');

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe(
            'slds-progress-ring slds-progress-ring_warning'
        );
    });

    it('theme: error', () => {
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.theme = 'expired';
        document.body.appendChild(element);

        const themeIcon = element.shadowRoot.querySelector(
            `div.slds-progress-ring__content lightning-icon`
        );
        expect(themeIcon.iconName).toBe('utility:error');

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe(
            'slds-progress-ring slds-progress-ring_expired'
        );
    });

    it('theme: active step', () => {
        const element = createElement('c-progress-ring', {
            is: progressRing
        });
        element.theme = 'active-step';
        document.body.appendChild(element);

        const themeIcon = element.shadowRoot.querySelector(
            `div.slds-progress-ring__content lightning-icon`
        );

        expect(themeIcon).toBe(null);

        const outerDiv = element.shadowRoot.querySelector('div');
        expect(outerDiv.className).toBe(
            'slds-progress-ring slds-progress-ring_active-step'
        );
    });
});
