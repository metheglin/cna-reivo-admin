export { default as useAssets } from './useAssets'
export { default as useImageUploader } from './useImageUploader'
export { Uploader } from './useImageUploader'

export { default as AssetsSelectorModal } from './components/AssetsSelectorModal'
export { default as AssetsButtonModal } from './components/AssetsButtonModal'

// const map = {
//   useAssets,
//   useImageUploader,
//   Uploader,
//   AssetsSelectorModal,
//   AssetsButtonModal
// }
// export default map

// export function DefaultAssetsSelectorModal({baseQuery, selector}) {
//   const sourceAssets = useAssets({baseQuery})
//   const sourceUploader = useImageUploader({baseQuery, onUploaded: sourceAssets.addItem})
//   return (
//     <AssetsSelectorModal selector={selector} sourceAssets={sourceAssets} sourceUploader={sourceUploader} />
//   )
// }