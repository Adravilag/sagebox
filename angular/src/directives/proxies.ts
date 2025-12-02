/* tslint:disable */
/**
 * Angular Standalone Proxies for SagedUI Web Components
 *
 * IMPORTANTE: Este archivo es MANUAL y no debe ser sobrescrito por Stencil.
 * Los componentes están registrados globalmente via 'import saged-ui' en main.ts.
 *
 * Usage in main.ts:
 *   import 'saged-ui';
 *
 * Usage in components:
 *   import { SgIcon, SgButton } from 'saged-ui/angular';
 */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
} from '@angular/core';

// ============================================================================
// SgArticleEditor
// ============================================================================
@Component({
  selector: 'sg-article-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgArticleEditor {
  protected el: HTMLElement;

  @Input() availableModes?: string[];
  @Input() customTranslations?: Record<string, string>;
  @Input() disabled?: boolean;
  @Input() editorAccent?: string;
  @Input() editorBg?: string;
  @Input() editorBgSecondary?: string;
  @Input() editorBgTertiary?: string;
  @Input() editorBorder?: string;
  @Input() editorBorderRadius?: string;
  @Input() editorFontMono?: string;
  @Input() editorFontSans?: string;
  @Input() editorFontSize?: string;
  @Input() editorText?: string;
  @Input() editorTextSecondary?: string;
  @Input() enableExternalPreview?: boolean;
  @Input() locale?: string;
  @Input() minHeight?: string;
  @Input() mode?: string;
  @Input() placeholder?: string;
  @Input() readonly?: boolean;
  @Input() showWordCount?: boolean;
  @Input() spellcheck?: boolean;
  @Input() value?: string;

  @Output() editorChange = new EventEmitter<CustomEvent>();
  @Output() editorModeChange = new EventEmitter<CustomEvent>();
  @Output() mediaLibraryOpen = new EventEmitter<CustomEvent<void>>();
  @Output() mediaInsert = new EventEmitter<CustomEvent>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgBadge
// ============================================================================
@Component({
  selector: 'sg-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgBadge {
  protected el: HTMLElement;

  @Input() clickable?: boolean;
  @Input() dot?: boolean;
  @Input() icon?: string;
  @Input() outlined?: boolean;
  @Input() pill?: boolean;
  @Input() pulse?: boolean;
  @Input() size?: 'sm' | 'md' | 'lg';
  @Input() soft?: boolean;
  @Input() variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgButton
// ============================================================================
@Component({
  selector: 'sg-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgButton {
  protected el: HTMLElement;

  @Input() ariaLabel?: string;
  @Input() disabled?: boolean;
  @Input() leadingIcon?: string;
  @Input() loading?: boolean;
  @Input() loadingText?: string;
  @Input() shape?: 'default' | 'rounded' | 'pill' | 'square';
  @Input() size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input() trailingIcon?: string;
  @Input() type?: 'button' | 'submit' | 'reset';
  @Input() variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'link';

  @Output() sgClick = new EventEmitter<CustomEvent<MouseEvent>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgDropdown
// ============================================================================
@Component({
  selector: 'sg-dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgDropdown {
  protected el: HTMLElement;

  @Input() align?: 'start' | 'center' | 'end';
  @Input() closeOnSelect?: boolean;
  @Input() disabled?: boolean;
  @Input() maxHeight?: string;
  @Input() minWidth?: string;
  @Input() open?: boolean;
  @Input() position?: 'bottom' | 'top' | 'left' | 'right';
  @Input() showBackdrop?: boolean;
  @Input() size?: 'sm' | 'md' | 'lg';

  @Output() sgOpen = new EventEmitter<CustomEvent<void>>();
  @Output() sgClose = new EventEmitter<CustomEvent<void>>();
  @Output() sgToggle = new EventEmitter<CustomEvent<boolean>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgIcon
// ============================================================================
@Component({
  selector: 'sg-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgIcon {
  protected el: HTMLElement;

  @Input() ariaLabel?: string;
  @Input() color?: string;
  @Input() decorative?: boolean;
  @Input() fill?: string;
  @Input() flipH?: boolean;
  @Input() flipV?: boolean;
  @Input() height?: string;
  @Input() name?: string;
  @Input() rotate?: number;
  @Input() size?: string;
  @Input() spin?: boolean;
  @Input() src?: string;
  @Input() strokeWidth?: string;
  @Input() width?: string;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgSkeleton
// ============================================================================
@Component({
  selector: 'sg-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgSkeleton {
  protected el: HTMLElement;

  @Input() animation?: 'pulse' | 'wave' | 'none';
  @Input() height?: string;
  @Input() variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  @Input() width?: string;

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

// ============================================================================
// SgThemeToggle
// ============================================================================
@Component({
  selector: 'sg-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class SgThemeToggle {
  protected el: HTMLElement;

  @Input() theme?: 'light' | 'dark' | 'system';
  @Input() size?: 'sm' | 'md' | 'lg';

  @Output() themeChange = new EventEmitter<CustomEvent<string>>();

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


