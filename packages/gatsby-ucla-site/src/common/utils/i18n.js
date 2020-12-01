import en from "../../../content/en.json"

export const getLang = (...args) => {
  const key = args.join("_")
  return en[key] ? en[key] : key
}
