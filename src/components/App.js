import React, { Component } from "react";
import { connect } from "react-redux";
import {
    getUserRequest,
    createUserRequest,
    deleteUserRequest,
    userError
} from "../actions/users";
import UsersList from "./UsersList";
import NewUserForm from "./NewUserForm";
import { Alert } from "reactstrap";
class App extends Component {
    constructor(props) {
        super(props);
        this.props.getUserRequest();
    }

    handleSubmit = ({ firstName, lastName }) => {
        console.log(firstName, lastName);
        this.props.createUserRequest({
            firstName,
            lastName
        });
    };

    handleDeleteUserClick = userId => {
        this.props.deleteUserRequest(userId);
    };

    handleCloseAlert = () => {
        this.props.userError({
            error: ""
        });
    };

    render() {
        const users = this.props.users;
        return (
            <div
                style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}
            >
                <Alert
                    color="danger"
                    isOpen={!!this.props.users.error}
                    toggle={this.handleCloseAlert}
                >
                    {this.props.users.error}
                </Alert>
                <NewUserForm onSubmit={this.handleSubmit} />
                {!!users.items && !!users.items.length && (
                    <UsersList
                        users={users.items}
                        onDeleteUser={this.handleDeleteUserClick}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    ({ users }) => ({ users }),
    { getUserRequest, createUserRequest, deleteUserRequest, userError }
)(App);
