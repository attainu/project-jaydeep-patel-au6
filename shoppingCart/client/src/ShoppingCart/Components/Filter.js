import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">Total Item - {this.props.count}</div>
                <div className="filter-sort">
                    {""}
                    order
                    <select className="" value={this.props.sort} onChange={this.props.sortProducts}>
                        <option value="Latest">Latest</option>
                        <option value="Lowest">Lowest</option>
                        <option value="Highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                Filter
                <select className="" value={this.props.size} onChange={this.props.filterProducts}>
                    <option value="All">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                </div>
            </div>
        )
    }
}
