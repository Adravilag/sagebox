import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * @component sg-radio
 * @description A radio button group component.
 */
@Component({
  tag: 'sg-radio',
  styleUrl: 'radio.css',
  shadow: true,
})
export class Radio {
  private groupId = `sg-radio-${Math.random().toString(36).slice(2, 9)}`;

  /** Radio group name */
  @Prop() name: string = '';

  /** Currently selected value */
  @Prop({ mutable: true }) value?: string;

  /** Options array */
  @Prop() options: RadioOption[] | string = [];

  /** Whether the entire group is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Orientation */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Color variant */
  @Prop({ reflect: true }) color: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  @State() parsedOptions: RadioOption[] = [];
  @State() focusedValue?: string;

  /** Emitted when selection changes */
  @Event() sgChange!: EventEmitter<{ value: string }>;

  componentWillLoad() {
    this.parseOptions();
  }

  private parseOptions() {
    if (typeof this.options === 'string') {
      try {
        this.parsedOptions = JSON.parse(this.options);
      } catch {
        this.parsedOptions = [];
      }
    } else {
      this.parsedOptions = this.options;
    }
  }

  private handleChange = (newValue: string) => {
    this.value = newValue;
    this.sgChange.emit({ value: newValue });
  };

  render() {
    return (
      <Host>
        <div class="radio-group" role="radiogroup">
          {this.parsedOptions.map((option, index) => {
            const isDisabled = this.disabled || option.disabled;
            const isChecked = this.value === option.value;
            const inputId = `${this.groupId}-${index}`;

            return (
              <label
                class={{
                  'radio-item': true,
                  'radio-item--disabled': isDisabled,
                  'radio-item--checked': isChecked,
                  'radio-item--focused': this.focusedValue === option.value,
                }}
                htmlFor={inputId}
              >
                <span class="radio-control">
                  <input
                    type="radio"
                    id={inputId}
                    name={this.name || this.groupId}
                    value={option.value}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => this.handleChange(option.value)}
                    onFocus={() => (this.focusedValue = option.value)}
                    onBlur={() => (this.focusedValue = undefined)}
                  />
                  <span class="radio-circle">
                    <span class="radio-dot"></span>
                  </span>
                </span>
                <span class="radio-label">{option.label}</span>
              </label>
            );
          })}
        </div>
      </Host>
    );
  }
}
