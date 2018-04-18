/**
 *
 * 极验证模块
 * @controller register validate
 *
 */

'use strict';

import Geetest from 'gt3-sdk';

const captcha = new Geetest({
    geetest_id: '4af4257ebf2c7a41d075335f11b9ba78',
    geetest_key: '51646f9a05c301f7d45c0501815974fa'
});

exports.register = function* () {
    let res = {};
    const geetest = {
        client_type: 'web',
        ip_address: 'unknnow'
    };
    try {
        yield captcha.register(geetest, (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!data.success) {
                data.fallback = true;
                res = data;
            } else {
                data.fallback = false;
                res = data;
            }
        });
    } catch (e) {
        console.log(e);
    }
    this.cookies.set(geetest.client_type, true, {httpOnly: true});
    yield this.body = res;
};

exports.validate = function* () {
    let res;
    try {
        const {fallback, geetest_challenge, geetest_validate, geetest_seccode}
            = yield this.request.body;
        yield captcha.validate(fallback, {
            geetest_challenge: geetest_challenge,
            geetest_validate: geetest_validate,
            geetest_seccode: geetest_seccode
        }, (err, success) => {
            if (err) {
                res = err;
            } else if (!success) {
                res = {code: 0};
            } else {
                res = {code: 1};
            }
        });
    } catch (e) {
        console.log(e);
    }
    yield this.body = res;
};
