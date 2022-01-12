import {isDynamicRoute, getRouteRegex} from '../../node_modules/next/dist/shared/lib/router/utils'
import {removePathTrailingSlash} from '../../node_modules/next/dist/client/normalize-trailing-slash'
import {denormalizePagePath} from '../../node_modules/next/dist/server/denormalize-page-path'

// https://github.com/vercel/next.js/blob/v12.0.8/packages/next/shared/lib/router/router.ts#L419
export function resolveDynamicRoute({pathname, pages}) {
  const cleanPathname = removePathTrailingSlash(denormalizePagePath(pathname))

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname
  }

  // handle resolving href for dynamic routes
  if (!pages.includes(cleanPathname)) {
    pages.some((page) => {
      if (isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page
        return true
      }
    })
  }
  return removePathTrailingSlash(pathname)
}