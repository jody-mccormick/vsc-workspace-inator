import * as vscode from 'vscode';
import {
  CMD_OPEN_CUR_WIN,
  CMD_OPEN_NEW_WIN,
  CMD_OPEN_SETTINGS,
  CMD_REFRESH,
  CMD_SORT,
  EXT_SORT,
} from '../constants';
import { cmsOpenCurWindow, cmsOpenNewWindow } from './cmds';
import { WsList } from '../treeviews';
import { WsListItemCmd } from '../treeviews/WsList/WsList.interface';
import { t } from '../localisation';
import { SortOptions, SortIds } from './registerCommands.interface';

export const registerCommands = (
  context: vscode.ExtensionContext,
  wsListDataProvider: WsList
): void => {
  const { registerCommand } = vscode.commands;

  context.subscriptions.push(
    registerCommand(CMD_OPEN_CUR_WIN, (file: string): void => {
      if (file) {
        cmsOpenCurWindow(file);
      }
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_NEW_WIN, (wsListItem: WsListItemCmd): void => {
      const {
        command: { arguments: args = [] },
      } = wsListItem;

      if (args[0]) {
        cmsOpenNewWindow(args[0]);
      }
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_OPEN_SETTINGS, (): void => {
      vscode.commands.executeCommand('workbench.action.openSettings', 'workspaceSidebar');
    })
  );

  context.subscriptions.push(
    registerCommand(CMD_REFRESH, (): void => {
      wsListDataProvider.refresh();
    })
  );

  context.subscriptions.push(
    registerCommand(
      CMD_SORT,
      async (): Promise<void> => {
        const sort = context.globalState.get<SortIds>(EXT_SORT) || 'ascending';
        const items: SortOptions = [
          {
            description: t('sort.ascending.description'),
            id: 'ascending',
            label: t('sort.ascending.label'),
          },
          {
            description: t('sort.descending.description'),
            id: 'descending',
            label: t('sort.descending.label'),
          },
        ];

        const selection = await vscode.window.showQuickPick(items);

        if (selection && selection.id !== sort) {
          context.globalState
            .update(EXT_SORT, selection.id)
            .then(() => wsListDataProvider.refresh(true));
        }
      }
    )
  );
};
