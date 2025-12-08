import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SgSelect, SelectOption } from './select';

describe('sg-select', () => {
  // Helper para crear opciones de test
  const createTestOptions = (): SelectOption[] => [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'es', label: 'Spain' },
    { value: 'fr', label: 'France', disabled: true },
    { value: 'de', label: 'Germany', icon: 'mdi:flag', description: 'European country' },
  ];

  // Helper para crear página con opciones
  const createSelectWithOptions = async (extraHtml = ''): Promise<SpecPage> => {
    const options = JSON.stringify(createTestOptions());
    return newSpecPage({
      components: [SgSelect],
      html: `<sg-select options='${options}' ${extraHtml}></sg-select>`,
    });
  };

  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      expect(page.root).not.toBeNull();
      expect(page.root!.tagName.toLowerCase()).toBe('sg-select');
      expect(page.rootInstance.size).toBe('md');
      expect(page.rootInstance.variant).toBe('default');
      expect(page.rootInstance.validationState).toBe('default');
      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should render with label', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select label="Country"></sg-select>`,
      });

      expect(page.rootInstance.label).toBe('Country');
      const label = page.root!.shadowRoot!.querySelector('.select-label');
      expect(label).not.toBeNull();
      expect(label!.textContent).toContain('Country');
    });

    it('should render required mark with label', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select label="Country" required></sg-select>`,
      });

      const requiredMark = page.root!.shadowRoot!.querySelector('.required-mark');
      expect(requiredMark).not.toBeNull();
      expect(requiredMark!.textContent).toBe('*');
    });

    it('should render with placeholder', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select placeholder="Select an option"></sg-select>`,
      });

      expect(page.rootInstance.placeholder).toBe('Select an option');
      const placeholder = page.root!.shadowRoot!.querySelector('.select-placeholder');
      expect(placeholder).not.toBeNull();
    });

    it('should render with helper text', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select helper-text="Choose wisely"></sg-select>`,
      });

      expect(page.rootInstance.helperText).toBe('Choose wisely');
      const helper = page.root!.shadowRoot!.querySelector('.select-helper');
      expect(helper).not.toBeNull();
      expect(helper!.textContent).toContain('Choose wisely');
    });

    it('should render with error message when validation state is error', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select validation-state="error" error-message="Required field"></sg-select>`,
      });

      expect(page.rootInstance.validationState).toBe('error');
      expect(page.rootInstance.errorMessage).toBe('Required field');
      const helper = page.root!.shadowRoot!.querySelector('.select-helper--error');
      expect(helper).not.toBeNull();
      expect(helper!.textContent).toContain('Required field');
    });

    it('should show error message over helper text when in error state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select validation-state="error" error-message="Error!" helper-text="Helper"></sg-select>`,
      });

      const helper = page.root!.shadowRoot!.querySelector('.select-helper');
      expect(helper!.textContent).toContain('Error!');
      expect(helper!.textContent).not.toContain('Helper');
    });

    it('should apply host classes correctly', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select size="lg" variant="filled" validation-state="success"></sg-select>`,
      });

      expect(page.root!.classList.contains('sg-select--lg')).toBe(true);
      expect(page.root!.classList.contains('sg-select--filled')).toBe(true);
      expect(page.root!.classList.contains('sg-select--success')).toBe(true);
    });
  });

  describe('sizes', () => {
    it('should render small size', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select size="sm"></sg-select>`,
      });

      expect(page.rootInstance.size).toBe('sm');
    });

    it('should render medium size (default)', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      expect(page.rootInstance.size).toBe('md');
    });

    it('should render large size', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select size="lg"></sg-select>`,
      });

      expect(page.rootInstance.size).toBe('lg');
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      expect(page.rootInstance.variant).toBe('default');
    });

    it('should render filled variant', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select variant="filled"></sg-select>`,
      });

      expect(page.rootInstance.variant).toBe('filled');
    });

    it('should render outline variant', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select variant="outline"></sg-select>`,
      });

      expect(page.rootInstance.variant).toBe('outline');
    });

    it('should render underline variant', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select variant="underline"></sg-select>`,
      });

      expect(page.rootInstance.variant).toBe('underline');
    });
  });

  describe('states', () => {
    it('should render disabled state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select disabled></sg-select>`,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });

    it('should render required state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select required></sg-select>`,
      });

      expect(page.rootInstance.required).toBe(true);
    });

    it('should render loading state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select loading></sg-select>`,
      });

      expect(page.rootInstance.loading).toBe(true);
    });
  });

  describe('options via JSON string', () => {
    it('should parse options from JSON string', async () => {
      const options = JSON.stringify([
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
      ]);

      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select options='${options}'></sg-select>`,
      });

      expect(page.rootInstance.internalOptions.length).toBe(2);
      expect(page.rootInstance.internalOptions[0].value).toBe('us');
      expect(page.rootInstance.internalOptions[0].label).toBe('United States');
    });

    it('should handle invalid JSON gracefully', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select options='invalid-json'></sg-select>`,
      });

      expect(page.rootInstance.internalOptions).toEqual([]);
    });

    it('should handle empty options string', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select options=''></sg-select>`,
      });

      expect(page.rootInstance.internalOptions).toEqual([]);
    });

    it('should parse options with all properties', async () => {
      const options = JSON.stringify([{ value: 'test', label: 'Test', disabled: true, icon: 'mdi:star', description: 'A test option', data: { custom: true } }]);

      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select options='${options}'></sg-select>`,
      });

      const opt = page.rootInstance.internalOptions[0];
      expect(opt.disabled).toBe(true);
      expect(opt.icon).toBe('mdi:star');
      expect(opt.description).toBe('A test option');
      expect(opt.data).toEqual({ custom: true });
    });

    it('should update options when prop changes', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      expect(page.rootInstance.internalOptions).toEqual([]);

      const newOptions = JSON.stringify([{ value: 'new', label: 'New Option' }]);
      page.root!.setAttribute('options', newOptions);
      await page.waitForChanges();

      expect(page.rootInstance.internalOptions.length).toBe(1);
      expect(page.rootInstance.internalOptions[0].value).toBe('new');
    });
  });

  describe('dropdown behavior', () => {
    it('should open dropdown via open() method', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      expect(page.rootInstance.isOpen).toBe(false);

      await page.rootInstance.open();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
      expect(page.root!.classList.contains('sg-select--open')).toBe(true);
    });

    it('should close dropdown via close() method', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
      expect(page.root!.classList.contains('sg-select--open')).toBe(false);
    });

    it('should toggle dropdown via toggle() method', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(true);

      await page.rootInstance.toggle();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should not open when disabled', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select disabled></sg-select>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should emit sgOpen event', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const openSpy = jest.fn();
      page.root!.addEventListener('sgOpen', openSpy);

      await page.rootInstance.open();
      await page.waitForChanges();

      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit sgClose event', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const closeSpy = jest.fn();
      page.root!.addEventListener('sgClose', closeSpy);

      await page.rootInstance.open();
      await page.waitForChanges();

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should reset search query when closing', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select searchable></sg-select>`,
      });

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'test';
      await page.waitForChanges();

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.searchQuery).toBe('');
    });

    it('should reset highlighted index when opening', async () => {
      const page = await createSelectWithOptions();

      page.rootInstance.highlightedIndex = 2;
      await page.rootInstance.open();
      await page.waitForChanges();

      expect(page.rootInstance.highlightedIndex).toBe(-1);
    });

    it('should render dropdown content when open', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const dropdown = page.root!.shadowRoot!.querySelector('.select-dropdown');
      expect(dropdown).not.toBeNull();

      const options = page.root!.shadowRoot!.querySelectorAll('.select-option');
      expect(options.length).toBe(5); // All test options
    });
  });

  describe('clear functionality', () => {
    it('should clear value via clear() method', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select value="test"></sg-select>`,
      });

      expect(page.rootInstance.value).toBe('test');

      await page.rootInstance.clear();
      await page.waitForChanges();

      expect(page.rootInstance.value).toBeUndefined();
    });

    it('should emit sgChange with empty value when clearing single select', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select value="test"></sg-select>`,
      });

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      await page.rootInstance.clear();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe('');
    });

    it('should emit sgChange with empty array when clearing multi-select', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select multiple></sg-select>`,
      });

      page.rootInstance.values = ['a', 'b'];
      await page.waitForChanges();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      await page.rootInstance.clear();
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toEqual([]);
    });

    it('should render clear button when clearable and has value', async () => {
      const page = await createSelectWithOptions('clearable value="us"');

      const clearBtn = page.root!.shadowRoot!.querySelector('.select-clear');
      expect(clearBtn).not.toBeNull();
    });

    it('should not render clear button when disabled', async () => {
      const page = await createSelectWithOptions('clearable value="us" disabled');

      const clearBtn = page.root!.shadowRoot!.querySelector('.select-clear');
      expect(clearBtn).toBeNull();
    });

    it('should not render clear button without value', async () => {
      const page = await createSelectWithOptions('clearable');

      const clearBtn = page.root!.shadowRoot!.querySelector('.select-clear');
      expect(clearBtn).toBeNull();
    });
  });

  describe('multi-select', () => {
    it('should support multiple selection mode', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select multiple></sg-select>`,
      });

      expect(page.rootInstance.multiple).toBe(true);
      expect(page.rootInstance.values).toEqual([]);
      expect(page.root!.classList.contains('sg-select--multiple')).toBe(true);
    });

    it('should clear all values in multi-select mode', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select multiple></sg-select>`,
      });

      page.rootInstance.values = ['a', 'b'];
      await page.waitForChanges();

      await page.rootInstance.clear();
      await page.waitForChanges();

      expect(page.rootInstance.values).toEqual([]);
    });

    it('should render tags for selected values', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us', 'uk'];
      await page.waitForChanges();

      const tags = page.root!.shadowRoot!.querySelectorAll('.select-tag');
      expect(tags.length).toBe(2);
    });

    it('should render remove button on tags', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us'];
      await page.waitForChanges();

      const removeBtn = page.root!.shadowRoot!.querySelector('.select-tag-remove');
      expect(removeBtn).not.toBeNull();
    });

    it('should apply has-value class when values are selected', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us'];
      await page.waitForChanges();

      expect(page.root!.classList.contains('sg-select--has-value')).toBe(true);
    });

    it('should show checkboxes in multi-select mode', async () => {
      const page = await createSelectWithOptions('multiple');

      await page.rootInstance.open();
      await page.waitForChanges();

      const checkboxes = page.root!.shadowRoot!.querySelectorAll('.select-option-checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should mark selected options with check icon', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us'];
      await page.rootInstance.open();
      await page.waitForChanges();

      const selectedOption = page.root!.shadowRoot!.querySelector('.select-option--selected');
      expect(selectedOption).not.toBeNull();
    });
  });

  describe('searchable', () => {
    it('should support searchable mode', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select searchable></sg-select>`,
      });

      expect(page.rootInstance.searchable).toBe(true);
      expect(page.root!.classList.contains('sg-select--searchable')).toBe(true);
    });

    it('should render search input when open and searchable', async () => {
      const page = await createSelectWithOptions('searchable');

      await page.rootInstance.open();
      await page.waitForChanges();

      const searchInput = page.root!.shadowRoot!.querySelector('.select-search');
      expect(searchInput).not.toBeNull();
    });

    it('should filter options by search query', async () => {
      const page = await createSelectWithOptions('searchable');

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'United';
      await page.waitForChanges();

      // getFilteredOptions should filter to US and UK
      const filtered = page.rootInstance.getFilteredOptions();
      expect(filtered.length).toBe(2);
      expect(filtered.every((opt: SelectOption) => opt.label.includes('United'))).toBe(true);
    });

    it('should filter by value as well as label', async () => {
      const page = await createSelectWithOptions('searchable');

      page.rootInstance.searchQuery = 'es';
      const filtered = page.rootInstance.getFilteredOptions();

      expect(filtered.some((opt: SelectOption) => opt.value === 'es')).toBe(true);
    });

    it('should filter by description', async () => {
      const page = await createSelectWithOptions('searchable');

      page.rootInstance.searchQuery = 'European';
      const filtered = page.rootInstance.getFilteredOptions();

      expect(filtered.length).toBe(1);
      expect(filtered[0].value).toBe('de');
    });

    it('should show no results message when no options match', async () => {
      const page = await createSelectWithOptions('searchable');

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'xyz123nonexistent';
      await page.waitForChanges();

      const empty = page.root!.shadowRoot!.querySelector('.select-empty');
      expect(empty).not.toBeNull();
    });

    it('should use custom noResultsText', async () => {
      const page = await createSelectWithOptions('searchable no-results-text="Nothing here"');

      expect(page.rootInstance.noResultsText).toBe('Nothing here');
    });
  });

  describe('async loading', () => {
    it('should support async mode', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select async></sg-select>`,
      });

      expect(page.rootInstance.async).toBe(true);
    });

    it('should render loading indicator when loading', async () => {
      const page = await createSelectWithOptions('loading');

      await page.rootInstance.open();
      await page.waitForChanges();

      const loading = page.root!.shadowRoot!.querySelector('.select-loading');
      expect(loading).not.toBeNull();
    });

    it('should use custom loadingText', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select loading-text="Please wait..."></sg-select>`,
      });

      expect(page.rootInstance.loadingText).toBe('Please wait...');
    });

    it('should update searchQuery when handling search input', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select async searchable search-delay="100"></sg-select>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      // Simulate search input
      const inputEvent = { target: { value: 'test' } } as unknown as InputEvent;
      page.rootInstance.handleSearchInput(inputEvent);

      expect(page.rootInstance.searchQuery).toBe('test');
      expect(page.rootInstance.highlightedIndex).toBe(0);
    });

    it('should support searchDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select search-delay="500"></sg-select>`,
      });

      expect(page.rootInstance.searchDelay).toBe(500);
    });
  });

  describe('creatable', () => {
    it('should support creatable mode', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select creatable></sg-select>`,
      });

      expect(page.rootInstance.creatable).toBe(true);
    });

    it('should show create option when search has no matches', async () => {
      const page = await createSelectWithOptions('creatable searchable');

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'NewCountry';
      await page.waitForChanges();

      const createOption = page.root!.shadowRoot!.querySelector('.select-option--create');
      expect(createOption).not.toBeNull();
    });

    it('should use custom createText template', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select creatable create-text="Add {query} as new option"></sg-select>`,
      });

      expect(page.rootInstance.createText).toBe('Add {query} as new option');
    });

    it('should emit sgCreate event when creating option', async () => {
      const page = await createSelectWithOptions('creatable searchable');

      const createSpy = jest.fn();
      page.root!.addEventListener('sgCreate', createSpy);

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'NewValue';

      // Manually trigger create
      page.rootInstance.createOption('NewValue');
      await page.waitForChanges();

      expect(createSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: { value: 'NewValue' },
        }),
      );
    });

    it('should add created option to internal options', async () => {
      const page = await createSelectWithOptions('creatable searchable');

      const initialCount = page.rootInstance.internalOptions.length;

      page.rootInstance.createOption('NewOption');
      await page.waitForChanges();

      expect(page.rootInstance.internalOptions.length).toBe(initialCount + 1);
      expect(page.rootInstance.internalOptions.some((opt: SelectOption) => opt.value === 'NewOption')).toBe(true);
    });
  });

  describe('validation states', () => {
    it('should apply success validation state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select validation-state="success"></sg-select>`,
      });

      expect(page.rootInstance.validationState).toBe('success');
    });

    it('should apply warning validation state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select validation-state="warning"></sg-select>`,
      });

      expect(page.rootInstance.validationState).toBe('warning');
    });

    it('should apply error validation state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select validation-state="error"></sg-select>`,
      });

      expect(page.rootInstance.validationState).toBe('error');
    });
  });

  describe('props configuration', () => {
    it('should support closeOnSelect prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select close-on-select="false"></sg-select>`,
      });

      expect(page.rootInstance.closeOnSelect).toBe(false);
    });

    it('should support maxSelections prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select multiple max-selections="3"></sg-select>`,
      });

      expect(page.rootInstance.maxSelections).toBe(3);
    });

    it('should support searchDelay prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select search-delay="500"></sg-select>`,
      });

      expect(page.rootInstance.searchDelay).toBe(500);
    });

    it('should support clearable prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select clearable></sg-select>`,
      });

      expect(page.rootInstance.clearable).toBe(true);
    });

    it('should support noResultsText prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select no-results-text="Nothing found"></sg-select>`,
      });

      expect(page.rootInstance.noResultsText).toBe('Nothing found');
    });
  });

  describe('accessibility', () => {
    it('should have combobox role on trigger', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      expect(trigger!.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-haspopup attribute', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      expect(trigger!.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have listbox role on dropdown', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      // Open dropdown first to ensure it's rendered
      await page.rootInstance.open();
      await page.waitForChanges();

      const dropdown = page.root!.shadowRoot!.querySelector('[role="listbox"]');
      expect(dropdown).not.toBeNull();
    });

    it('should have aria-expanded reflecting open state', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      expect(trigger!.getAttribute('aria-expanded')).toBe('false');

      await page.rootInstance.open();
      await page.waitForChanges();

      expect(trigger!.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls linking to listbox', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      await page.rootInstance.open();
      await page.waitForChanges();

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      const listboxId = trigger!.getAttribute('aria-controls');
      const listbox = page.root!.shadowRoot!.querySelector(`#${listboxId}`);

      expect(listbox).not.toBeNull();
      expect(listbox!.getAttribute('role')).toBe('listbox');
    });

    it('should have tabindex on trigger', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      expect(trigger!.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when disabled', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select disabled></sg-select>`,
      });

      const trigger = page.root!.shadowRoot!.querySelector('.select-trigger');
      expect(trigger!.getAttribute('tabindex')).toBe('-1');
    });

    it('should have aria-multiselectable on listbox in multi-select mode', async () => {
      const page = await createSelectWithOptions('multiple');

      await page.rootInstance.open();
      await page.waitForChanges();

      const listbox = page.root!.shadowRoot!.querySelector('[role="listbox"]');
      expect(listbox!.getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should have option role on each option', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const options = page.root!.shadowRoot!.querySelectorAll('[role="option"]');
      expect(options.length).toBe(5);
    });

    it('should have aria-selected on selected option', async () => {
      const page = await createSelectWithOptions('value="us"');

      await page.rootInstance.open();
      await page.waitForChanges();

      const selectedOption = page.root!.shadowRoot!.querySelector('[aria-selected="true"]');
      expect(selectedOption).not.toBeNull();
    });

    it('should have aria-disabled on disabled options', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const disabledOption = page.root!.shadowRoot!.querySelector('[aria-disabled="true"]');
      expect(disabledOption).not.toBeNull();
    });

    it('should have aria-label on clear button', async () => {
      const page = await createSelectWithOptions('clearable value="us"');

      const clearBtn = page.root!.shadowRoot!.querySelector('.select-clear');
      expect(clearBtn!.getAttribute('aria-label')).toBe('Clear selection');
    });

    it('should have aria-label on tag remove buttons', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us'];
      await page.waitForChanges();

      const removeBtn = page.root!.shadowRoot!.querySelector('.select-tag-remove');
      expect(removeBtn!.getAttribute('aria-label')).toContain('Remove');
    });

    it('should have label element for accessibility', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select label="Country"></sg-select>`,
      });

      const label = page.root!.shadowRoot!.querySelector('label.select-label');
      expect(label).not.toBeNull();
      expect(label!.textContent).toContain('Country');
    });
  });

  describe('keyboard navigation', () => {
    it('should open dropdown on Enter key', async () => {
      const page = await createSelectWithOptions();

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
    });

    it('should open dropdown on ArrowDown key', async () => {
      const page = await createSelectWithOptions();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
    });

    it('should close dropdown on Escape key', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should close dropdown on Tab key', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'Tab' });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should navigate down with ArrowDown key', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      expect(page.rootInstance.highlightedIndex).toBe(0);

      page.rootInstance.handleKeyDown(event);
      expect(page.rootInstance.highlightedIndex).toBe(1);
    });

    it('should navigate up with ArrowUp key', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 2;
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      expect(page.rootInstance.highlightedIndex).toBe(1);
    });

    it('should not navigate past first option', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 0;
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      expect(page.rootInstance.highlightedIndex).toBe(0);
    });

    it('should not navigate past last option', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 4; // Last option (5 options, 0-indexed)
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      expect(page.rootInstance.highlightedIndex).toBe(4);
    });

    it('should not respond to keyboard when disabled', async () => {
      const page = await createSelectWithOptions('disabled');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should remove last value on Backspace in multi-select', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us', 'uk'];
      page.rootInstance.searchQuery = '';
      await page.waitForChanges();

      const event = new KeyboardEvent('keydown', { key: 'Backspace' });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(page.rootInstance.values).toEqual(['us']);
    });
  });

  describe('option selection', () => {
    it('should display selected value', async () => {
      const page = await createSelectWithOptions('value="us"');

      const displayValue = page.root!.shadowRoot!.querySelector('.select-value');
      expect(displayValue!.textContent).toBe('United States');
    });

    it('should display value as fallback when option not found', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select value="unknown"></sg-select>`,
      });

      expect(page.rootInstance.getDisplayValue()).toBe('unknown');
    });

    it('should mark option as selected visually', async () => {
      const page = await createSelectWithOptions('value="uk"');

      await page.rootInstance.open();
      await page.waitForChanges();

      const selectedOption = page.root!.shadowRoot!.querySelector('.select-option--selected');
      expect(selectedOption).not.toBeNull();
    });

    it('should mark highlighted option visually', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 1;
      await page.waitForChanges();

      const highlighted = page.root!.shadowRoot!.querySelector('.select-option--highlighted');
      expect(highlighted).not.toBeNull();
    });

    it('should mark disabled options visually', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const disabled = page.root!.shadowRoot!.querySelector('.select-option--disabled');
      expect(disabled).not.toBeNull();
    });

    it('should render option with icon', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const icon = page.root!.shadowRoot!.querySelector('.select-option-icon');
      expect(icon).not.toBeNull();
    });

    it('should render option with description', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      const description = page.root!.shadowRoot!.querySelector('.select-option-description');
      expect(description).not.toBeNull();
    });
  });

  describe('maxSelections', () => {
    it('should support maxSelections prop', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select multiple max-selections="2"></sg-select>`,
      });

      expect(page.rootInstance.maxSelections).toBe(2);
    });

    it('should prevent selecting more than maxSelections', async () => {
      const page = await createSelectWithOptions('multiple max-selections="2"');

      // Select first two options
      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      page.rootInstance.selectOption({ value: 'uk', label: 'United Kingdom' });
      await page.waitForChanges();

      expect(page.rootInstance.values.length).toBe(2);

      // Try to select a third - should be blocked
      page.rootInstance.selectOption({ value: 'es', label: 'Spain' });
      await page.waitForChanges();

      expect(page.rootInstance.values.length).toBe(2);
      expect(page.rootInstance.values).not.toContain('es');
    });
  });

  describe('selectOption behavior', () => {
    it('should not select disabled options', async () => {
      const page = await createSelectWithOptions();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      page.rootInstance.selectOption({ value: 'fr', label: 'France', disabled: true });
      await page.waitForChanges();

      expect(changeSpy).not.toHaveBeenCalled();
      expect(page.rootInstance.value).toBeUndefined();
    });

    it('should select option and emit sgChange with option data', async () => {
      const page = await createSelectWithOptions();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toBe('us');
      expect(changeSpy.mock.calls[0][0].detail.option.label).toBe('United States');
    });

    it('should close dropdown after selection when closeOnSelect is true', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(true);

      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should keep dropdown open when closeOnSelect is false', async () => {
      const page = await createSelectWithOptions('close-on-select="false"');

      await page.rootInstance.open();
      await page.waitForChanges();

      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
    });

    it('should toggle selection in multi-select mode', async () => {
      const page = await createSelectWithOptions('multiple');

      // Select
      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();
      expect(page.rootInstance.values).toContain('us');

      // Deselect by selecting again
      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();
      expect(page.rootInstance.values).not.toContain('us');
    });

    it('should emit sgChange with array in multi-select mode', async () => {
      const page = await createSelectWithOptions('multiple');

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      page.rootInstance.selectOption({ value: 'us', label: 'United States' });
      await page.waitForChanges();

      expect(changeSpy.mock.calls[0][0].detail.value).toEqual(['us']);
    });
  });

  describe('removeValue behavior', () => {
    it('should remove value from multi-select', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us', 'uk', 'es'];
      await page.waitForChanges();

      page.rootInstance.removeValue('uk');
      await page.waitForChanges();

      expect(page.rootInstance.values).toEqual(['us', 'es']);
    });

    it('should emit sgChange when removing value', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us', 'uk'];
      await page.waitForChanges();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      page.rootInstance.removeValue('us');
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toEqual(['uk']);
    });
  });

  describe('keyboard selection', () => {
    it('should select highlighted option on Enter', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 0; // First option (US)
      await page.waitForChanges();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalled();
      expect(page.rootInstance.value).toBe('us');
    });

    it('should not select disabled option on Enter', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      page.rootInstance.highlightedIndex = 3; // France (disabled)
      await page.waitForChanges();

      const changeSpy = jest.fn();
      page.root!.addEventListener('sgChange', changeSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should create option on Enter in creatable mode with search query', async () => {
      const page = await createSelectWithOptions('creatable searchable');

      await page.rootInstance.open();
      page.rootInstance.searchQuery = 'NewOption';
      page.rootInstance.highlightedIndex = -1; // No option highlighted
      await page.waitForChanges();

      const createSpy = jest.fn();
      page.root!.addEventListener('sgCreate', createSpy);

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      Object.defineProperty(event, 'preventDefault', { value: jest.fn() });

      page.rootInstance.handleKeyDown(event);
      await page.waitForChanges();

      expect(createSpy).toHaveBeenCalled();
    });
  });

  describe('single select check icon', () => {
    it('should render check icon for selected option in single select', async () => {
      const page = await createSelectWithOptions('value="us"');

      await page.rootInstance.open();
      await page.waitForChanges();

      const checkIcon = page.root!.shadowRoot!.querySelector('.select-option--selected .select-option-check');
      expect(checkIcon).not.toBeNull();
    });
  });

  describe('document click handler', () => {
    it('should close dropdown when clicking outside', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(true);

      // Simulate click outside
      const outsideEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(outsideEvent, 'target', { value: document.body });

      page.rootInstance.handleDocumentClick(outsideEvent);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should not close dropdown when clicking inside', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      // Simulate click inside - element contains the target
      const insideEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(insideEvent, 'target', { value: page.root });

      page.rootInstance.handleDocumentClick(insideEvent);
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
    });
  });

  describe('trigger click handler', () => {
    it('should toggle dropdown on trigger click', async () => {
      const page = await createSelectWithOptions();

      expect(page.rootInstance.isOpen).toBe(false);

      page.rootInstance.handleTriggerClick();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);

      page.rootInstance.handleTriggerClick();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should not toggle when disabled', async () => {
      const page = await createSelectWithOptions('disabled');

      page.rootInstance.handleTriggerClick();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });
  });

  describe('mouse interaction on options', () => {
    it('should update highlightedIndex on mouse enter', async () => {
      const page = await createSelectWithOptions();

      await page.rootInstance.open();
      await page.waitForChanges();

      // Simulate mouseenter on option by setting highlighted index directly
      page.rootInstance.highlightedIndex = 2;
      await page.waitForChanges();

      expect(page.rootInstance.highlightedIndex).toBe(2);
    });
  });

  describe('search input in multi-select', () => {
    it('should hide placeholder when values selected in multi-select searchable', async () => {
      const page = await createSelectWithOptions('multiple searchable placeholder="Select..."');

      page.rootInstance.values = ['us'];
      await page.rootInstance.open();
      await page.waitForChanges();

      const searchInput = page.root!.shadowRoot!.querySelector('.select-search') as HTMLInputElement;
      expect(searchInput.placeholder).toBe('');
    });

    it('should show placeholder when no values in multi-select searchable', async () => {
      const page = await createSelectWithOptions('multiple searchable placeholder="Select..."');

      await page.rootInstance.open();
      await page.waitForChanges();

      const searchInput = page.root!.shadowRoot!.querySelector('.select-search') as HTMLInputElement;
      expect(searchInput.placeholder).toBe('Select...');
    });
  });

  describe('getSelectedOptions', () => {
    it('should return selected options in multi-select', async () => {
      const page = await createSelectWithOptions('multiple');

      page.rootInstance.values = ['us', 'uk'];
      await page.waitForChanges();

      const selected = page.rootInstance.getSelectedOptions();
      expect(selected.length).toBe(2);
      expect(selected.map((o: SelectOption) => o.value)).toEqual(['us', 'uk']);
    });
  });

  describe('options array prop', () => {
    it('should accept options as array directly', async () => {
      const page = await newSpecPage({
        components: [SgSelect],
        html: `<sg-select></sg-select>`,
      });

      page.rootInstance.options = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ];
      page.rootInstance.parseOptions();
      await page.waitForChanges();

      expect(page.rootInstance.internalOptions.length).toBe(2);
    });
  });
});
