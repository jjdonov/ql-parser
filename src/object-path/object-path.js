
/**
 * It would have been nice to use _.get (lodash)
 * or similar. But the paths ql uses are not real
 * js paths.
 *
 * That makes sense--if you are querying for an object
 * you would not necessarily know the index.
 *
 * This method treats array as additional branches to search
 */
function createAccessor(path) {
  if(/\s+/.test(path)) {
    throw new Error("path cannot have whitespace '" + path + "'");
  }
  const parts = path.split('.');
  return (target) => {
    const toTraverse = [{node: target, path: parts}];
    return dfs(toTraverse);
  };
}

function dfs(toTraverse) {
  let results = [];
  while(toTraverse.length > 0) {
    let {node, path} = toTraverse.pop();
    for(let i = 0; i < path.length; i++) {
      if(!node.hasOwnProperty(path[i])) {
        break;
      }
      let nextNode = node[path[i]];
      if(i + 1 === path.length) {
        if(!!nextNode) {
          results.push(nextNode);
        }
      } else if(Array.isArray(nextNode)) {
        const nextPath = path.slice(i + 1);
        toTraverse.push(...nextNode.map((n) => ({node: n, path: nextPath})));
        break;
      } else {
        node = nextNode;
      }
    }
  }
  return results;
}

module.exports.createAccessor = createAccessor;
