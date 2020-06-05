import * as vscode from 'vscode';
import { EXT_WSLIST_ITEM_CTX } from '../../constants';

export class WsListItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly subLabel: string,
    public readonly extensionPath: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }

  get tooltip(): string {
    return `${this.subLabel}`;
  }

  get description(): string {
    return '';
  }

  iconPath = {
    light: '',
    dark: '',
  };

  contextValue = EXT_WSLIST_ITEM_CTX;
}
