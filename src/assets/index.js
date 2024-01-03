import React from "react";

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

const requireContext = require.context("./image", true, /^\.\/.*\.png|jpg$/);
const images = requireContext.keys().map(requireContext);

