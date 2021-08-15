import axios from 'axios';
import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const DeleteCustomer = (props) => {

    
    const {open,openModal,id,fetchCustomers} = props;


    //console.log(id);

    const deleteStaff = (id) => {
        axios.delete(`Customers/DeleteCustomer/${id}`)
        .then( () => {
          console.log("deleted");
          openModal(false);
          fetchCustomers();
          
        })
        .catch( (err) => {
          console.log(err);
        })

      }

    


    return (  

  
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
          <Button color='black' onClick= {()=> openModal(false)} >
            Cancel
          </Button>
          <Button
            content="Delete"
            labelPosition='right'
            icon='checkmark' 
            positive
            onClick = {() => deleteStaff(id)}
          />
        </Modal.Actions>
      </Modal>
   
    );
}
 
export default DeleteCustomer;