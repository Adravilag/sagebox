import { Component, Prop, State, Event, EventEmitter, Element, h, Host, Watch, Method } from '@stencil/core';

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Tab label */
  label: string;
  /** Optional icon (emoji or HTML) */
  icon?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Badge count */
  badge?: number;
}

/**
 * @component sg-tabs
 * @description A flexible tabs component with horizontal/vertical orientation and multiple variants.
 *
 * @example
 * ```html
 * <sg-tabs
 *   tabs='[{"id":"tab1","label":"General"},{"id":"tab2","label":"Settings"}]'
 *   active-tab="tab1"
 * >
 *   <div slot="tab1">General content</div>
 *   <div slot="tab2">Settings content</div>
 * </sg-tabs>
 * ```
 */
@Component({
  tag: 'sg-tabs',
  styleUrl: 'tabs.css',
  shadow: true,
})
export class Tabs {
  @Element() el!: HTMLElement;

  // ═══════════════════════════════════════════════════════════════════════════
  // PROPS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Tab items configuration */
  @Prop() tabs: TabItem[] | string = [];

  /** Currently active tab ID */
  @Prop({ mutable: true }) activeTab?: string;

  /** Tabs orientation */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Visual variant */
  @Prop({ reflect: true }) variant: 'default' | 'pills' | 'underline' | 'bordered' = 'default';

  /** Size */
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';

  /** Full width tabs */
  @Prop({ reflect: true }) fullWidth: boolean = false;

  /** Enable keyboard navigation */
  @Prop() keyboard: boolean = true;

  /** Lazy load tab content */
  @Prop() lazy: boolean = false;

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════

  @State() parsedTabs: TabItem[] = [];
  @State() loadedTabs: Set<string> = new Set();

  // ═══════════════════════════════════════════════════════════════════════════
  // EVENTS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Emitted when active tab changes */
  @Event() sgTabChange!: EventEmitter<{ tabId: string; tab: TabItem }>;

  // ═══════════════════════════════════════════════════════════════════════════
  // WATCHERS
  // ═══════════════════════════════════════════════════════════════════════════

  @Watch('tabs')
  watchTabs() {
    this.parseTabs();
  }

  @Watch('activeTab')
  watchActiveTab() {
    if (this.activeTab) {
      this.loadedTabs.add(this.activeTab);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ═══════════════════════════════════════════════════════════════════════════

  componentWillLoad() {
    this.parseTabs();
    if (!this.activeTab && this.parsedTabs.length > 0) {
      const firstEnabled = this.parsedTabs.find(t => !t.disabled);
      if (firstEnabled) {
        this.activeTab = firstEnabled.id;
      }
    }
    if (this.activeTab) {
      this.loadedTabs.add(this.activeTab);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  /** Select a tab by ID */
  @Method()
  async selectTab(tabId: string): Promise<void> {
    const tab = this.parsedTabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.handleTabClick(tab);
    }
  }

  /** Get active tab info */
  @Method()
  async getActiveTab(): Promise<TabItem | undefined> {
    return this.parsedTabs.find(t => t.id === this.activeTab);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE METHODS
  // ═══════════════════════════════════════════════════════════════════════════

  private parseTabs() {
    if (typeof this.tabs === 'string') {
      try {
        this.parsedTabs = JSON.parse(this.tabs);
      } catch {
        this.parsedTabs = [];
      }
    } else {
      this.parsedTabs = this.tabs;
    }
  }

  private handleTabClick(tab: TabItem) {
    if (tab.disabled) return;
    this.activeTab = tab.id;
    this.loadedTabs.add(tab.id);
    this.sgTabChange.emit({ tabId: tab.id, tab });
  }

  private handleKeyDown(event: KeyboardEvent, index: number) {
    if (!this.keyboard) return;

    const isHorizontal = this.orientation === 'horizontal';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    let newIndex = index;

    if (event.key === prevKey) {
      newIndex = index - 1;
      if (newIndex < 0) newIndex = this.parsedTabs.length - 1;
    } else if (event.key === nextKey) {
      newIndex = index + 1;
      if (newIndex >= this.parsedTabs.length) newIndex = 0;
    } else if (event.key === 'Home') {
      newIndex = 0;
    } else if (event.key === 'End') {
      newIndex = this.parsedTabs.length - 1;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleTabClick(this.parsedTabs[index]);
      return;
    } else {
      return;
    }

    event.preventDefault();

    // Skip disabled tabs
    while (this.parsedTabs[newIndex]?.disabled) {
      newIndex = event.key === prevKey ? newIndex - 1 : newIndex + 1;
      if (newIndex < 0) newIndex = this.parsedTabs.length - 1;
      if (newIndex >= this.parsedTabs.length) newIndex = 0;
      if (newIndex === index) break;
    }

    const tabButtons = this.el.shadowRoot?.querySelectorAll('.tab-button');
    (tabButtons?.[newIndex] as HTMLElement)?.focus();
  }

  private shouldRenderPanel(tabId: string): boolean {
    if (!this.lazy) return true;
    return this.loadedTabs.has(tabId);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  render() {
    return (
      <Host>
        <div class="tabs-wrapper">
          <div class="tabs-list" role="tablist" aria-orientation={this.orientation}>
            {this.parsedTabs.map((tab, index) => (
              <button
                class={{
                  'tab-button': true,
                  'tab-button--active': this.activeTab === tab.id,
                  'tab-button--disabled': !!tab.disabled,
                }}
                role="tab"
                aria-selected={this.activeTab === tab.id ? 'true' : 'false'}
                aria-controls={`panel-${tab.id}`}
                aria-disabled={tab.disabled ? 'true' : 'false'}
                tabIndex={this.activeTab === tab.id ? 0 : -1}
                onClick={() => this.handleTabClick(tab)}
                onKeyDown={e => this.handleKeyDown(e, index)}
                disabled={tab.disabled}
              >
                {tab.icon && <span class="tab-icon" innerHTML={tab.icon}></span>}
                <span class="tab-label">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && <span class="tab-badge">{tab.badge > 99 ? '99+' : tab.badge}</span>}
              </button>
            ))}
          </div>

          <div class="tabs-panels">
            {this.parsedTabs.map(tab => (
              <div
                class={{
                  'tab-panel': true,
                  'tab-panel--active': this.activeTab === tab.id,
                }}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={tab.id}
                hidden={this.activeTab !== tab.id}
              >
                {this.shouldRenderPanel(tab.id) && <slot name={tab.id}></slot>}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
