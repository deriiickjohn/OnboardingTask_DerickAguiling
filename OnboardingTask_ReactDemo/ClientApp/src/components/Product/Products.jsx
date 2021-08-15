import axios from 'axios';
import React,{Component, Fragment} from 'react';
import { CreateProduct } from './CreateProduct';
import { TableProduct } from './TableProduct';
import {Button} from 'semantic-ui-react';


export class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            products: [],
            openModal : false,
           

        }

    }

      
    toggleModal = () =>{
        this.setState( {
            openModal : !this.state.openModal
        });
    }

    componentDidMount() {
        console.log("Product page mounted");
        this.fetchProducts();
    }

    fetchProducts = () => {
        axios.get("Products/GetProducts")
        .then( ({data}) => {
            console.log(data);
            this.setState( {
                products : data
            });
         
        }).catch( (err) => {
            console.log(err);
        });

    }

    render () {

        const {products, openModal } = this.state;

        return (
            <Fragment>
                <Button color='blue' onClick={ () => this.toggleModal()}>Create Product</Button>
                <CreateProduct openModal={openModal} toggleModal= {this.toggleModal}  fetchProducts={this.fetchProducts}/>
                <TableProduct  products= {products} fetchProducts={this.fetchProducts}  />
            </Fragment>
        )

    }




}