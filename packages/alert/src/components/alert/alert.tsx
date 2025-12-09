import { Component, Prop, State, Event, EventEmitter, h, Host, Method } from '@stencil/core';

/**
 * @component sg-alert
 * @description A versatile alert component for displaying important messages with different severity levels.
 *
 * @example
 * ```html
 * <sg-alert type="success" title="Success!" dismissible>
 *   Your changes have been saved successfully.
 * </sg-alert>
 * ```
 */
@Component({
  tag: 'sg-alert',
  styleUrl: 'alert.css',
  shadow: true,
})
export class Alert {
  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Alert type/severity */
  @Prop({ reflect: true }) type: 'info' | 'success' | 'warning' | 'error' = 'info';

  /** Optional title */
  @Prop() title?: string;

  /** Show dismiss button */
  @Prop() dismissible: boolean = false;

  /** Show icon */
  @Prop() showIcon: boolean = true;

  /** Custom icon (overrides default) */
  @Prop() icon?: string;

  /** Outlined style */
  @Prop({ reflect: true }) outlined: boolean = false;

  /** Soft/muted colors */
  @Prop({ reflect: true }) soft: boolean = true;

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Closable with animation */
  @Prop() animated: boolean = true;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() visible: boolean = true;
  @State() closing: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Emitted when alert is dismissed */
  @Event() sgDismiss!: EventEmitter<void>;

  /** Emitted after close animation completes */
  @Event() sgClosed!: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Show the alert */
  @Method()
  async show(): Promise<void> {
    this.visible = true;
    this.closing = false;
  }

  /** Dismiss the alert */
  @Method()
  async dismiss(): Promise<void> {
    this.handleDismiss();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private handleDismiss() {
    this.sgDismiss.emit();

    if (this.animated) {
      this.closing = true;
      setTimeout(() => {
        this.visible = false;
        this.closing = false;
        this.sgClosed.emit();
      }, 200);
    } else {
      this.visible = false;
      this.sgClosed.emit();
    }
  }

  private getDefaultIcon(): string {
    const icons: Record<string, string> = {
      info: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>`,
      success: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>`,
      warning: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>`,
      error: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"/></svg>`,
    };
    return icons[this.type] || icons.info;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    if (!this.visible) return null;

    return (
      <Host>
        <div
          class={{
            'alert': true,
            'alert--closing': this.closing,
          }}
          role="alert"
          aria-live={this.type === 'error' ? 'assertive' : 'polite'}
        >
          {this.showIcon && <span class="alert-icon" innerHTML={this.icon || this.getDefaultIcon()}></span>}

          <div class="alert-content">
            {this.title && <div class="alert-title">{this.title}</div>}
            <div class="alert-message">
              <slot></slot>
            </div>
          </div>

          {this.dismissible && (
            <button class="alert-dismiss" onClick={() => this.handleDismiss()} aria-label="Cerrar alerta">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
