
let oAuth = require('./oAuth');
exports['404'] = function* () {
  let oauth = yield oAuth.state(this);
  let recommendedNav = require('../meta/recommendNav').default;
  yield this.render('404',{
    oauth: oauth.encrypted,
    other: recommendedNav.slice(0,13)
  })
}