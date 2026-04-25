'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const TABS_PROPS = [
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
  { prop: 'className', type: 'string', default: '-' }
]

const TABS_LIST_PROPS = [
  { prop: 'variant', type: '"default" | "line"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Tabs
├── TabsList
│   └── TabsTrigger
└── TabsContent`

export default function TabsPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Tabs</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.tabs.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/tabs.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.tabs.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`} />
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground p-4">
          Manage your account settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground p-4">
          Change your password here.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="text-sm text-muted-foreground p-4">
          Configure your application settings.
        </p>
      </TabsContent>
    </Tabs>
  )
}`}
          >
            <Tabs defaultValue='account'>
              <TabsList>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='password'>Password</TabsTrigger>
                <TabsTrigger value='settings'>Settings</TabsTrigger>
              </TabsList>
              <TabsContent value='account'>
                <p className='text-sm text-muted-foreground p-4'>Manage your account settings and preferences.</p>
              </TabsContent>
              <TabsContent value='password'>
                <p className='text-sm text-muted-foreground p-4'>Change your password here.</p>
              </TabsContent>
              <TabsContent value='settings'>
                <p className='text-sm text-muted-foreground p-4'>Configure your application settings.</p>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Line Variant</h3>
          <ComponentPreview
            code={`'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLineDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground p-4">Overview content.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground p-4">Analytics content.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-muted-foreground p-4">Reports content.</p>
      </TabsContent>
    </Tabs>
  )
}`}
          >
            <Tabs defaultValue='overview'>
              <TabsList variant='line'>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='analytics'>Analytics</TabsTrigger>
                <TabsTrigger value='reports'>Reports</TabsTrigger>
              </TabsList>
              <TabsContent value='overview'>
                <p className='text-sm text-muted-foreground p-4'>Overview content.</p>
              </TabsContent>
              <TabsContent value='analytics'>
                <p className='text-sm text-muted-foreground p-4'>Analytics content.</p>
              </TabsContent>
              <TabsContent value='reports'>
                <p className='text-sm text-muted-foreground p-4'>Reports content.</p>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsVerticalDemo() {
  return (
    <Tabs defaultValue="general" orientation="vertical">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p className="text-sm text-muted-foreground p-4">General settings.</p>
      </TabsContent>
      <TabsContent value="security">
        <p className="text-sm text-muted-foreground p-4">Security settings.</p>
      </TabsContent>
      <TabsContent value="notifications">
        <p className="text-sm text-muted-foreground p-4">Notification preferences.</p>
      </TabsContent>
    </Tabs>
  )
}`}
          >
            <Tabs defaultValue='general' orientation='vertical'>
              <TabsList>
                <TabsTrigger value='general'>General</TabsTrigger>
                <TabsTrigger value='security'>Security</TabsTrigger>
                <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value='general'>
                <p className='text-sm text-muted-foreground p-4'>General settings.</p>
              </TabsContent>
              <TabsContent value='security'>
                <p className='text-sm text-muted-foreground p-4'>Security settings.</p>
              </TabsContent>
              <TabsContent value='notifications'>
                <p className='text-sm text-muted-foreground p-4'>Notification preferences.</p>
              </TabsContent>
            </Tabs>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Tabs' data={TABS_PROPS} />
        <PropsTable title='TabsList' data={TABS_LIST_PROPS} />
      </section>
    </div>
  )
}
