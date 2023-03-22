// vuex配置文件
import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
	// 全局共享数据
	state: {
		projects: storage.getProjectsFromStorage() || []
	},
	getters: {
		getProjects: state => state.projects,
		getProjectInfoByName: (state) => (name) => { return state.projects.find(p => p.name === name) }


	},
	// 变更state内数据
	mutations: {
		setProjects(state, projects) {
			state.projects = projects
			storage.setProjectsToStorage(projects)
		}
	},
	actions: {}
})

