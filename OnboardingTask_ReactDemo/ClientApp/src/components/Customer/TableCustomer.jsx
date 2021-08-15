import React, {Fragment, useState} from 'react'
import {Table, Button, Grid, Dropdown, Pagination} from 'semantic-ui-react'
import DeleteCustomer from './DeleteCustomer'
import EditCustomer from './EditCustomer';



const TableCustomer = ({customers,fetchCustomers}) => {
        
    const [isOpenDeleteModal,setOpenDeleteModal] = useState(false);
    const [isOpenEditModal,setOpenEditModal] = useState(false);
    const [tempId,setId] = useState();
    const [tempName,setTempName] = useState();
    const [tempAddress,setTempAddress] = useState();


    const openDeleteModal = (value)=>{
        setOpenDeleteModal(value);
    }

    const openEditModal = (value) => {
        setOpenEditModal(value);
        
    }

   

    const [currentPage,setCurrentPage] = useState(1);
    const [customersPerPage,setCustomersPage] = useState(5);
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentPost = customers.slice(indexOfFirstCustomer,indexOfLastCustomer);


    const numberOfChoices = [ 
        {text : '1', value : 1},
        {text : '2', value : 2},
        {text : '3', value : 3},
        {text : '4', value : 4},
        {text : '5', value : 5},
        {text : '6', value : 6},
        {text : '7', value : 7},
        {text : '8', value : 8},
        {text : '9', value : 9},
        {text : '10', value : 10},
    ]

   
   
  


        return ( 
            <Fragment>
                <Table celled>


                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currentPost.map((c) =>
                            <Table.Row key= {c.id}> 
                                <Table.Cell>{c.name}</Table.Cell>
                                <Table.Cell>{c.address}</Table.Cell>
                                <Table.Cell>                        
                                    <Button color='yellow' onClick={()=>  {openEditModal(true); setId(c.id); setTempName(c.name); setTempAddress(c.address);}}  >Edit</Button>   
                                    <EditCustomer open={isOpenEditModal} openModal = {openEditModal} id = { tempId } tempName = {tempName} tempAddress = {tempAddress} fetchCustomers={ () => fetchCustomers()} />                                                 
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick={()=> {openDeleteModal(true); setId(c.id)}   } >Delete</Button>  
                                    <DeleteCustomer open={isOpenDeleteModal} openModal = {openDeleteModal} id = { tempId } fetchCustomers={ () => fetchCustomers()} />                                                    
                                </Table.Cell>
                            </Table.Row>
                        )}      
                    </Table.Body> 
                </Table>

           

        <Grid>
                <Grid.Column width = {2}>
                    <Dropdown
                     compact
                     fluid
                     selection
                            options = {numberOfChoices}
                            onChange = {
                                (e) => {
                                    setCustomersPage(e.target.innerText);
                                    
                                }
                            }
                     defaultValue = {customersPerPage}
                            
                            
                    />

                </Grid.Column>
               
               <Grid.Column>
                    <Pagination defaultActivePage={1}
                            totalPages={ customers.length / customersPerPage }
                            
                            onPageChange = {
                                (e)=> {
                                    setCurrentPage(e.target.text);
                                }
                            }

                            siblingRange={1}
                            nextItem = {null}
                            prevItem = {null}
                            firstItem = {null}
                            lastItem = {null}


                        />

               </Grid.Column>
                         
               </Grid>
             
                        
            </Fragment>
        );
 }

 export default TableCustomer;

 
