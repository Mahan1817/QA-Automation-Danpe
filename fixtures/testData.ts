export function generateRegistrationData() {
    const timestamp = Date.now();
  
    return {
      organizationName: `Danphe Test ${timestamp}`,
      email: `danphe.test.${timestamp}@example.com`,
      address: 'Kathmandu',
      panNumber: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      telephone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
      password: `Test@${timestamp}`,
    };
  }