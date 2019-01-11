// import * as types from './type.js'
export default {
  footBl: (state, payload) => {
    state.footBl = payload
  },
  domain: (state, payload) => {
    state.domain = payload
  },
  navTitle: (state, payload) => {
    state.navTitle = payload
  },
  vipUrl: (state, payload) => {
    state.vipUrl = payload
  },
  forumCode:(state,payload) =>{
    state.forumCode = payload
  },
  grateVip: (state, payload) => {
    state.grateVip = payload
  },
  protalVip: (state, payload) => {
    state.protalVip = payload
  }
  // [types.AddTest]: (state) => {
  //   state.test++
  // },
  // [types.RadTest]: (state) => {
  //   state.test--
  // }
}
