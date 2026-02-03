# Satisfactory Remote Monitor

A mobile-first web dashboard for monitoring your Satisfactory dedicated server using the [Ficsit Remote Monitoring (FRM)](https://ficsit.app/mod/FicsitRemoteMonitoring) mod.

![Dashboard Preview](preview.png)

## Features

- **Real-time Power Monitoring** - Live graph of production, consumption, and max capacity
- **Generator Status** - See all generators, fuel levels, and efficiency
- **Awesome Sink** - Track points and coupons
- **Player List** - See who's online with health status
- **Factory Stats** - Machine counts and efficiency
- **Train & Drone Tracking** - Monitor logistics
- **In-Game Chat** - Read and send messages
- **PWA Support** - Install on your phone's home screen

## Setup

### 1. Install Ficsit Remote Monitoring Mod

Install the [FRM mod](https://ficsit.app/mod/FicsitRemoteMonitoring) on your Satisfactory server using the Satisfactory Mod Manager.

### 2. Configure FRM

In your server's FRM config, make sure the web server is enabled and note the port (default: 8080).

If you want to access it from outside your local network, you'll need to:
- Port forward the FRM port on your router
- Or use a VPN/Tailscale to access your local network

### 3. Open the Dashboard

Visit the hosted dashboard or run it locally, then enter your server details:
- **Server IP**: Your server's IP address or hostname
- **Port**: FRM web server port (default: 8080)
- **Auth Token**: If you configured authentication in FRM

## Self-Hosting

This is a static HTML file with no backend. You can:

1. **Use Vercel/Netlify**: Fork this repo and deploy
2. **Run locally**: Just open `index.html` in a browser
3. **Host anywhere**: Upload to any static file host

## Development

This is a single HTML file with no build process. Just edit and refresh.

## Credits

- [Ficsit Remote Monitoring](https://ficsit.app/mod/FicsitRemoteMonitoring) mod by the FRM team
- UI inspired by Satisfactory's FICSIT aesthetic

## License

MIT
