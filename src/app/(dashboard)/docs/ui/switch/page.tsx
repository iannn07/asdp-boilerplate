'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'checked', type: 'boolean', default: 'false' },
  { prop: 'onCheckedChange', type: '(checked: boolean) => void', default: '-' },
  { prop: 'size', type: '"sm" | "default"', default: '"default"' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function SwitchPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Switch</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.switch.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/switch.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.switch.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Switch } from "@/components/ui/switch"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Switch } from "@/components/ui/switch"

export function SwitchDefault() {
  return <Switch />
}`}
          >
            <Switch />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Label</h3>
          <ComponentPreview
            code={`import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchWithLabel() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Switch id='airplane-demo' />
              <Label htmlFor='airplane-demo'>Airplane Mode</Label>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="disabled" disabled />
      <Label htmlFor="disabled">Disabled</Label>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Switch id='switch-disabled-demo' disabled />
              <Label htmlFor='switch-disabled-demo'>Disabled</Label>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable data={PROPS} />
      </section>
    </div>
  )
}
