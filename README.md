# ChaTTY

A chat bot application themed "like a terminal emulator".

## Tech and installation

The project runs on Nuxt.js with Pinia as a state manager.

### Install

```{bash}
pnpm install

pnpm run dev
```

### Some notes

The auth state lives in a cookie. It's just a JSON encoded object with a single key - `email`.
If the cookie is present, you are logged in, otherwise - you are not.


The entire state of the application (except for the auth cookie) lives in localStorage. 
The state from Pinia is automatically synced with a persistence plugin. This obviously wouldn't fly
in a production environment, but this technique could be used to speed up the loading of the chat history.
Instead of loading the data from the server on every request a perhaps stale state could be 
saved and retrieved first from localStorage to at least render something to the user.

