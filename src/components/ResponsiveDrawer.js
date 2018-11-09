import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';


const drawerWidth = 360;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  cardClick = (event) => {
    console.log("hehe");
  }

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <input placeholder="Search By Country" id="inputText" type="text"/>
        <h2 className="text-center">Restaurant List</h2>
        <Divider />
        {this.props.locations.map((element) => {
          return (
                  <div key={element.id} coords={element.coords} className="thumbnail card">
                      <img src={element.img} onClick={this.cardClick}/>
                      <div className="caption">
                        <p>{element.name}</p>
                      </div>
                      <a href={element.url} target="blank">Visit website</a>
                </div>
                )
        })}
      </div>
    );

    return (
      <div className={classes.root}>
        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);