// Import required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class FormInputService {
  /*
   * HTTP call used to create Form Inputs
   */
  createFormInput(requestData) {
    // Prepare data for API call
    var prepareData = {};
    prepareData.viewsiteId = requestData.viewsiteId;
    prepareData.viewpageId = requestData.viewpageId;
    prepareData.elementId = requestData.elementId;
    prepareData.kind = requestData.kind;
    // Finish preparing data based on the child class
    if(requestData.kind === "textbox") {
      prepareData.textboxLabel = requestData.textboxLabel;
    }
    else if(requestData.kind === "number"){
      prepareData.numberLabel = requestData.numberLabel;
    }
    else if(requestData.kind === "textarea"){
        prepareData.textareaLabel = requestData.textareaLabel;
    }
    else if(requestData.kind === "checkbox"){
        prepareData.checkboxLabel = requestData.checkboxLabel;
    }
    // Make API call
    return axios({
      url: '/create/form_inputs',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: prepareData
    });
  }

  /*
   * HTTP call used to update Form Inputs
   */
  updateFormInput(requestData) {
    // Prepare data for API call
    var prepareData = {};
    prepareData.viewsiteId = requestData.viewsiteId;
    prepareData.viewpageId = requestData.viewpageId;
    prepareData.elementId = requestData.elementId;
    prepareData.formInputId = requestData.formInputId;
    prepareData.kind = requestData.kind;
    // Finish preparing data based on the child class
    if(requestData.kind === "textbox") {
      prepareData.textboxLabel = requestData.textboxLabel;
    }
    else if(requestData.kind === "number") {
      prepareData.numberLabel = requestData.numberLabel;
    }
    else if(requestData.kind === "textarea") {
        prepareData.textareaLabel = requestData.textareaLabel;
    }
    else if(requestData.kind === "checkbox") {
        prepareData.checkboxLabel = requestData.checkboxLabel;
    }
    // Make API call
    return axios({
      url: '/update/form_inputs',
      method: 'put',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: prepareData
    });
  }

  /*
   * HTTP call used to delete Form Inputs
   */
  deleteFormInput(requestData) {
    return axios({
      url: '/delete/form_inputs',
      method: 'delete',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'viewpageId': requestData.viewpageId,
        'elementId': requestData.elementId,
        'formInputId': requestData.formInputId,
        'kind': requestData.kind
      }
    });
  }
}

// Export the HTTP service
export default FormInputService;
