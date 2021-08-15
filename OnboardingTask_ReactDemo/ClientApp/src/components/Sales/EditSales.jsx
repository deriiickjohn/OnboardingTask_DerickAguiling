import  React, { Component } from "react";
import { Modal,Form,Button,Dropdown } from "semantic-ui-react";
import axios from 'axios'


export class EditSales extends Component {
    constructor(props){
        super(props);

        this.state = {
            tempSales : {
                dateSold : "",
                customerId : "",
                productId : "",
                storeId : ""
            }
        }
    }

    editSales = (id) => {

        if(this.state.tempSales.productId !== "" &&this.state.tempSales.dateSold !== "" &&this.state.tempSales.storeId !== "" &&this.state.tempSales.customerId !== ""  ){
            axios.put(`Sales/PutSale/${id}`,{
                id:id,
                productid : this.state.tempSales.productId,
                customerid : this.state.tempSales.customerId,
                storeid : this.state.tempSales.storeId,   
                datesold : this.state.tempSales.dateSold,
    
            }).then( (data) => {
                console.log(data);
                this.props.fetchSales();
                this.props.toggleModal();
            }).catch((err) => {
                console.log(err);
            });

        }else {
            alert("Please change something, if not please press cancel.");
        }
     
    }
    
    handleEditSales = (field,value) => {
        this.setState( {
            tempSales :  {
                ...this.state.tempSales,
                [field] : value
            }
        } );
    }


    render () {

        const {open,toggleModal,id,date,stores,customers,products,customerName,productName,storeName} = this.props;

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

        console.log(this.state.tempSales);
        return(
            <>
            <Modal
                
                open = {open}
                onMount = { () => {

                    if(this.state.tempSales.dateSold === "" || this.state.tempSales.productId === "" || this.state.tempSales.customerId === "" || this.state.tempSales.storeId === "" ){

                        
                        this.setState(prevState => ({
                            tempSales: {                   
                                ...prevState.tempSales,    
                                dateSold: this.props.date       
                            }
            
                            
                        }))

                    }
                }}
                >
                <Modal.Header>Edit Sales</Modal.Header>
                <Modal.Content >
                <Form >

                    <Form.Field>
                        <label>Date sold</label>
                        <input placeholder='YYYY/MM/DD '  

                            onKeyPress={(event) => {
                            if (!/[0-9 \-\/]/.test(event.key)) {
                            event.preventDefault();
                            }}}

                            onChange={ (e) => this.handleEditSales('dateSold',e.target.value)}
                            
                            maxLength = '10'
                            required

                            defaultValue= {date}

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
                                                
                                                tempSales: {
                                                ...this.state.tempSales,
                                                customerId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }   
                            
                                    placeholder={customerName}
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
                                                
                                                tempSales: {
                                                ...this.state.tempSales,
                                                productId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }
        
                            
                            options = {productsMapped}      
                            placeholder={productName}           
                                    
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
                                                
                                                tempSales: {
                                                ...this.state.tempSales,
                                                storeId : parseInt(filteredID)
                                               
                                                } 
                                            });
                                           
                                        }
                                    }
                         
                            
                            options = {storesMapped}  
                            placeholder={storeName}    
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
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark' 
                    positive
                    onClick = { () =>(this.editSales(id))} 
                />
                </Modal.Actions>
            </Modal>


            </>
        )
    }
}