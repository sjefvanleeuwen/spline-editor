// Slider.js
export class Slider {
    constructor(sliderElement, inputElement, onChange) {
        this.sliderElement = sliderElement;
        this.inputElement = inputElement;
        this.onChange = onChange;

        this.bindEvents();
    }

    bindEvents() {
        // Update the input field when the slider is moved
        this.sliderElement.addEventListener('input', () => {
            this.inputElement.value = this.sliderElement.value;
            this.onChange(this.getSliderValue());
        });

        // Update the slider when the input field value changes
        this.inputElement.addEventListener('input', () => {
            this.sliderElement.value = this.inputElement.value;
            this.onChange(this.getSliderValue());
        });
    }

    getSliderValue() {
        return this.sliderElement.value / this.sliderElement.max;
    }
}
