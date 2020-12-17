import React from 'react';
import {Breadcrumb} from './generic';
import {server} from '../App';
import ic_shipping from '../images/ic_shipping.png';

export class Results extends React.Component {
    state = {results: []};

    componentDidMount(){
        const params = new URLSearchParams(window.location.search);
        fetch(server + "/api/items?q=" + params.get('search'))
        .then(res => res.json())
        .then(json => {
            let results = [];
            for(let result of json.items){
                results.push(<ResultRow key={result.id} properties={result}/>);
            } 
            this.setState({results: results, categories: json.categories});
        });
    }

    render() {
        return (
            <div id="results">
                <div id="results_content">
                    <Breadcrumb/>
                    {this.state.results}
                </div>
            </div>
        );
    }
}

type ResultRowProps = {
    properties: any;
};
type ResultRowState = {
};
class ResultRow extends React.Component<ResultRowProps, ResultRowState> {
    render() {
        return (
            <div className="result_row">
                <div>
                    <a href={"/items/" + this.props.properties.id}><img src={this.props.properties.picture} alt={this.props.properties.title}/></a>
                </div>
                <div>
                    <span className="location">Buenos Aires</span>
                    <span className="price">{'$ ' + this.props.properties.price.amount.toLocaleString('es-AR')}{this.props.properties.free_shipping && <img src={ic_shipping} alt="free shipping"/>}</span>
                    <a href={"/items/" + this.props.properties.id}><span className="title">{this.props.properties.title}</span></a>
                </div>
            </div>
        );
    }
}