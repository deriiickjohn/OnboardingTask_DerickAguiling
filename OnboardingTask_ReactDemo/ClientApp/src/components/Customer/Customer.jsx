import axios from 'axios';
import React, {Component, Fragment} from 'react'
import { Button } from 'semantic-ui-react';
import CreateCustomer from './CreateCustomer';
import TableCustomer from './TableCustomer'

export class Customer extends Component {

    constructor(props){
        super(props);

        this.state = {
            customers: [],
            openModal: false
        }

    }
    
    toggleModal = () => {
        this.setState( {

            openModal : !this.state.openModal
        });
    }


    componentDidMount() {

        console.log("Mounted");
        this.fetchCustomers();
    }

    fetchCustomers = () => {

        axios.get("Customers/GetCustomers")
        .then( ({data}) => {

            console.log(data);
            
            this.setState(
                {
                 customers: data
                }
               
            );
            
        }).catch((err)=> {

            console.log(err);

        });

    }

   


    render () {

       const {customers} = this.state;

        return (
            <Fragment>
                <CreateCustomer open={this.state.openModal} toggleModal={this.toggleModal} fetchCustomers={this.fetchCustomers}/>
                <Button color='blue' onClick={ () => this.toggleModal()}>Create</Button>
                <TableCustomer customers={customers} fetchCustomers={this.fetchCustomers} ></TableCustomer>
            </Fragment> 
        )

    }


}


