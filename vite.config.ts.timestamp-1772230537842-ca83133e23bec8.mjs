// vite.config.ts
import { defineConfig } from "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/node_modules/@vitejs/plugin-react/dist/index.js";
import { crx } from "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "JobHunter07",
  description: "Tools for your Job Hunt",
  version: "0.0.1",
  action: {
    default_popup: "index.html"
  },
  permissions: [
    "storage"
  ],
  icons: {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "images/*.svg"
      ],
      matches: [
        "https://www.linkedin.com/*"
      ]
    }
  ],
  content_scripts: [
    {
      js: [
        "src/index.tsx"
      ],
      matches: [
        "https://www.linkedin.com/*"
      ]
    }
  ],
  browser_specific_settings: {
    gecko: {
      id: "extension@jobhunter07.com",
      strict_min_version: "109.0",
      data_collection_permissions: {
        required: [
          "none"
        ]
      }
    }
  }
};

// vite.config.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/node_modules/@storybook/addon-vitest/dist/vitest-plugin/index.js";
import { playwright } from "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/node_modules/@vitest/browser-playwright/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\kbdav\\source\\repos\\JobHunter07\\Tools\\LinkedIn.Browser.Extension";
var __vite_injected_original_import_meta_url = "file:///C:/Users/kbdav/source/repos/JobHunter07/Tools/LinkedIn.Browser.Extension/vite.config.ts";
var dirname = typeof __vite_injected_original_dirname !== "undefined" ? __vite_injected_original_dirname : path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var isFirefox = process.env.FIREFOX === "true";
var vite_config_default = defineConfig({
  plugins: [react(), crx({
    manifest: manifest_default,
    browser: isFirefox ? "firefox" : "chrome"
  })],
  test: {
    projects: [{
      extends: true,
      plugins: [
        // The plugin will run tests for the stories defined in your Storybook config
        // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, ".storybook")
        })
      ],
      test: {
        name: "storybook",
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: "chromium"
          }]
        },
        setupFiles: [".storybook/vitest.setup.ts"]
      }
    }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGtiZGF2XFxcXHNvdXJjZVxcXFxyZXBvc1xcXFxKb2JIdW50ZXIwN1xcXFxUb29sc1xcXFxMaW5rZWRJbi5Ccm93c2VyLkV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxca2JkYXZcXFxcc291cmNlXFxcXHJlcG9zXFxcXEpvYkh1bnRlcjA3XFxcXFRvb2xzXFxcXExpbmtlZEluLkJyb3dzZXIuRXh0ZW5zaW9uXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9rYmRhdi9zb3VyY2UvcmVwb3MvSm9iSHVudGVyMDcvVG9vbHMvTGlua2VkSW4uQnJvd3Nlci5FeHRlbnNpb24vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdC9jb25maWdcIiAvPlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBzdG9yeWJvb2tUZXN0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi12aXRlc3Qvdml0ZXN0LXBsdWdpbic7XG5pbXBvcnQgeyBwbGF5d3JpZ2h0IH0gZnJvbSAnQHZpdGVzdC9icm93c2VyLXBsYXl3cmlnaHQnO1xuY29uc3QgZGlybmFtZSA9IHR5cGVvZiBfX2Rpcm5hbWUgIT09ICd1bmRlZmluZWQnID8gX19kaXJuYW1lIDogcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbi8vIE1vcmUgaW5mbyBhdDogaHR0cHM6Ly9zdG9yeWJvb2suanMub3JnL2RvY3MvbmV4dC93cml0aW5nLXRlc3RzL2ludGVncmF0aW9ucy92aXRlc3QtYWRkb25cbmNvbnN0IGlzRmlyZWZveCA9IHByb2Nlc3MuZW52LkZJUkVGT1ggPT09ICd0cnVlJztcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBjcngoe1xuICAgIG1hbmlmZXN0LFxuICAgIGJyb3dzZXI6IGlzRmlyZWZveCA/ICdmaXJlZm94JyA6ICdjaHJvbWUnXG4gIH0pXSxcbiAgdGVzdDoge1xuICAgIHByb2plY3RzOiBbe1xuICAgICAgZXh0ZW5kczogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgIC8vIFRoZSBwbHVnaW4gd2lsbCBydW4gdGVzdHMgZm9yIHRoZSBzdG9yaWVzIGRlZmluZWQgaW4geW91ciBTdG9yeWJvb2sgY29uZmlnXG4gICAgICAvLyBTZWUgb3B0aW9ucyBhdDogaHR0cHM6Ly9zdG9yeWJvb2suanMub3JnL2RvY3MvbmV4dC93cml0aW5nLXRlc3RzL2ludGVncmF0aW9ucy92aXRlc3QtYWRkb24jc3Rvcnlib29rdGVzdFxuICAgICAgc3Rvcnlib29rVGVzdCh7XG4gICAgICAgIGNvbmZpZ0RpcjogcGF0aC5qb2luKGRpcm5hbWUsICcuc3Rvcnlib29rJylcbiAgICAgIH0pXSxcbiAgICAgIHRlc3Q6IHtcbiAgICAgICAgbmFtZTogJ3N0b3J5Ym9vaycsXG4gICAgICAgIGJyb3dzZXI6IHtcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGhlYWRsZXNzOiB0cnVlLFxuICAgICAgICAgIHByb3ZpZGVyOiBwbGF5d3JpZ2h0KHt9KSxcbiAgICAgICAgICBpbnN0YW5jZXM6IFt7XG4gICAgICAgICAgICBicm93c2VyOiAnY2hyb21pdW0nXG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgc2V0dXBGaWxlczogWycuc3Rvcnlib29rL3ZpdGVzdC5zZXR1cC50cyddXG4gICAgICB9XG4gICAgfV1cbiAgfVxufSk7IiwgIntcclxuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcclxuICBcIm5hbWVcIjogXCJKb2JIdW50ZXIwN1wiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJUb29scyBmb3IgeW91ciBKb2IgSHVudFwiLFxyXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xXCIsXHJcbiAgXCJhY3Rpb25cIjoge1xyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwiaW5kZXguaHRtbFwiXHJcbiAgfSxcclxuICBcInBlcm1pc3Npb25zXCI6IFtcclxuICAgIFwic3RvcmFnZVwiXHJcbiAgXSxcclxuICBcImljb25zXCI6IHtcclxuICAgIFwiMTZcIjogXCJpbWFnZXMvaWNvbi0xNi5wbmdcIixcclxuICAgIFwiMzJcIjogXCJpbWFnZXMvaWNvbi0zMi5wbmdcIixcclxuICAgIFwiNDhcIjogXCJpbWFnZXMvaWNvbi00OC5wbmdcIixcclxuICAgIFwiMTI4XCI6IFwiaW1hZ2VzL2ljb24tMTI4LnBuZ1wiXHJcbiAgfSxcclxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcclxuICAgICAgICBcImltYWdlcy8qLnN2Z1wiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXHJcbiAgICAgICAgXCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vKlwiXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiY29udGVudF9zY3JpcHRzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJqc1wiOiBbXHJcbiAgICAgICAgXCJzcmMvaW5kZXgudHN4XCJcclxuICAgICAgXSxcclxuICAgICAgXCJtYXRjaGVzXCI6IFtcclxuICAgICAgICBcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS8qXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJicm93c2VyX3NwZWNpZmljX3NldHRpbmdzXCI6IHtcclxuICAgIFwiZ2Vja29cIjoge1xyXG4gICAgICBcImlkXCI6IFwiZXh0ZW5zaW9uQGpvYmh1bnRlcjA3LmNvbVwiLFxyXG4gICAgICBcInN0cmljdF9taW5fdmVyc2lvblwiOiBcIjEwOS4wXCIsXHJcbiAgICAgIFwiZGF0YV9jb2xsZWN0aW9uX3Blcm1pc3Npb25zXCI6IHtcclxuICAgICAgICBcInJlcXVpcmVkXCI6IFtcclxuICAgICAgICAgIFwibm9uZVwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLFdBQVc7OztBQ0hwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsYUFBZTtBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsMEJBQTRCO0FBQUEsSUFDMUI7QUFBQSxNQUNFLFdBQWE7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBVztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGlCQUFtQjtBQUFBLElBQ2pCO0FBQUEsTUFDRSxJQUFNO0FBQUEsUUFDSjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVc7QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSwyQkFBNkI7QUFBQSxJQUMzQixPQUFTO0FBQUEsTUFDUCxJQUFNO0FBQUEsTUFDTixvQkFBc0I7QUFBQSxNQUN0Qiw2QkFBK0I7QUFBQSxRQUM3QixVQUFZO0FBQUEsVUFDVjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FEM0NBLE9BQU8sVUFBVTtBQUNqQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLGtCQUFrQjtBQVIzQixJQUFNLG1DQUFtQztBQUE4TixJQUFNLDJDQUEyQztBQVN4VCxJQUFNLFVBQVUsT0FBTyxxQ0FBYyxjQUFjLG1DQUFZLEtBQUssUUFBUSxjQUFjLHdDQUFlLENBQUM7QUFHMUcsSUFBTSxZQUFZLFFBQVEsSUFBSSxZQUFZO0FBQzFDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxTQUFTLFlBQVksWUFBWTtBQUFBLEVBQ25DLENBQUMsQ0FBQztBQUFBLEVBQ0YsTUFBTTtBQUFBLElBQ0osVUFBVSxDQUFDO0FBQUEsTUFDVCxTQUFTO0FBQUEsTUFDVCxTQUFTO0FBQUE7QUFBQTtBQUFBLFFBR1QsY0FBYztBQUFBLFVBQ1osV0FBVyxLQUFLLEtBQUssU0FBUyxZQUFZO0FBQUEsUUFDNUMsQ0FBQztBQUFBLE1BQUM7QUFBQSxNQUNGLE1BQU07QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxVQUNWLFVBQVUsV0FBVyxDQUFDLENBQUM7QUFBQSxVQUN2QixXQUFXLENBQUM7QUFBQSxZQUNWLFNBQVM7QUFBQSxVQUNYLENBQUM7QUFBQSxRQUNIO0FBQUEsUUFDQSxZQUFZLENBQUMsNEJBQTRCO0FBQUEsTUFDM0M7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
