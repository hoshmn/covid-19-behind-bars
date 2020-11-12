export const getUniqueValues = (nodes, selector) => {
  return nodes
    .map(selector)
    .reduce(
      (vals, curr) => (vals.indexOf(curr) > -1 ? vals : [...vals, curr]),
      []
    )
}
