import type { NextConfig } from 'next';
const githubPages=process.env.GITHUB_ACTIONS==='true';
const basePath=githubPages?'/McKay-HS-Orchestras':'';
const nextConfig:NextConfig={output:'export',trailingSlash:true,basePath,assetPrefix:basePath||undefined,images:{unoptimized:true},turbopack:{root:process.cwd()}};
export default nextConfig;
