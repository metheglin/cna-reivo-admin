import {Chip, Grid} from '@material-ui/core'

export default function LabelChips({labels, colors={'/': 'primary'}}) {
  const labelsSorted = labels.sort((a,b) => a.path < b.path)
  return (
    <Grid container spacing={1}>
      {labelsSorted && labelsSorted.map(x=>{
        const colorPath = Object.keys(colors).find(a=>x.path.startsWith(a))
        const color = colors[colorPath] || 'default'
        return (
          <Grid item>
            <Chip size="small" variant="outlined" color={color} label={x.name} />
          </Grid>
        )
      })}
    </Grid>
  )
}