export function createControl ( config, validation) {
  return {
    ...config,
    validation: {
      ...validation,
      required: true
    },
    touched: false,
    valid: !validation,
    value: ''
  }
}