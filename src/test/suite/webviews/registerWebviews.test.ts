import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import { FS_WS_EXT } from '../../../constants/fs';
import { registerWebviews } from '../../../webviews/registerWebviews';
import { WorkspaceViewProvider } from '../../../webviews/Workspace/WorkspaceViewProvider';
import { getMockContext } from '../../mocks/mockContext';
import { getMockUri } from '../../mocks/mockExtensionUri';

suite('Webviews > registerWebviews()', () => {
  let configStub: sinon.SinonStub;
  let mockContext = getMockContext();
  let regWebviewStub: sinon.SinonStub;
  let ws: WorkspaceViewProvider;

  setup(() => {
    configStub = sinon.stub(vscode.workspace, 'onDidChangeConfiguration');
    mockContext = getMockContext();
    regWebviewStub = sinon.stub(vscode.window, 'registerWebviewViewProvider');
    ws = new WorkspaceViewProvider(mockContext.extensionUri, mockContext.globalState);
  });

  teardown(() => {
    configStub.restore();
    regWebviewStub.restore();
  });

  test('Sets up webview as expected', () => {
    const createStub = sinon.stub(vscode.workspace, 'onDidCreateFiles');

    registerWebviews(mockContext, ws);

    expect(mockContext.subscriptions).to.have.length(3);
    sinon.assert.callCount(configStub, 1);
    sinon.assert.callCount(createStub, 1);
    sinon.assert.callCount(regWebviewStub, 1);

    createStub.restore();
  });

  suite('Configuration changes call refresh() correctly:', () => {
    let refreshSpy: sinon.SinonSpy;
    let updateTreeSpy: sinon.SinonSpy;
    let updateVisibleSpy: sinon.SinonSpy;

    setup(() => {
      refreshSpy = sinon.spy(ws, 'refresh');
      updateTreeSpy = sinon.spy(ws, 'updateFileTree');
      updateVisibleSpy = sinon.spy(ws, 'updateVisibleFiles');
    });

    teardown(() => {
      refreshSpy.restore();
      updateTreeSpy.restore();
      updateVisibleSpy.restore();
    });

    test('workspaceSidebar.depth', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.depth'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 1);
      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('workspaceSidebar.folder', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.folder'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 2);
      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('workspaceSidebar.searchMinimum', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.searchMinimum'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 4);
      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(true);
    });

    test('workspaceSidebar.showPaths', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.showPaths'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 3);
      sinon.assert.callCount(updateVisibleSpy, 1);
    });

    test('workspaceSidebar.showFolderHierarchy', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.showFolderHierarchy'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 5);
      sinon.assert.callCount(updateVisibleSpy, 1);
    });

    test('workspaceSidebar.actions', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.actions'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 6);
      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(true);
    });

    test('workspaceSidebar.cleanLabels', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.cleanLabels'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 7);
      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined);
    });

    test('workspaceSidebar.condenseFileTree', () => {
      const affectsConfigSpy = sinon.spy(
        (configPath: string) => configPath === 'workspaceSidebar.condenseFileTree'
      );

      registerWebviews(mockContext, ws);
      const eventCallback = configStub.getCalls()[0].args[0];
      eventCallback({
        affectsConfiguration: affectsConfigSpy,
      } as vscode.ConfigurationChangeEvent);

      sinon.assert.callCount(affectsConfigSpy, 8);
      sinon.assert.callCount(updateTreeSpy, 1);
    });
  });

  suite('Creating a workspace file:', () => {
    test('Calls refresh() if a file is a code-workspace file', () => {
      const refreshSpy = sinon.spy(ws, 'refresh');
      const createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles');

      registerWebviews(mockContext, ws);
      const eventCallback = createSpy.getCalls()[0].args[0];
      eventCallback({
        files: [getMockUri(FS_WS_EXT)],
      } as vscode.FileCreateEvent);

      sinon.assert.callCount(refreshSpy, 1);
      expect(refreshSpy.getCalls()[0].args[0]).to.equal(undefined);

      createSpy.restore();
    });

    test('Does NOT call refresh() if no file is a code-workspace file', () => {
      const refreshSpy = sinon.spy(ws, 'refresh');
      const createSpy = sinon.spy(vscode.workspace, 'onDidCreateFiles');

      registerWebviews(mockContext, ws);
      const eventCallback = createSpy.getCalls()[0].args[0];
      eventCallback({
        files: [getMockUri()],
      } as vscode.FileCreateEvent);

      sinon.assert.callCount(refreshSpy, 0);

      createSpy.restore();
    });
  });
});
