


/* declare global {
	namespace UI {
		// Colors
		type Colors =
			| 'primary'
			| 'purple'
			| 'green'
			| 'red'
			| 'yellow'
			| 'sky'
			| 'pink'
			| 'indigo'
			| 'orange'
			| 'gray';

		// Animations
		type Transitions =
			| 'fade'
			| 'fly-top'
			| 'fly-right'
			| 'fly-bottom'
			| 'fly-left'
			| 'slide-x'
			| 'slide-y'
			| 'scale'
			| 'scale-right'
			| 'none';
		
		type AlertVariant =
			| 'default'
			| 'solid'
			| 'outline'
			| 'soft'
			| 'icon-info'
			| 'icon-success'
			| 'icon-warning'
			| 'icon-error'
			| 'action-info'
			| 'action-success'
			| 'action-warning'
			| 'action-error'
			| 'action-v2-info'
			| 'action-v2-success'
			| 'action-v2-warning'
			| 'action-v2-error'
			| 'gradient';
		type AlertVariantColor = `${AlertVariant}-${Colors}`;
		type AlertClosing = 'auto' | 'manual' | number;
		type AlertPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
		interface IAlertState {
			isOpen: Writable<boolean>;
			closing: UI.AlertClosing;
			open(): void;
			close(): void;
		}

		type BadgeVarient = 'default' | 'outline' | 'soft' | 'solid' | 'rounded' | 'rounded-outline' | 'rounded-soft' | 'rounded-solid';
		type BadgeVariantColor = `${BadgeVarient}-${Colors}`;

		type ButtonVariant = 'default' | 'outline' | 'soft' | '3d' | 'dashed' | 'active' ;
		type ButtonColors = 'primary' | 'purple' | 'green' | 'red' | 'yellow' | 'sky' | 'pink' | 'indigo' | 'orange' | 'dark' | 'light';
		type ButtonVariantColor = `${ButtonVariant}-${ButtonColors}`;
		type ButtonSize = 'default' | 'mini' | 'small' | 'medium' | 'large';
		
		type Nav = 'default' | 'dot' | 'border-bottom' | 'border-top';
		type NavLink = {
			link: string;
			icon?: string;
			text?: string;
		};
		type NavLinkVarient = 'default' | 'animation' ;
		type NavLinkVarientColor = `${NavLinkVarient}-${Colors}`;

		type LoaderColors = 'primary' | 'purple' | 'green' | 'red' | 'yellow' | 'sky' | 'pink' | 'indigo' | 'orange' | 'dark' | 'light';
		type LoaderAnimations = 'spin' | 'spin-2' | 'bounce' | 'ping' | 'pulse';
		type LoaderAnimationsColor = `${LoaderAnimations}-${LoaderColors}`;

		type TabVarient =
			| 'default'
			| 'justify'
			| 'pills'
			| 'pills-justify'
			| 'icon'
			| 'icon-text'
			| 'animation';

		type TabVareintColor = `${TabVarient}-${UI.Colors}`;

		type ProgressColors =
			| 'primary'
			| 'purple'
			| 'green'
			| 'red'
			| 'yellow'
			| 'sky'
			| 'pink'
			| 'indigo'
			| 'orange'
			| 'dark'
			| 'light';
		type ProgressVariant = 'default'| 'soft' ;
		type ProgressVariantColor = `${ProgressVariant}-${ProgressColors}`;
		interface ILayoutSettings {
			layoutMode: LayoutMode;
			navType: NavType;
			contentWidth: ContentWidth;
			layoutTheme: LayoutTheme;
			sidebarSize: SidebarSize;
			sidebarColor: SidebarColors;
			layoutDir: LayoutDir;
			primaryColor: PrimaryColors;
			darkModeColor: DarkModeColors;
			backdrop: HTMLElement | null;
			sidebarMainDiv: HTMLElement | null;
			scrollableDiv: HTMLElement | null;
			languages: Record<string, Language>;
			languageData: Record<string, string>;
			currentLang: string;
		}

		type LayoutMode = 'default' | 'horizontal' | 'modern' | 'boxed' | 'semibox';
		type NavType = 'default' | 'floating' | 'boxed' | 'pattern';
		type ContentWidth = 'default' | 'fluid';
		type LayoutTheme = 'light' | 'dark' | 'auto' | 'black-white';
		type SidebarSize = 'default' | 'small' | 'medium';
		type SidebarColors = 'light' | 'purple' | 'dark' | 'brand' | 'sky';
		type LayoutDir = 'ltr' | 'rtl';
		type PrimaryColors = 'default' | 'purple' | 'green' | 'orange';
		type DarkModeColors = '' | 'gray' | 'stone';
		type Language = {
			id: string;
			flag: string; // Assuming flag is a string, but could be another type if it's an imported image or SVG
			name: string;
		};

		interface IBaseMenu {
			id: number;
			title: string;
			lang: string;
		}

		type MenuLevel = 'main' | 'sub' | 'sub-sub';

		interface ISeperator extends IBaseMenu {
			separator: true;
		}

		interface IMenuLink extends IBaseMenu {
			link: string;
			icon?: string;
		}

		interface IMenu extends IBaseMenu {
			icon: string | null;
			level: MenuLevel;
			children: Array<IMenu | ISeperator | IMenuLink>;
		}

		// Dropdown
		type DropdownAlignTo = 'left' | 'right' | 'right-top' | 'left-top';
		interface IDropdownState {
			isOpen: Writable<boolean>;
			alignTo: DropdownAlignTo;
			buttonElement: HTMLElement | null;
			dropdownElement: HTMLElement | null;
			open(): void;
			close(): void;
			toggle(): void;
			setWidthHeight(width: number, height: number): void;
		}

		// Modal
		interface IModalState {
			isOpen: Writable<boolean>;
			buttonElement: HTMLElement | null;
			modalElement: HTMLElement | null;
			backdropElement: HTMLElement | null;
			open(): void;
			close(): void;
			toggle(): void;
		}

		type ModalButton = 'button' | 'link';
		type ModalSize =  'xs' |'sm' | 'lg' | 'xl' | '2xl';
		type ModalPosition = 'top' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	
		// Drawer
		interface IDrawerState {
			isOpen: Writable<boolean>;
			buttonElement: HTMLElement | null;
			drawerElement: HTMLElement | null;
			backdropElement: HTMLElement | null;
			open(): void;
			close(): void;
			toggle(): void;
		}
		type DrawerPosition = 'top' | 'bottom' | 'left' | 'right';
		type DrawerSize = 'small' | 'medium' | 'half-screen';
		
		
		// Accordion
		type AccordionVarient = 'default' | 'boxed' | 'solid' | 'solid-boxed';
		interface IAccordionState {
			selected: Writable<number>;
			isChevron: boolean;
			color: string;
			varient: AccordionVarient;
			changeSelected(index: number): void;
		}
		namespace Tailwind {
			type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
			type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'subgrid' | 'none';
			type GridColSpan = 'auto' | 'span-full' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
			type GridColStartEnd = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
			type Gap =
				| 'space'
				| 'px'
				| 0
				| 0.5
				| 1
				| 1.5
				| 2
				| 2.5
				| 3
				| 3.5
				| 4
				| 5
				| 6
				| 7
				| 8
				| 9
				| 10
				| 11
				| 12
				| 14
				| 16
				| 20
				| 24
				| 28
				| 32
				| 36
				| 40
				| 44
				| 48
				| 52
				| 56
				| 60
				| 64
				| 72
				| 80
				| 96;
			
			type Size =
				| 'size-0'
				| 'size-px'
				| 'size-0.5'
				| 'size-1'
				| 'size-1.5'
				| 'size-2'
				| 'size-2.5'
				| 'size-3'
				| 'size-3.5'
				| 'size-4'
				| 'size-5'
				| 'size-6'
				| 'size-7'
				| 'size-8'
				| 'size-9'
				| 'size-10'
				| 'size-11'
				| 'size-12'
				| 'size-14'
				| 'size-16'
				| 'size-20'
				| 'size-24'
				| 'size-28'
				| 'size-32'
				| 'size-36'
				| 'size-40'
				| 'size-44'
				| 'size-48'
				| 'size-52'
				| 'size-56'
				| 'size-60'
				| 'size-64'
				| 'size-72'
				| 'size-80'
				| 'size-96'
				| 'size-auto'
				| 'size-1/2'
				| 'size-1/3'
				| 'size-2/3'
				| 'size-1/4'
				| 'size-2/4'
				| 'size-3/4'
				| 'size-1/5'
				| 'size-2/5'
				| 'size-3/5'
				| 'size-4/5'
				| 'size-1/6'
				| 'size-2/6'
				| 'size-3/6'
				| 'size-4/6'
				| 'size-5/6'
				| 'size-1/12'
				| 'size-2/12'
				| 'size-3/12'
				| 'size-4/12'
				| 'size-5/12'
				| 'size-6/12'
				| 'size-7/12'
				| 'size-8/12'
				| 'size-9/12'
				| 'size-10/12'
				| 'size-11/12'
				| 'size-full'
				| 'size-min'
				| 'size-max'
				| 'size-fit';

		}
	
	}
} */
