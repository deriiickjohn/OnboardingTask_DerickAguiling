import React, {Component} from 'react'
import {Table,Button, Grid,Dropdown,Pagination} from 'semantic-ui-react'
import { EditSales } from './EditSales';
import { DeleteSales } from './DeleteSales'

export class TableSales extends Component {
    constructor(props){
        super(props);

       
        this.state = {
          
            isOpenDeleteModal : false,
            isOpenEditModal : false,
            
            tempId : null,
            tempDate : null,
            tempCustomerName : "",
            tempProductName: "",
            tempStoreName: "",

            currentPage : 1,
            salePerPage : 5

        }
    }


    openEditModal = ()=> {
        this.setState({
            isOpenEditModal : !this.state.isOpenEditModal
        })
        console.log(this.state.isOpenEditModal);
    }

    openDeleteModal = ()=> {
        this.setState({
            isOpenDeleteModal : !this.state.isOpenDeleteModal,
        
        }) 
    }

    
    render(){


        const {sales,customers,products,stores,fetchSales} = this.props;
        const { 
                isOpenDeleteModal,
                isOpenEditModal,
                tempId,
                tempDate,
                tempCustomerName,
                tempProductName,
                tempStoreName,
                currentPage,
                salePerPage
            
            } = this.state;

            const indexOfLastStore = currentPage * salePerPage;
            const indexOfFirstStore = indexOfLastStore - salePerPage;
            const currentSales = sales.slice(indexOfFirstStore,indexOfLastStore);
    
    
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
    


        console.log(sales);
        return(
            <>
            <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
 
                        currentSales.map((s) => 
                             <Table.Row key= {s.id}>                
                                <Table.Cell>{s.customer.name}</Table.Cell>
                                <Table.Cell>{s.product.name}</Table.Cell>
                                <Table.Cell>{s.store.name}</Table.Cell>
                                <Table.Cell>{s.dateSold.slice(0,10)}</Table.Cell>
                                <Table.Cell>                        
                                    <Button color='yellow' 
                                    onClick = { () => {this.openEditModal(); 
                                                       this.setState( { tempId : s.id, 
                                                                        tempDate: s.dateSold.slice(0,10),
                                                                        tempCustomerName : s.customer.name,
                                                                        tempProductName:s.product.name,
                                                                        tempStoreName: s.store.name}) }} >Edit</Button>                                      
                                    <EditSales open={isOpenEditModal} toggleModal={ () => this.openEditModal()} id={tempId} customerName = {tempCustomerName} productName = {tempProductName} storeName = {tempStoreName} fetchSales={ () => fetchSales()} date = {tempDate} sales = {sales}  customers =  {customers} products = {products} stores = {stores} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick = { () => {this.openDeleteModal(); this.setState( { tempId : s.id}) } }  >Delete</Button>  
                                    <DeleteSales open={isOpenDeleteModal} toggleModal={ () => this.openDeleteModal()} id={tempId} fetchSales={ () => fetchSales()}  />
                               
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
                                    salePerPage : e.target.innerText
                                
                                });
                                
                            }
                        }
                defaultValue = {salePerPage}
                        
                        
                />

            </Grid.Column>

            <Grid.Column>
                    <Pagination defaultActivePage={1}
                            totalPages={ this.props.sales.length / this.state.salePerPage }
                            
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
            </>             
        )
    }
}