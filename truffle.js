module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
      development: {
          host: "localhost",
          port: 7545,
          network_id: "*",
          gas: 6000000,
          from: "0x627306090abab3a6e1400e9345bc60c78a8bef57"
      }
  }
};
