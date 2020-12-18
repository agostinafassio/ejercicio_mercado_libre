import React from 'react';
import {Breadcrumb} from './generic';
import {server} from '../App';

type DetailProps = {
};
type DetailState = {
    properties: any,
    categories: [],
    error: boolean
};
export class Detail extends React.Component<DetailProps, DetailState> {
    componentDidMount(){
        fetch(server + "/api" + window.location.pathname)
        .then(res => res.json())
        .then(json => {
            this.setState({properties: json.item, categories: json.categories});
        })
        .catch(err => {
            this.setState({error: true});
        });
    }

    render() {
        if(this.state){
            if(!this.state.error){
                return (
                    <div id="detail">
                        <div id="detail_content">
                            <Breadcrumb categories={this.state.categories}/>
                            <DetailBox properties={this.state.properties}/>
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

type DetailBoxProps = {
    properties: any;
};
type DetailBoxState = {
};
class DetailBox extends React.Component<DetailBoxProps, DetailBoxState> {
    render() {
        if(this.props.properties.id){
            return (
                <div id="detail_box">
                    <div id="detail_box_head">
                        <div>
                            <img src={this.props.properties.picture} alt={this.props.properties.title}/>
                        </div>
                        <div>
                            <div className="condition">{(this.props.properties.condition == 'new' ? 'Nuevo' : 'Usado') + ' - ' + this.props.properties.sold_quantity + ' vendidos'}</div>
                            <div className="title">{this.props.properties.title}</div>
                            <div className="price">{'$ ' + this.props.properties.price.amount.toLocaleString('es-AR')}</div>
                            <span className="button">Comprar</span>
                        </div>
                    </div>
                    <div id="detail_box_body">
                        <div>Descripci&oacute;n del producto</div>
                        <div><pre>{this.props.properties.description}</pre></div>
                    </div>
                </div>
            );
        }
        else{
            return null;
        }
    }
}