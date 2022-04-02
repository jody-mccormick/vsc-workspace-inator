import { expect } from 'chai';
import * as sinon from 'sinon';
import * as configs from '../../../../../config/getConfig';
import { list } from '../../../../../templates/workspace/snippets/list';
import * as item from '../../../../../templates/workspace/snippets/listItem';
import * as tree from '../../../../../templates/workspace/snippets/tree';
import {
  getMockFileTree,
  getMockConvertedFiles,
  getMockFileList,
} from '../../../../mocks/mockFileData';
import { mockRenderVars } from '../../../../mocks/mockRenderVars';
import { getMockState } from '../../../../mocks/mockState';

suite('Templates > Workspace > Snippets: list()', () => {
  let treeConfigStub: sinon.SinonStub;
  let itemSpy: sinon.SinonSpy;
  let treeSpy: sinon.SinonSpy;

  const mockState = getMockState({
    convertedFiles: getMockConvertedFiles(),
    files: getMockFileList(),
    fileTree: getMockFileTree('normal'),
    visibleFiles: getMockConvertedFiles(),
  });

  setup(() => {
    treeConfigStub = sinon.stub(configs, 'getShowTreeConfig').callsFake(() => false);
    itemSpy = sinon.spy(item, 'listItem');
    treeSpy = sinon.spy(tree, 'tree');
  });

  teardown(() => {
    treeConfigStub.restore();
    itemSpy.restore();
    treeSpy.restore();
  });

  test('Renders nothing if files is false', () => {
    const result = list(getMockState(), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders nothing if there are no files', () => {
    const result = list(getMockState({ files: [], visibleFiles: [] }), mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).to.equal('');
  });

  test('Renders search-out message if no visibleFiles and search is in progress', () => {
    const result = list(
      getMockState({ files: [], search: 'react', visibleFiles: [] }),
      mockRenderVars
    );

    expect(result).to.be.a('string');
    expect(result).contains('<div class="list__searchedout">');
    expect(result).contains('No workspaces matched your search terms');
  });

  test('Renders list if not tree view', () => {
    treeConfigStub.callsFake(() => false);

    const result = list(mockState, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('<ul class="list__list');
    expect(result).not.contains('list__styled-list--tree');

    sinon.assert.callCount(itemSpy, mockState.visibleFiles.length);
    sinon.assert.notCalled(treeSpy);
  });

  test('Renders tree if tree view', () => {
    treeConfigStub.callsFake(() => true);

    const result = list(mockState, mockRenderVars);

    expect(result).to.be.a('string');
    expect(result).contains('<ul class="list__list');
    expect(result).contains('list__styled-list--tree');

    sinon.assert.notCalled(itemSpy);
  });
});
