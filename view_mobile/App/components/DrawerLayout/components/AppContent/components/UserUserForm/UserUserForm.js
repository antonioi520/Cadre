// Import required modules
import React from 'react';
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Label,
  Input,
  H1,
  H2,
  H3
} from 'native-base';

/*
 * User Form JSX view
 */
var UserUserFormJSX = function() {
  return (
    <Content>
      <H2>
        Sign-Up
      </H2>

      <Form>
        <Item>
          <Label>
            Username
          </Label>

          <Input
          name="username"
          value={this.state.username}
          onChangeText={(text) => this.handleChange({text}, "username")} />
        </Item>

        <Item>
          <Label>
            Password
          </Label>

          <Input
          name="password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(text) => this.handleChange({text}, "password")} />
        </Item>

        <Button
        block
        onPress={this.handleSubmit}>
          <Text>
            Sign-Up
          </Text>
        </Button>
      </Form>
    </Content>
  );
}

// Export the User Form view
export default UserUserFormJSX;
