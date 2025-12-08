import { newSpecPage } from '@stencil/core/testing';
import { SgStatsCard } from './stats-card';

describe('sg-stats-card', () => {
  describe('rendering', () => {
    it('renders', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Total Users" value="100"></sg-stats-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-stats-card card-title="Total Users" class="sg-stats-card--primary" color="primary" style="--animation-delay: 0ms;" value="100">
          <mock:shadow-root>
            <div class="stats-card" part="card">
              <div class="stats-border"></div>
              <div class="stats-content">
                <div class="stats-header" part="header">
                  <span class="stats-title">Total Users</span>
                </div>
                <div class="stats-value-wrapper">
                  <span class="stats-value" part="value">100</span>
                </div>
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-stats-card>
      `);
    });

    it('renders with icon', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Users" value="100" icon="users"></sg-stats-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-stats-card card-title="Users" class="sg-stats-card--has-icon sg-stats-card--primary" color="primary" icon="users" style="--animation-delay: 0ms;" value="100">
          <mock:shadow-root>
            <div class="stats-card" part="card">
              <div aria-hidden="true" class="stats-watermark">
                <sg-icon color="currentColor" name="users" size="120"></sg-icon>
              </div>
              <div class="stats-border"></div>
              <div class="stats-content">
                <div class="stats-header" part="header">
                  <span class="stats-title">Users</span>
                </div>
                <div class="stats-value-wrapper">
                  <span class="stats-value" part="value">100</span>
                </div>
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-stats-card>
      `);
    });

    it('renders with trend', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Sales" value="$100" trend="10" trend-positive="true"></sg-stats-card>`,
      });
      expect(page.root).toEqualHtml(`
        <sg-stats-card card-title="Sales" class="sg-stats-card--primary" color="primary" style="--animation-delay: 0ms;" trend="10" trend-positive="true" value="$100">
          <mock:shadow-root>
            <div class="stats-card" part="card">
              <div class="stats-border"></div>
              <div class="stats-content">
                <div class="stats-header" part="header">
                  <span class="stats-title">Sales</span>
                </div>
                <div class="stats-value-wrapper">
                  <span class="stats-value" part="value">$100</span>
                  <span class="trend trend--positive">
                    <span>10</span>
                  </span>
                </div>
                <slot></slot>
              </div>
            </div>
          </mock:shadow-root>
        </sg-stats-card>
      `);
    });
  });

  describe('colors', () => {
    it.each(['primary', 'success', 'warning', 'error', 'info', 'purple', 'cyan'] as const)('renders with %s color', async color => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" color="${color}"></sg-stats-card>`,
      });
      expect(page.root.classList.contains(`sg-stats-card--${color}`)).toBe(true);
    });
  });

  describe('unit prop', () => {
    it('renders with unit suffix', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Speed" value="100" unit="km/h"></sg-stats-card>`,
      });
      const unit = page.root.shadowRoot.querySelector('.stats-unit');
      expect(unit).not.toBeNull();
      expect(unit.textContent).toBe('km/h');
    });
  });

  describe('description prop', () => {
    it('renders with description', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Users" value="100" description="Active this month"></sg-stats-card>`,
      });
      const description = page.root.shadowRoot.querySelector('.stats-description');
      expect(description).not.toBeNull();
      expect(description.textContent).toContain('Active this month');
    });

    it('renders status dot in description', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Users" value="100" description="Active"></sg-stats-card>`,
      });
      const dot = page.root.shadowRoot.querySelector('.status-dot');
      expect(dot).not.toBeNull();
    });
  });

  describe('loading state', () => {
    it('renders loading skeleton when loading', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" loading></sg-stats-card>`,
      });
      expect(page.root.classList.contains('sg-stats-card--loading')).toBe(true);
      const loading = page.root.shadowRoot.querySelector('.stats-loading');
      expect(loading).not.toBeNull();
    });

    it('renders skeleton elements', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" loading></sg-stats-card>`,
      });
      const skeletonTitle = page.root.shadowRoot.querySelector('.skeleton-title');
      const skeletonValue = page.root.shadowRoot.querySelector('.skeleton-value');
      const skeletonDesc = page.root.shadowRoot.querySelector('.skeleton-desc');
      expect(skeletonTitle).not.toBeNull();
      expect(skeletonValue).not.toBeNull();
      expect(skeletonDesc).not.toBeNull();
    });
  });

  describe('trend variations', () => {
    it('renders positive trend with up arrow', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Sales" value="100" trend="+15%"></sg-stats-card>`,
      });
      const trend = page.root.shadowRoot.querySelector('.trend');
      const trendIcon = page.root.shadowRoot.querySelector('.trend-icon');
      expect(trend).not.toBeNull();
      expect(trendIcon).not.toBeNull();
    });

    it('renders "up" trend', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Sales" value="100" trend="up"></sg-stats-card>`,
      });
      const trend = page.root.shadowRoot.querySelector('.trend');
      expect(trend).not.toBeNull();
    });

    it('renders negative trend with down arrow', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Sales" value="100" trend="-10%" trend-positive="false"></sg-stats-card>`,
      });
      const trend = page.root.shadowRoot.querySelector('.trend--negative');
      expect(trend).not.toBeNull();
    });

    it('renders "down" trend', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Sales" value="100" trend="down"></sg-stats-card>`,
      });
      const trend = page.root.shadowRoot.querySelector('.trend');
      expect(trend).not.toBeNull();
    });
  });

  describe('stats breakdown', () => {
    it('renders stats from JSON string', async () => {
      const stats = JSON.stringify([
        { label: 'Active', value: 80 },
        { label: 'Inactive', value: 20 },
      ]);
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Users" value="100" stats='${stats}'></sg-stats-card>`,
      });
      expect(page.root.classList.contains('sg-stats-card--has-stats')).toBe(true);
      const breakdown = page.root.shadowRoot.querySelector('.stats-breakdown');
      expect(breakdown).not.toBeNull();
      const items = page.root.shadowRoot.querySelectorAll('.stat-item');
      expect(items.length).toBe(2);
    });

    it('renders stats with unit', async () => {
      const stats = JSON.stringify([{ label: 'Speed', value: 100, unit: 'km/h' }]);
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" stats='${stats}'></sg-stats-card>`,
      });
      const statUnit = page.root.shadowRoot.querySelector('.stat-unit');
      expect(statUnit).not.toBeNull();
      expect(statUnit.textContent).toBe('km/h');
    });

    it('renders stats with custom color', async () => {
      const stats = JSON.stringify([{ label: 'Success', value: 50, color: 'success' }]);
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" stats='${stats}'></sg-stats-card>`,
      });
      const statValue = page.root.shadowRoot.querySelector('.stat-value');
      expect(statValue.classList.contains('text-success')).toBe(true);
    });

    it('handles invalid JSON gracefully', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" stats="invalid json"></sg-stats-card>`,
      });
      // Should not throw and should have empty stats
      expect(page.rootInstance.parsedStats).toEqual([]);
    });

    it('handles stats as array directly', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100"></sg-stats-card>`,
      });
      // Set stats as array
      page.rootInstance.stats = [
        { label: 'Test1', value: 10 },
        { label: 'Test2', value: 20 },
      ];
      page.rootInstance.componentWillUpdate();
      await page.waitForChanges();

      expect(page.rootInstance.parsedStats.length).toBe(2);
    });
  });

  describe('animation delay', () => {
    it('applies animation delay style', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" animation-delay="200"></sg-stats-card>`,
      });
      expect(page.root.style.getPropertyValue('--animation-delay')).toBe('200ms');
    });
  });

  describe('color classes helper', () => {
    it('returns correct color class for each color', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100" color="success"></sg-stats-card>`,
      });

      // Test internal method
      const colors = ['primary', 'success', 'warning', 'error', 'info', 'purple', 'cyan'];
      for (const color of colors) {
        const result = page.rootInstance.getColorClasses(color);
        expect(result).toBe(`text-${color}`);
      }
    });

    it('returns primary color when undefined', async () => {
      const page = await newSpecPage({
        components: [SgStatsCard],
        html: `<sg-stats-card card-title="Test" value="100"></sg-stats-card>`,
      });

      const result = page.rootInstance.getColorClasses(undefined);
      expect(result).toBe('text-primary');
    });
  });
});
