import axios from 'axios';
import React, {useState} from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'

const CreateCustomer = (props) => {

    
    const {open,toggleModal,fetchCustomers} = props;
    
 
    const [customers, setCustomers] = useState( {

      name: "",
      address: "",

    } );
    console.log(customers);

    const handleCreateCustomer = (field,value) =>{
        setCustomers(
          {
            ...customers,
            [field]: value
          }
        );
    }

    


    const createStaff = () => {

      if(customers.name !== "" && customers.address !== ""){

     
        axios.post('Customers/PostCustomer', {
          name: customers.name,
          address: customers.address

        })
        .then(({data}) => {
            console.log(data);
            fetchCustomers();
            toggleModal();
        })
        .catch( (err) => {
            console.log(err);
        });
       
      }else {
        alert("Please fill in details.");
      }
    }

    return (  

    
  
        <Modal
            open = {open}
        >
        <Modal.Header>Create Customer</Modal.Header>
        <Modal.Content >
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder='First Name' onChange= {  (e)=> {handleCreateCustomer('name',e.target.value)}}/>
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input placeholder='Address' onChange={ (e) => {handleCreateCustomer('address',e.target.value)}} />
          </Form.Field>
        </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick= {()=> toggleModal()} >
            Cancel
          </Button>
          <Button
            content="Create"
            labelPosition='right'
            icon='checkmark' 
            positive
            onClick = {createStaff}
          />
        </Modal.Actions>
      </Modal>
   
    );
}
 
export default CreateCustomer;