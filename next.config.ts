import type { NextConfig } from "next";
import { hostname } from "os";
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol: "https",
                hostname: "github.com",
            }
        ]
    }
};
const withNextIntl = require("next-intl/plugin")('./i18n.ts');

module.exports = withNextIntl(nextConfig);