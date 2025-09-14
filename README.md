# expo-android-gradle

Expo plugin for managing Android Gradle & Gradle Plugin versions.

## Setup

### Install

```bash
npx expo install expo-android-gradle
```

### Configuration

Set the `gradleVersion` and `gradlePluginVersion` in your `app.json` or `app.config.js`.
Replace the example versions with the versions you want to use for your project.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-android-gradle",
        {
          "gradleVersion": "8.13",
          "gradlePluginVersion": "8.11.1"
        }
      ]
    ]
  }
}
```
