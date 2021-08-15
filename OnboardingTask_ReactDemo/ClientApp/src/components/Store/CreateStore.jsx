import React , {Component} from 'react'
import { Modal,Form, Button } from 'semantic-ui-react';
import axios from "axios";

export class CreateStore extends Component {
    constructor(props){
        super(props);

        this.state = {
            store : {
                name: "",
                address : ""
            }
        }
    }

    handleCreateStore = (field,value) => {
        this.setState( {

            store: {
                ...this.state.store,
                [field] : value

            }
            
        })
    }

    createStore = () => {

        if(this.state.store.name !== "" && this.state.store.address !== ""){
            axios.post('Stores/PostStore', {
                name : this.state.store.name,
                address: this.state.store.address
            }).then( ({data}) => {
                console.log(data);
                this.props.fetchStores();
                this.props.toggleModal();
            }).catch( (err) => {
                console.log(err);
            });
        }else {
            alert("Please fill in details.");
        }
      
    }

    render(){

        const {openModal,toggleModal} = this.props;
        console.log(this.state.store);
        return(
            <>
                <Modal
                
                open = {openModal}
                >
                <Modal.Header>Create Store</Modal.Header>
                <Modal.Content >
                <Form >
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => {this.handleCreateStore('name',e.target.value)}} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Address' onChange={ (e) => {this.handleCreateStore('address',e.target.value)}} />
                </Form.Field>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button color='black'
                
                onClick = {()=> toggleModal()}
                >
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark' 
                    positive
                    onClick = {(this.createStore)} 
                />
                </Modal.Actions>
            </Modal>
            </>
        )
    }
}