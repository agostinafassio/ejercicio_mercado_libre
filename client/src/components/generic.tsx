import React from 'react';

type BreadcrumbProps = {
    categories: [];
};
type BreadcrumbState = {
};
export class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
    render() {
        return (
            <div id="breadcrumb">
                {this.props.categories && this.props.categories.join(' > ')}
            </div>
        );
    }
}