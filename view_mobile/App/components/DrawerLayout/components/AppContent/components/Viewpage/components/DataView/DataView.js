// Import required modules
import React from 'react';
import { Text, Content, List, ListItem, H2} from 'native-base';

// Import requred components
import styles from './styles.js';

/*
 * Define each record of the User Table
 * Used by DisplayList
 */
function DataList(props) {
  if(props.records) {
    return props.records.map((record, index) => {
      let thisRecord = {};
      let thisRecordData = "";
      let thisRecordKey = record._id;
      record.data.forEach(function(datum) {
        thisRecordData += (datum.datum + " - ");
      });
      thisRecord.key = thisRecordKey;
      thisRecord.value = thisRecordData.slice(0, -3);
      return (
        <ListItem
        key={thisRecord.key}
        _id={thisRecord.key}>
          <Text>
            {thisRecord.value}
          </Text>
        </ListItem>
      );
    });
  } else {
    return null;
  }
}

/*
 * Display a list of Data View Records
 * Used by DataViewJSX
 */
function DisplayList(props) {
  if(props.userTable.records) {
    return(
      <List>
        <DataList
        records={props.userTable.records} />
      </List>
    );
  } else {
    return null;
  }
}

/*
 * Data View JSX view
 */
var DataViewJSX = function() {
  // Determine what User Table this DataView represents
  // NOTE: Form Elements and User Tables share an ID
  let userTable = {};
  for(const table of this.props.userDatabase) {
    if(table._id == this.props.element.formId) {
      userTable = table;
    }
  }
  // Determine the title of the Form represented by the User Table this Data View displays
  let formTitle = "";
  if(this.props.userForms) {
    for(const table of this.props.userForms) {
      if(table._id == this.props.element.formId) {
        formTitle = table.formTitle;
      }
    }
  }

  return (
    <Content>
      <H2>
        {formTitle}
      </H2>

      <DisplayList
      userTable={userTable} />

      <Text>
        {"\n"}
      </Text>
    </Content>
  );
}

// Export Data View JSX view
export default DataViewJSX;
