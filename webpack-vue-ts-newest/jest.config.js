/* eslint-disable indent */
module.exports = {
    // 模块使用的文件扩展名数组，从左往右查找这些文件; 就是告知jest需要测试覆盖的文件的扩展名
    moduleFileExtensions: [
        "js",
        "json",
        // 需要 ESLint
        // 'jsx',
        "vue"
    ],
    // 转换规则，通过对应模块的转换器来解决一些未来版本语法时可以使用它
    transform: {
        "^.+\\.vue$": "<rootDir>/node_modules/vue-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/node_modules/jest-transform-stub",
        "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest"
    },
    // 忽略转换的文件夹
    transformIgnorePatterns: [
        "/node_modules/"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    testURL: "http://localhost/",
    // 如果需要在JSDOM环境下运行
    testEnvironment: "jest-environment-jsdom",
    // 运行一些测试环境所要依赖的模块的路径列表
    setupFiles: ["<rootDir>/test/unit/setup"],
    coverageDirectory: "<rootDir>/test/unit/coverage",
    // 为数组中匹配的文件收集覆盖率信息
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!src/main.js",
        "!src/router/index.js",
        "!**/node_modules/**"
    ]
};
