const OpenApiTool = require('baikaifa-openapi-tool');
const { resolve } = require('path');

const url = 'http://localhost:8081/api/v3/api-docs/default';
const outputDir = resolve(__dirname, 'service');

const openApiTool = new OpenApiTool({ url });
openApiTool.generateService({
    template: 'axios', // or umi
    importText: `import axios from '@/common/apiService';`,
    typescript: true,
    outputDir,
});