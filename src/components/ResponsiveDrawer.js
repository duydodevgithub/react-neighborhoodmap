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


  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <input placeholder="Search By Country: Vietnamese, Italia or Mexican" id="inputText" type="text"
              onChange={(event) => this.props.updateQuery(event)}
        />
        <h2 className="text-center page-header">Restaurant List</h2>
        <Divider />
        {this.props.locations.map((element) => {
          return (
                  <div key={element.id} coords={element.coords} className="thumbnail card">
                      <img className="card-img-top" alt={element.name} src={element.img} onClick={e => this.props.cardClick(element.alias)}/>
                      <div id="restaurantDetail" className="caption card-body">
                        <h5 className="restaurantDetail_h5">{element.name}</h5>
                        <p className="restaurantDetail_p">Category: {element.category}</p>
                        <p className="restaurantDetail_p">Adress: {element.address}</p>
                        <p className="restaurantDetail_p">Rating: {element.rating}</p>
                        <a href={element.url} target="blank">Visit website</a>
                      </div>
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