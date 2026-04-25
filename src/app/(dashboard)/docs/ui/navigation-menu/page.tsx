'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const MENU_PROPS = [
  { prop: 'align', type: '"start" | "center" | "end"', default: '"start"' },
  { prop: 'className', type: 'string', default: '-' }
]

const CONTENT_PROPS = [{ prop: 'className', type: 'string', default: '-' }]

const LINK_PROPS = [{ prop: 'className', type: 'string', default: '-' }]

const COMPOSITION = `NavigationMenu
├── NavigationMenuList
│   └── NavigationMenuItem
│       ├── NavigationMenuTrigger
│       ├── NavigationMenuContent
│       │   └── NavigationMenuLink
│       └── NavigationMenuLink
└── NavigationMenuIndicator`

export default function NavigationMenuPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Navigation Menu</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.navigationMenu.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}:{' '}
          <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/navigation-menu.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.navigationMenu.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink href="/docs">
                <div className="text-sm font-medium">Introduction</div>
                <p className="text-sm text-muted-foreground">
                  Learn the basics and get up and running.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/installation">
                <div className="text-sm font-medium">Installation</div>
                <p className="text-sm text-muted-foreground">
                  How to install and configure the project.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 w-[400px]">
              <NavigationMenuLink href="/docs/ui/button">
                <div className="text-sm font-medium">Button</div>
                <p className="text-sm text-muted-foreground">
                  Interactive button component with variants.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="/docs/ui/card">
                <div className="text-sm font-medium">Card</div>
                <p className="text-sm text-muted-foreground">
                  Container for grouping related content.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`}
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid gap-3 p-4 w-[400px]'>
                      <NavigationMenuLink href='/docs'>
                        <div className='text-sm font-medium'>Introduction</div>
                        <p className='text-sm text-muted-foreground'>Learn the basics and get up and running.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href='/docs/installation'>
                        <div className='text-sm font-medium'>Installation</div>
                        <p className='text-sm text-muted-foreground'>How to install and configure the project.</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='grid gap-3 p-4 w-[400px]'>
                      <NavigationMenuLink href='/docs/ui/button'>
                        <div className='text-sm font-medium'>Button</div>
                        <p className='text-sm text-muted-foreground'>Interactive button component with variants.</p>
                      </NavigationMenuLink>
                      <NavigationMenuLink href='/docs/ui/card'>
                        <div className='text-sm font-medium'>Card</div>
                        <p className='text-sm text-muted-foreground'>Container for grouping related content.</p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href='/docs'>Documentation</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='NavigationMenu' data={MENU_PROPS} />
        <PropsTable title='NavigationMenuContent' data={CONTENT_PROPS} />
        <PropsTable title='NavigationMenuLink' data={LINK_PROPS} />
      </section>
    </div>
  )
}
