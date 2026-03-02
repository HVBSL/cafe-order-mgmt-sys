import http from 'http';

const endpoints = [
  { method: 'POST', path: '/api/tables/create', name: 'Create Table' },
  { method: 'GET', path: '/api/tables/get', name: 'Get Tables' },
  { method: 'PUT', path: '/api/tables/update', name: 'Update Table' },
  { method: 'POST', path: '/api/sessions/create', name: 'Create Session' },
  { method: 'GET', path: '/api/sessions/get', name: 'Get Sessions' },
  { method: 'PUT', path: '/api/sessions/update', name: 'Update Session' },
  { method: 'POST', path: '/api/menu/create', name: 'Create Menu Item' },
  { method: 'GET', path: '/api/menu/get', name: 'Get Menu Items' },
  { method: 'PUT', path: '/api/menu/update', name: 'Update Menu Item' },
  { method: 'PUT', path: '/api/menu/update-availability', name: 'Update Item Availability' },
  { method: 'DELETE', path: '/api/menu/delete', name: 'Delete Menu Item' },
  { method: 'POST', path: '/api/orders/place-order', name: 'Place Order' },
  { method: 'GET', path: '/api/orders/get', name: 'Get Orders' },
  { method: 'PUT', path: '/api/orders/update-status', name: 'Update Order Status' }
];

const testEndpoint = (method, path, name) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 404) {
          resolve({ name, method, path, status: 'NOT FOUND (404)' });
        } else if (res.statusCode === 405) {
          resolve({ name, method, path, status: 'METHOD NOT ALLOWED (405)' });
        } else if (res.statusCode >= 400 && res.statusCode < 500) {
          resolve({ name, method, path, status: `CLIENT ERROR (${res.statusCode})` });
        } else if (res.statusCode >= 500) {
          resolve({ name, method, path, status: `SERVER ERROR (${res.statusCode})` });
        } else {
          resolve({ name, method, path, status: `WORKING (${res.statusCode})` });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ name, method, path, status: 'FAILED - ' + error.message });
    });

    // Send empty body for POST/PUT requests
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      req.write(JSON.stringify({}));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('\n=== TESTING ALL ENDPOINTS ===\n');
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.method, endpoint.path, endpoint.name);
    results.push(result);
    console.log(`${result.method.padEnd(6)} | ${result.path.padEnd(30)} | ${result.name.padEnd(25)} | ${result.status}`);
  }

  console.log('\n=== ENDPOINTS NOT WORKING ===\n');
  const notWorking = results.filter(r => !r.status.includes('WORKING'));
  if (notWorking.length === 0) {
    console.log('All endpoints are working!');
  } else {
    notWorking.forEach(endpoint => {
      console.log(`${endpoint.method.padEnd(6)} | ${endpoint.path.padEnd(30)} | ${endpoint.name.padEnd(25)} | ${endpoint.status}`);
    });
  }
};

// Wait a moment for server to fully start
setTimeout(runTests, 2000);
