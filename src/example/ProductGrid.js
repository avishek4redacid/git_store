import React from 'react';
import GridItem from './GridItem'
import Grid from '@material-ui/core/Grid'
export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            showDetails: false,
            input: '',
            tree:[],
        };
        this.handleGridClick = this.handleGridClick.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleDetailsChange = this.handleDetailsChange.bind(this);
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        self = this;
        fetch(`/fetch-data`, {method: 'GET'}).then(res => res.json())
        .then(
            (result) => {
                self.setState({tree: []}, () => {
                    console.log("came inside");
                    self.setState({tree: result})
                })
            },
            (error) => {
                
            }
        )
    }

    handleDetailsChange(value, id, property) {
        const tree = [...this.state.tree];
        for(var i in tree) {
            var node = tree[i];
            if(node.id == id) {
                node[property] = value;
                this.setState({tree});
            }
        }
    }

    handleGridClick(id) {
        this.setState({selectedId: id,showDetails: true});
    }

    render() {
        const self = this;
        return (
            <div style={{padding: '20px'}}>
                <Grid container  spacing={16}>
                    {this.state.tree.map(c => 
                        <Grid >
                            <GridItem 
                            key={c.id} 
                            gridDetails={c}
                            selectedId={this.state.selectedId}
                            showDetails={this.state.showDetails}
                            handleGridClick={this.handleGridClick} 
                            fetchData={this.fetchData}
                            handleDetailsChange={this.handleDetailsChange}
                            closeModal={() => this.setState({selectedId: null})}
                            />
                        </Grid>
                    )}
                </Grid>
            </div>);
    }
}
