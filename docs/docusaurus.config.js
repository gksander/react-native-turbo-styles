/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "React Native TurboStyles",
  tagline: "Turbocharge your React Native styling.",
  url: "https://turbostyles.gksander.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "gksander", // Usually your GitHub org/user name.
  projectName: "react-native-turbo-styles", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "TurboStyles",
      logo: {
        alt: "TurboStyles Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "getting-started",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/gksander/react-native-turbo-styles",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
          ],
        },
        // {
        //   title: "Community",
        //   items: [
        //     {
        //       label: "Stack Overflow",
        //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discordapp.com/invite/docusaurus",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/docusaurus",
        //     },
        //   ],
        // },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grant Sander`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
