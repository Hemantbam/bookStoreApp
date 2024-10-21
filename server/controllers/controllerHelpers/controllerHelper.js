export const set500Err = (err, req, res) => {
    if (err) {
      console.error(`Error occurred: ${err.message || 'No error message available'}`);
      console.error(`Stack trace: ${err.stack || 'No stack trace available'}`);
    } else {
      console.error('An unknown error occurred.');
    }
    const requestDetails = {
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    };
  
    console.log(`Request details: ${JSON.stringify(requestDetails, null, 2)}`);
  
    res.status(500).json({ message: "Internal server error" });
  };
  

  export const checkTokenValidity=async()=>{
    
  }
