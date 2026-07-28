---
title: "Edge Devices"
layout: default
nav_order: 8
parent: "Service Guides"
grand_parent: "SDK"
---

# Edge Devices

The Edge Device Registry provides discovery, registration, and management of distributed edge devices. It supports automatic capability detection (system info, Docker, running services) for devices on your network.

## Configuration

```bash
export EDGE_API_URL=http://localhost:8082
```

---

## Python

```python
from ona_platform import OnaClient

client = OnaClient(
    edge_api_url='http://localhost:8082'  # or set EDGE_API_URL
)

# ── Check service health ──
health = client.edge_devices.health()
print(f"Service: {health['service']}, Status: {health['status']}")

# ── Discover a new device ──
device = client.edge_devices.discover_device(
    ip='192.168.1.100',
    username='admin'
)
print(f"Device ID: {device['id']}")
print(f"Type: {device['type']}")
print(f"Status: {device['status']}")

# ── List all devices ──
devices = client.edge_devices.list_devices()
print(f"Total devices: {len(devices)}")
for dev in devices:
    print(f"  - {dev['name']} ({dev['ip']}): {dev['status']}")

# ── Get device details ──
details = client.edge_devices.get_device(device['id'])
print(f"Last seen: {details['lastSeen']}")

# ── Get device capabilities ──
capabilities = client.edge_devices.get_device_capabilities(device['id'])
print(f"System: {capabilities.get('system', {})}")
print(f"Docker: {capabilities.get('docker', {})}")

# ── Get running services ──
services = client.edge_devices.get_device_services(device['id'])
for svc in services:
    print(f"  - {svc['name']} (port {svc['port']}): {svc['status']}")

# ── Update device ──
updated = client.edge_devices.update_device(
    device['id'],
    {"name": "Updated Edge Device", "status": "online"}
)

# ── Delete device (use with caution) ──
# result = client.edge_devices.delete_device(device['id'])
```

---

## JavaScript

```javascript
const { OnaSDK } = require('../src/index');

const sdk = new OnaSDK({
  endpoints: {
    edgeRegistry: process.env.ONA_EDGE_REGISTRY_ENDPOINT || 'http://edge-registry:8082'
  }
});

// ── Service health ──
const health = await sdk.edgeRegistry.getHealth();
console.log(`Service: ${health.service}, Status: ${health.status}`);

// ── List registered devices ──
const devices = await sdk.edgeRegistry.getDevices();
console.log(`Total devices: ${devices.length}`);
devices.forEach(device => {
  console.log(`  ${device.name} (${device.ip}): ${device.status}`);
});

// ── Discover a new device ──
const newDevice = await sdk.edgeRegistry.discoverDevice({
  ip: '192.168.1.100',
  username: 'admin'
});
console.log(`Discovered: ${newDevice.id} (${newDevice.type})`);

// ── Device capabilities ──
const capabilities = await sdk.edgeRegistry.getDeviceCapabilities(newDevice.id);
console.log('System:', JSON.stringify(capabilities.system, null, 2));
if (capabilities.docker) {
  console.log(`Docker: ${capabilities.docker.installed} (${capabilities.docker.version})`);
}

// ── Running services ──
const services = await sdk.edgeRegistry.getDeviceServices(newDevice.id);
services.forEach(svc => {
  console.log(`  ✓ ${svc.name} on port ${svc.port} (${svc.status})`);
});

// ── Update device ──
const updated = await sdk.edgeRegistry.updateDevice(newDevice.id, {
  name: 'Updated Edge Device Name'
});

// ── Delete device ──
// await sdk.edgeRegistry.deleteDevice(deviceId);
```

---

## Available Methods

| Method (Python) | Method (JS) | Description |
|-----------------|-------------|-------------|
| `health()` | `getHealth()` | Service health check |
| `list_devices()` | `getDevices()` | List all registered devices |
| `get_device(id)` | `getDevice(id)` | Get details for a specific device |
| `discover_device(ip, username)` | `discoverDevice({ ip, username })` | Discover and register a device |
| `update_device(id, updates)` | `updateDevice(id, updates)` | Update device metadata |
| `delete_device(id)` | `deleteDevice(id)` | Remove a device |
| `get_device_capabilities(id)` | `getDeviceCapabilities(id)` | System, Docker, and platform info |
| `get_device_services(id)` | `getDeviceServices(id)` | Running services and ports |

---

## Full Example

- [Python: edge_device_example.py](https://github.com/AsobaCloud/sdk/blob/main/python/examples/edge_device_example.py)
- [JavaScript: edge-device-example.js](https://github.com/AsobaCloud/sdk/blob/main/javascript/examples/edge-device-example.js)

## See Also

- [Authentication](/sdk/authentication) — API key configuration
- [Error Handling](/sdk/error-handling) — Error classes and retry logic
