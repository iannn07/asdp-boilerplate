'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const SIDEBAR_PROPS = [
  { prop: 'side', type: '"left" | "right"', default: '"left"' },
  { prop: 'variant', type: '"sidebar" | "floating" | "inset"', default: '"sidebar"' },
  { prop: 'collapsible', type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"' },
  { prop: 'className', type: 'string', default: '-' }
]

const PROVIDER_PROPS = [
  { prop: 'defaultOpen', type: 'boolean', default: 'true' },
  { prop: 'open', type: 'boolean', default: '-' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-' }
]

const MENU_BUTTON_PROPS = [
  { prop: 'isActive', type: 'boolean', default: 'false' },
  { prop: 'variant', type: '"default" | "outline"', default: '"default"' },
  { prop: 'size', type: '"default" | "sm" | "lg"', default: '"default"' },
  { prop: 'tooltip', type: 'string | TooltipContentProps', default: '-' }
]

const COMPOSITION = `SidebarProvider
└── Sidebar
    ├── SidebarHeader
    ├── SidebarContent
    │   └── SidebarGroup
    │       ├── SidebarGroupLabel
    │       ├── SidebarGroupAction
    │       └── SidebarGroupContent
    │           └── SidebarMenu
    │               └── SidebarMenuItem
    │                   ├── SidebarMenuButton
    │                   ├── SidebarMenuAction
    │                   ├── SidebarMenuBadge
    │                   └── SidebarMenuSub
    │                       └── SidebarMenuSubItem
    │                           └── SidebarMenuSubButton
    ├── SidebarFooter
    ├── SidebarSeparator
    └── SidebarRail`

export default function SidebarPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Sidebar</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.sidebar.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/sidebar.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.sidebar.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Basic</h3>
          <ComponentPreview
            code={`'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { IconHome, IconSettings, IconUser } from "@tabler/icons-react"

const items = [
  { title: "Home", icon: IconHome },
  { title: "Profile", icon: IconUser },
  { title: "Settings", icon: IconSettings },
]

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <span className="px-3 py-2 text-sm font-semibold">My App</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-2 border-b p-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Page Content</span>
        </header>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Main content area.</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}`}
          >
            <p className='text-sm text-muted-foreground italic'>
              The Sidebar component requires a full-page layout with SidebarProvider. See the application shell for a
              live example.
            </p>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='SidebarProvider' data={PROVIDER_PROPS} />
        <PropsTable title='Sidebar' data={SIDEBAR_PROPS} />
        <PropsTable title='SidebarMenuButton' data={MENU_BUTTON_PROPS} />
      </section>
    </div>
  )
}
