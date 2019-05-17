import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography, Divider } from '@material-ui/core';
import ItemDetails from './ItemDetails';

export default class GridItem extends React.Component {
    state = {
        input: '',
    }; 
    render() {
        return (
            <div style={{position: 'relative', margin: '10px'}}>
                <Paper style={{width: '260px', height: '320px'}} onClick={() => this.props.handleGridClick(this.props.gridDetails.id)}>
                    <img src={`data:image/jpeg;base64,${this.props.gridDetails.images[0]}`} style={{width: '100%', height: "240px"}}/>
                    <div style={{padding: '10px'}}>
                        <Typography variant="caption" style={{paddingBottom: '10px'}}>{this.props.gridDetails.title}</Typography>
                        <Divider/>
                        <Typography variant="caption" style={{paddingTop: '10px'}}> ₹ {this.props.gridDetails.price}</Typography>
                    </div>
                </Paper>
                <ItemDetails
                    gridDetails={this.props.gridDetails}
                    showDetails={this.props.gridDetails.id == this.props.selectedId && this.props.showDetails}
                    fetchData={this.props.fetchData}
                    handleDetailsChange={this.props.handleDetailsChange}
                    closeModal={this.props.closeModal}
                    />
            </div>);
    }
}
