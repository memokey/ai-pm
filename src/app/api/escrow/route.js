const sdk = require('api')('@xcrow/v1.0#ecxh29luopnzpb');

sdk.gettingStartedWithYourApi({accept: 'text/plain'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));