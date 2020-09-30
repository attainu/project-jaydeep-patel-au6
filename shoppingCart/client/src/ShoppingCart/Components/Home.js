import React from 'react'
import data from '../../data.json'
import Cart from './Cart'
import Filter from './Filter'
import Products from './Products'

class Home extends React.Component {

    constructor(){
        super()
        this.state = {
            products : data.products,
            size: '',
            sort: '',
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
        }
       
    }

    removeFromCart = (product) => {
        const cartItems =  this.state.cartItems.slice()
        this.setState({ 
            cartItems: cartItems.filter((x) => x._id !== product._id)
        })
        localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)))
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice()
        let alreadyInCart = false

        cartItems.forEach((item) => {
            if(item._id === product._id){
                item.count++
                alreadyInCart = true
            }
        })

        if(!alreadyInCart){
            cartItems.push({...product, count: 1})
        }

        this.setState({cartItems})
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
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
                            <Products 
                                products={this.state.products}
                                addToCart={this.addToCart}
                            >

                            </Products>
                       </div>
                       <div className="sidebar">
                            <Cart 
                                cartItems={this.state.cartItems}
                                removeFromCart={this.removeFromCart}
                            
                            >

                            </Cart>
                       </div>

                   </div>
                </main>
                <footer>Develop by - Hemant Kumar Gupta & Jaydeep Patel</footer>
            </div>
    )
        }
}

export default Home
