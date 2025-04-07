# Pythia AI

Pythia, the high priestess of the Oracle of Delphi, was believed to channel divine answers to the questions of those seeking guidance. Similarly, this project's goal is to develop a personal AI that runs locally in an Electron app and can be customized for individual use, providing answers to all of a person’s questions.

This project aims to keep all data used by the AI stored locally and rely solely on local models (via Ollama). The goal is to enable the integration of data that you prefer not to share with public, online AIs, ensuring privacy.

## Building and Running

### Running locally

Make sure you have NPM and node installed, and from the root `pythia-ai` directorty, run the following:

- npm install
- npm start

This should start the app in dev mode, showing you the devtools. The first time, it may take awhile to start while the model downloads (though the start screen should show you that).

### Packaging

#### On a Mac

Packaging on a Mac for running on your own machine is as simple as:

- npm install
- Comment out `osxSign: {},` in the forge.config.ts file.
- npm run package

However, to distribute to other computers, you need to sign the distributable. This requires obtaining a few certificates through the Apple Developer program and configuring them. Instructions can be found for this on the [Electron website](https://www.electronforge.io/guides/code-signing/code-signing-macos).

#### On a Windows

## Open Source Projects Pythia Relies On

Pythia depends on several open-source projects to function. While this doesn’t list every npm package used, it highlights the major ones.

- [Ollama](https://ollama.com/)
- [Electron](https://www.electronjs.org/)
- [MUI](https://mui.com/)
- Special thanks to [chatd](https://github.com/BruceMacD/chatd), which was used as an example of how to embed Ollama in an Electron app.
