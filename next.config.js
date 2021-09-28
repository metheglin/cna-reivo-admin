const envMap = {
  development: {
    // Please use `.env.local` to set environment variables
  },
  staging: {
    NEXT_PUBLIC_API_PREFIX: "http://localhost:3000/admin_api/v1",
    NEXT_PUBLIC_PAGE_ORIGIN: "http://localhost:3001",
  },
  production: {
    NEXT_PUBLIC_API_PREFIX: "http://localhost:3000/admin_api/v1",
    NEXT_PUBLIC_PAGE_ORIGIN: "http://localhost:3001",
  },
}

function getEnv(envMap) {
  if (process.env.NODE_ENV !== 'production') return envMap.development
  return envMap[process.env.NEXT_PUBLIC_ENV] || envMap.development
}

const env = getEnv(envMap)
const exportPathMap = (process.env.NODE_ENV !== 'production') ? null :
  function () {
    return {"/": { page: "/" }};
  }

module.exports = {
  env: env,
  exportPathMap: exportPathMap,
}
