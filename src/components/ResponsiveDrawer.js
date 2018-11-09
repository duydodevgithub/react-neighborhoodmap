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
        <input tabIndex="1" placeholder="Search By Country: Vietnamese, Italia or Mexican" id="inputText" type="text"
              onChange={(event) => this.props.updateQuery(event)}
        />
        <h2 className="text-center page-header">Restaurant List</h2>
        <Divider />
        {this.props.locations.map((element, index) => {
          return (
                  <div tabIndex={index + 2} rold="aria-labelledby" key={element.id} coords={element.coords} className="thumbnail card">
                      <a href="#mapContainer"><img className="card-img-top" alt={element.name} src={element.img} onClick={e => this.props.cardClick(element.alias)}/></a>
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
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
            {drawer}
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
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);