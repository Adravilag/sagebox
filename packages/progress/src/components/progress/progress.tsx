import { Component, Prop, h, Host } from '@stencil/core';

/**
 * @component sg-progress
 * @description A progress indicator component (linear and circular).
 */
@Component({
  tag: 'sg-progress',
  styleUrl: 'progress.css',
  shadow: true,
})
export class Progress {
  /** Current progress value (0-100) */
  @Prop() value: number = 0;

  /** Maximum value */
  @Prop() max: number = 100;

  /** Progress type */
  @Prop({ reflect: true }) type: 'linear' | 'circular' = 'linear';

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Color variant */
  @Prop({ reflect: true }) color: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  /** Show percentage label */
  @Prop() showLabel: boolean = false;

  /** Custom label */
  @Prop() label?: string;

  /** Indeterminate state (animated) */
  @Prop({ reflect: true }) indeterminate: boolean = false;

  /** Striped pattern (linear only) */
  @Prop({ reflect: true }) striped: boolean = false;

  /** Animated stripes */
  @Prop({ reflect: true }) animated: boolean = false;

  private get percentage(): number {
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  private get displayLabel(): string {
    if (this.label) return this.label;
    return `${Math.round(this.percentage)}%`;
  }

  private renderLinear() {
    return (
      <div class="progress-linear">
        <div class="progress-track">
          <div
            class="progress-bar"
            style={{ width: this.indeterminate ? '100%' : `${this.percentage}%` }}
            role="progressbar"
            aria-valuenow={this.value}
            aria-valuemin={0}
            aria-valuemax={this.max}
          ></div>
        </div>
        {this.showLabel && <span class="progress-label">{this.displayLabel}</span>}
      </div>
    );
  }

  private renderCircular() {
    const size = this.size === 'sm' ? 32 : this.size === 'lg' ? 64 : 48;
    const strokeWidth = this.size === 'sm' ? 3 : this.size === 'lg' ? 5 : 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.percentage / 100) * circumference;

    return (
      <div class="progress-circular" style={{ width: `${size}px`, height: `${size}px` }}>
        <svg viewBox={`0 0 ${size} ${size}`}>
          <circle class="progress-track-circle" cx={size / 2} cy={size / 2} r={radius} stroke-width={strokeWidth} />
          <circle
            class="progress-bar-circle"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke-width={strokeWidth}
            stroke-dasharray={circumference}
            stroke-dashoffset={this.indeterminate ? 0 : offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        {this.showLabel && <span class="progress-label-circular">{this.displayLabel}</span>}
      </div>
    );
  }

  render() {
    return <Host>{this.type === 'linear' ? this.renderLinear() : this.renderCircular()}</Host>;
  }
}
