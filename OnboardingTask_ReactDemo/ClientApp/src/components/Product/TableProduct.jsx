import  React, { Component, Fragment } from "react";
import {Table, Button, Pagination, Dropdown, Grid} from 'semantic-ui-react'
import { EditProduct} from "./EditProduct"
import { DeleteProduct } from "./DeleteProduct";



export class TableProduct extends Component {
    constructor(props){
        super(props);

       
        this.state = {
          
            isOpenDeleteModal : false,
            isOpenEditModal : false,

            tempId : null,
            tempName : null,
            tempPrice: null,

            currentPage : 1,
            productPerPage : 5

        }
    }


    openEditModal = ()=> {
        this.setState({
            isOpenEditModal : !this.state.isOpenEditModal
        })
    }

    openDeleteModal = ()=> {
        this.setState({
            isOpenDeleteModal : !this.state.isOpenDeleteModal,
        
        }) 
    }

   

    

    render () {

        const {products,fetchProducts} = this.props;
        const { 
                isOpenDeleteModal,
                isOpenEditModal,
                tempId,
                tempName,
                tempPrice,
                currentPage,
                productPerPage
            
            } = this.state;
                
        const indexOfLastCustomer = currentPage * productPerPage;    
        const indexOfFirstCustomer = indexOfLastCustomer - productPerPage;
        const currentPost = products.slice(indexOfFirstCustomer,indexOfLastCustomer);

        const numberOfChoices = [ 
            { key: 1, text : '1', value : 1},
            { key: 2, text : '2', value : 2},
            { key: 3, text : '3', value : 3},
            { key: 4, text : '4', value : 4},
            { key: 5, text : '5', value : 5},
            { key: 6, text : '6', value : 6},
            { key: 7, text : '7', value : 7},
            { key: 8, text : '8', value : 8},
            { key: 9, text : '9', value : 9},
            { key: 10, text : '10', value : 10},
        ]
        
        console.log(currentPost);
        return (
            <Fragment>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {currentPost.map((p) =>
                            <Table.Row key= {p.id}> 
                                <Table.Cell>{p.name}</Table.Cell>
                                <Table.Cell>{'$' + p.price}</Table.Cell>
                                <Table.Cell>                        
                                    <Button color='yellow' onClick = { () => {this.openEditModal(); this.setState( { tempId : p.id, tempName : p.name, tempPrice: p.price}) }} >Edit</Button>   
                                    <EditProduct open={isOpenEditModal} toggleModal={this.openEditModal} id={tempId} tempName = {tempName} tempPrice={tempPrice} fetchProducts={ () => fetchProducts()} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick = { () => {this.openDeleteModal(); this.setState( { tempId : p.id}) } }  >Delete</Button>  
                                    <DeleteProduct open={isOpenDeleteModal} toggleModal={this.openDeleteModal} id={tempId} fetchProducts={ () => fetchProducts()} />   
                                </Table.Cell>
                            </Table.Row>
                        )}      
                    </Table.Body> 
                    </Table>

            <Grid  >
                <Grid.Column width = {2}>
                    <Dropdown
                     compact
                     fluid
                     selection
                            options = {numberOfChoices}
                            onChange = {
                                (e) => {
                                    this.setState({
                                        productPerPage : e.target.innerText
                                    
                                    });
                                    console.log(this.state.productPerPage);
                                }
                            }
                     defaultValue = {productPerPage}
                            
                            
                    />

                </Grid.Column>
               
               <Grid.Column>
                    <Pagination defaultActivePage={1}
                            totalPages={ products.length / this.state.productPerPage }
                            
                            onPageChange = {
                                (e)=> {
                                    this.setState({
                                        currentPage : e.target.text
                                    });
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
        ) 
    }

}