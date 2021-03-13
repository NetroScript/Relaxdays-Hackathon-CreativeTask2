import { Middleware } from '@nuxt/types'

const themeMiddleware: Middleware = (ctx) => {
  try {
    if (ctx.$cookies !== undefined) {
      const theme = ctx.$cookies.get('darkMode', { parseJSON: false })
      if (theme !== undefined && ctx.$vuetify !== undefined) {
        ctx.$vuetify.theme.dark = theme === 'true'
      }
    }
  } catch (e) {}
}

export default themeMiddleware
