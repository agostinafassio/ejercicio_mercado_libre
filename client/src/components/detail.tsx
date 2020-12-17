import React from 'react';
import {Breadcrumb} from './generic';
import {server} from '../App';

export class Detail extends React.Component {
    state = {result: []};

    componentDidMount(){
        fetch(server + "/api" + window.location.pathname)
        .then(res => res.json())
        .then(json => {
            this.setState({result: json.item, categories: json.categories});
        });
    }

    render() {
        return (
            <div id="detail">
                <Breadcrumb/>
                <DetailBox properties={this.state.result}/>
            </div>
        );
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
                    <div id="detail_box_content">
                        <div id="detail_box_content_head">
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
                        <div id="detail_box_content_body">
                            <div>Descripci&oacute;n del producto</div>
                            <div><pre>{this.props.properties.description}</pre></div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return '';
        }
    }
}