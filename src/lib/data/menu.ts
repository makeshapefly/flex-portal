import { DropdownState } from '$lib/stores/dropdown';
export class Menu implements UI.IMenu {
  constructor(
    public id: number,
    public title: string,
    public lang: string,
    public icon: string | null,
    public level: UI.MenuLevel,
    public children: Array<UI.IMenu | UI.ISeperator | UI.IMenuLink>
  ) {}
}

export class Seperator implements UI.ISeperator {
  constructor(
    public id: number,
    public title: string,
    public lang: string,
    public separator: true
  ) {}
}

export class MenuLink implements UI.IMenuLink {
  constructor(
    public id: number,
    public title: string,
    public lang: string,
    public link: string,
    public icon: string | undefined,
    public level?: string | undefined
  ) {}
}

const menudata: Array<UI.ISeperator | UI.IMenu | UI.IMenuLink> = [
  {
    id: 0,
    title: 'Dashboards',
    lang: 'pe-dashboards',
    separator: true
  },
  {
    id: 0,
    title: 'Dashboards',
    lang: 'pe-dashboards',
    level: 'main',
    icon: 'Gauge',
    children: [
      {
        id: 0,
        title: 'eCommerce',
        lang: 'pe-ecommerce',
        link: '/index'
      },
      {
        id: 0,
        title: 'Analytics',
        lang: 'pe-analytics',
        link: '/dashboards-analytics'
      },
      {
        id: 0,
        title: 'Email',
        lang: 'pe-email',
        link: '/dashboard-email'
      },
      {
        id: 0,
        title: 'CRM',
        lang: 'pe-crm',
        link: '/dashboards-crm'
      },
      {
        id: 0,
        title: 'Hospital',
        lang: 'pe-hospital',
        link: '/dashboards-hospital'
      },
      {
        id: 0,
        title: 'File Manager',
        lang: 'pe-file-manager',
        link: '/dashboards-file-manager'
      },
      {
        id: 0,
        title: 'Project',
        lang: 'pe-project',
        link: '/dashboards-projects'
      },
      {
        id: 0,
        title: 'School',
        lang: 'pe-school',
        link: '/dashboards-school'
      },
      {
        id: 0,
        title: 'Music',
        lang: 'pe-music',
        link: '/dashboard-music'
      }
    ]
  },
  {
    id: 0,
    title: 'Landing Page2',
    lang: 'pe-landing-page',
    icon: 'Box',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'eCommerce',
        lang: 'pe-ecommerce',
        link: '/landing-ecommerce'
      },
      {
        id: 0,
        title: 'Email',
        lang: 'pe-email',
        link: '/landing-email'
      },
      {
        id: 0,
        title: 'Step 1',
        lang: 'pe-invoice',
        link: '/public-step1'
      },
      {
        id: 0,
        title: 'School',
        lang: 'pe-school',
        link: '/landing-school'
      },
      {
        id: 0,
        title: 'Doctors',
        lang: 'pe-doctors',
        link: '/landing-doctors'
      }
    ]
  },
  {
    id: 0,
    title: 'Apps',
    lang: 'pe-apps',
    separator: true
  },
  {
    id: 0,
    title: 'Chat',
    lang: 'pe-chat',
    icon: 'MessagesSquare',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Default',
        lang: 'pe-default',
        link: '/apps-chat-default'
      },
      {
        id: 0,
        title: 'Group',
        lang: 'pe-group',
        link: '/apps-chat-group'
      },
      {
        id: 0,
        title: 'Video Call',
        lang: 'pe-video-call',
        link: '/apps-chat-group-video'
      }
    ]
  },
  {
    id: 0,
    title: 'Calendar',
    lang: 'pe-calendar',
    icon: 'Calendar',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Default',
        lang: 'pe-default',
        link: '/apps-calendar-default'
      },
      {
        id: 0,
        title: 'Week Number',
        lang: 'pe-week-number',
        link: '/apps-calendar-weeknumber'
      },
      {
        id: 0,
        title: 'Localize',
        lang: 'pe-localize',
        link: '/apps-calendar-localize'
      },
      {
        id: 0,
        title: 'Day View',
        lang: 'pe-day-view',
        link: '/apps-calendar-dayview'
      },
      {
        id: 0,
        title: 'List View',
        lang: 'pe-list-view',
        link: '/apps-calendar-listview'
      },
      {
        id: 0,
        title: 'Time Grid View',
        lang: 'pe-time-grid-view',
        link: '/apps-calendar-timegrid'
      },
      {
        id: 0,
        title: 'Multi-Month Stack',
        lang: 'pe-multi-month-stack',
        link: '/apps-calendar-multi-month-stack'
      },
      {
        id: 0,
        title: 'Multi-Month Grid',
        lang: 'pe-multi-month-grid',
        link: '/apps-calendar-multi-month-grid'
      },
      {
        id: 0,
        title: 'Timeline',
        lang: 'pe-timeline',
        link: '/apps-calendar-timeline'
      },
      {
        id: 0,
        title: 'Date Nav Link',
        lang: 'pe-date-nav-link',
        link: '/apps-calendar-date-nav-link'
      },
      {
        id: 0,
        title: 'Clicking & Selecting',
        lang: 'pe-clicking-selecting',
        link: '/apps-calendar-date-clicking'
      }
    ]
  },
  {
    id: 0,
    title: 'Email',
    lang: 'pe-email',
    icon: 'Mail',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Mailbox',
        lang: 'pe-mailbox',
        link: '/apps-mailbox'
      },
      {
        id: 0,
        title: 'Templates',
        lang: 'pe-templates',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Welcome',
            lang: 'pe-welcome',
            link: '/apps-email-templates-welcome'
          },
          {
            id: 0,
            title: 'Newsletter',
            lang: 'pe-newsletter',
            link: '/apps-email-templates-newsletter'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    title: 'Ecommerce',
    lang: 'pe-ecommerce',
    icon: 'ShoppingBag',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Products',
        lang: 'pe-products',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-ecommerce-products-list'
          },
          {
            id: 0,
            title: 'Grid View',
            lang: 'pe-grid-view',
            link: '/apps-ecommerce-products-grid'
          },
          {
            id: 0,
            title: 'Add New',
            lang: 'pe-add-new',
            link: '/apps-ecommerce-create-products'
          },
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/apps-ecommerce-product-overview'
          },
          {
            id: 0,
            title: 'Category List',
            lang: 'pe-category-list',
            link: '/apps-ecommerce-category'
          }
        ]
      },
      {
        id: 0,
        title: 'Orders',
        lang: 'pe-orders',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-ecommerce-orders-list'
          },
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/apps-ecommerce-orders-overview'
          },
          {
            id: 0,
            title: 'Track',
            lang: 'pe-track',
            link: '/apps-ecommerce-orders-track'
          }
        ]
      },
      {
        id: 0,
        title: 'Customers',
        lang: 'pe-customers',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-ecommerce-customer-list'
          },
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/apps-ecommerce-customer-user'
          }
        ]
      },
      {
        id: 0,
        title: 'Shop Cart',
        lang: 'pe-shop-cart',
        link: '/apps-ecommerce-shop-cart'
      },
      {
        id: 0,
        title: 'Checkout',
        lang: 'pe-checkout',
        link: '/apps-ecommerce-checkout'
      },
      {
        id: 0,
        title: 'Wishlist',
        lang: 'pe-wishlist',
        link: '/apps-ecommerce-wishlist'
      },
      {
        id: 0,
        title: 'Payment',
        lang: 'pe-payment',
        link: '/apps-ecommerce-payment'
      },
      {
        id: 0,
        title: 'Manage Reviews',
        lang: 'pe-manage-reviews',
        link: '/apps-ecommerce-manage-reviews'
      }
    ]
  },
  {
    id: 0,
    title: 'File Manager',
    lang: 'pe-file-manager',
    icon: 'Folders',
    link: '/apps-file-manager',
    level: 'main'
  },
  {
    id: 0,
    title: 'Projects',
    lang: 'pe-projects',
    icon: 'Monitor',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'List View',
        lang: 'pe-list-view',
        link: '/apps-projects-list'
      },
      {
        id: 0,
        title: 'Grid View',
        lang: 'pe-grid-view',
        link: '/apps-projects-grid'
      },
      {
        id: 0,
        title: 'Overview',
        lang: 'pe-overview',
        link: '/apps-projects-overview'
      },
      {
        id: 0,
        title: 'RoadMap',
        lang: 'pe-roadmap',
        link: '/apps-projects-roadmap'
      },
      {
        id: 0,
        title: 'Task',
        lang: 'pe-task',
        link: '/apps-projects-task'
      },
      {
        id: 0,
        title: 'Files',
        lang: 'pe-files',
        link: '/apps-projects-files'
      },
      {
        id: 0,
        title: 'Users',
        lang: 'pe-users',
        link: '/apps-projects-users'
      }
    ]
  },
  {
    id: 0,
    title: 'CRM',
    lang: 'pe-crm',
    icon: 'Shapes',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Lead',
        lang: 'pe-lead',
        link: '/apps-crm-lead'
      },
      {
        id: 0,
        title: 'Contact',
        lang: 'pe-contact',
        link: '/apps-crm-contact'
      },
      {
        id: 0,
        title: 'Deal',
        lang: 'pe-deal',
        link: '/apps-crm-deal'
      }
    ]
  },
  {
    id: 0,
    title: 'Events',
    lang: 'pe-events',
    icon: 'Trophy',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Events List',
        lang: 'pe-events-list',
        link: '/apps-events-list'
      },
      {
        id: 0,
        title: 'Events Grid',
        lang: 'pe-events-grid',
        link: '/apps-events-grid'
      },
      {
        id: 0,
        title: 'Overview',
        lang: 'pe-overview',
        link: '/apps-event-overview'
      }
    ]
  },
  {
    id: 0,
    title: 'Hospital Management',
    lang: 'pe-hospital-management',
    icon: 'Hospital',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Patients',
        lang: 'pe-patients',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-hospital-patients-lists'
          },
          {
            id: 0,
            title: 'Add Patient',
            lang: 'pe-add-patients',
            link: '/apps-hospital-patients-create'
          },
          {
            id: 0,
            title: 'Patient Profile',
            lang: 'pe-patients-profile',
            link: '/apps-hospital-patients-overview'
          }
        ]
      },
      {
        id: 0,
        title: 'Staff',
        lang: 'pe-staff',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-hospital-staff-lists'
          },
          {
            id: 0,
            title: 'Leaves',
            lang: 'pe-leaves',
            link: '/apps-hospital-staff-leaves'
          },
          {
            id: 0,
            title: 'Add Leave',
            lang: 'pe-add-leave',
            link: '/apps-hospital-staff-leave-add'
          },
          {
            id: 0,
            title: 'Holidays',
            lang: 'pe-holidays',
            link: '/apps-hospital-staff-holidays'
          },
          {
            id: 0,
            title: 'Attendance',
            lang: 'pe-attendance',
            link: '/apps-hospital-staff-attendance'
          }
        ]
      },
      {
        id: 0,
        title: 'Appointments',
        lang: 'pe-appointments',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'List View',
            lang: 'pe-list-view',
            link: '/apps-hospital-appointments-lists'
          },
          {
            id: 0,
            title: 'Book Appointment',
            lang: 'pe-book-appointment',
            link: '/apps-hospital-appointments-book'
          }
        ]
      },
      {
        id: 0,
        title: 'Doctor Schedule',
        lang: 'pe-doctor-schedule',
        link: '/apps-hospital-doctor-schedule'
      },
      {
        id: 0,
        title: 'Departments',
        lang: 'pe-departments',
        link: '/apps-hospital-departments'
      },
      {
        id: 0,
        title: 'Payroll',
        lang: 'pe-payroll',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Employee Salary',
            lang: 'pe-employee-salary',
            link: '/apps-hospital-payroll-employee-salary'
          },
          {
            id: 0,
            title: 'Payslip',
            lang: 'pe-payslip',
            link: '/apps-hospital-payroll-payslip'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    title: 'School',
    lang: 'pe-school',
    icon: 'School',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Students',
        lang: 'pe-students',
        level: 'sub',
        icon: '',
        children: [
          {
            id: 0,
            title: 'All Students',
            lang: 'pe-all-students',
            link: '/apps-school-students-list'
          },
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/apps-school-students-overview'
          },
          {
            id: 0,
            title: 'Admission Form',
            lang: 'pe-admission-form',
            link: '/apps-school-students-admission'
          }
        ]
      },
      {
        id: 0,
        title: 'Teachers',
        lang: 'pe-teachers',
        level: 'sub',
        icon: '',
        children: [
          {
            id: 0,
            title: 'All Teachers',
            lang: 'pe-all-teachers',
            link: '/apps-school-teachers-list'
          },
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/apps-school-teachers-overview'
          },
          {
            id: 0,
            title: 'Payroll',
            lang: 'pe-payroll',
            link: '/apps-school-teachers-payroll'
          }
        ]
      },
      {
        id: 0,
        title: 'Parents',
        lang: 'pe-parents',
        link: '/apps-school-parents'
      },
      {
        id: 0,
        title: 'Library Book',
        lang: 'pe-library-book',
        link: '/apps-school-library-book'
      },
      {
        id: 0,
        title: 'Attendances',
        lang: 'pe-attendances',
        link: '/apps-school-attendances-students'
      },
      {
        id: 0,
        title: 'Exam',
        lang: 'pe-exam',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Schedule',
            lang: 'pe-schedule',
            link: '/apps-school-exam-schedule'
          },
          {
            id: 0,
            title: 'Exam Question',
            lang: 'pe-exam-question',
            link: '/apps-school-exam-question'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    title: 'Invoice',
    lang: 'pe-invoice',
    icon: 'FileText',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'List View',
        lang: 'pe-list-view',
        link: '/apps-invoice-list'
      },
      {
        id: 0,
        title: 'Grid View',
        lang: 'pe-grid-view',
        link: '/apps-invoice-grid'
      },
      {
        id: 0,
        title: 'Add New',
        lang: 'pe-add-new',
        link: '/apps-invoice-create'
      },
      {
        id: 0,
        title: 'Overview 1',
        lang: 'pe-overview-1',
        link: '/apps-invoice-overview-1'
      },
      {
        id: 0,
        title: 'Overview 2',
        lang: 'pe-overview-2',
        link: '/apps-invoice-overview-2'
      }
    ]
  },
  {
    separator: true,
    id: 0,
    title: 'Pages',
    lang: 'pe-pages'
  },
  {
    id: 0,
    title: 'Authentication',
    lang: 'pe-authentication',
    icon: 'UsersRound',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Sign In',
        lang: 'pe-sign-in',
        level: 'sub',
        icon: '',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-signin-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-signin-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-signin-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Sign Up',
        lang: 'pe-sign-up',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-signup-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-signup-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-signup-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Forgot Password',
        lang: 'pe-forgot-password',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-forgot-password-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-forgot-password-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-forgot-password-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Two Step Verification',
        lang: 'pe-two-step-verification',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-two-step-verification-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-two-step-verification-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-two-step-verification-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Reset Password',
        lang: 'pe-reset-password',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-reset-password-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-reset-password-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-reset-password-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Successful Password',
        lang: 'pe-successful-password',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-successful-password-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-successful-password-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-successful-password-creative'
          }
        ]
      },
      {
        id: 0,
        title: 'Account Deactivation',
        lang: 'pe-account-deactivation',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/auth-account-deactivation-basic'
          },
          {
            id: 0,
            title: 'Modern',
            lang: 'pe-modern',
            link: '/auth-account-deactivation-modern'
          },
          {
            id: 0,
            title: 'Creative',
            lang: 'pe-creative',
            link: '/auth-account-deactivation-creative'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    title: 'Pages',
    lang: 'pe-pages',
    icon: 'Box',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Blank',
        lang: 'pe-blank',
        link: '/pages-starter'
      },
      {
        id: 0,
        title: 'Account',
        lang: 'pe-account',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Account',
            lang: 'pe-account',
            link: '/pages-account-settings'
          },
          {
            id: 0,
            title: 'Security',
            lang: 'pe-security',
            link: '/pages-account-security'
          },
          {
            id: 0,
            title: 'Billing & Plans',
            lang: 'pe-billing-plans',
            link: '/pages-account-billing-plan'
          },
          {
            id: 0,
            title: 'Notification',
            lang: 'pe-notification',
            link: '/pages-account-notification'
          },
          {
            id: 0,
            title: 'Statements',
            lang: 'pe-statements',
            link: '/pages-account-statements'
          },
          {
            id: 0,
            title: 'Logs',
            lang: 'pe-logs',
            link: '/pages-account-logs'
          }
        ]
      },
      {
        id: 0,
        title: 'User Profile',
        lang: 'pe-user-profile',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Overview',
            lang: 'pe-overview',
            link: '/pages-user'
          },
          {
            id: 0,
            title: 'Activity',
            lang: 'pe-activity',
            link: '/pages-user-activity'
          },
          {
            id: 0,
            title: 'Followers',
            lang: 'pe-followers',
            link: '/pages-user-followers'
          },
          {
            id: 0,
            title: 'Documents',
            lang: 'pe-documents',
            link: '/pages-user-documents'
          },
          {
            id: 0,
            title: 'Notes',
            lang: 'pe-notes',
            link: '/pages-user-notes'
          },
          {
            id: 0,
            title: 'Projects',
            lang: 'pe-projects',
            link: '/pages-user-projects'
          }
        ]
      },
      {
        id: 0,
        title: 'Pricing',
        lang: 'pe-pricing',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'User',
            lang: 'pe-user',
            link: '/pages-pricing'
          },
          {
            id: 0,
            title: 'Admin',
            lang: 'pe-admin',
            link: '/pages-pricing-admin'
          }
        ]
      },
      {
        id: 0,
        title: 'Contact Us',
        lang: 'pe-contact-us',
        link: '/pages-contact-us'
      },
      {
        id: 0,
        title: "FAQ's",
        lang: 'pe-faqs',
        link: '/pages-faq'
      },
      {
        id: 0,
        title: 'Licenses',
        lang: 'pe-licenses',
        link: '/pages-licenses'
      },
      {
        id: 0,
        title: 'Coming Soon',
        lang: 'pe-coming-soon',
        link: '/pages-coming-soon'
      },
      {
        id: 0,
        title: 'Maintenance',
        lang: 'pe-maintenance',
        link: '/pages-maintenance'
      },
      {
        id: 0,
        title: 'Privacy Policy',
        lang: 'pe-privacy-policy',
        link: '/pages-privacy-policy'
      },
      {
        id: 0,
        title: 'Help Center',
        lang: 'pe-help-center',
        link: '/pages-help-center'
      },
      {
        id: 0,
        title: 'Error Pages',
        lang: 'pe-error-pages',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: '404',
            lang: 'pe-404',
            link: '/pages-404'
          },
          {
            id: 0,
            title: '500',
            lang: 'pe-500',
            link: '/pages-500'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    title: 'Widgets',
    lang: 'pe-widgets',
    icon: 'AlignStartVertical',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Cards',
        lang: 'pe-cards',
        link: '/widgets-cards'
      },
      {
        id: 0,
        title: 'Banners',
        lang: 'pe-banners',
        link: '/widgets-banners'
      },
      {
        id: 0,
        title: 'Charts',
        lang: 'pe-charts',
        link: '/widgets-charts'
      },
      {
        id: 0,
        title: 'Data',
        lang: 'pe-data',
        link: '/widgets-data'
      }
    ]
  },
  {
    separator: true,
    id: 0,
    title: 'Components',
    lang: 'pe-components',
    children: []
  },
  {
    id: 0,
    title: 'UI Elements',
    lang: 'pe-ui-elements',
    icon: 'KeyRound',
    level: 'main', // Mega Menu
    children: [
      {
        id: 0,
        title: 'Alerts',
        lang: 'pe-alerts',
        link: '/ui/alerts'
      },
      {
        id: 0,
        title: 'Badges',
        lang: 'pe-badges',
        link: '/ui/badge'
      },
      {
        id: 0,
        title: 'Breadcrumb',
        lang: 'pe-breadcrumb',
        link: '/ui/breadcrumb'
      },
      {
        id: 0,
        title: 'Buttons Group',
        lang: 'pe-buttons-group',
        link: '/ui/buttons-group'
      },
      {
        id: 0,
        title: 'Buttons',
        lang: 'pe-buttons',
        link: '/ui/buttons'
      },
      {
        id: 0,
        title: 'Buttons Navigation',
        lang: 'pe-buttons-navigation',
        link: '/ui/button-navigation'
      },
      {
        id: 0,
        title: 'Dropdown',
        lang: 'pe-dropdown',
        link: '/ui/dropdown'
      },
      {
        id: 0,
        title: 'Loader',
        lang: 'pe-loader',
        link: '/ui/loader'
      },
      {
        id: 0,
        title: 'Accordion',
        lang: 'pe-accordion',
        link: '/ui/accordion'
      },
      {
        id: 0,
        title: 'Modal',
        lang: 'pe-modal',
        link: '/ui/modal'
      },
      {
        id: 0,
        title: 'Links',
        lang: 'pe-links',
        link: '/ui/links'
      },
      {
        id: 0,
        title: 'Tabs',
        lang: 'pe-tabs',
        link: '/ui/tabs'
      },
      {
        id: 0,
        title: 'Drawer',
        lang: 'pe-drawer',
        link: '/ui/drawer'
      },
      {
        id: 0,
        title: 'Pagination',
        lang: 'pe-pagination',
        link: '/ui/pagination'
      },
      {
        id: 0,
        title: 'Progress Bar',
        lang: 'pe-progress-bar',
        link: '/ui/progress-bar'
      },
      {
        id: 0,
        title: 'Tooltips',
        lang: 'pe-tooltips',
        link: '/ui/tooltips'
      },
      {
        id: 0,
        title: 'Cards',
        lang: 'pe-cards',
        link: '/ui/cards'
      },
      {
        id: 0,
        title: 'Timeline',
        lang: 'pe-timeline',
        link: '/ui/timeline'
      },
      {
        id: 0,
        title: 'Notification',
        lang: 'pe-notification',
        link: '/ui/notification'
      },
      {
        id: 0,
        title: 'List Group',
        lang: 'pe-list-group',
        link: '/ui/list-group'
      },
      {
        id: 0,
        title: 'Cookie Consent',
        lang: 'pe-cookie-consent',
        link: '/ui/cookie'
      },
      {
        id: 0,
        title: 'Gallery',
        lang: 'pe-gallery',
        link: '/ui/gallery'
      },
      {
        id: 0,
        title: 'Video',
        lang: 'pe-video',
        link: '/ui/video'
      },
      {
        id: 0,
        title: 'Colors',
        lang: 'pe-colors',
        link: '/ui/colors'
      },
      {
        id: 0,
        title: 'Typography',
        lang: 'pe-typography',
        link: '/ui/typography'
      }
    ]
  },
  {
    id: 0,
    title: 'Advanced UI',
    lang: 'pe-advanced-ui',
    icon: 'Gem',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Animation',
        lang: 'pe-animation',
        link: '/ui/advanced-animation'
      },
      {
        id: 0,
        title: 'Simplebar',
        lang: 'pe-simplebar',
        link: '/ui/advanced-simplebar'
      },
      {
        id: 0,
        title: 'Swiper',
        lang: 'pe-swiper',
        link: '/ui/advanced-swiper'
      },
      {
        id: 0,
        title: '3D Effect',
        lang: 'pe-3d-effect',
        link: '/ui/advanced-3d-effect'
      },
      {
        id: 0,
        title: 'Word Counter',
        lang: 'pe-word-counter',
        link: '/ui/advanced-word-counter'
      },
      {
        id: 0,
        title: 'Chat Bot',
        lang: 'pe-chat-bot',
        link: '/ui/advanced-bot'
      },
      {
        id: 0,
        title: 'Images Annotation',
        lang: 'pe-images-annotation',
        link: '/ui/advanced-image-annotation'
      },
      {
        id: 0,
        title: 'Tree Map',
        lang: 'pe-tree-map',
        link: '/ui/advanced-tree'
      },
      {
        id: 0,
        title: 'Highlight Code',
        lang: 'pe-highlight-code',
        link: '/ui/advanced-highlight'
      },
      {
        id: 0,
        title: 'Mask Input',
        lang: 'pe-mask-input',
        link: '/ui/advanced-mask'
      }
    ]
  },
  {
    id: 0,
    title: 'Icons',
    lang: 'pe-icons',
    icon: 'PencilRuler',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Lucide',
        lang: 'pe-lucide',
        link: '/icons-lucide'
      },
      {
        id: 0,
        title: 'Remix Icons',
        lang: 'pe-remix-icons',
        link: '/icons-remix'
      },
      {
        id: 0,
        title: 'Heroicons',
        lang: 'pe-heroicons',
        link: '/icons-heroicons'
      },
      {
        id: 0,
        title: 'Boxicon',
        lang: 'pe-boxicon',
        link: '/icons-boxicon'
      },
      {
        id: 0,
        title: 'Line Awesome',
        lang: 'pe-line-awesome',
        link: '/icons-line-awesome'
      }
    ]
  },
  {
    separator: true,
    id: 0,
    title: 'Forms & Tables',
    lang: 'pe-forms-tables',
    children: []
  },
  {
    id: 0,
    title: 'Forms',
    lang: 'pe-forms',
    icon: 'BookOpen',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Basic Input',
        lang: 'pe-basic-input',
        link: '/form-basic-input'
      },
      {
        id: 0,
        title: 'Input Group',
        lang: 'pe-input-group',
        link: '/form-input-group'
      },
      {
        id: 0,
        title: 'File Upload',
        lang: 'pe-file-upload',
        link: '/form-file-input'
      },
      {
        id: 0,
        title: 'Select',
        lang: 'pe-select',
        link: '/form-select'
      },
      {
        id: 0,
        title: 'Pickers',
        lang: 'pe-pickers',
        link: '/form-pickers'
      },
      {
        id: 0,
        title: 'Sliders',
        lang: 'pe-sliders',
        link: '/form-range'
      },
      {
        id: 0,
        title: 'Switches',
        lang: 'pe-switches',
        link: '/form-switches'
      },
      {
        id: 0,
        title: 'Checkbox & Radio',
        lang: 'pe-checkbox-radio',
        link: '/form-checkbox-radio'
      },
      {
        id: 0,
        title: 'Input Spin',
        lang: 'pe-input-spin',
        link: '/form-input-spin'
      },
      {
        id: 0,
        title: 'reCAPTCHA',
        lang: 'pe-recaptcha',
        link: '/form-recaptcha'
      },
      {
        id: 0,
        title: 'Autosize',
        lang: 'pe-autosize',
        link: '/form-autosize'
      }
    ]
  },
  {
    id: 0,
    title: 'Editors',
    lang: 'pe-editors',
    icon: 'RemoveFormatting',
    level: 'main',
    link: '/form-editors'
  },
  {
    id: 0,
    title: 'Clipboard',
    lang: 'pe-clipboard',
    icon: 'Clipboard',
    level: 'main',
    link: '/form-clipboard'
  },
  {
    id: 0,
    title: 'Form Wizard',
    lang: 'pe-form-wizard',
    icon: 'TextQuote',
    level: 'main',
    link: '/form-wizard-basic'
  },
  {
    id: 0,
    title: 'Tables',
    lang: 'pe-tables',
    icon: 'Table2',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Base',
        lang: 'pe-base',
        link: '/table-base'
      },
      {
        id: 0,
        title: 'Data Tables',
        lang: 'pe-data-tables',
        icon: '',
        level: 'sub',
        children: [
          {
            id: 0,
            title: 'Basic',
            lang: 'pe-basic',
            link: '/table-datatables-basic'
          },
          {
            id: 0,
            title: 'Bordered',
            lang: 'pe-bordered',
            link: '/table-datatables-bordered'
          },
          {
            id: 0,
            title: 'Stripe',
            lang: 'pe-stripe',
            link: '/table-datatables-stripe'
          },
          {
            id: 0,
            title: 'Hover Effect',
            lang: 'pe-hover-effect',
            link: '/table-datatables-hover'
          },
          {
            id: 0,
            title: 'Row Grouping',
            lang: 'pe-row-grouping',
            link: '/table-datatables-row-grouping'
          },
          {
            id: 0,
            title: 'Feature enable / disable',
            lang: 'pe-feature-enable-disable',
            link: '/table-datatables-enable-disable'
          }
        ]
      }
    ]
  },
  {
    id: 0,
    separator: true,
    title: 'Charts & Maps',
    lang: 'pe-charts-maps'
  },
  {
    id: 0,
    title: 'Apexcharts',
    lang: 'pe-apexcharts',
    icon: 'BarChart3',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Area',
        lang: 'pe-area',
        link: '/apexchart-area'
      },
      {
        id: 0,
        title: 'Bar',
        lang: 'pe-bar',
        link: '/apexchart-bar'
      },
      {
        id: 0,
        title: 'Box Whisher',
        lang: 'pe-box-whisher',
        link: '/apexchart-box-whisker'
      },
      {
        id: 0,
        title: 'Bubble',
        lang: 'pe-bubble',
        link: '/apexchart-bubble'
      },
      {
        id: 0,
        title: 'Candlestick',
        lang: 'pe-candlestick',
        link: '/apexchart-candlestick'
      },
      {
        id: 0,
        title: 'Column',
        lang: 'pe-column',
        link: '/apexchart-column'
      },
      {
        id: 0,
        title: 'Funnel',
        lang: 'pe-funnel',
        link: '/apexchart-funnel'
      },
      {
        id: 0,
        title: 'Heatmap',
        lang: 'pe-heatmap',
        link: '/apexchart-heatmap'
      },
      {
        id: 0,
        title: 'Line',
        lang: 'pe-line',
        link: '/apexchart-line'
      },
      {
        id: 0,
        title: 'Mixed',
        lang: 'pe-mixed',
        link: '/apexchart-mixed'
      },
      {
        id: 0,
        title: 'Pie',
        lang: 'pe-pie',
        link: '/apexchart-pie'
      },
      {
        id: 0,
        title: 'Polar Area',
        lang: 'pe-polar-area',
        link: '/apexchart-polar-area'
      },
      {
        id: 0,
        title: 'Radar',
        lang: 'pe-radar',
        link: '/apexchart-radar'
      },
      {
        id: 0,
        title: 'Radialbar',
        lang: 'pe-radialbar',
        link: '/apexchart-radialbar'
      },
      {
        id: 0,
        title: 'Range Area',
        lang: 'pe-range-area',
        link: '/apexchart-range-area'
      },
      {
        id: 0,
        title: 'Scatter',
        lang: 'pe-scatter',
        link: '/apexchart-scatter'
      },
      {
        id: 0,
        title: 'Slope',
        lang: 'pe-slope',
        link: '/apexchart-slope'
      },
      {
        id: 0,
        title: 'Timeline',
        lang: 'pe-timeline',
        link: '/apexchart-timeline'
      },
      {
        id: 0,
        title: 'Treemap',
        lang: 'pe-treemap',
        link: '/apexchart-treemap'
      }
    ]
  },
  {
    id: 0,
    title: 'Apextree',
    lang: 'pe-apextree',
    icon: 'TrendingUpDown',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Top to Bottom',
        lang: 'pe-top-to-bottom',
        link: '/apextree-top-bottom'
      },
      {
        id: 0,
        title: 'Bottom to Top',
        lang: 'pe-bottom-to-top',
        link: '/apextree-bottom-top'
      },
      {
        id: 0,
        title: 'Left to Right',
        lang: 'pe-left-to-right',
        link: '/apextree-left-right'
      },
      {
        id: 0,
        title: 'Right to Left',
        lang: 'pe-right-to-left',
        link: '/apextree-right-left'
      },
      {
        id: 0,
        title: 'Collapse Expand',
        lang: 'pe-collapse-expand',
        link: '/apextree-collapse-expand'
      }
    ]
  },
  {
    id: 0,
    title: 'ApexSankey',
    lang: 'pe-apexsankey',
    icon: 'Dna',
    level: 'main',
    link: '/charts-apexsankey'
  },
  {
    id: 0,
    title: 'Echarts',
    lang: 'pe-echarts',
    icon: 'ScatterChart',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Bar',
        lang: 'pe-bar',
        link: '/echart-bar'
      },
      {
        id: 0,
        title: 'Line',
        lang: 'pe-line',
        link: '/echart-line'
      },
      {
        id: 0,
        title: 'Pie',
        lang: 'pe-pie',
        link: '/echart-pie'
      }
    ]
  },
  {
    id: 0,
    title: 'Maps',
    lang: 'pe-maps',
    icon: 'Map',
    level: 'main',
    children: [
      {
        id: 0,
        title: 'Google Maps',
        lang: 'pe-google-maps',
        link: '/maps-google'
      },
      {
        id: 0,
        title: 'Vector',
        lang: 'pe-vector',
        link: '/maps-vector'
      }
    ]
  },
  {
    id: 0,
    separator: true,
    title: 'Docs & ChangeLog',
    lang: 'pe-docs-changeLog',
    children: []
  },
  {
    id: 0,
    title: 'Support',
    lang: 'pe-support',
    icon: 'LifeBuoy',
    level:'main',
    link: '#!'
  },
  {
    id: 0,
    title: 'Documentation',
    lang: 'pe-documentation',
    icon: 'FileText',
    level:'main',
    link: '#!'
  },
  {
    id: 0,
    title: 'ChangeLog',
    lang: 'pe-changelog',
    icon: 'Feather',
    level:'main',
    link: '#!'
  }
];
let i = 0;
function getUniqueId() {
  return i++;
}

function getMenu<T extends UI.IMenu | UI.ISeperator | UI.IMenuLink>(menu: T): T {
  if ('separator' in menu) {
    return new Seperator(getUniqueId(), menu.title, menu.lang, menu.separator) as T;
  }
  if ('link' in menu) {
    return new MenuLink(getUniqueId(), menu.title, menu.lang, menu.link, menu.icon, menu?.level) as T;
  } else {
    const derivedMenu = new Menu(
      getUniqueId(),
      menu.title,
      menu.lang,
      menu.icon,
      menu.level,
      menu.children.map((child) => getMenu(child))
    );
    return derivedMenu as T;
  }
}
let menus: Array<UI.ISeperator | UI.IMenu | UI.IMenuLink> | null = null;
function getMenuData() {
  if (!menus) {
    menus = menudata.map((menu) => getMenu(menu));

    return menus;
  }
}

export default getMenuData() as Array<UI.IMenu | UI.ISeperator | UI.IMenuLink>;
