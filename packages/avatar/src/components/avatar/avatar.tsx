import { Component, Prop, State, h, Host } from '@stencil/core';

/**
 * @component sg-avatar
 * @description An avatar component for displaying user images or initials.
 */
@Component({
  tag: 'sg-avatar',
  styleUrl: 'avatar.css',
  shadow: true,
})
export class Avatar {
  /** Image source URL */
  @Prop() src?: string;

  /** Alt text for image */
  @Prop() alt?: string;

  /** User name (used for initials fallback) */
  @Prop() name?: string;

  /** Size variant */
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /** Shape */
  @Prop({ reflect: true }) shape: 'circle' | 'square' | 'rounded' = 'circle';

  /** Background color (when showing initials) */
  @Prop() color?: string;

  /** Show online/offline status */
  @Prop({ reflect: true }) status?: 'online' | 'offline' | 'busy' | 'away';

  /** Show border */
  @Prop({ reflect: true }) bordered: boolean = false;

  @State() imageError: boolean = false;

  private getInitials(): string {
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  private getColorFromName(): string {
    if (this.color) return this.color;
    if (!this.name) return '#94a3b8';

    const colors = [
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#eab308',
      '#84cc16',
      '#22c55e',
      '#10b981',
      '#14b8a6',
      '#06b6d4',
      '#0ea5e9',
      '#3b82f6',
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#d946ef',
      '#ec4899',
    ];

    let hash = 0;
    for (let i = 0; i < this.name.length; i++) {
      hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  private handleImageError = () => {
    this.imageError = true;
  };

  render() {
    const showImage = this.src && !this.imageError;
    const bgColor = !showImage ? this.getColorFromName() : undefined;

    return (
      <Host>
        <div class="avatar" style={bgColor ? { backgroundColor: bgColor } : undefined}>
          {showImage ? <img src={this.src} alt={this.alt || this.name || 'Avatar'} onError={this.handleImageError} /> : <span class="avatar-initials">{this.getInitials()}</span>}
          {this.status && <span class={`avatar-status avatar-status--${this.status}`}></span>}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
