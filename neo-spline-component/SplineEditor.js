// SplineEditor.js
import { Spline } from './Spline.js';
import { CanvasRenderer } from './CanvasRenderer.js';

export class SplineEditor {
    constructor(container, sliderElement, inputElement, options = {}) {
        // Set up canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = options.width || 320;
        this.canvas.height = options.height || 200;
        container.appendChild(this.canvas);

        // Initialize Spline and Renderer
        this.spline = new Spline(this.canvas.width, this.canvas.height);
        this.renderer = new CanvasRenderer(this.canvas, this.spline, options);

        // Initial draw
        this.renderer.drawEditor();

        // Bind canvas events
        this.bindCanvasEvents();
    }

    bindCanvasEvents() {
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));
    }

    // Update the marker position based on the slider
    updateMarkerPosition(position) {
        this.renderer.drawEditor(position); // Re-render with new marker position
    }

    // Update colors in the renderer
    updateColors(newColors) {
        if (this.renderer && this.renderer.updateColors) {
            this.renderer.updateColors(newColors);  // Update the canvas renderer colors
            this.renderer.drawEditor();  // Re-render with new colors
        }
    }

    // Method to toggle interpolation between Catmull-Rom and Linear
    toggleInterpolation(mode) {
        this.renderer.toggleInterpolation(mode);
    }

    onMouseDown(e) {
        const { offsetX, offsetY } = e;
        const clickedPoint = this.spline.getClickedPoint(offsetX, offsetY);

        // Set the clicked point as the dragging point if it exists
        if (clickedPoint) {
            this.draggingPoint = clickedPoint;
        }
    }

    onMouseMove(e) {
        if (this.draggingPoint) {
            const { offsetX, offsetY } = e;
            this.spline.moveControlPoint(this.draggingPoint, offsetX, offsetY);
            this.renderer.drawEditor();
        }
    }

    onMouseUp() {
        this.draggingPoint = null;
    }

    onDoubleClick(e) {
        const { offsetX, offsetY } = e;
        const clickedPoint = this.spline.getClickedPoint(offsetX, offsetY);

        if (clickedPoint && !clickedPoint.fixedX) {
            this.spline.removeControlPoint(clickedPoint);
        } else if (!clickedPoint) {
            this.spline.addControlPoint(offsetX, offsetY);
        }
        this.renderer.drawEditor();
    }
}
