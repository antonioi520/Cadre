// Import required modules
import React from 'react';
import { Link } from 'react-router-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Separator,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3,
  List,
  ListItem,
  Drawer
} from 'native-base';

// Import required components
import AppContent from './components/AppContent';
import styles from './styles.js';

/*
 * Display of each individual link in the Navigation Drawer
 * Used By NavigationView
 */
function ViewpageLinks(props) {
  if(props.viewpages) {
    return props.viewpages.map((viewpage, index) => {
      let linkTo = "/" + viewpage._id;
      return(
        <ListItem key={viewpage._id}>
          <Link to={linkTo}>
            <Text>
              {viewpage.viewpageName}
            </Text>
          </Link>
        </ListItem>
      );
    });
  } else {
    return null;
  }
}

/*
 * Choose login options based on User's User state
 * Used by the Navigation View
 */
function LoginOptions(props) {
  if(props.viewsite.loginEnabled) {
    if(props.loggedIn) {
      // If a User is logged in return a logout button
      return (
        <ListItem>
          <Button onPress={props.onLogoutUserUser}>
            <Text>
              Logout
            </Text>
          </Button>
        </ListItem>
      );
    } else {
      // If no User is logged in return a sign-up & login button
      return (
        <Content>
          <ListItem>
            <Link to="/login">
              <Text>
                Login
              </Text>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/signup">
              <Text>
                Sign-Up
              </Text>
            </Link>
          </ListItem>
        </Content>
      );
    }
  } else {
    return null;
  }
}


/*
 * Display of inside the Navigation Drawer, and contains links to
 * each Viewpage
 * Used by DrawerLayoutJSX
 */
function NavigationView(props) {
  if(props.viewsite._id) {
    return(
      <Content style={{backgroundColor:'#FFFFFF'}}>

        <List>
          <ListItem itemDivider>
            <Text>
              {props.viewsite.viewsiteName}
            </Text>
          </ListItem>

          <ViewpageLinks
          viewpages={props.viewpages} />

          <ListItem itemDivider>
            <Text>
              Account Options
            </Text>
          </ListItem>

          <LoginOptions
          viewsite={props.viewsite}
          loggedIn={props.loggedIn}
          onLogoutUserUser={props.onLogoutUserUser} />
        </List>
      </Content>
    );
  } else {
    return null;
  }
}

/*
 * Content that is populated when a user clicks the associated link
 * in the Navigation Drawer
 * Used by DrawerLayoutJSX
 */
function NavigationContent(props) {
  if(props.viewsite._id) {
    return (
      <Content>
        <AppContent
        loggedIn={props.loggedIn}
        viewsiteId={props.viewsite._id}
        viewsiteName={props.viewsite.viewsiteName}
        viewpages={props.viewpages}
        userDatabase={props.userDatabase}
        userForms={props.userForms}
        onUpdateUserTable={props.onUpdateUserTable}
        onCreateUserUser={props.onCreateUserUser}
        onLoginUserUser={props.onLoginUserUser} />
      </Content>
    );
  } else {
    return null;
  }
}

/*
 * Drawer Layout JSX view
 */
var DrawerLayoutJSX = function() {
  if(this.state.viewsite._id) {
    return (
      <Drawer
      ref={(ref) => {this.drawer = ref;}}
      content={<NavigationView
        viewsite={this.state.viewsite}
        viewpages={this.state.viewsite.viewpages}
        loggedIn={this.state.loggedIn}
        onLogoutUserUser={this.handleLogoutUserUser}
        closeDrawer={this.closeDrawer.bind(this)} />}
      onClose={() => this.closeDrawer()}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>
              {this.state.viewsiteName ? this.state.viewsiteName : "Cadre"}
            </Title>
          </Body>

          <Right />
        </Header>

        <Content
        style={styles.contentContainer}>
          <NavigationContent
          loggedIn={this.state.loggedIn}
          loginSuccess={this.state.loginSuccess}
          loginError={this.state.loginError}
          userUserSuccess={this.state.userUserSuccess}
          userUserError={this.state.userUserError}
          viewsiteName={this.state.viewsiteName}
          viewsite={this.state.viewsite}
          viewpages={this.state.viewsite.viewpages}
          userDatabase={this.state.userDatabase}
          userForms={this.state.userForms}
          onCreateUserUser={this.handleCreateUserUser}
          onLoginUserUser={this.handleLoginUserUser}
          onUpdateUserTable={this.handleUpdateUserTable} />
        </Content>
      </Drawer>
    );
  } else {
    return(
      <Content>
        <Header>
          <Left />

          <Body>
            <Title>
              {this.state.viewsiteName ? this.state.viewsiteName : "Cadre"}
            </Title>
          </Body>

          <Right />
        </Header>
        <Content
        style={styles.contentContainer}>
          <Form>
            <Item>
              <Input
              placeholder="Enter Viewsite Name..."
              onChangeText={(viewsiteName) => this.handleChange(viewsiteName)} />
            </Item>

            <Button
            block
            onPress={this.handleSubmit}>
              <Text>Get Viewsite</Text>
            </Button>
          </Form>
        </Content>
      </Content>
    );
  }
}

// Export the Drawer Layout JSX view
export default DrawerLayoutJSX;
