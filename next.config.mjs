import remarkGfm from "remark-gfm";
import remarkMdxCodeMeta from "remark-mdx-code-meta"
import createMDX from "@next/mdx";
import remarkHtml from "remark-html";

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  // distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    remarkPlugins: [remarkGfm, remarkMdxCodeMeta, remarkHtml],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})
export default withMDX(nextConfig)