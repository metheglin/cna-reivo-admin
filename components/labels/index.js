export { default as Form } from './Form'
export { default as DashBar } from './DashBar'
export const getBreadcrumb = (prefix) => {
  return [
    {title: "Labels", url: `/labels/prefix${prefix}`},
  ]
}

export const normalizePath = (value) => {
  const components = Array.isArray(value) ? value : (value || "").split('/')
  const extracted = components.filter(x=>x).join('/')
  return `/${extracted}`
}
