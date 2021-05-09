import React, { Component } from 'react';
import Header from '../../common/header/Header'
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from "@material-ui/core/Divider";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        margin: '20px',
    },
    media: {
        paddingTop: '100%',
        margin: '20px',
    },
    avatar: {
        backgroundColor: red[500],
    },
    divider: {
        margin: '20px',
    },
    like: {
        padding:'10px',
    },
    buttonDef: {
    },
    buttonRed: {
        color: red[500],
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 400,
        maxWidth: 400
    },
    buttonControl: {
        margin: theme.spacing.unit,
        minWidth: 60,
        maxWidth: 60
    },
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            userDetails: [],
            imageDetails: [],
            currImageDetails: [],
            searchTerm:' ',
            authenticated:false,
            comments:'',
        }
        this.authenticated = false;
    }

    updateAuthenticated = () => {
        this.authenticated = true;
    }

    /* Find all images matching the search string */
    updateImageRecords = (str) => {
        this.setState({searchTerm : str.searchTerm});
        var newAr = this.state.imageDetails.filter(function (e) {
            return e.caption.toLowerCase().includes(str.searchTerm.toLowerCase());
        });
        this.setState({currImageDetails : newAr});
    }

    /* Like Handler */
    incrementLike = (id)  => {
        var index = this.state.imageDetails.findIndex(function(find, index) {
            if (find.id === id)
                return true;
        });
        if (this.state.imageDetails[index].liked === true)
            return;

        this.state.imageDetails[index].likes++;
        this.state.imageDetails[index].liked = true;
        let ar = this.state.imageDetails[index].likes;
        let ar1 = this.state.imageDetails[index].liked;
        this.setState({ar : ar});
        this.setState({ar1 : ar1});
    }

    commentsHandler = event => {
        this.setState({ comments: event.target.value });
    }

    /* Update Comment corresponding to an Image ID */
    updateComment = (id) => {
        var index = this.state.imageDetails.findIndex(function(find, index) {
            if (find.id === id)
                return true;
        });
        this.state.imageDetails[index].comments += this.state.comments;
        this.state.imageDetails[index].comments += "\n";
        let ar = this.state.imageDetails[index].comments;
        this.setState({ar : ar});
    }

    componentWillMount() {
        // Get the user details
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let token = "IGQVJYWXhDWnNWdjNFamdOcEdMaGFyeUhiOHpWWVdZAanprVm5xa0Q4RjhuQVlGOWdUMlpQNUpNd1d0NzdrY0ZA4T3ZAuVkhqSUhzZAnl3Sy1JUEVUN3drU2U2OVhocVJnOVNSODlLWFhHZAXdJTjlqQy1XNQZDZD";

        /* Get User details */
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    userDetails: JSON.parse(this.responseText).data
                });
                // Loop thru all the uploads
                for( let i=0; i<that.state.userDetails.length; i++) {
                    let xhra = new Array(that.state.userDetails.length);
                    xhra[i] = new XMLHttpRequest();
                    xhra[i].addEventListener("readystatechange", function () {
                        if (this.readyState === 4) {
                            that.setState({
                            tempImage: JSON.parse(this.responseText)
                            });
                            /* Initalise all data corresponding to the Image */
                            that.state.tempImage.caption = that.state.userDetails[i].caption;
                            that.state.tempImage.likes = that.state.tempImage.id%10;
                            that.state.tempImage.liked = false;
                            that.state.tempImage.comments = '';
                            that.state.imageDetails.push(that.state.tempImage);
                            that.state.currImageDetails.push(that.state.tempImage);
                            that.setState({ state: that.state });
                            that.setState({ searchTerm: " "});
                        }
                    });
                    xhra[i].open("GET", "https://graph.instagram.com/" + that.state.userDetails[i].id +
                                        "?fields=id,media_type,media_url,username,timestamp&access_token=" + 
                                        token);
                    xhra[i].setRequestHeader("Cache-Control", "no-cache");
                    xhra[i].send();
                }
            }
        });

        xhr.open("GET", "https://graph.instagram.com/me/media?fields=id,caption&access_token=" + token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    render () {
        const { classes } = this.props;
        const { state } = this.props.location;

        /* Make sure we re-direct to login page for unauthenticated Users */
        if (state === true) {
            this.updateAuthenticated();
        } else {
            this.props.history.push('/');
            return null;
        }

        return (
            <div>
                <Header onSearchSubmit={this.updateImageRecords} />
                <div className="grid-container">
                    {this.state.currImageDetails.map((images) => (
                        <div key={images.id}>
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                    <Avatar aria-label="user-icon" className={classes.avatar}>
                                        AS
                                    </Avatar>
                                    }
                                    title={images.username}
                                    subheader={images.timestamp}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={images.media_url}
                                />
                                <Divider className={classes.divider} light />
                                <CardContent>
                                    <Typography variant="h5" color="textPrimary" component="h5">
                                        {images.caption} 
                                    </Typography>
                                    <br></br>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        {images.comments} 
                                    </Typography>
                                    <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="comments" required="true">Add a comment</InputLabel>
                                    <Input id="comments" onChange={this.commentsHandler} aria-describedby="my-helper-text" />
                                    </FormControl>
                                    <FormControl className={classes.buttonControl}>
                                    <Button onClick={() => this.updateComment(images.id)} variant="contained" color="primary">
                                        ADD
                                    </Button>
                                    </FormControl>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => this.incrementLike(images.id)} aria-label="add to favorites">
                                        <FavoriteIcon className={classes.buttonDef} />
                                        <span className={classes.like}> {images.likes} Likes</span>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);