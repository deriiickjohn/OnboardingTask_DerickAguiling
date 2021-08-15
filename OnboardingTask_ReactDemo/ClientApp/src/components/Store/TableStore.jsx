import React, {Component} from 'react'
import {Table,Button, Grid,Pagination,Dropdown} from 'semantic-ui-react'
import { DeleteStore } from './DeleteStore';
import { EditStore } from './EditStore';

export class TableStore extends Component {
    constructor(props){
        super(props);

        this.state = {

            isOpenDeleteModal : false,
            isOpenEditModal : false,

            tempId : null,
            tempName: null,
            tempAddress: null,

            currentPage : 1,
            storePerPage : 5

            

        }
    }

    openEditModal = () => {
        this.setState({
            isOpenEditModal : !this.state.isOpenEditModal
        })
    }

    openDeleteModal = () => {
        this.setState({
            isOpenDeleteModal : !this.state.isOpenDeleteModal
        })
    }

    render() {
        const {stores,fetchStores} = this.props;
        const  {isOpenDeleteModal,
                isOpenEditModal,
                tempId,
                tempName,
                tempAddress,
                currentPage,
                storePerPage
            
            } = this.state;


        const indexOfLastStore = currentPage * storePerPage;
        const indexOfFirstStore = indexOfLastStore - storePerPage;
        const currentStores = stores.slice(indexOfFirstStore,indexOfLastStore);


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

        return (
            <>
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
                        {currentStores.map((s) =>
                            <Table.Row key= {s.id}> 
                                <Table.Cell>{s.name}</Table.Cell>
                                <Table.Cell>{s.address}</Table.Cell>
                                <Table.Cell>                        
                                    <Button color='yellow' onClick = { () => {this.openEditModal(); this.setState( { tempId : s.id, tempName: s.name, tempAddress:s.address}) }} >Edit</Button>   
                                    <EditStore open={isOpenEditModal} toggleModal={this.openEditModal} id={tempId} tempName={tempName} tempAddress = {tempAddress} fetchStores={fetchStores} />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick = { () => {this.openDeleteModal(); this.setState( { tempId : s.id}) } }  >Delete</Button>  
                                    <DeleteStore open={isOpenDeleteModal} toggleModal={this.openDeleteModal} id={tempId} fetchStores={fetchStores} />
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
                                                storePerPage : e.target.innerText
                                            
                                            });
                                            console.log(this.state.storePerPage);
                                        }
                                    }
                            defaultValue = {storePerPage}
                                    
                                    
                            />

                        </Grid.Column>
                    
                        <Grid.Column>
                                <Pagination defaultActivePage={1}
                                        totalPages={ stores.length / this.state.storePerPage }
                                        
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