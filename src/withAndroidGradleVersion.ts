import { ConfigPlugin } from "@expo/config-plugins";
import * as fs from "fs/promises";
import * as path from "path";
import { withDangerousMod } from "expo/config-plugins";
import { AndroidGradleProps } from "./types/types";

const withGradleWrapperVersion: ConfigPlugin<AndroidGradleProps> = (
  config,
  props,
) => {
  const gradleVersion = props.gradleVersion;

  if (!gradleVersion) {
    return config;
  }

  return withDangerousMod(config, [
    "android",
    async (newConfig) => {
      const wrapperPath = path.join(
        newConfig.modRequest.platformProjectRoot,
        "gradle",
        "wrapper",
        "gradle-wrapper.properties",
      );

      try {
        const content = await fs.readFile(wrapperPath, "utf-8");
        const regex = /(distributionUrl=.*gradle-)([\d.]+)(-.*\.zip)/;

        if (regex.test(content)) {
          const newContent = content.replace(regex, `$1${gradleVersion}$3`);

          await fs.writeFile(wrapperPath, newContent, "utf-8");

          console.log(
            `Successfully updated Android Gradle to ${gradleVersion}.`,
          );
        } else {
          console.warn(
            "Gradle distributionUrl not found in gradle-wrapper.properties.",
          );
        }
      } catch {
        console.warn(`gradle-wrapper.properties not found at ${wrapperPath}`);
        return newConfig;
      }

      return newConfig;
    },
  ]);
};

export default withGradleWrapperVersion;
