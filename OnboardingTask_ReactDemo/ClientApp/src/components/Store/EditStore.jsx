import React , {Component} from 'react'
import { Modal,Button, Form } from 'semantic-ui-react';
import axios from 'axios';

export class EditStore extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            stores : {
                name : '',
                address: ''
            }
        }
    }

    handleEditStore = (field,value) => {
        this.setState({
            stores: {
                ...this.state.stores,
                [field] : value
            }
        });
    }


    editStore = (id) => {

        if(this.state.stores.name !== "" && this.state.stores.address !== ""){
            axios.put(`Stores/PutStore/${id}`, {
                id : id,
                name : this.state.stores.name,
                address : this.state.stores.address
            }
        ).then( (data)=> {
            console.log(data);
            this.props.fetchStores();
            this.props.toggleModal();
        }).catch( (err) => {
            console.log(err);
        });

        }else {
            alert("Please change something, if not please press cancel.");
        }

    }


    render(){

        const {open,toggleModal,id} = this.props;
        console.log(this.state.stores);
        return(
            <>
            <Modal
                open = {open}
                onMount = { () => {

                    if(this.state.stores.name === "" || this.state.stores.price === "" ){

                        
                        this.setState(prevState => ({
                            stores: {                   
                                ...prevState.stores,    
                                name: this.props.tempName       
                            }
            
                            
                        }))
            
                        this.setState(prevState => ({
                            stores: {                   
                                ...prevState.stores,   
                                address: this.props.tempAddress
                            }
            
                            
                        }))
                    }
                }}
            >
              <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content >
                <Form>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange = { (e) => this.handleEditStore('name',e.target.value)} defaultValue={this.props.tempName} />
                    </Form.Field>
                    <Form.Field>
                    <label>Store</label>
                    <input placeholder='Price' onChange = { (e) => this.handleEditStore('address',e.target.value)}  defaultValue={this.props.tempAddress}/>
                    </Form.Field>     
                </Form>
                </Modal.Content>
              <Modal.Actions>
                <Button color='black' 
                        onClick={ ()=> toggleModal()}
                        >
                  Cancel
                </Button>
                <Button content="Edit"
                        labelPosition='right'
                        icon='checkmark' 
                        positive
                        onClick={ ()=> this.editStore(id)}
                />
              </Modal.Actions>
            </Modal>

            </>
        )
    }
}