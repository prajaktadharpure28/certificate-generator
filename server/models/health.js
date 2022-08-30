const healthCheck = (req, res) => {
    res.json({
        status: "Ok",
        message: "Server is running"
    });
  }
  
  module.exports = healthCheck;