import React from 'react';
import Paper from '@material-ui/core/Paper';
import ArrowRight from '@material-ui/icons/ArrowRightAlt';
import { Typography, Divider, Grid, TextField, withStyles, InputAdornment } from '@material-ui/core';
import addMoreImage from './addMoreImages.jpg';
import addMoreVarient from './addMoreVarient.jpg';
import { relative } from 'path';

const styles = (theme) => ({
    input: {
        color: 'transparent',
        fontSize: '12px',
        width: '100%',
        height: '97%',
        bottom: '-1px',
        paddingBottom: '2px',
        fontSize: '10px',        
        '& input': {
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          opacity: 0,
          fontSize: '10px',        
        },
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '0px',
        width: '90%',
        fontSize: '10px'
      },
      '&$cssFocused': {
        color: 'red',
      },
});

class ItemDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            input: '',
            edit: false
        }

        this.handleUpload = this.handleUpload.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }


    handleUpload(event) {
        this.setState({images: event.target.files});
        const body = new FormData();
        body.append('files', event.target.files[0]);
        fetch(`/add-images?id=${this.props.gridDetails.id}`, {
            method: "POST",
            body
        }).then((res) => {
            this.props.fetchData();
        });
    }

    saveChanges(event) {
        const body = {
            title: this.props.gridDetails.title,
            price: this.props.gridDetails.price,
            offerPrice: this.props.gridDetails.offerPrice,
            inventory: this.props.gridDetails.inventory,
            description: this.props.gridDetails.description,
        };

        fetch(`/update-item?id=${this.props.gridDetails.id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            this.props.fetchData();
        });
        this.props.closeModal();
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper style={{position: 'absolute', top: 0, width:'500px', height: '580px', zIndex: 1, display: this.props.showDetails ? 'block' : 'none'}}>
                <Grid container>
                    <Grid item xs={6} style={{padding: '5px'}}>
                        <img src={`data:image/jpeg;base64,${this.props.gridDetails.images[0]}`} style={{width: '100%', height: "240px"}}/>
                    </Grid>
                    <Grid item xs={6} style={{padding: '5px', paddingLeft: '0px', paddingTop: '3px', position: 'relative'}}>
                        {this.props.gridDetails.images.length <= 1 ?
                        <div>
                            <img src={addMoreImage} style={{width: '100%', height: "242px"}}/>
                            <TextField
                                id="file-new"
                                placeholder="Updated file"
                                type="file"
                                accept=".jpg"
                                onChange={(event) => this.handleUpload(event)}
                                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, color: 'transparent' }}
                                InputProps={{
                                className: classes.input,
                                spellCheck: false,
                                disableUnderline: true,
                                readOnly: true,
                                }}
                            />
                        </div> :
                        <div>
                            <Grid container>
                                {this.props.gridDetails.images.map((image, index) =>
                                    <Grid item xs={4} style={{padding: '3px'}}>
                                        <img src={`data:image/jpeg;base64,${image}`} style={{width: '100%', height: "75px"}}/>
                                    </Grid>
                                )}
                                {this.props.gridDetails.images.length < 9 && <Grid item xs={4} style={{padding: '3px', position: 'relative'}}>
                                    <img src={addMoreImage} style={{width: '100%', height: "75px"}}/>
                                    <TextField
                                        placeholder="Updated file"
                                        type="file"
                                        accept=".jpg"
                                        onChange={(event) => this.handleUpload(event)}
                                        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, color: 'transparent' }}
                                        InputProps={{
                                        className: classes.input,
                                        spellCheck: false,
                                        disableUnderline: true,
                                        readOnly: true,
                                        }}
                                    />
                                </Grid>}
                            </Grid>
                        </div>}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Product Title"
                            placeholder="Enter Title"
                            className={classes.textField}
                            value={this.props.gridDetails.title}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment/>,
                            }}
                            onChange={(e) => this.props.handleDetailsChange(e.target.value, this.props.gridDetails.id, 'title')}
                        />
                        <TextField
                            label="Price"
                            placeholder="Enter Price"
                            className={classes.textField}
                            value={this.props.gridDetails.price}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹ </InputAdornment>,
                            }}
                            onChange={(e) => this.props.handleDetailsChange(e.target.value, this.props.gridDetails.id, 'price')}
                            type="number"
                        />
                        <TextField
                            label="Offer Price"
                            placeholder="Enter Offer Price"
                            className={classes.textField}
                            value={this.props.gridDetails.offerPrice}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹ </InputAdornment>,
                            }}
                            onChange={(e) => this.props.handleDetailsChange(e.target.value, this.props.gridDetails.id, 'offerPrice')}
                            type="number"
                        />
                        <TextField
                            label="Inventory"
                            placeholder="Enter Inventory"
                            className={classes.textField}
                            value={this.props.gridDetails.inventory}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment/>,
                            }}
                            onChange={(e) => this.props.handleDetailsChange(e.target.value, this.props.gridDetails.id, 'inventory')}
                            type="number"
                        />
                        <TextField
                            label="Description"
                            placeholder="Enter Description for Product"
                            className={classes.textField}
                            value={this.props.gridDetails.description}
                            margin="normal"
                            multiline
                            rows="3"
                            onChange={(e) => this.props.handleDetailsChange(e.target.value, this.props.gridDetails.id, 'description')}
                            InputProps={{
                                startAdornment: <InputAdornment/>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {this.props.gridDetails.varient ? 
                        <span/> :
                            <img src={addMoreVarient} style={{width: '100%', height: "240px"}}/>
                        }
                    </Grid>
                </Grid>
                <span style={{
                    position: 'absolute',
                    background: '#4587ff', 
                    width: '60px', 
                    height: '40px', 
                    bottom: 0,
                    right: 0}}
                    onClick={this.saveChanges}
                    >
                    <ArrowRight style={{marginLeft: '20px', marginTop: '7px'}}/>
                </span>
            </Paper>
        );
    }
}

export default withStyles(styles)(ItemDetails);

