import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { withRouter } from 'react-router-dom';
import { getJwt, deleteJwt } from '../helpers/jwt';
import { deleteUser } from '../helpers/user';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class ResponsiveDrawer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: this.props.titles[this.props.location.pathname]
    };
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({
        title: this.props.titles[location.pathname]
      })
    });
  }

  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, children } = this.props;
    
    const drawer = (
      <div>
        <div className={classes.toolbar} style={{marginTop: '15px', marginBottom: '-15px', textAlign: 'center', fontSize: '1.7em'}}>
          Super turnero
        </div>
        <Divider />
        <List>
          <ListItem button key={"Obtener Turno"}>
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Obtener Turno"}
              onClick={()=>{
                getJwt() ? this.props.history.push('/ObtenerTurno') : this.props.history.push('/Login');}}
            />
          </ListItem>

          <ListItem button key={"Mis Turnos"}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Mis Turnos"}
              onClick={()=>{
                getJwt() ? this.props.history.push('/MisTurnos') : this.props.history.push('/Login');}}
            />
          </ListItem>
        </List>

        <Divider />
        <ListItem button key={"Salir"}>
          <ListItemIcon>
            <DirectionsRunIcon />
          </ListItemIcon>
          <ListItemText
            primary={"Salir"}
            onClick={()=>{
              deleteJwt();
              deleteUser();
              this.props.history.push('/Login');
            }}
          />
        </ListItem>
      </div>
    );

    return (
      <div className={classes.root}>


        <CssBaseline />


        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {this.state.title}
            </Typography>
          </Toolbar>
        </AppBar>



        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">


            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter((ResponsiveDrawer)))
