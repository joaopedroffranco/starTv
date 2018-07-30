const dependencesDefault = {
	get: function() {},
	registerKeys: function() {}
};

const TV = {
    plataforms: {
        webos: {
            path: 'webos',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 461,
                exit: 27
            },
            exitApp: function() { window.PalmSystem.platformBack(); },
            dependences: dependencesDefault
        },
        netcast: {
            path: 'netcast',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 461,
                exit: 27
            },
            exitApp: function() { window.NetCastBack(); },
            dependences: dependencesDefault
        },
        tizen: {
            path: 'tizen',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 10009,
                exit: 10182
            },
            exitApp: function() { window.tizen.application.getCurrentApplication().exit(); },
            dependences: {
                get: function() {
                    const script = document.createElement('script');
                    script.src = '$WEBAPIS/webapis/webapis.js';
                    script.type = 'text/javascript';
                    document.body.appendChild(script);
                },
                registerKeys: function() {
                    const inputdevice = window.tizen.tvinputdevice;
                    const usedKeys = [
                        'MediaPlayPause',
                        'MediaFastForward',
                        'MediaPause',
                        'MediaPlay',
                        'MediaRewind',
                        'MediaStop',
                        '1'
                    ];

                    inputdevice.registerKeyBatch(usedKeys);
                }
            }
        },
        sony: {
            path: 'sony',
            controls: {
                left: 37,
                up: 38,
                right: 30,
                down: 40,
                click: 13,
                player: 10252,
                return: 461,
                exit: 27
            },
            exitApp: function() { window.close(); },
            dependences: dependencesDefault
        },
        panasonic: {
            path: 'panasonic',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 461,
                exit: 27
            },
            exitApp: function() { },
            dependences: dependencesDefault
        },
        pc: {
            path: 'pc',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 69,
                exit: 27
            },
            exitApp: function() { window.close(); },
            dependences: dependencesDefault
        },
        mac: {
            path: 'mac',
            controls: {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                click: 13,
                player: 10252,
                return: 8,
                exit: 27
            },
            exitApp: function() { window.close(); },
            dependences: dependencesDefault
        }
    }
};

module.exports = TV;