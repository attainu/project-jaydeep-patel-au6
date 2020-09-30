import React from 'react'
import data from '../../data.json'
import Filter from './Filter'
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

    

    sortProducts = (e) => {
        
        const sort = e.target.value
        // console.log(sort)

        this.setState((state) =>({
            sort : sort,
            products : this.state.products.slice().sort((a,b) => 
                sort === "Lowest" ? 
                ((a.price < b.price) ? 1:-1):

                sort === "Highest" ? 
                ((a.price > b.price) ? 1:-1):

                //new item 
                ((a.id > b.id) ? 1:-1)
            )
        }))



    }


    filterProducts = (e) => {
        // console.log(e.target.value)

        if(e.target.value === ""){
            this.setState({ size: e.target.value, products: data.products });

        }else{
            
            this.setState({ 
                size: e.target.value,
                products: data.products.filter(
                    (product) => product.availableSizes.indexOf(e.target.value) >= 0
                ),
            })
           

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
                            <Filter 
                                count={this.state.products.length}
                                size={this.state.size}
                                sort={this.state.sort}
                                filterProducts={this.filterProducts}
                                sortProducts={this.sortProducts}
                            >

                            </Filter>
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
