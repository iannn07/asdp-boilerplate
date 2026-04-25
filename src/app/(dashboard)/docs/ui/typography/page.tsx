'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'

export default function TypographyPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Typography</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.typography.desc')}</p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.typography.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`// Typography uses Tailwind CSS classes directly.
// No component import is needed.

<h1 className="text-4xl font-extrabold tracking-tight">Heading 1</h1>
<p className="text-muted-foreground">Body text</p>`}
        />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Headings</h3>
          <ComponentPreview
            code={`export function TypographyHeadings() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Heading 1
      </h1>
      <h2 className="text-3xl font-bold tracking-tight">
        Heading 2
      </h2>
      <h3 className="text-2xl font-semibold tracking-tight">
        Heading 3
      </h3>
      <h4 className="text-xl font-semibold tracking-tight">
        Heading 4
      </h4>
      <h5 className="text-lg font-medium">
        Heading 5
      </h5>
      <h6 className="text-base font-medium">
        Heading 6
      </h6>
    </div>
  )
}`}
          >
            <div className='space-y-4'>
              <h1 className='text-4xl font-extrabold tracking-tight'>Heading 1</h1>
              <h2 className='text-3xl font-bold tracking-tight'>Heading 2</h2>
              <h3 className='text-2xl font-semibold tracking-tight'>Heading 3</h3>
              <h4 className='text-xl font-semibold tracking-tight'>Heading 4</h4>
              <h5 className='text-lg font-medium'>Heading 5</h5>
              <h6 className='text-base font-medium'>Heading 6</h6>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Paragraphs</h3>
          <ComponentPreview
            code={`export function TypographyParagraphs() {
  return (
    <div className="space-y-4 max-w-lg">
      <p className="text-base leading-7">
        The king, seeing how much happier his subjects were, realized
        the error of his ways and promised to be a better ruler.
      </p>
      <p className="text-sm text-muted-foreground">
        This is a secondary paragraph with muted foreground color,
        often used for descriptions and supplementary text.
      </p>
      <p className="text-xs text-muted-foreground">
        This is a small caption or footnote text.
      </p>
    </div>
  )
}`}
          >
            <div className='max-w-lg space-y-4'>
              <p className='text-base leading-7'>
                The king, seeing how much happier his subjects were, realized the error of his ways and promised to be a
                better ruler.
              </p>
              <p className='text-sm text-muted-foreground'>
                This is a secondary paragraph with muted foreground color, often used for descriptions and supplementary
                text.
              </p>
              <p className='text-xs text-muted-foreground'>This is a small caption or footnote text.</p>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Blockquote</h3>
          <ComponentPreview
            code={`export function TypographyBlockquote() {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground">
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke,
      so it&apos;s only fair that they should pay for the privilege.&rdquo;
    </blockquote>
  )
}`}
          >
            <blockquote className='mt-6 border-l-2 pl-6 italic text-muted-foreground'>
              &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so it&apos;s only fair that they
              should pay for the privilege.&rdquo;
            </blockquote>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Unordered List</h3>
          <ComponentPreview
            code={`export function TypographyUl() {
  return (
    <ul className="my-6 ml-6 list-disc space-y-2 text-sm">
      <li>First item in the list</li>
      <li>Second item in the list</li>
      <li>
        Third item with nested list
        <ul className="ml-6 mt-2 list-disc space-y-2">
          <li>Nested item one</li>
          <li>Nested item two</li>
        </ul>
      </li>
    </ul>
  )
}`}
          >
            <ul className='my-6 ml-6 list-disc space-y-2 text-sm'>
              <li>First item in the list</li>
              <li>Second item in the list</li>
              <li>
                Third item with nested list
                <ul className='ml-6 mt-2 list-disc space-y-2'>
                  <li>Nested item one</li>
                  <li>Nested item two</li>
                </ul>
              </li>
            </ul>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Ordered List</h3>
          <ComponentPreview
            code={`export function TypographyOl() {
  return (
    <ol className="my-6 ml-6 list-decimal space-y-2 text-sm">
      <li>Clone the repository</li>
      <li>Install dependencies</li>
      <li>Start the development server</li>
      <li>Open your browser</li>
    </ol>
  )
}`}
          >
            <ol className='my-6 ml-6 list-decimal space-y-2 text-sm'>
              <li>Clone the repository</li>
              <li>Install dependencies</li>
              <li>Start the development server</li>
              <li>Open your browser</li>
            </ol>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Inline Code</h3>
          <ComponentPreview
            code={`export function TypographyCode() {
  return (
    <p className="text-sm">
      Use the{" "}
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        cn()
      </code>{" "}
      utility to merge Tailwind classes conditionally.
    </p>
  )
}`}
          >
            <p className='text-sm'>
              Use the{' '}
              <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                cn()
              </code>{' '}
              utility to merge Tailwind classes conditionally.
            </p>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Lead Text</h3>
          <ComponentPreview
            code={`export function TypographyLead() {
  return (
    <p className="text-xl text-muted-foreground">
      A modal dialog that interrupts the user with important content and
      expects a response.
    </p>
  )
}`}
          >
            <p className='text-xl text-muted-foreground'>
              A modal dialog that interrupts the user with important content and expects a response.
            </p>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Large &amp; Small Text</h3>
          <ComponentPreview
            code={`export function TypographyLargeSmall() {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold">Large text</p>
      <p className="text-sm font-medium leading-none">
        Small text
      </p>
      <p className="text-sm text-muted-foreground">Muted text</p>
    </div>
  )
}`}
          >
            <div className='space-y-2'>
              <p className='text-lg font-semibold'>Large text</p>
              <p className='text-sm font-medium leading-none'>Small text</p>
              <p className='text-sm text-muted-foreground'>Muted text</p>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  )
}
