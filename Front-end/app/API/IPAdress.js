import Constants from 'expo-constants';

let host = Constants.manifest.hostUri.split(':')[0];
let port = '8000'
export default 'http://' + host + ':' + port + '/';