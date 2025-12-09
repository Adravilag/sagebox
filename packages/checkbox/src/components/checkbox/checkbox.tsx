import { Component, Prop, State, Event, EventEmitter, h, Host, Watch } from '@stencil/core';

/**
 * @component sg-checkbox
 * @description A customizable checkbox component with label support.
 */
@Component({
  tag: 'sg-checkbox',
  styleUrl: 'checkbox.css',
  shadow: true,
})
export class Checkbox {
  private inputId = `sg-checkbox-${Math.random().toString(36).slice(2, 9)}`;

  /** Whether the checkbox is checked */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Indeterminate state (partially checked) */
  @Prop({ mutable: true, reflect: true }) indeterminate: boolean = false;

  /** Whether the checkbox is disabled */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Checkbox name for form submission */
  @Prop() name?: string;

  /** Checkbox value */
  @Prop() value?: string;

  /** Label text */
  @Prop() label?: string;

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Color variant */
  @Prop({ reflect: true }) color: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  /** Error state */
  @Prop({ reflect: true }) error: boolean = false;

  /** Helper/error text */
  @Prop() helperText?: string;

  @State() focused: boolean = false;

  /** Emitted when checked state changes */
  @Event() sgChange!: EventEmitter<{ checked: boolean; value?: string }>;

  @Watch('checked')
  watchChecked() {
    if (this.checked) this.indeterminate = false;
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.sgChange.emit({ checked: this.checked, value: this.value });
  };

  render() {
    return (
      <Host>
        <label
          class={{
            'checkbox-wrapper': true,
            'checkbox-wrapper--disabled': this.disabled,
            'checkbox-wrapper--focused': this.focused,
            'checkbox-wrapper--error': this.error,
          }}
          htmlFor={this.inputId}
        >
          <span class="checkbox-control">
            <input
              type="checkbox"
              id={this.inputId}
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              indeterminate={this.indeterminate}
              onChange={this.handleChange}
              onFocus={() => (this.focused = true)}
              onBlur={() => (this.focused = false)}
            />
            <span class="checkbox-box">
              {this.checked && !this.indeterminate && (
                <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}
              {this.indeterminate && (
                <svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              )}
            </span>
          </span>
          {(this.label || this.helperText) && (
            <span class="checkbox-content">
              {this.label && <span class="checkbox-label">{this.label}</span>}
              {this.helperText && <span class="checkbox-helper">{this.helperText}</span>}
            </span>
          )}
          <slot></slot>
        </label>
      </Host>
    );
  }
}
