import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const minLength = (len) => (val) => val && (val.length >= len) ;
const maxLength = (len) => (val) => !val || (val.length <= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values){
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }

    render(){
        return (
            <div>
                <Button outline onClick={this.toggleModal} >
                    <i className="fa fa-pencil mr-2" > </i>
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlfor="rating">
                                Rating
                            </Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.select model=".rating" name="rating " id="rating"
                                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label htmlfor="author">
                                Your Name
                            </Label>
                            <Row className="form-group">
                                <Col>
                                <Control.text  model=".author" name="author" className="form-control"
                                              id="author" placeholder="Your Name"
                                              validators={ {
                                                  minLength: minLength(3),
                                                  maxLength: maxLength(15)
                                              }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength:'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Label htmlfor="comment">
                                Comment
                            </Label>
                            <Row className="form-group">
                                <Col>
                                    <Control.textarea model=".comment" name="comment" className="form-control"
                                                      id="comment" rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {
    if (comments != null) {
        const list = comments.map((item) => {
            return (
                <div key = {item.id} className='list-unstyled m-3'>
                    <li className= "mb-1">{item.comment}</li>
                    <li className="mb-1">-- {item.author}, {
                        new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'})
                            .format(new Date(Date.parse(item.date)))}
                    </li>
                </div>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                {list}
                <CommentForm/>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function DishDetail(props) {
    const dish = props.dish;
    if (dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;