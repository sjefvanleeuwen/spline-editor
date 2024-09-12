import { SplineEditor } from './SplineEditor.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('canvasContainer');
    const sliderElement = document.getElementById('slider');
    const inputElement = document.getElementById('sliderValue');
    const toggleButton = document.getElementById('toggleButton');

    // Initialize the SplineEditor with the slider
    const splineEditor = new SplineEditor(container, sliderElement, inputElement, toggleButton, {
        controlPointColor: '#ff9800',
        fixedPointColor: '#03a9f4',
        lineColor: '#ffffff',
        controlLineColor: '#888888',
        markerColor: '#00ff00',
    });
});
