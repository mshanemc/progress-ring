const getArc = (current, direction) => {
    const fillPercent = current / 100;

    // default for fill
    let filldrain = 0;
    let inverter = -1;

    if (direction === 'drain') {
        filldrain = 1;
        inverter = 1;
    }

    const arcx = Math.cos(2 * Math.PI * fillPercent);
    const arcy = Math.sin(2 * Math.PI * fillPercent) * inverter;

    const islong = fillPercent > 0.5 ? 1 : 0;

    const d = `M 1 0 A 1 1 0 ${islong} ${filldrain} ${arcx} ${arcy} L 0 0`;

    return d;
};

const getOuterClass = options => {
    let { variant, current, size } = options;

    let tempclass = 'slds-progress-ring';
    let computedIconName = '';
    let computedAltText = '';

    if (size === 'large') {
        tempclass = `${tempclass} slds-progress-ring_large`;
    }

    if (variant === 'warning') {
        tempclass = `${tempclass} slds-progress-ring_warning`;
        computedIconName = 'utility:warning';
        computedAltText = 'Warning';
    } else if (variant === 'expired') {
        tempclass = `${tempclass} slds-progress-ring_expired`;
        computedIconName = 'utility:error';
        computedAltText = 'Expired';
    } else if (variant === 'active-step') {
        tempclass = `${tempclass} slds-progress-ring_active-step`;
    } else if (
        variant === 'complete' ||
        (variant === 'autocomplete' && current === 100)
    ) {
        tempclass = `${tempclass} slds-progress-ring_complete`;
        computedIconName = 'utility:check';
        computedAltText = 'Complete';
    }

    return { computedOuterClass: tempclass, computedIconName, computedAltText };
};

export { getArc, getOuterClass };
