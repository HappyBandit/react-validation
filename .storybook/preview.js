import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: 'docs',
  previewTabs: { canvas: { hidden: true }},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}