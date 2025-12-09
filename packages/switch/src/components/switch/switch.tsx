import { Component, Prop, State, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * @component sg-switch
 * @description A toggle switch component.
 */
@Component({
  tag: 'sg-switch',
  styleUrl: 'switch.css',
  shadow: true,
})
export class Switch {
  private inputId = `sg-switch-${Math.random().toString(36).slice(2, 9)}`;

  /** Whether the switch is on */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Whether the switch is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Switch name for form submission */
  @Prop() name?: string;

  /** Label text */
  @Prop() label?: string;

  /** Label position */
  @Prop() labelPosition: 'left' | 'right' = 'right';

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Color when checked */
  @Prop({ reflect: true }) color: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  /** Show on/off text inside switch */
  @Prop() showText: boolean = false;

  /** Text when on */
  @Prop() onText: string = 'ON';

  /** Text when off */
  @Prop() offText: string = 'OFF';

  @State() focused: boolean = false;

  /** Emitted when switch state changes */
  @Event() sgChange!: EventEmitter<{ checked: boolean }>;

  private handleChange = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.sgChange.emit({ checked: this.checked });
  };

  render() {
    return (
      <Host>
        <label
          class={{
            'switch-wrapper': true,
            'switch-wrapper--disabled': this.disabled,
            'switch-wrapper--label-left': this.labelPosition === 'left',
          }}
        >
          {this.label && this.labelPosition === 'left' && <span class="switch-label">{this.label}</span>}
          <span
            class={{
              'switch-track': true,
              'switch-track--checked': this.checked,
              'switch-track--focused': this.focused,
            }}
            onClick={this.handleChange}
          >
            <input
              type="checkbox"
              role="switch"
              id={this.inputId}
              name={this.name}
              checked={this.checked}
              disabled={this.disabled}
              onChange={this.handleChange}
              onFocus={() => (this.focused = true)}
              onBlur={() => (this.focused = false)}
            />
            {this.showText && <span class="switch-text">{this.checked ? this.onText : this.offText}</span>}
            <span class="switch-thumb"></span>
          </span>
          {this.label && this.labelPosition === 'right' && <span class="switch-label">{this.label}</span>}
        </label>
      </Host>
    );
  }
}
