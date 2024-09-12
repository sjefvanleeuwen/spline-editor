import { SplineEditor } from './SplineEditor.js';

class SplineEditorComponent extends HTMLElement {
    static get observedAttributes() {
        return ['controlpointcolor', 'fixedpointcolor', 'linecolor', 'controllinecolor', 'markercolor'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default settings, can be overridden by attributes
        this.width = this.getAttribute('width') || 320;
        this.height = this.getAttribute('height') || 200;

        // Initialize properties for colors
        this.props = {
            controlPointColor: this.getAttribute('controlpointcolor') || '#ff9800',
            fixedPointColor: this.getAttribute('fixedpointcolor') || '#03a9f4',
            lineColor: this.getAttribute('linecolor') || '#ffffff',
            controlLineColor: this.getAttribute('controllinecolor') || '#888888',
            markerColor: this.getAttribute('markercolor') || '#00ff00'
        };

        // Create internal structure of the component
        this.shadowRoot.innerHTML = `
            <style>
                canvas {
                    background-color: #1e1e1e;
                    display: block;
                    margin-bottom: 10px;
                }
            </style>
            <div id="canvasContainer"></div>
        `;
    }

    connectedCallback() {
        this.initSplineEditor();
    }

    disconnectedCallback() {
        // Clean up if needed when the component is removed from the DOM
    }

    // Map the kebab-case attribute names to camelCase property names
    static attributeToPropName(attrName) {
        const map = {
            controlpointcolor: 'controlPointColor',
            fixedpointcolor: 'fixedPointColor',
            linecolor: 'lineColor',
            controllinecolor: 'controlLineColor',
            markercolor: 'markerColor'
        };
        return map[attrName];
    }

    // Observe attribute changes and update the props object
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            console.log(`${name} changed from ${oldValue} to ${newValue}`);

            // Convert the attribute name to the corresponding prop name
            const propName = SplineEditorComponent.attributeToPropName(name);

            // Update the internal props object with the correct camelCase key
            this.props[propName] = newValue;

            // Now call the method to update the spline editor with the new colors
            this.updateSplineEditorColors();
        }
    }

    initSplineEditor() {
        const container = this.shadowRoot.querySelector('#canvasContainer');

        this.splineEditor = new SplineEditor(
            container,
            null,  // No slider
            null,  // No input element
            {
                width: this.width,
                height: this.height,
                controlPointColor: this.props.controlPointColor,
                fixedPointColor: this.props.fixedPointColor,
                lineColor: this.props.lineColor,
                controlLineColor: this.props.controlLineColor,
                markerColor: this.props.markerColor,
            }
        );
    }

    updateSplineEditorColors() {
        if (this.splineEditor && this.splineEditor.updateColors) {
            this.splineEditor.updateColors({
                controlPointColor: this.props.controlPointColor,
                fixedPointColor: this.props.fixedPointColor,
                lineColor: this.props.lineColor,
                controlLineColor: this.props.controlLineColor,
                markerColor: this.props.markerColor
            });
        }
    }

    // Expose the updateMarkerPosition method to the outside world
    updateMarkerPosition(position) {
        if (this.splineEditor) {
            this.splineEditor.updateMarkerPosition(position);
        }
    }

    // Expose the method to toggle interpolation from dat.GUI
    toggleInterpolation(mode) {
        if (this.splineEditor) {
            this.splineEditor.toggleInterpolation(mode ? 'catmullRom' : 'linear');
        }
    }
}

// Define the custom element
customElements.define('spline-editor', SplineEditorComponent);
