import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './Login.css';
import Header from '../../common/header/Header';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 300,
        maxWidth: 300
    },
    buttonControl: {
        margin: theme.spacing.unit,
        minWidth: 60,
        maxWidth: 60
    },
    title: {
        color: theme.palette.primary.dark,
    }
});

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            usernameError: false,
            passwordError: false,
            authFailure:false
        }
        this.usertable = {
            username:"arunsubash",
            password:"test",
            authtoken:"ccccc"
        }
    }

    /* Handle Username and password inputs */
    usernameChangeHandler = event => {
        this.setState({ username: event.target.value });
        this.setState({usernameError: false});
        this.setState({authFailure: false});
    }
    
    passwordChangeHandler = event => {
        this.setState({ password: event.target.value });
        this.setState({passwordError: false});
        this.setState({authFailure: false});
    }
    
    /* Authentication handler - On success redirect to home page */
    authHandler = () => {
        let error = false;

        if (this.state.username === "") {
            this.setState({usernameError: true});
            error = true;
        }
        
        if (this.state.password === "") {
            this.setState({passwordError: true});
            error = true;
        }

        if (error === false) {
            if ((this.state.username === this.usertable.username) &&
                (this.state.password === this.usertable.password)) {
                    this.props.history.push('/home', true);
            } else {
                this.setState({authFailure: true});
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header type="Login" />
                <div className="flex-container">
                    <div className="center">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        LOGIN
                                    </Typography>
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="username" required="true">Username</InputLabel>
                                    <Input id="username" onChange={this.usernameChangeHandler} aria-describedby="my-helper-text" />
                                    {this.state.usernameError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="password" required="true">Password</InputLabel>
                                    <Input id="password" onChange={this.passwordChangeHandler} aria-describedby="my-helper-text" />
                                    {this.state.passwordError ? <span style={{color: "red"}}>required</span> : ''} 
                                </FormControl>
                                <br /><br />
                                {this.state.authFailure ? <span style={{color: "red"}}>Incorrect username and/or password</span> : ''} 
                                <br /><br />
                                <FormControl className={classes.buttonControl}>
                                    <Button onClick={() => this.authHandler()} variant="contained" color="primary">
                                        LOGIN
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Login);
