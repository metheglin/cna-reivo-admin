export { default as useLabels } from './useLabels'

export { default as LabelsSelectorModal } from './components/LabelsSelectorModal'
export { default as LabelsButtonModal } from './components/LabelsButtonModal'

export const normalizePath = (value) => {
  const components = Array.isArray(value) ? value : (value || "").split('/')
  const extracted = components.filter(x=>x).join('/')
  return extracted ? `/${extracted}/` : `/${extracted}`
}

export const stripLastSlash = path => path.endsWith('/') ? path.slice(0, -1) : path
