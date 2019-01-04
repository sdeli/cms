module.exports = (() => {
    let isConfigured = false;
    let configuredModuleInst;
    
    class ConfigureModuleSingl {
        constructor(unconfiguredModule) {
            unconfiguredModule = unconfiguredModule;
        }

        configure(config) {
            if (!isConfigured) {
                isConfigured = true;
                configuredModuleInst = unconfiguredModule(config);
            } else {
                return false;
            }
        }
        
        getInst() {
            if (isConfigured) {
                isConfigured = true;
                return configuredModuleInst;
            } else {
                return false;
            }
        }
    }

    return ConfigureModuleSingl;
})();
