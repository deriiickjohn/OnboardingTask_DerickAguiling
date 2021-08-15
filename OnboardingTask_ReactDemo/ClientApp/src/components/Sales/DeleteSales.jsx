import React, {Component} from 'react'
import { Modal,Button, Form } from 'semantic-ui-react';
import axios from 'axios'

export class DeleteSales extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    deleteSales = (id) => {
        axios.delete(`Sales/DeleteSale/${id}`)
        .then( () => {
            console.log("Deleted Product");
            this.props.fetchSales();
            this.props.toggleModal();
        }).catch( (err)=> {
            console.log(err);
        });
    }


    render() {


        const {open,toggleModal,id} = this.props;

        return (
            <>
            <Modal
            open = {open}
            >
              <Modal.Header>Delete Sale</Modal.Header>
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
                        onClick = { ()=> this.deleteSales(id)}   
                />
              </Modal.Actions>
            </Modal>


            </>
        )
    }
}