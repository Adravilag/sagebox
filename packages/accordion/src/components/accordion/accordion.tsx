import { Component, Prop, State, Event, EventEmitter, h, Host, Watch } from '@stencil/core';

export interface AccordionItem {
  id: string;
  header: string;
  content?: string;
  disabled?: boolean;
  icon?: string;
}

/**
 * @component sg-accordion
 * @description A collapsible accordion component.
 */
@Component({
  tag: 'sg-accordion',
  styleUrl: 'accordion.css',
  shadow: true,
})
export class Accordion {
  /** Accordion items */
  @Prop() items: AccordionItem[] | string = [];

  /** Allow multiple panels open */
  @Prop() multiple: boolean = false;

  /** Currently expanded panel(s) */
  @Prop({ mutable: true }) expanded: string | string[] = [];

  /** Bordered style */
  @Prop({ reflect: true }) bordered: boolean = true;

  /** Size variant */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Icon position */
  @Prop() iconPosition: 'left' | 'right' = 'right';

  @State() parsedItems: AccordionItem[] = [];
  @State() expandedSet: Set<string> = new Set();

  /** Emitted when panel is toggled */
  @Event() sgToggle!: EventEmitter<{ id: string; expanded: boolean }>;

  @Watch('items')
  watchItems() {
    this.parseItems();
  }

  @Watch('expanded')
  watchExpanded() {
    this.parseExpanded();
  }

  componentWillLoad() {
    this.parseItems();
    this.parseExpanded();
  }

  private parseItems() {
    if (typeof this.items === 'string') {
      try {
        this.parsedItems = JSON.parse(this.items);
      } catch {
        this.parsedItems = [];
      }
    } else {
      this.parsedItems = this.items;
    }
  }

  private parseExpanded() {
    if (Array.isArray(this.expanded)) {
      this.expandedSet = new Set(this.expanded);
    } else if (this.expanded) {
      this.expandedSet = new Set([this.expanded]);
    } else {
      this.expandedSet = new Set();
    }
  }

  private togglePanel(id: string) {
    const item = this.parsedItems.find(i => i.id === id);
    if (item?.disabled) return;

    const isExpanded = this.expandedSet.has(id);

    if (this.multiple) {
      if (isExpanded) {
        this.expandedSet.delete(id);
      } else {
        this.expandedSet.add(id);
      }
      this.expandedSet = new Set(this.expandedSet);
    } else {
      this.expandedSet = isExpanded ? new Set() : new Set([id]);
    }

    this.sgToggle.emit({ id, expanded: !isExpanded });
  }

  private isExpanded(id: string): boolean {
    return this.expandedSet.has(id);
  }

  render() {
    return (
      <Host>
        <div class="accordion">
          {this.parsedItems.map(item => (
            <div
              class={{
                'accordion-item': true,
                'accordion-item--expanded': this.isExpanded(item.id),
                'accordion-item--disabled': !!item.disabled,
              }}
            >
              <button
                class="accordion-header"
                onClick={() => this.togglePanel(item.id)}
                aria-expanded={this.isExpanded(item.id) ? 'true' : 'false'}
                aria-controls={`panel-${item.id}`}
                disabled={item.disabled}
              >
                {this.iconPosition === 'left' && (
                  <span class="accordion-icon">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                )}
                {item.icon && <span class="accordion-item-icon" innerHTML={item.icon}></span>}
                <span class="accordion-title">{item.header}</span>
                {this.iconPosition === 'right' && (
                  <span class="accordion-icon">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
              <div class="accordion-panel" id={`panel-${item.id}`} role="region" hidden={!this.isExpanded(item.id)}>
                <div class="accordion-content">
                  {item.content && <p innerHTML={item.content}></p>}
                  <slot name={item.id}></slot>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
