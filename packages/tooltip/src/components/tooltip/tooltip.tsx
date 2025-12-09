import { Component, Prop, State, Event, EventEmitter, h, Host, Element, Method, Watch } from '@stencil/core';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type TooltipVariant = 'default' | 'dark' | 'light' | 'primary' | 'success' | 'warning' | 'error';

/**
 * @component sg-tooltip
 * @description A lightweight tooltip component with smooth fade animation.
 *
 * @slot - Default slot for the trigger element
 * @slot content - Custom tooltip content (overrides text prop)
 *
 * @example
 * ```html
 * <sg-tooltip text="Hello!">
 *   <button>Hover me</button>
 * </sg-tooltip>
 * ```
 */
@Component({
  tag: 'sg-tooltip',
  styleUrl: 'tooltip.css',
  shadow: true,
})
export class SgTooltip {
  @Element() el!: HTMLElement;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Tooltip text content */
  @Prop() text: string = '';

  /** Position relative to trigger */
  @Prop({ reflect: true }) position: TooltipPosition = 'top';

  /** How to trigger the tooltip */
  @Prop() trigger: TooltipTrigger = 'hover';

  /** Visual variant */
  @Prop({ reflect: true }) variant: TooltipVariant = 'default';

  /** Delay before showing (ms) */
  @Prop() delay: number = 0;

  /** Delay before hiding (ms) */
  @Prop() hideDelay: number = 0;

  /** Show arrow */
  @Prop() arrow: boolean = true;

  /** Controlled open state */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /** Disable tooltip */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Allow hovering over tooltip */
  @Prop({ reflect: true }) interactive: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() isVisible: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Emitted when tooltip shows */
  @Event() sgShow!: EventEmitter<void>;

  /** Emitted when tooltip hides */
  @Event() sgHide!: EventEmitter<void>;

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE
  // ═══════════════════════════════════════════════════════════════════════════

  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;

  // ═══════════════════════════════════════════════════════════════════════════
  // WATCHERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('open')
  onOpenChange(newValue: boolean) {
    if (this.trigger === 'manual') {
      this.isVisible = newValue;
      this.updateAttribute();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    if (this.trigger === 'manual') {
      this.isVisible = this.open;
    }
  }

  componentDidLoad() {
    this.updateAttribute();
  }

  disconnectedCallback() {
    this.clearTimers();
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Show the tooltip */
  @Method()
  async show(): Promise<void> {
    if (this.disabled) return;
    this.clearTimers();
    this.isVisible = true;
    this.open = true;
    this.updateAttribute();
    this.sgShow.emit();
  }

  /** Hide the tooltip */
  @Method()
  async hide(): Promise<void> {
    this.clearTimers();
    this.isVisible = false;
    this.open = false;
    this.updateAttribute();
    this.sgHide.emit();
  }

  /** Toggle the tooltip */
  @Method()
  async toggle(): Promise<void> {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private clearTimers() {
    if (this.showTimer) clearTimeout(this.showTimer);
    if (this.hideTimer) clearTimeout(this.hideTimer);
  }

  private updateAttribute() {
    if (this.isVisible) {
      this.el.setAttribute('data-show', '');
    } else {
      this.el.removeAttribute('data-show');
    }
  }

  private scheduleShow = () => {
    if (this.disabled) return;
    this.clearTimers();

    if (this.delay > 0) {
      this.showTimer = setTimeout(() => this.show(), this.delay);
    } else {
      this.show();
    }
  };

  private scheduleHide = () => {
    this.clearTimers();

    if (this.hideDelay > 0) {
      this.hideTimer = setTimeout(() => this.hide(), this.hideDelay);
    } else {
      this.hide();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENT HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════

  private onMouseEnter = () => {
    if (this.trigger === 'hover') {
      this.scheduleShow();
    }
  };

  private onMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.scheduleHide();
    }
  };

  private onFocus = () => {
    if (this.trigger === 'hover' || this.trigger === 'focus') {
      this.scheduleShow();
    }
  };

  private onBlur = () => {
    if (this.trigger === 'hover' || this.trigger === 'focus') {
      this.scheduleHide();
    }
  };

  private onClick = (e: MouseEvent) => {
    if (this.trigger === 'click') {
      e.stopPropagation();
      if (this.isVisible) {
        this.hide();
      } else {
        this.show();
      }
    }
  };

  private onBubbleEnter = () => {
    if (this.interactive && this.trigger === 'hover') {
      this.clearTimers();
    }
  };

  private onBubbleLeave = () => {
    if (this.interactive && this.trigger === 'hover') {
      this.scheduleHide();
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host>
        <span class="trigger" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick}>
          <slot />
        </span>

        <div class="bubble" role="tooltip" aria-hidden={this.isVisible ? 'false' : 'true'} onMouseEnter={this.onBubbleEnter} onMouseLeave={this.onBubbleLeave}>
          {this.arrow && <span class="arrow" />}
          <slot name="content">{this.text}</slot>
        </div>
      </Host>
    );
  }
}
