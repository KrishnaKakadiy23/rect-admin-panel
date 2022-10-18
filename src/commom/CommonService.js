import axiosInstance from "./interceptor";



const httpGet = async (requestURL , authorizationRequired) => new Promise((resolve, reject) => {
    const userresponse = JSON.parse(localStorage.getItem('token'));

    axiosInstance.get(requestURL, {
        headers: { 'Authorization': `Bearer ${userresponse}` }
    })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});

const httpPostRequestBody = async (requestURL, requestBody, authorizationRequired) => new Promise((resolve, reject) => {
    // text/plain, */*'
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
            // 'Access-Control-Allow-Origin':'*'
         
        }
        // ,body: JSON.stringify(requestBody) aa uncomment karu??
    }
    if (authorizationRequired ) {
        
        const userresponse = localStorage.getItem('token');
        if (userresponse !== undefined) {
            options.headers.Authorization = `Bearer ${userresponse}`
            console.log(userresponse);
        }

           
       
    }
    
    axiosInstance.post(requestURL, requestBody, options)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});

const httpPutRequestBody = async (requestURL, requestBody, authorizationRequired) => new Promise((resolve, reject) => {
    
    const userresponse = JSON.parse(localStorage.getItem('user'));
    const options = {

        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (authorizationRequired && userresponse) {
        options.headers.Authorization = `Bearer ${userresponse.token}`
    }
    axiosInstance.put(requestURL, requestBody,options)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});

const httpPostFormData = async (requestURL, requestBody ,authorizationRequired) => new Promise((resolve, reject) => {
    const userresponse = ""; // JSON.parse(AsyncStorage.getItem('user'))
   
    if (authorizationRequired && userresponse) {
        // options.headers.Authorization = `bearer ${userresponse.accesstoken}`
    }
    axiosInstance.post(requestURL, requestBody, {
        headers: { 'Content-Type': "application/json" }
    })
    axiosInstance.post(requestURL, requestBody)
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});



const httpDelete = async (requestURL,authorizationRequired) => new Promise((resolve, reject) => {
    const userresponse = JSON.parse(localStorage.getItem('token'));
    // const usertoken = JSON.parse(localStorage.getItem('token'));
    axiosInstance.delete(requestURL, {
        headers: { 'Authorization': `Bearer ${userresponse}` }
    })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
});




const CommonService = {
    httpGet,
    httpDelete,
    httpPutRequestBody,
    httpPostFormData,
    httpPostRequestBody
};

export default CommonService;