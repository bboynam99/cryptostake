module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '78.47.161.88',
      username: 'root',
      // pem: './path/to/pem'
      password: 'PMwLXXzDQ3W2HQ'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'CryptoStake',
    path: '~/cryptostake',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://78.47.161.88',
      PORT: '3000',
      MONGO_URL: 'mongodb://78.47.161.88/meteor',
    },
volumes: {
      '/root/uploads/documents': '/home/vaqif/uploads/user/documents',
      '/root/uploads/pictures' : '/home/vaqif/uploads/user/pictures',
      '/root/uploads/avatars'  : '/home/vaqif/uploads/user/avatars',
    },
    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma separated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },

      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      // image: 'abernix/meteord:node-8.4.0-base',
      dockerImage: "abernix/meteord:base",
      deployCheckWaitTime: 120,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

/* mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {},
    },
  },*/
};
