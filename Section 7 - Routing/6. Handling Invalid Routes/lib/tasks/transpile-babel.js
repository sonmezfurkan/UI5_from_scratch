import babel from '@babel/core'

export default async function({ workspace, log }) {
  return workspace.byGlob(['/**/*.js', '!/**/*qunit.js']).then(resources => {
    return Promise.all(
      resources.map(resource => {
        resource
          .getString()
          .then(value => {
            log.info('Transpiling file ' + resource.getPath())
            return babel.transformAsync(value, {
              sourceMaps: false,
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  '@babel/plugin-proposal-object-rest-spread',
                  { loose: true, useBuiltIns: true }
                ],
                [
                  '@babel/plugin-transform-destructuring',
                  { loose: true, useBuiltIns: true }
                ],
                [
                  '@babel/plugin-transform-spread',
                  { loose: true }
                ]
              ]
            }).then(result => {
              resource.setString(result.code)
              workspace.write(resource)
            })
          })
      })
    )
  })
}

export async function determineRequiredDependencies() {
  return new Set()
}
