class SettingWindow{
    constructor(setting){
        this.width = setting.width ? setting.width : 800;
        this.height = setting.height ? setting.height : 600;
        this.title = setting.title ? setting.title : 'OSLite';
        this.autoHideMenuBar = setting.autoHideMenuBar ? setting.autoHideMenuBar : true;
        this.window = setting.window ? setting.window : 'login';
    }
}

function settingWindow(setting){
    return new SettingWindow(setting);
}

module.exports = { settingWindow }