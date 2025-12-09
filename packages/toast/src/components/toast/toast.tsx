import { Component, Prop, State, Event, EventEmitter, h, Host, Method } from '@stencil/core';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type ToastType = 'info' | 'success' | 'warning' | 'error';

/**
 * @component sg-toast
 * @description A toast notification component for displaying temporary messages.
 *
 * @example
 * ```html
 * <sg-toast
 *   type="success"
 *   message="Operación completada"
 *   duration="3000"
 *   position="top-right"
 * ></sg-toast>
 * ```
 */
@Component({
  tag: 'sg-toast',
  styleUrl: 'toast.css',
  shadow: true,
})
export class Toast {
  private timeoutId?: ReturnType<typeof setTimeout>;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Toast type/severity */
  @Prop({ reflect: true }) type: ToastType = 'info';

  /** Message to display */
  @Prop() message: string = '';

  /** Optional title */
  @Prop() title?: string;

  /** Duration in ms (0 = manual dismiss) */
  @Prop() duration: number = 4000;

  /** Position on screen */
  @Prop({ reflect: true }) position: ToastPosition = 'top-right';

  /** Show close button */
  @Prop() closable: boolean = true;

  /** Show icon */
  @Prop() showIcon: boolean = true;

  /** Custom icon */
  @Prop() icon?: string;

  /** Show progress bar */
  @Prop() showProgress: boolean = true;

  /** Pause on hover */
  @Prop() pauseOnHover: boolean = true;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() visible: boolean = false;
  @State() leaving: boolean = false;
  @State() paused: boolean = false;
  @State() remainingTime: number = 0;
  @State() startTime: number = 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Emitted when toast is shown */
  @Event() sgShow!: EventEmitter<void>;

  /** Emitted when toast is hidden */
  @Event() sgHide!: EventEmitter<void>;

  /** Emitted when toast is clicked */
  @Event() sgClick!: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  connectedCallback() {
    // Auto-show on connect
    this.show();
  }

  disconnectedCallback() {
    this.clearTimeout();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Show the toast */
  @Method()
  async show(): Promise<void> {
    this.visible = true;
    this.leaving = false;
    this.sgShow.emit();
    this.startAutoClose();
  }

  /** Hide the toast */
  @Method()
  async hide(): Promise<void> {
    this.leaving = true;
    this.clearTimeout();

    setTimeout(() => {
      this.visible = false;
      this.leaving = false;
      this.sgHide.emit();
    }, 300);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private startAutoClose() {
    this.clearTimeout();

    if (this.duration > 0) {
      this.startTime = Date.now();
      this.remainingTime = this.duration;
      this.scheduleClose();
    }
  }

  private scheduleClose() {
    if (this.remainingTime <= 0) return;

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, this.remainingTime);
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private handleMouseEnter() {
    if (!this.pauseOnHover || this.duration <= 0) return;

    this.paused = true;
    this.clearTimeout();
    this.remainingTime = this.remainingTime - (Date.now() - this.startTime);
  }

  private handleMouseLeave() {
    if (!this.pauseOnHover || this.duration <= 0) return;

    this.paused = false;
    this.startTime = Date.now();
    this.scheduleClose();
  }

  private handleClick() {
    this.sgClick.emit();
  }

  private getDefaultIcon(): string {
    const icons: Record<ToastType, string> = {
      info: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"/></svg>`,
      success: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/></svg>`,
      warning: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/></svg>`,
      error: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"/></svg>`,
    };
    return icons[this.type];
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
            'toast': true,
            'toast--leaving': this.leaving,
            'toast--paused': this.paused,
          }}
          role="alert"
          aria-live="polite"
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
          onClick={() => this.handleClick()}
        >
          {this.showIcon && <span class="toast-icon" innerHTML={this.icon || this.getDefaultIcon()}></span>}

          <div class="toast-content">
            {this.title && <div class="toast-title">{this.title}</div>}
            <div class="toast-message">{this.message || <slot></slot>}</div>
          </div>

          {this.closable && (
            <button
              class="toast-close"
              onClick={e => {
                e.stopPropagation();
                this.hide();
              }}
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}

          {this.showProgress && this.duration > 0 && (
            <div class="toast-progress">
              <div
                class="toast-progress-bar"
                style={{
                  animationDuration: `${this.duration}ms`,
                  animationPlayState: this.paused ? 'paused' : 'running',
                }}
              ></div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
