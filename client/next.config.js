module.exports = {
  async rewrites() {
    return [{
        source: '/api/register',
        destination: 'https://antonioback.herokuapp.com/api/register'
      },{
        source: '/api/refresh_token',
        destination: 'https://antonioback.herokuapp.com/api/refresh_token'
      },{
        source: '/api/login',
        destination: 'https://antonioback.herokuapp.com/api/login'
      },{
        source: '/api/logout',
        destination: 'https://antonioback.herokuapp.com/api/logout'
      },{
        source: '/api/info',
        destination: 'https://antonioback.herokuapp.com/api/info'
      },{
        source: '/api/sendEmail',
        destination: 'https://antonioback.herokuapp.com/api/sendEmail'
      },{
        source: '/api/postForm',
        destination: 'https://antonioback.herokuapp.com/api/postForm'
      },{
        source: '/api/infoForm',
        destination: 'https://antonioback.herokuapp.com/api/infoForm'
      }
    ]
  }
}
//http://localhost:5000