import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import './Header.css';

const styles = theme => ({
    avatar: {
        backgroundColor: red[500],
        display: 'flex',
        float:'right',
        cursor:'pointer',
    },
});

class Header extends Component {

    constructor() {
        super();
        this.state = {
            searchTerm:'',
        }
        this.searchHandler = this.searchHandler.bind(this);
    }

    /* Collect the search key and send to Home Page */
    searchHandler = (e) => {
        this.setState({searchTerm : e.target.value});
        this.props.onSearchSubmit(this.state)
    }

    render () {
        const { classes } = this.props;

        /* Header used by both login and home pages */
        if (this.props.type === "Login") {
            return (
                <div>
                    <div className="app-header">
                        <div className="app-logo">
                            <span>Image Viewer</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="app-header">
                        <div className="app-logo">
                            <span>Image Viewer</span>
                            <Avatar aria-label="user-icon" backgroundColor="red" className={classes.avatar}>
                                AS
                            </Avatar>
                            <div className="input">
                                <InputLabel htmlFor="search"></InputLabel>
                                <Input id="search" placeholder="Search..." onChange={this.searchHandler} aria-describedby="my-helper-text" startAdornment={
                                <InputAdornment position="start"><SearchIcon /></InputAdornment> } /> 
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default withStyles(styles)(Header);