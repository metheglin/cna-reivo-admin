// https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-export-html/README.md
export const exportOptions = {
  // image convert src => url
  // https://github.com/niuware/mui-rte/blob/master/src/components/Media.tsx#L39
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase()
    if (entityType === 'image') {
      const data = entity.getData()
      // console.log(data.url, {data})
      return {
        element: 'img',
        attributes: {
          src: data.url,
          width: data.width,
          height: data.height,
        },
        // style: {
        //   textAlign: data.alignment,
        // },
      };
    }
    if (entityType === 'shopcard') {
      const data = entity.getData()
      // const {shop_id, name, thumbnail, catchcopy, subtitle} = data
      return {
        element: 'object',
        attributes: {...data, type: 'localcloud/shop'},
      }
    }
    if (entityType === 'shopintro') {
      const data = entity.getData()
      return {
        element: 'object',
        attributes: {...data, type: 'localcloud/shopintro'},
      }
    }
  },
}
// https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-import-element/README.md
export const importOptions = {
  // image convert src => url
  // https://github.com/niuware/mui-rte/blob/master/src/components/Media.tsx#L39
  customInlineFn: (element, {Style, Entity}) => {
    if (element.tagName === 'IMG') {
      return Entity('IMAGE', {
        url: element.getAttribute('src'),
        width: element.getAttribute('width'),
        height: element.getAttribute('height'),
      })
    }
    if (element.tagName === 'OBJECT' && element.getAttribute('type') === 'localcloud/shop') {
      return Entity('SHOPCARD', {
        shop_id: element.getAttribute('shop_id'),
        name: element.getAttribute('name'),
        thumbnail: element.getAttribute('thumbnail'),
        catchcopy: element.getAttribute('catchcopy'),
        subtitle: element.getAttribute('subtitle'),
      })
    }
    if (element.tagName === 'OBJECT' && element.getAttribute('type') === 'localcloud/shopintro') {
      return Entity('SHOPINTRO', {
        shop_id: element.getAttribute('shop_id'),
        shop_name: element.getAttribute('shop_name'),
        shop_tel: element.getAttribute('shop_tel'),
        shop_address: element.getAttribute('shop_address'),
        shop_open_hours: element.getAttribute('shop_open_hours'),
        shop_holidays: element.getAttribute('shop_holidays'),
        shop_link: element.getAttribute('shop_link'),
        thumbnail: element.getAttribute('thumbnail'),
        introduction: element.getAttribute('introduction'),
      })
    }
  },
  // elementStyles: {
  //   'shop': 'SHOPCARD',
  // }
  // customBlockFn: (element) => {
  //   if (element.tagName === 'ARTICLE') {
  //     return {type: 'custom-block-type'};
  //   }
  //   if (element.tagName === 'CENTER') {
  //     return {data: {align: 'center'}};
  //   }
  // },
}