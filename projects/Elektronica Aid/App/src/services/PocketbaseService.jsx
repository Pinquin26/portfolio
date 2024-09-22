import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.REACT_APP_PBURL)
pb.autoCancellation(false);
export default pb;