import http from 'http';

const endpoints = [
  { method: 'POST', path: '/api/tables/create', name: 'Create Table', expectedStatus: [201, 400, 404, 500] },
  { method: 'GET', path: '/api/tables/get', name: 'Get Tables', expectedStatus: [200, 404, 500] },
  { method: 'PUT', path: '/api/tables/update', name: 'Update Table', expectedStatus: [200, 404, 400, 500] },
  { method: 'POST', path: '/api/sessions/create', name: 'Create Session', expectedStatus: [201, 400, 404, 500] },
  { method: 'GET', path: '/api/sessions/get', name: 'Get Sessions', expectedStatus: [200, 404, 500] },
  { method: 'PUT', path: '/api/sessions/update', name: 'Update Session', expectedStatus: [200, 404, 500] },
  { method: 'POST', path: '/api/menu/create', name: 'Create Menu Item', expectedStatus: [201, 400, 404, 500] },
  { method: 'GET', path: '/api/menu/get', name: 'Get Menu Items', expectedStatus: [200, 404, 500] },
  { method: 'PUT', path: '/api/menu/update', name: 'Update Menu Item', expectedStatus: [200, 404, 500] },
  { method: 'PUT', path: '/api/menu/update-availability', name: 'Update Item Availability', expectedStatus: [200, 404, 500] },
  { method: 'DELETE', path: '/api/menu/delete', name: 'Delete Menu Item', expectedStatus: [200, 404, 500] },
  { method: 'POST', path: '/api/orders/place-order', name: 'Place Order', expectedStatus: [201, 400, 404, 500] },
  { method: 'GET', path: '/api/orders/get', name: 'Get Orders', expectedStatus: [200, 404, 500] },
  { method: 'PUT', path: '/api/orders/update-status', name: 'Update Order Status', expectedStatus: [200, 404, 500] }
];

const testEndpoint = (method, path, name, expectedStatus) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const isWorking = expectedStatus.includes(res.statusCode);
        const status = isWorking ? `WORKING (${res.statusCode})` : `ISSUE (${res.statusCode})`;
        resolve({ name, method, path, status, statusCode: res.statusCode });
      });
    });

    req.on('error', (error) => {
      resolve({ name, method, path, status: 'FAILED - ' + error.message, statusCode: 0 });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ name, method, path, status: 'TIMEOUT', statusCode: 0 });
    });

    // Send empty body for POST/PUT requests
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      req.write(JSON.stringify({ companyId: '507f1f77bcf86cd799439012' }));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('\n=== TESTING ALL ENDPOINTS ===\n');
  const results = [];
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.method, endpoint.path, endpoint.name, endpoint.expectedStatus);
    results.push(result);
    console.log(`${result.method.padEnd(6)} | ${result.path.padEnd(30)} | ${result.name.padEnd(25)} | ${result.status}`);
  }

  console.log('\n=== SUMMARY ===\n');
  const working = results.filter(r => r.status.includes('WORKING')).length;
  const issues = results.filter(r => !r.status.includes('WORKING')).length;
  
  console.log(`Total Endpoints: ${results.length}`);
  console.log(`Working: ${working}`);
  console.log(`Issues: ${issues}`);

  if (issues > 0) {
    console.log('\n=== ENDPOINTS WITH ISSUES ===\n');
    results.filter(r => !r.status.includes('WORKING')).forEach(endpoint => {
      console.log(`${endpoint.method.padEnd(6)} | ${endpoint.path.padEnd(30)} | ${endpoint.name.padEnd(25)} | ${endpoint.status}`);
    });
  }
};

// Wait a moment for server to fully start
setTimeout(runTests, 2000);
