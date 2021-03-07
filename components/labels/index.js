export { default as Form } from './Form'
export { default as MainDashBar } from './MainDashBar'

export const normalizePath = (value) => {
  const components = Array.isArray(value) ? value : (value || "").split('/')
  const extracted = components.filter(x=>x).join('/')
  return `/${extracted}`
}
