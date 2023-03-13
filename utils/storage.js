export default {
	getProjectsFromStorage() {
		return !!uni.getStorageSync("projects") ? uni.getStorageSync("projects") : [];
	},
	setProjectInfoToStorage(projects) {
		uni.setStorageSync("projects", projects);
	},
	getProjectInfoByName(name) {
		let projects = this.getProjectsFromStorage() || [];
		return projects.find(p => p.name === name);
	}
}

