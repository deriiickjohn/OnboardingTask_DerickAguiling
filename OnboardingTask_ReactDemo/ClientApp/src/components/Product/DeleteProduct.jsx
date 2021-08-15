import axios from 'axios';
import React ,{Component} from 'react';
import {Modal,Form,Button} from 'semantic-ui-react'


export class DeleteProduct extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

     deleteProduct = (id) => {
        axios.delete(`Products/DeleteProduct/${id}`)
        .then( () => {
            console.log("Deleted Product");
            this.props.fetchProducts();
            this.props.toggleModal();
        }).catch( (err)=> {
            console.log(err);
        });
    }


    render(){

        const {open,toggleModal} = this.props;

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
                        onClick = { ()=> this.deleteProduct(this.props.id)}   
                />
              </Modal.Actions>
            </Modal>
            </>
        )
    }

}