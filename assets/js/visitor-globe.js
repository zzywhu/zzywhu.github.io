/* Keep the provider's fixed-size globe within the available screen width. */
(() => {
    const frame = document.querySelector('.visitor-globe-frame');
    if (!frame) return;

    function fitGlobe() {
        const globe = frame.querySelector('.mmvst_outer');
        if (!globe) return false;
        const width = parseFloat(globe.style.width) || globe.offsetWidth;
        const height = parseFloat(globe.style.height) || globe.offsetHeight;
        if (!width || !height || !frame.clientWidth) return false;
        const scale = Math.min(1, frame.clientWidth / width);
        frame.style.position = 'relative';
        frame.style.height = Math.ceil(height * scale) + 'px';
        globe.style.position = 'absolute';
        globe.style.top = '0';
        globe.style.left = '50%';
        globe.style.transformOrigin = 'top center';
        globe.style.transform = 'translateX(-50%) scale(' + scale + ')';
        return true;
    }

    if (!fitGlobe()) {
        const observer = new MutationObserver(() => {
            if (fitGlobe()) observer.disconnect();
        });
        observer.observe(frame, { childList: true, subtree: true });
    }
    if ('ResizeObserver' in window) new ResizeObserver(fitGlobe).observe(frame);
    else window.addEventListener('resize', fitGlobe, { passive: true });
})();
