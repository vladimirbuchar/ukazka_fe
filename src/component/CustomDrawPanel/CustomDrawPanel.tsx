import React from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { Button, Grid, TextField } from '@material-ui/core'
import ColorDialog from '../ColorDialog/ColorDialog'
import { Trans } from 'react-i18next'

interface ICustomDrawPanel {
  onSave?: any;
  filePath?: string;
  onUpdate?: any;
  disabled?: boolean,
  undoText?: string,
  saveText?: string,
  redoText?: string,
  clearText?: string,
  data?: string

}
interface IRecipeState {
}

export default class CustomDrawPanel extends React.Component<ICustomDrawPanel, IRecipeState> {
  canvas: any
  state = { textColor: '', lineWidth: 1, tableWidth: '500', image: '' };

  constructor (props: any) {
    super(props)
    this.canvas = React.createRef()
    this.state = { textColor: 'black', lineWidth: 1, tableWidth: '500', image: '' }
    this.handleChangeBackgroundColor = this.handleChangeBackgroundColor.bind(this)
    this.onChangeLineWidth = this.onChangeLineWidth.bind(this)
    this.onChangeTableWidth = this.onChangeTableWidth.bind(this)
    this.onUpdateImage = this.onUpdateImage.bind(this)
  }

  onUpdateImage (e:any) {
    if (this.props.onUpdate !== undefined) {
      this.canvas.current.exportImage('png')
        .then((data: any) => {
          this.props.onUpdate(data, this.props)
          this.setState({ image: data })
        })
        .catch((e: any) => {
          console.log(e)
        })
    }
  }

  handleChangeBackgroundColor (color: any) {
    this.setState({ textColor: color.hex })
  }

  onChangeLineWidth (event: any) {
    this.setState({ lineWidth: event.target.value })
  }

  onChangeTableWidth (event: any) {
    this.setState({ tableWidth: event.target.value })
  }

  render () {
    if (this.props.filePath !== '') {
      return <Grid container>
        <Grid item xs={12}>
          <img src={this.props.filePath} width={'100%'} />
        </Grid>
      </Grid>
    }
    if (this.props.disabled) {
      return <Grid container>
        <Grid item xs={12}>
          <img src={this.state.image} width={'100%'} />
        </Grid>
      </Grid>
    }

    return (
      <Grid container {...this.props}>

        <Grid item xs={1} style={{ paddingRight: '10px' }}>

          {this.props.onSave !== undefined && <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <Button color="primary" fullWidth variant="contained" onClick={() => {
              this.canvas.current.exportImage('png')
                .then((data: any) => {
                  this.props.onSave(data)
                })
                .catch((e: any) => {
                  console.log(e)
                })
            }}>{this.props.saveText}</Button>
          </Grid>}
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <Button color="primary" variant="contained" fullWidth onClick={() => {
              this.canvas.current.undo()
            }}>{this.props.undoText}</Button>
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <Button color="primary" fullWidth variant="contained" onClick={() => {
              this.canvas.current.redo()
            }}>{this.props.redoText}</Button>
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <Button color="primary" fullWidth variant="contained" onClick={() => {
              this.canvas.current.clearCanvas()
            }}>{this.props.clearText}</Button>
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <ColorDialog color={this.state.textColor} onChangeComplete={this.handleChangeBackgroundColor} />
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <TextField
              label={'Šířka čáry'}
              onChange={this.onChangeLineWidth}
              name="lineWidth"
              value={this.state.lineWidth}
              variant="outlined"
              fullWidth
              id="lineWidth"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}

            />
          </Grid>
          <Grid item xs={12} style={{ paddingBottom: '15px' }}>
            <TextField
              label={'Šířka tabule'}
              onChange={this.onChangeTableWidth}
              name="tableWidth"
              value={this.state.tableWidth}
              variant="outlined"
              fullWidth
              id="tableWidth"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}

            />
          </Grid>

        </Grid>
        <Grid item xs={11}>
          <ReactSketchCanvas
            {...this.props}
            onUpdate={this.onUpdateImage}
            ref={this.canvas}
            strokeWidth={this.state.lineWidth}
            strokeColor={this.state.textColor}
            height={this.state.tableWidth + 'px'}
          />

        </Grid>
      </Grid>
    )
  }
}
