// Import required modules
import React from 'react';

// Import requred components
import HomeJSX from './Home.jsx';
import './home.scss';

class Home extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    //this.manageViewpageService = new ViewpageService();
    this.handleEditViewpage = this.handleEditViewpage.bind(this);
    this.handleUpdateViewpage = this.handleUpdateViewpage.bind(this);


      // Set initial state
      this.state = {
          viewsite: {},
          viewpage: {
              _id: "0",
              viewpageName: "Home",
              permissionLevel: 3
          },
          viewpageSuccess: "",
          viewpageError: "",
          userTables: [],
          selectedUserTable: {},
          selectedUserTableHeaders: {},
          userTableError: "",
          userUsers: []
      };

  }

    /*
     * Method that prepares the Viewpage update form with Viewpage information
     */
    handleEditViewpage(event) {
        // Set local state to be the Viewpage to edit
        let editViewpage = this.state.viewpage;
        editViewpage._id = event._id;
        editViewpage.viewpageName = event.viewpageName;
        editViewpage.permissionLevel = event.permissionLevel;
        this.setState({
            viewpage: editViewpage
        });
        // Show the update form, allowing the User to update the set Viewpage
        $("#updateViewpage").toggle("medium");
        $("#createViewpage").hide(false);
    }

    /*
  * Method that allows a User to update a Viewpage
  */
    handleUpdateViewpage() {
        // Prepare HTTP API request data
        let requestData = {};
        let updateViewpage = this.state.viewpage;
        requestData.viewsiteId = this.state.viewsite._id;
        requestData.viewpageId = updateViewpage._id;
        requestData.viewpageName = updateViewpage.viewpageName;
        requestData.permissionLevel = updateViewpage.permissionLevel;
        // Send call out to API to update the selected Viewpage
        this.manageViewpageService.updateViewpage(requestData)
            .then((results) => {
                    // Afterwards, set Global Viewsite state to reflect changes
                    this.handleSetGlobalState(results.data, "viewsite");
                    // Follow up by clearing viewsite state & hiding the form
                    this.handleClearLocalState();
                    $("#updateViewpage").hide("medium");
                },
                (error) => {
                    // Handle errors
                    this.setState({
                        viewpageSuccess: "",
                        viewpageError: error.response.data
                    });
                });
    }

    /*
   * Method that clears local Viewpage state
   * Used to prepare forms with a clean slate
   */
    handleClearLocalState() {
        let clearViewpage = this.state.viewpage;
        clearViewpage._id = "";
        clearViewpage.viewpageName = "";
        clearViewpage.permissionLevel = 3;
        this.setState({
            viewpage: clearViewpage,
            viewpageSuccess: "",
            viewpageError: ""
        });
    }

    /*
     * Method that is passed down to child components to update Viewsie state
     * Used after CUD operations to update the main Viewsite being displayed
     */
    handleSetGlobalState(newStateData, toSet) {
        this.setState({
            [toSet]: newStateData
        }, () => this.handleGatherUserTables());
    }

    /*
     * Method that updates local state based on what a user types
     */
    handleChange(event, toChange) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let changeProp = this.state[toChange];
        changeProp[name] = value;
        this.setState({
            [toChange]: changeProp
        });
    }

  /*
   * Render the Home view
   */
  render() {
    return(HomeJSX.call(this));
  }
}

// Export the Homepage
export default Home;
