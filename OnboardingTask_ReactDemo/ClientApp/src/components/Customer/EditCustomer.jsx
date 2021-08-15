import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'


const EditCustomer = (props) => {

const {open,openModal,id,fetchCustomers,tempAddress,tempName} = props;


const [customer, setCustomer] = useState({
  name: "",
  address: ""
});


const handleEditCustomer = (field,value) => {

  setCustomer( {
    ...customer,
    [field]: value
  });


}



const editCustomer = (id) => {


    if(customer.name !== "" && customer.address !== ""){
    
      axios.put(`Customers/PutCustomer/${id}`,  {
        id : id,
        name : customer.name,
        address : customer.address
      }).then((data)=> {
        
          console.log(data);
          updateTable();
        }).catch( (err) => {
          console.log(err);
        });
    }else {
      alert("Please change something, if not please press cancel.");
  }
}

const updateTable= () => {
  openModal(false);
  fetchCustomers()
}



    return (  
        <Modal
            open = {open} 
            onMount = { () => {

              if(customer.name === "" || customer.address === "" ){

                  
                const updateCustomer = {
                     ...customer, 
                    name : tempName,
                    address : tempAddress
                  
                }
                ;

                setCustomer(updateCustomer)
                
              }
          }}
        >
          <Modal.Header>Edit Customer</Modal.Header>
          <Modal.Content >
          <Form>
            <Form.Field>
              <label>Name</label>
              <input placeholder='First Name' onChange = { (e) => handleEditCustomer('name',e.target.value)} defaultValue={tempName}  ></input>
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input placeholder='Address' onChange = { (e) => handleEditCustomer('address',e.target.value)} defaultValue={tempAddress}  />
            </Form.Field>
          </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick= {()=> openModal(false)} >
              Cancel
            </Button>
            <Button
              content="Edit"
              labelPosition='right'
              icon='checkmark' 
              positive
              onClick = { () => editCustomer(id)}
            />
          </Modal.Actions>
      </Modal>
   
    );
}
 
export default EditCustomer;