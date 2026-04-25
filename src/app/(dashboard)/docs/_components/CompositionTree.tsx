type CompositionTreeProps = {
  tree: string
}

export function CompositionTree({ tree }: CompositionTreeProps) {
  return (
    <pre className='overflow-x-auto rounded-lg border bg-muted/50 p-4 text-[13px] leading-relaxed'>
      <code>{tree}</code>
    </pre>
  )
}
