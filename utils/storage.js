export default {
	getProjectsFromStorage() {
		return !!uni.getStorageSync("projects") ? uni.getStorageSync("projects") : [];
	},
	setProjectsToStorage(projects) {
		uni.setStorageSync("projects", projects);
	},
	getProjectInfoByName(name) {
		let projects = this.getProjectsFromStorage() || [];
		return projects.find(p => p.name === name);
	}
}

