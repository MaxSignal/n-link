# N-Link

Free, cross-platform, CX-II compatible computer linking program for the TI-Nspire

## Project setup
You'll need to install [Node.js](https://nodejs.org/en/download/package-manager),
[Yarn 1](https://classic.yarnpkg.com/en/docs/install/) and [Rust](https://rustup.rs/), with a
[C compiler](https://github.com/alexcrichton/cc-rs#compile-time-requirements). The app is built with
[Tauri 2](https://v2.tauri.app/), which needs WebKitGTK 4.1 on Linux, and uses the system's libusb. On
Ubuntu (24.04, 26.04):
```
sudo apt install build-essential pkg-config libwebkit2gtk-4.1-dev libusb-1.0-0-dev libssl-dev librsvg2-dev
```
Then, from the top of the repository:
```
yarn
```

### Compiles and minifies for production
The frontend first (with Node.js 17 or later, its webpack 4 needs OpenSSL's legacy provider), then the
app, which embeds it:
```
cd desktop
NODE_OPTIONS=--openssl-legacy-provider yarn build
cd src-tauri
cargo build --release
```
The program is `desktop/src-tauri/target/release/n-link`. Run with arguments, it is the command line
version (`n-link --help`).

### Compiles and hot-reloads for development
In `desktop`, serve the frontend:
```
NODE_OPTIONS=--openssl-legacy-provider yarn serve
```
and in `desktop/src-tauri`, run the app against it (without the `custom-protocol` feature, it loads
`http://localhost:8080`):
```
cargo run --no-default-features
```

The `tauri:build` and `tauri:serve` scripts come from vue-cli-plugin-tauri, made for Tauri 1, and do not
work with Tauri 2.

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
