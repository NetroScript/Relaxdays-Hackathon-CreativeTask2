import { Middleware } from '@nuxt/types'

const themeMiddleware: Middleware = (ctx) => {
  const theme = ctx.$cookies.get('darkMode', { parseJSON: false })
  if (theme !== undefined) {
    ctx.$vuetify.theme.dark = theme == 'true'
  }
}

export default themeMiddleware
