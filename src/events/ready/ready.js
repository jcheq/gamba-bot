module.exports = (client) => {
    client.user.setActivity('with boba')
    console.log(`Logged in as ${client.user.tag}!`);
  };