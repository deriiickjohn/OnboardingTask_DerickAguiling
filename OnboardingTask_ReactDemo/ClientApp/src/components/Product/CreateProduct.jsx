import axios from "axios";
import  React, { Component } from "react";
import { Button, Modal , Form } from "semantic-ui-react";

export class CreateProduct extends Component {
    constructor(props){
        super(props);

        this.state = {
           
            products: {
                name: "",
                price:""
            }

        }

   
    }

    handleCreateProduct = (field,value) => {
        this.setState( {
            products: {
                ...this.state.products,
                [field] : value
            }
        } );
    }

    createProduct = () => {
        if(this.state.products.name !== "" && this.state.products.price !== ""){
            axios.post('Products/PostProduct', {
                name: this.state.products.name,
                price: '$' + this.state.products.price
            }).then(({data})=>{
                console.log(data);
                this.props.fetchProducts();
                this.props.toggleModal();
            }).catch( (err)=> {
                console.log(err);
            });
        }else {
            alert("Please fill in details.");
        }
     
    }

      

  


    render() {

        const {openModal,toggleModal} = this.props;
         console.log(this.state.products);
        return(
            <>
           
            <Modal
                
                open = {openModal}
                >
                <Modal.Header>Create Product</Modal.Header>
                <Modal.Content >
                <Form >
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' onChange={(e) => {this.handleCreateProduct('name',e.target.value)}} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' onChange={ (e) => {this.handleCreateProduct('price',e.target.value)}} />
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
                    onClick = {(this.createProduct)} 
                />
                </Modal.Actions>
            </Modal>
        </>
        )
    }

}