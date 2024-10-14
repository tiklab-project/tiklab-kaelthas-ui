const presets = [
    "@babel/preset-env",
    "@babel/preset-react"
]
const plugins = [
    "@babel/plugin-transform-react-jsx",
    [
        "@babel/plugin-transform-react-jsx-source"
    ],
    [
        "@babel/plugin-transform-arrow-functions"
    ],
    [
        "import",
        {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css",
            
        }
    ],
    [
        "import",
        {
            "libraryName": "tiklab-eam-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-eam-ui/es/${fullName}`;
            }
        },
        "tiklab-eam-ui"
    ],
    [
        "import",
        {
            "libraryName": "tiklab-message-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-message-ui/es/${fullName}`;
            }
        },
        "tiklab-message-ui"
    ],
    /*[
        "import", 
        {
            "libraryName": "tiklab-todotask-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-todotask-ui/es/${fullName}`;
            }
        }, 
        "tiklab-todotask-ui"
    ],*/
    [
        "import", 
        {
            "libraryName": "tiklab-security-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-security-ui/es/${fullName}`;
            }
        }, 
        "tiklab-security-ui"
    ],
   
    [
        "@babel/plugin-proposal-decorators",
        {
            "legacy": true
        }
    ],
    [
        "@babel/plugin-proposal-class-properties",
        {
            "loose": false
        }
    ],
    [
        "dynamic-import-webpack"
    ],
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
]

module.exports = {presets,plugins}