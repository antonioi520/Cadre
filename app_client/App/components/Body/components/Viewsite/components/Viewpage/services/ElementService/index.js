// Include required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class ElementService {
  /*
   * HTTP call used to create Elements
   */
  createElement(requestData) {
    // Prepare data for API call
    var prepareData = {};
    let headers = {'Content-Type': 'application/json'};
    prepareData.viewsiteId = requestData.viewsiteId;
    prepareData.viewpageId = requestData.viewpageId;
    prepareData.kind = requestData.kind;
    // Finish preparing data based on the child class
    if(requestData.kind === "text") {
      prepareData.textValue = requestData.textValue;
    } else if(requestData.kind === "form") {
      prepareData.formTitle = requestData.formTitle;
    } else if(requestData.kind === "dataView") {
      prepareData.formId = requestData.formId;
    } else if(requestData.kind === "image") {
      // Create a new FormData
      const formData = new FormData();
      formData.append('viewsiteId', requestData.viewsiteId);
      formData.append('viewpageId', requestData.viewpageId);
      formData.append('kind', requestData.kind);
      formData.append('fileUpload', requestData.fileUpload);
      // Set multipart form-data headers
      headers = { 'Content-Type': 'multipart/form-data' };
      // Set the prepare data to the formData
      prepareData = formData;
    }
    // Make API call
    return axios({
      url: '/create/elements',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: headers,
      data: prepareData
    });
  }

  /*
   * HTTP call used to update Elements
   */
  updateElement(requestData) {
    // Prepare data for API call
    var prepareData = {};
    let headers = {'Content-Type': 'application/json'};
    prepareData.viewsiteId = requestData.viewsiteId;
    prepareData.viewpageId = requestData.viewpageId;
    prepareData.elementId = requestData.elementId;
    prepareData.kind = requestData.kind;
    // Finish preparing data based on the child class
    if(requestData.kind === "text") {
      prepareData.textValue = requestData.textValue;
    } else if(requestData.kind === "form") {
      prepareData.formTitle = requestData.formTitle;
    } else if(requestData.kind === "dataView") {
      prepareData.formId = requestData.formId;
    } else if(requestData.kind === "image") {
      // Create a new FormData
      const formData = new FormData();
      formData.append('viewsiteId', requestData.viewsiteId);
      formData.append('viewpageId', requestData.viewpageId);
      formData.append('elementId', requestData.elementId);
      formData.append('kind', requestData.kind);
      formData.append('fileUpload', requestData.fileUpload);
      // Set multipart form-data headers
      headers = { 'Content-Type': 'multipart/form-data' };
      // Set the prepare data to the formData
      prepareData = formData;
    }
    // Make API call
    return axios({
      url: '/update/elements',
      method: 'put',
      baseURL: API_LOCATION + '/api/v1/',
      headers: headers,
      data: prepareData
    });
  }

  /*
   * HTTP call used to delete Elements
   */
  deleteElement(requestData) {
    return axios({
      url: '/delete/elements',
      method: 'delete',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'viewpageId': requestData.viewpageId,
        'elementId': requestData.elementId,
        'kind': requestData.kind
      }
    });
  }
}

// Export the HTTP service
export default ElementService;
