import { ConfigPlugin, withProjectBuildGradle } from "expo/config-plugins";
import { isGroovy } from "./utils/utils";
import { AndroidGradleProps } from "./types/types";

export const withAndroidGradlePluginVersion: ConfigPlugin<
  AndroidGradleProps
> = (config, props) => {
  const gradlePluginVersion = props.gradlePluginVersion;

  if (!gradlePluginVersion) {
    return config;
  }

  return withProjectBuildGradle(config, (newConfig) => {
    if (!isGroovy(newConfig)) {
      console.warn(
        "Unable to edit Android Gradle plugin version. Only groovy build.gradle is supported.",
      );

      return newConfig;
    }

    const regex =
      /classpath\s*(?:\(?["']com\.android\.tools\.build:gradle[^"']*["']\)?)/;

    if (regex.test(newConfig.modResults.contents)) {
      newConfig.modResults.contents = newConfig.modResults.contents.replace(
        regex,
        `classpath 'com.android.tools.build:gradle:${gradlePluginVersion}'`,
      );
    } else {
      console.warn(
        "Android Gradle plugin dependency not found in project build.gradle.",
      );
    }

    return newConfig;
  });
};
