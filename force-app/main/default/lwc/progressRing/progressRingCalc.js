const getArc = (current, max, direction) => {
    const fillPercent = current / max;

    let filldrain = 1;
    let inverter = 1;

    if (direction === 'fill') {
        filldrain = 0;
        inverter = -1;
    }

    const arcx = Math.cos(2 * Math.PI * fillPercent);
    const arcy = Math.sin(2 * Math.PI * fillPercent) * inverter;

    const islong = fillPercent > 0.5 ? 1 : 0;

    const d = `M 1 0 A 1 1 0 ${islong} ${filldrain} ${arcx} ${arcy} L 0 0`;

    return d;
};

const getOuterClass = options => {
    let { theme, autocomplete, current, max, size } = options;

    let tempclass = 'slds-progress-ring';
    let isWarning = false;
    let isExpired = false;
    let isComplete = false;

    if (theme === 'warning') {
        tempclass = `${tempclass} slds-progress-ring_warning`;
        isWarning = true;
    }
    if (theme === 'expired') {
        tempclass = `${tempclass} slds-progress-ring_expired`;
        isExpired = true;
    }
    if (theme === 'active-step') {
        tempclass = `${tempclass} slds-progress-ring_active-step`;
    }
    if (theme === 'complete' || (autocomplete && current === max)) {
        tempclass = `${tempclass} slds-progress-ring_complete`;
        isComplete = true;
        isWarning = false;
        isExpired = false;
    }

    if (size === 'large') {
        tempclass = `${tempclass} slds-progress-ring_large`;
    }

    return { computedOuterClass: tempclass, isWarning, isExpired, isComplete };
};

export { getArc, getOuterClass };
