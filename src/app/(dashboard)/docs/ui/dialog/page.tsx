'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTENT_PROPS = [
  { prop: 'showCloseButton', type: 'boolean', default: 'true' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Dialog
├── DialogTrigger
├── DialogContent
│   ├── DialogHeader
│   │   ├── DialogTitle
│   │   └── DialogDescription
│   └── DialogFooter
└── DialogClose`

export default function DialogPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dialog</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.dialog.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/dialog.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.dialog.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"`}
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input className="col-span-3" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email</Label>
            <Input className="col-span-3" placeholder="john@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant='outline' />}>Edit Profile</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Name</Label>
                    <Input className='col-span-3' placeholder='John Doe' />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label className='text-right'>Email</Label>
                    <Input className='col-span-3' placeholder='john@example.com' />
                  </div>
                </div>
                <DialogFooter>
                  <Button>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Custom Width</h3>
          <ComponentPreview
            code={`'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogCustomWidth() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Wide Dialog
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Wide Dialog</DialogTitle>
          <DialogDescription>
            This dialog uses a custom max-width class.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Content area with more horizontal space for wider layouts.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}`}
          >
            <Dialog>
              <DialogTrigger render={<Button variant='outline' />}>Wide Dialog</DialogTrigger>
              <DialogContent className='sm:max-w-lg'>
                <DialogHeader>
                  <DialogTitle>Wide Dialog</DialogTitle>
                  <DialogDescription>This dialog uses a custom max-width class.</DialogDescription>
                </DialogHeader>
                <div className='py-4'>
                  <p className='text-sm text-muted-foreground'>
                    Content area with more horizontal space for wider layouts.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='DialogContent' data={CONTENT_PROPS} />
      </section>
    </div>
  )
}
