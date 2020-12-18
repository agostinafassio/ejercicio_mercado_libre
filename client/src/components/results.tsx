import React from 'react';
import {Breadcrumb} from './generic';
import {server} from '../App';
import ic_shipping from '../images/ic_shipping.png';

type ResultsProps = {
};
type ResultsState = {
    results: any,
    categories: [],
    error: boolean
};
export class Results extends React.Component<ResultsProps, ResultsState> {
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
        })
        .catch(err => {
            this.setState({error: true});
        });
    }

    render() {
        if(this.state){
            if(!this.state.error){
                return (
                    <div id="results">
                        <div id="results_content">
                            <Breadcrumb categories={this.state.categories}/>
                            {this.state.results}
                        </div>
                    </div>
                );
            }
            else{
                return <div className="error">Error de api</div>;
            }
        }
        else{
            return <div className="loading">Cargando...</div>;
        }
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