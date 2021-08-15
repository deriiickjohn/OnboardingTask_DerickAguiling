import React, {Component} from 'react'
import {Modal,Button,Form} from 'semantic-ui-react'
import axios from 'axios'


export class DeleteStore extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    deleteStore= (id) => {
        axios.delete(`Stores/DeleteStore/${id}`)
        .then( ()=> {
            console.log("Deleted Store");
            this.props.fetchStores();
            this.props.toggleModal();
        });
    }

    render() {

        const {open,toggleModal,id} = this.props;

        return(
            <>
            <Modal
            open = {open}
            >
              <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content >
                <Form>
                  <Form.Field>
                    <h3>Are you sure?</h3>
                  </Form.Field>        
                </Form>
                </Modal.Content>
              <Modal.Actions>
                <Button color='black' 
                        onClick= {()=> toggleModal()} >
                  Cancel
                </Button>
                <Button content="Delete"
                        labelPosition='right'
                        icon='checkmark' 
                        positive
                        onClick = { ()=> this.deleteStore(id)}   
                />
              </Modal.Actions>
            </Modal>
            </>
        )
    }
}