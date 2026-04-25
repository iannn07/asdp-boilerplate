import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

type PropDef = {
  prop: string
  type: string
  default: string
}

type PropsTableProps = {
  title?: string
  data: PropDef[]
}

export function PropsTable({ title, data }: PropsTableProps) {
  return (
    <div className='space-y-2'>
      {title && <h3 className='text-base font-semibold'>{title}</h3>}
      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.prop}>
                <TableCell className='font-mono text-xs'>{row.prop}</TableCell>
                <TableCell className='font-mono text-xs text-muted-foreground'>{row.type}</TableCell>
                <TableCell className='font-mono text-xs'>{row.default}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
