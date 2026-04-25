'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/organisms/DataTable'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'paid' | 'failed'
  email: string
}

const SAMPLE_DATA: Payment[] = [
  { id: 'pay-001', amount: 250, status: 'paid', email: 'alice@example.com' },
  { id: 'pay-002', amount: 150, status: 'pending', email: 'bob@example.com' },
  { id: 'pay-003', amount: 350, status: 'failed', email: 'carol@example.com' },
  { id: 'pay-004', amount: 450, status: 'paid', email: 'dave@example.com' },
  { id: 'pay-005', amount: 550, status: 'paid', email: 'eve@example.com' }
]

const columns: ColumnDef<Payment, unknown>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const variant = status === 'paid' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'
      return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
      return <div className='text-right font-medium'>{formatted}</div>
    }
  }
]

const PROPS = [
  { prop: 'columns', type: 'ColumnDef<TData, unknown>[]', default: '-' },
  { prop: 'data', type: 'TData[]', default: '-' },
  { prop: 'emptyMessage', type: 'string | undefined', default: 'i18n "No results"' },
  { prop: 'pageSize', type: 'number', default: '10' }
]

const COMPOSITION = `DataTable
├── Table
│   ├── TableHeader → TableRow → TableHead
│   └── TableBody → TableRow → TableCell
└── Pagination (Previous / Next buttons)`

export default function DataTablePage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Data Table</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.dataTable.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/organisms/DataTable.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.dataTable.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { DataTable } from "@/components/organisms/DataTable"`} />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.dataTable.defaultDesc')}
          </p>
          <ComponentPreview
            code={`'use client'

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/organisms/DataTable"

type Payment = {
  id: string
  amount: number
  status: "pending" | "paid" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "pay-001", amount: 250, status: "paid", email: "alice@example.com" },
  { id: "pay-002", amount: 150, status: "pending", email: "bob@example.com" },
  { id: "pay-003", amount: 350, status: "failed", email: "carol@example.com" },
  { id: "pay-004", amount: 450, status: "paid", email: "dave@example.com" },
  { id: "pay-005", amount: 550, status: "paid", email: "eve@example.com" },
]

const columns: ColumnDef<Payment, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant =
        status === "paid" ? "default" : status === "pending" ? "secondary" : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function PaymentTable() {
  return <DataTable columns={columns} data={data} />
}`}
            className='p-0'
          >
            <div className='w-full'>
              <DataTable columns={columns} data={SAMPLE_DATA} />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Empty State</h3>
          <ComponentPreview
            code={`'use client'

import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/organisms/DataTable"

type Payment = {
  id: string
  amount: number
  status: "pending" | "paid" | "failed"
  email: string
}

const columns: ColumnDef<Payment, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "amount", header: "Amount" },
]

export function EmptyTable() {
  return (
    <DataTable
      columns={columns}
      data={[]}
      emptyMessage="No payments found."
    />
  )
}`}
            className='p-0'
          >
            <div className='w-full'>
              <DataTable columns={columns} data={[]} emptyMessage='No payments found.' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Custom Page Size</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.dataTable.pageSizeDesc')}
          </p>
          <ComponentPreview
            code={`'use client'

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/organisms/DataTable"

type Payment = {
  id: string
  amount: number
  status: "pending" | "paid" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "pay-001", amount: 250, status: "paid", email: "alice@example.com" },
  { id: "pay-002", amount: 150, status: "pending", email: "bob@example.com" },
  { id: "pay-003", amount: 350, status: "failed", email: "carol@example.com" },
  { id: "pay-004", amount: 450, status: "paid", email: "dave@example.com" },
  { id: "pay-005", amount: 550, status: "paid", email: "eve@example.com" },
]

const columns: ColumnDef<Payment, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant =
        status === "paid" ? "default" : status === "pending" ? "secondary" : "destructive"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]

export function PaginatedTable() {
  return <DataTable columns={columns} data={data} pageSize={3} />
}`}
            className='p-0'
          >
            <div className='w-full'>
              <DataTable columns={columns} data={SAMPLE_DATA} pageSize={3} />
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
