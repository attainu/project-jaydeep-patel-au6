import React from 'react'
import data from '../../data.json'
import Products from './Products'

class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            products : data.products,
            size: '',
            sort: ''
        }
    }




    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href='/shopping'>Shopping with Recycal Yard</a>
                </header>
                <main>
                   <div className="content">
                       <div className="main">
                            <Products products={this.state.products}></Products>
                       </div>
                       <div className="sidebar">
                            cart itemsss
                       </div>

                   </div>
                </main>
                <footer>Develop by - Hemant Kumar Gupta & Jaydeep Patel</footer>
            </div>
    )
        }
}

export default Home
