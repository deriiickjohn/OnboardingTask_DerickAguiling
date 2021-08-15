import axios from 'axios';
import React, {Component} from 'react'
import { TableStore } from './TableStore';
import {Button} from 'semantic-ui-react'
import {CreateStore}  from './CreateStore';


export class Store extends Component {
    constructor(props){
        super(props);

        this.state = {
            stores: [],
            openModal : false
        }
    }

    componentDidMount() {
        console.log("Store page mounted");
        this.fetchStores();
    }

    fetchStores = () => {
        axios.get("Stores/GetStores")
        .then( ({data}) => {
            console.log(data);
            this.setState( {
                stores : data
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    toggleModal = () => {
        this.setState( {
            openModal : !this.state.openModal
        });
    }


    render() {

    //const {stores,openModal} = this.state;

        return(
            <>
                <Button color='blue' onClick={ () => this.toggleModal()}>Create Store</Button>
                <TableStore stores = {this.state.stores} fetchStores= {this.fetchStores}/>
                <CreateStore openModal= {this.state.openModal} toggleModal={this.toggleModal} fetchStores= {this.fetchStores} />
            </>
        )
    }

}