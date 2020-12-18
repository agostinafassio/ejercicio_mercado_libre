import React from 'react';
import logo from '../images/Logo_ML.png';
import search_icon from '../images/ic_Search.png';

export class Search extends React.Component {
    state = {search: ''};

    componentDidMount(){
        const params = new URLSearchParams(window.location.search);
        const search = params.get('search');
        if(search){
            this.setState({search: decodeURIComponent(search)});
        }
    }

    search = () => {
        let input:string = (document.querySelector('input[name="search"]') as HTMLInputElement).value;
        if(input){
            input = encodeURIComponent(input);
            window.location.href = 'items?search=' + input;
        }
    };

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            this.search();
        }
    }

    render() {
        return (
            <div id="search">
                <a href="/"><img src={logo} alt="logo"/></a>
                <input name="search" type="text" placeholder="Nunca dejes de buscar" defaultValue={this.state.search} onKeyDown={this.handleKeyDown}/>
                <span onClick={this.search}>
                    <img src={search_icon} alt="search icon"/>
                </span>
            </div>
        );
    }
}