import type { ConfigPlugin } from "expo/config-plugins";
import { AndroidGradleProps } from "./types/types";
import { withAndroidGradlePluginVersion } from "./withAndroidGradlePluginVersion";
import withAndroidGradleVersion from "./withAndroidGradleVersion";

const withAndroidGradle: ConfigPlugin<AndroidGradleProps> = (config, props) => {
  config = withAndroidGradlePluginVersion(config, props);
  config = withAndroidGradleVersion(config, props);

  return config;
};

export default withAndroidGradle;
