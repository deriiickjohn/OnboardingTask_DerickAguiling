import axios from 'axios';
import React, { Component } from 'react'
import { Modal,Form,Button, Dropdown, Label } from 'semantic-ui-react';



export class CreateSales extends Component {
    constructor(props){
        super(props);

              this.state = {

            sales : {
                dateSold : "",
                customerId : "",
                productId : "",
                storeId : ""
            }

            
        }
    }

   
   
    componentDidUpdate() {
        //this.defaultDate();
    }
   


    handleCreateSales = (field,value) => {
        this.setState( {
            sales :  {
                ...this.state.sales,
                [field] : value
            }
        } );
    }

    createSales = () => {

        if(this.state.sales.dateSold !== "" && this.state.sales.customerId !== "" && this.state.sales.productId !== "" && this.state.sales.storeId !== ""){
            axios.post('Sales/PostSale', {
                datesold : this.state.sales.dateSold,
                customerid : this.state.sales.customerId,
                productid : this.state.sales.productId,
                storeid: this.state.sales.storeId
            }).then( ({data}) => {
                console.log(data);
                this.props.fetchSales();
                this.props.toggleModal();
            }).catch( (err ) => {
                console.log(err);
            });


        }else {
            alert("Please fill in details.");
        }
    
    }


    defaultDate = () => {
        var today = new Date();

        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
         
        this.setState({
            sales:{
                dateSold: date
            }
        });

       
    }




    render() {

        const {openModal,toggleModal,stores,customers,products} = this.props;

        var customerMapped = customers.map( (c)=>  ({

            key : c.id,
            value : c.name,
            text : c.name
            
         } )
        );

        var productsMapped = products.map( (p)=>  ({

            key : p.id,
            value : p.name,
            text : p.name
            
         } )
        );

        var storesMapped = stores.map( (s)=>  ({

            key : s.id,
            value : s.name,
            text : s.name
            
         } )
        );

        console.log(this.state.sales);


        return(
            <>

            <Modal
                
                open = {openModal}
               
                >
                <Modal.Header>Create Sale</Modal.Header>
                <Modal.Content >
                <Form >

                    <Form.Field>
                        <label>Date sold</label>
                        <input placeholder='YYYY-MM-DD '  

                            onKeyPress={(event) => {
                            if (!/[0-9 \-\/]/.test(event.key)) {
                            event.preventDefault();
                            }}}
                            
                            onChange={ (e) => this.handleCreateSales('dateSold',e.target.value)}
                        
                            maxLength = '10' 

                            required
                            
                           
                           
                            />
                    </Form.Field>

                    <Form.Field>
                        <label>Customer</label>
                        <Dropdown
                            compact
                            fluid
                            selection
                            options = {customerMapped}  
                                    onChange = {
                                        (e) => {

                                            var filteredID = customerMapped.filter( c => c.value === e.target.innerText ).map( c => c.key);

                                            this.setState({
                                                
                                                sales: {
                                                ...this.state.sales,
                                                customerId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }                              
                            />

                    </Form.Field>


                    <Form.Field>
                        
                        <label>Product</label>
                        <Dropdown
                            compact
                            fluid
                            selection
                                    
                                    onChange = {
                                        (e) => {

                                            var filteredID = productsMapped.filter( p => p.value === e.target.innerText ).map( p => p.key);

                                            this.setState({
                                                
                                                sales: {
                                                ...this.state.sales,
                                                productId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }
                            //defaultValue = {}
                            
                            options = {productsMapped}      
                            />

                    </Form.Field>

                    <Form.Field>
                    <label>Store</label>
                        <Dropdown
                            compact
                            fluid
                            selection
                                    
                                    onChange = {
                                        (e) => {

                                            var filteredID = storesMapped.filter( s => s.value === e.target.innerText ).map( s => s.key);

                                            this.setState({
                                                
                                                sales: {
                                                ...this.state.sales,
                                                storeId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }
                            //defaultValue = {}
                            
                            options = {storesMapped}      
                            />  
                    </Form.Field>
                </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button color='black'               
                    onClick = {()=> toggleModal()}
                >
                Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark' 
                    positive
                    onClick = {(this.createSales)} 
                />
                </Modal.Actions>
            </Modal>


            </>
        )
    }
}