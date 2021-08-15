import axios from "axios";
import React, {Component} from "react";
import { TableSales  } from "./TableSales";
import { Button } from "semantic-ui-react"
import { CreateSales } from "./CreateSales";

export class Sales extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            sales: [],
            customers: [],
            products: [],
            stores : [],
            openModal : false,
           
        }

    }

  

    componentDidMount(){
        console.log("Sales page mounted");
        this.fetchSales();
        this.fetchCustomers();
        this.fetchStores();
        this.fetchProducts();
    }

    fetchSales = () => {
        axios.get("Sales/GetSales")
        .then( ({data})=> {
            this.setState({
                sales : data
            });
        }).catch( (err) => {
            console.log(err);
        });
    }

    fetchCustomers = () => {
        axios.get("Customers/GetCustomers")
        .then( ({data})=> {
            this.setState({
                customers : data
            });
        }).catch( (err) => {
            console.log(err);
        });
    }

    fetchProducts = () => {
        axios.get("Products/GetProducts")
        .then( ({data})=> {
            this.setState({
                products : data
            });
        }).catch( (err) => {
            console.log(err);
        });
    }

    fetchStores = () => {
        axios.get("Stores/GetStores")
        .then( ({data})=> {
            this.setState({
                stores : data
            });
        }).catch( (err) => {
            console.log(err);
        });
    }

    toggleModal =() => {

        this.setState( {
            openModal : !this.state.openModal
        });

    }


    render(){

        const {sales,stores,customers,products,openModal } = this.state;
      

        return(
            <>
            <Button  color = 'blue' onClick = { ()=> {this.toggleModal()}}  > Create </Button>
            <TableSales sales = {sales} customers =  {customers} products = {products} stores = {stores} fetchSales={this.fetchSales}   />
            <CreateSales openModal={openModal} toggleModal={this.toggleModal} stores={stores} customers ={customers} products={products} fetchSales={this.fetchSales} />

            </>
        )
    }
}