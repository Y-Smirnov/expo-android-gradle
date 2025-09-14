import { ExportedConfigWithProps } from "expo/config-plugins";
import { ProjectFile } from "@expo/config-plugins/build/android/Paths";

export const isGroovy: (
  gradle: ExportedConfigWithProps<ProjectFile<"groovy" | "kt">>,
) => boolean = (gradle) => {
  return gradle.modResults.language === "groovy";
};
