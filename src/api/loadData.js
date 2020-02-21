import axios from 'axios';

export default axios.create({
  Headers: {
    'Content-Type': 'application/json'
  },
 
});
