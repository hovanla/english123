# English123 Android — development build

Native Expo app; uses https://english1234.vercel.app/api/mobile.
The server changes must be deployed before login will work.

Implemented: secure session storage, existing-account login, published units,
flashcards, sentence entry, saved attempts, English speech, unit text chat.

Not yet complete: images/sprites, matching and other quiz types, voice calls,
offline lessons, hands-free playback, notifications, and progress-based resume.
This is not yet feature parity with the web app or a store-ready release.

## Development

```sh
npm ci
npx expo start
```

## Android APK

```sh
npx expo prebuild --platform android
cd android
./gradlew assembleRelease
```

Requires compatible JDK and Android SDK. Review signing configuration before
distribution; development signing is not a Google Play production identity.
Alternatively use `eas build --platform android --profile preview` with an Expo account.

No AI provider key or database credentials belong in this mobile project.
Mobile sessions use random bearer tokens stored hashed in the existing Session table.
Changing the user's sessionVersion revokes existing mobile sessions.
