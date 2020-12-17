import React from 'react';
import logo from '../images/Logo_ML.png';
import search_icon from '../images/ic_Search.png';

export class Search extends React.Component {
    search = () => {
        let input:string = (document.querySelector('input[name="search"]') as HTMLInputElement).value;
        if(input){
            input = encodeURIComponent(input);
            window.location.href = 'items?search=' + input;
        }
    };

    render() {
        return (
            <div id="search">
                <a href="/"><img src={logo} alt="logo"/></a>
                <input name="search" type="text" placeholder="Nunca dejes de buscar"/>
                <span onClick={this.search}>
                    <img src={search_icon} alt="search icon"/>
                </span>
            </div>
        );
    }
}