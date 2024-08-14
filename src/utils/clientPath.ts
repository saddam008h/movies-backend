//develpment or production
let clientPath = '';
if (process.env.NODE_ENV === 'production') {
  clientPath = process.env.CLIENT_PATH_PROD;
} else {
  clientPath = process.env.CLIENT_PATH_DEV;
}

export default clientPath;
