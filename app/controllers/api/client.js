import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/v1',
  headers: { 'Content-Type': 'application/json' }
})
```

**4. Create `.env.development`** in the `frontend/` folder:
```
VITE_API_URL=http://localhost:3000