import axios from 'axios';
import React, {Component} from 'react'
import { Modal,Button,Form } from 'semantic-ui-react'


export class EditProduct extends Component {
    constructor(props){
        super(props);

        this.state = {
            
            products: {
                name:"",
                price: null
            }

        }

    }



    handleEditProduct = (field,value) => {
        this.setState({
            products: {
                ...this.state.products,
                [field]: value
            }
        });
    }


    editProduct = (id) => {

        

        if(this.state.products.name !== "" && this.state.products.price !== ""){
            axios.put(`Products/PutProduct/${id}`,{
                id:id,
                name : this.state.products.name,
                price :this.state.products.price
    
            }).then( (data) => {
                console.log(data);
                this.updateTable();
            }).catch( (err) => {
                console.log(err);
              });;
        }else {
            alert("Please change something, if not please press cancel.");
        }

    
    }

    updateTable = () => {
        this.props.fetchProducts();
        this.props.toggleModal();
    }

    render (){

        const {open,toggleModal} = this.props;
        console.log(this.state.products);

        var tName = this.props.tempName;
        var tPrice = this.props.tempPrice;

        return (
            <>
            <Modal
                open = {open}
                onMount = { () => {

                    if(this.state.products.name === "" || this.state.products.price === "" ){

                        
                        this.setState(prevState => ({
                            products: {                   
                                ...prevState.products,    
                                name: tName      
                            }
                        }))
            
                        this.setState(prevState => ({
                            products: {                   
                                ...prevState.products,   
                                price: tPrice
                            }        
                        }))

                      
                    }
                }}

            >
              <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content >
                <Form>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange = { (e) => this.handleEditProduct('name',e.target.value)} defaultValue = {tName} />
                    </Form.Field>
                    <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' onChange = { (e) => this.handleEditProduct('price',e.target.value)} defaultValue = {tPrice} />
                    </Form.Field>     
                </Form>
                </Modal.Content>
              <Modal.Actions>
                <Button color='black' 
                        onClick={ ()=> toggleModal()}
                        >
                  Cancel
                </Button>
                <Button content="Edit"
                        labelPosition='right'
                        icon='checkmark' 
                        positive
                        onClick={ ()=> {this.editProduct(this.props.id)}}
                />
              </Modal.Actions>
            </Modal>

            </>
        )
      
    }

}