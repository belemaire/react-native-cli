/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import applyPatch from './patches/applyPatch';
import makeStringsPatch from './patches/makeStringsPatch';
import makeSettingsPatch from './patches/makeSettingsPatch';
import makeBuildPatch from './patches/makeBuildPatch';
import makeImportPatch from './patches/makeImportPatch';
import makePackagePatch from './patches/makePackagePatch';

export default function registerNativeAndroidModule(
  name,
  androidConfig,
  params,
  projectConfig,
) {
  const buildPatch = makeBuildPatch(name);

  applyPatch(
    projectConfig.settingsGradlePath,
    makeSettingsPatch(name, androidConfig, projectConfig),
  );

  applyPatch(projectConfig.buildGradlePath, buildPatch);
  applyPatch(projectConfig.stringsPath, makeStringsPatch(params, name));

  applyPatch(
    projectConfig.mainFilePath,
    makePackagePatch(androidConfig.packageInstance, params, name),
  );

  applyPatch(
    projectConfig.mainFilePath,
    makeImportPatch(androidConfig.packageImportPath),
  );
}
