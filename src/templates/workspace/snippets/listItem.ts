import * as vscode from 'vscode';
import { t } from 'vscode-ext-localisation';
import { File } from '../../../webviews/Workspace/WorkspaceViewProvider.interface';
import { listItemButtons } from './listItemButtons';
import { listItemIcon } from './listItemIcon';

export const listItem = (
  file: File,
  imgDarkFolderUri: vscode.Uri,
  imgLightFolderUri: vscode.Uri
) => {
  const { file: dataFile, isSelected, label, path } = file;
  const tooltip = isSelected
    ? t('webViews.workspace.listItem.selected')
    : t('webViews.workspace.listItem.openCurWin', { label });
  const classes = `list__element ${
    isSelected ? 'list__element--selected' : 'list__element--unselected'
  }`;

  return `
    <li class="list__item">
      <span class="${classes}" data-file="${dataFile}" tabindex="0" title="${tooltip}">
        ${isSelected ? listItemIcon(imgDarkFolderUri, imgLightFolderUri) : ''}
        <span class="list__title">${label}</span>
        ${path ? `<span class="list__description">${path}</span>` : ''}
        ${!isSelected ? listItemButtons(dataFile, label, imgDarkFolderUri, imgLightFolderUri) : ''}
      </span>
    </li>
  `;
};
