suite('Templates > Workspace > Snippets: treeItemFolder()', () => {
  /* const DEPTH = 0;
  const FOLDER_PATH = 'supernatural/winchester';
  const KEY = 'supernatural';
  const folder: FileTreeElement = {
    files: [],
    folderPath: FOLDER_PATH,
    sub: {},
  };
  const mockState = getMockState();

  let iconClosedSpy: sinon.SinonSpy;
  let iconOpenSpy: sinon.SinonSpy;
  let indentSpy: sinon.SinonSpy;
  let selectedIconSpy: sinon.SinonSpy;

  setup(() => {
    iconClosedSpy = sinon.spy(icons, 'treeIconClosed');
    iconOpenSpy = sinon.spy(icons, 'treeIconOpen');
    indentSpy = sinon.spy(indent, 'treeIndent');
    selectedIconSpy = sinon.spy(selected, 'listItemIcon');
  });

  teardown(() => {
    iconClosedSpy.restore();
    iconOpenSpy.restore();
    indentSpy.restore();
    selectedIconSpy.restore();
  });

  test('Renders correctly', () => {
    const result = treeItemFolder(folder, KEY, DEPTH, mockRenderVars, mockState);

    expect(result).to.be.a('string');
    expect(result).contains(`data-folder="${folder.folderPath}"`);
    expect(result).contains(`data-depth="${DEPTH}"`);
    expect(result).contains(`<span class="list__element" title="${KEY}">`);
    expect(result).contains(`<span class="list__title">${KEY}</span>`);

    sinon.assert.calledOnce(indentSpy);
  });

  test('Selected indicator not shown if not selected', () => {
    const result = treeItemFolder(folder, KEY, DEPTH, mockRenderVars, mockState);

    expect(result).to.be.a('string');
    expect(result).not.contains(`list__styled-item--selected`);

    sinon.assert.notCalled(selectedIconSpy);
  });

  test('Selected indicator shown if selected', () => {
    const mockState = getMockState({ closedFolders: [FOLDER_PATH] });
    const result = treeItemFolder(folder, KEY, DEPTH, mockRenderVars, {
      ...mockState,
      selected: `${FOLDER_PATH}${path.sep}`,
    });

    expect(result).to.be.a('string');
    expect(result).contains(`list__styled-item--selected`);

    sinon.assert.calledOnce(selectedIconSpy);
  });

  test('Closed icon shown if closed', () => {
    const mockState = getMockState({ closedFolders: [FOLDER_PATH] });
    treeItemFolder(folder, KEY, DEPTH, mockRenderVars, mockState);

    sinon.assert.calledOnce(iconClosedSpy);
    sinon.assert.notCalled(iconOpenSpy);
  });

  test('Open icon shown if not closed', () => {
    treeItemFolder(folder, KEY, DEPTH, mockRenderVars, mockState);

    sinon.assert.notCalled(iconClosedSpy);
    sinon.assert.calledOnce(iconOpenSpy);
  }); */
});
