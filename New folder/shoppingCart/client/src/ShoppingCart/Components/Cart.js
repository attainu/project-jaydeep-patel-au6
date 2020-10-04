import React, { Component } from 'react'
import formatCurrancy from './util.js'

export default class Cart extends Component {

    constructor(props){
        super(props)
        this.state = { showCheckout: false }
    }



    render() {

        const { cartItems } = this.props

        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is Empty</div>
                ) : (
                    <div className="cart cart-header">
                        You have {cartItems.length} items in cart {" "}
                    </div>
                )}

                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div className="">{item.title}</div>
                                        <div className="right">{formatCurrancy (item.price)} X {item.count}&nbsp;
                                        <button className="button" onClick={() => {this.props.removeFromCart(item)}}>
                                            Remove
                                        </button>
                                        </div>
                                        
                                    </div>



                                </li>
                            ))}

                        </ul>

                    </div>

                    {cartItems.length !== 0 && (
                        <div>
                        <div className="cart">
                          <div className="total">
                            <div>
                              Total : {" "}
                              {formatCurrancy(
                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                              )}
                            </div>
                            <button
                              onClick={() => {
                                this.setState({ showCheckout: true });
                              }}
                              className="button primary"
                            >
                              Proceed
                            </button>
                          </div>
                        </div>
                        
                        </div>
                    )}
                </div>

                
            </div>


            
        )
    }
}
