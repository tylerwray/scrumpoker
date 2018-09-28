import React from 'react'

export const defaultCardColor = '#0097a7'

export const ThemeContext = React.createContext()

export function withTheme(Component) {
  return function ThemedComponent(props) {
    return (
      <ThemeContext.Consumer>
        {({ theme, updateTheme }) => (
          <Component {...props} theme={theme} updateTheme={updateTheme} />
        )}
      </ThemeContext.Consumer>
    )
  }
}
